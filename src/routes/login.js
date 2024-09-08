// Importação das bibliotecas necessárias
const express = require("express");
const pool = require("../dist/connect");
const jwt = require("jsonwebtoken");
const getHash = require("../scripts/getHash");
const router = express.Router();

// Chave secreta utilizada na biblioteca JWT
const SECRET = "Sportche";

// Rota POST para autenticação LOGIN de usuário. 
router.post("/", async (req, res) => {
    const { email, password } = req.body;

    // Verifica se existe algum usuário com esse email e senha
    pool.query(
        "SELECT * FROM users WHERE email = ? AND password = ?",
        [email, await getHash(password)],
        async (error, results) => {
            if (error) {
                console.error("Erro ao executar a colsulta");
                return res.status(500).json({ message: "Erro no servidor" });
            }

            // Se não encontrar, retorna uma mensagem de erro
            if (results.length === 0) {
                return res.status(404).json({ message: "Usuário não encontrado" });
            }

            // Se caso o usuário existir, a autenticação acontece, 
            // salvando os dados e gerando um token de segurança
            const user = results[0];
            const token = jwt.sign(
                { userId: user.id_user, username: user.username },
                SECRET,
                { expiresIn: '1h' }
            );

            // Por fim retorna uma mensagem de login realizado com sucesso
            return res.status(201).json({
                message: "Login realizado com sucesso",
                auth: true,
                token: token,
            });
        }
    );
});

module.exports = router;
