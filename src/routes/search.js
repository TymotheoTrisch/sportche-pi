const express = require("express");
const pool = require("../dist/connect");
const jwt = require('jsonwebtoken');
const router = express.Router();
const SECRET = "sportche"; // Use a mesma chave secreta usada para assinar o token

// Middleware para verificar o token JWT
function verifyJWT(req, res, next) {
    const authHeader = req.headers['authorization']; // Usando o cabeçalho de autorização padrão

    if (!authHeader) {
        return res.status(401).json({ message: 'Token não fornecido', token: authHeader });
    }

    const token = authHeader.split(' ')[1]; // Extrai o token do cabeçalho


    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido', token: token });
        }

        req.userId = decoded.userId; // Dados do usuário armazenados na requisição
        req.name = decoded.name;
        
        next(); // Passa para a próxima função de middleware ou rota
    });
}


router.post("/", verifyJWT, (req, res) => {
    const city = req.body.city || null;
    const name = req.body.name || null;

    pool.query(
        `SELECT id_address FROM addresses WHERE city = ? OR ? IS NULL`,
        [city, city],
        (err, results) => {
            if (err) {
                return res.status(500).send("Erro ao executar a consulta.");
            }

            if (results.length === 0) {
                return res.status(404).send("Endereço não encontrado.");
            }
      
            const idAddress = results.length > 1 ? null : results[0].id_address;

            pool.query(
                `SELECT * 
                 FROM matches 
                 LEFT JOIN addresses ON addresses.id_address = matches.address_match 
                 WHERE (addresses.id_address = ? OR ? IS NULL)
                 AND (matches.name LIKE ? OR ? IS NULL);`,
                [idAddress, idAddress, "%" + name + "%", name],
                (err, results) => {
                    if (err) {
                        return res.status(500).send("Erro ao executar a consulta.");
                    }

                    
                    return res.json(results);
                }
            );
        }
    );
});

module.exports = router;
