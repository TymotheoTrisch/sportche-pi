const express = require("express");
const pool = require("../dist/connect"); 
const getHash = require('../scripts/getHash')
const router = express.Router();

router.post("/", async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({message: 'Missing required fields: username, email, and senha.'});
    }

    pool.query(
      "INSERT INTO users(username, email, password) VALUES (?, ?, ?)",
      [username, email, await getHash(password)],
      (error, results) => {
        if (error) {
          console.error("Error executing insert query: ", error);
          return res.status(500).json({message: 'Erro ao adicionar usuário.'});
        }
        return res.status(201).json({message: 'Usuário adicionado com sucesso.'});
      }
    );
});

module.exports = router
