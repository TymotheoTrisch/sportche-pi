const express = require("express");
const pool = require("../dist/connect"); 
const getHash = require('../scripts/getHash')
const router = express.Router();

router.post("/login", async (req, res) => {
    const {email, password} = req.body;
    
    pool.query("SELECT * FROM users WHERE email = ? AND password = ?", [email, await getHash(password)], async (error, results) => {
      if (error) {
        console.error("Error executing query: ", error);
      }
      
      if(results.length == 0) {
        return res.status(500).json({message: "usuário não encontrado"});
      }
      return res.status(201).json({message: "Login realizado com sucesso"});

    });
});

router.post("/register", async (req, res) => {
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

module.exports = router;
