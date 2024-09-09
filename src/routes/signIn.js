// Importação das bibliotecas necessárias
const express = require("express");
const pool = require("../dist/connect");
const jwt = require('jsonwebtoken');
const getHash = require('../scripts/getHash');
const router = express.Router();

// Chave secreta utilizada na biblioteca JWT
const SECRET = 'Sportche';

// Rota POST para registro e autenticação de usuário
router.post("/", async (req, res) => {
    const { username, email, password } = req.body;

    // Verifica se todos os campos obrigatórios foram fornecidos
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Campos obrigatórios ausentes.' });
    }

    // Insere o novo usuário no banco de dados com a senha criptografada
    pool.query(
        "INSERT INTO users(username, email, password) VALUES (?, ?, ?)",
        [username, email, await getHash(password)],
        async (error, resultsInsert) => {
            if (error) {
                console.error("Erro ao executar a inserção do usuário:", error);
                return res.status(500).json({ message: 'Erro ao adicionar usuário.' });
            }

            // Após a inserção, busca o usuário para autenticação
            pool.query(
                "SELECT * FROM users WHERE email = ? AND password = ?",
                [email, await getHash(password)],
                (err, resultsSelect) => {
                    if (err) {
                        console.error("Erro ao buscar o usuário:", err);
                        return res.status(500).json({ message: 'Erro ao buscar usuário.' });
                    }

                    // Se o usuário for encontrado, gera um token JWT
                    if (resultsSelect.length === 0) {
                        return res.status(404).json({ message: 'Usuário não encontrado.' });
                    }

                    const user = resultsSelect[0];
                    const token = jwt.sign(
                        { userId: user.id_user, username: user.username },
                        SECRET,
                        { expiresIn: '1h' }
                    );

                    // Retorna uma resposta com o token JWT
                    return res.status(201).json({
                        message: "Login realizado com sucesso",
                        auth: true,
                        token: token,
                    });
                }
            );
        }
    );
});

module.exports = router;
