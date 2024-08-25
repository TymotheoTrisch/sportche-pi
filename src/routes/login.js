const express = require("express");
const pool = require("../dist/connect"); 
const jwt = require('jsonwebtoken')
const getHash = require('../scripts/getHash')
const router = express.Router();

router.post("/", async (req, res) => {
    const {email, password} = req.body;
    
    pool.query("SELECT * FROM users WHERE email = ? AND password = ?", [email, password], async (error, results) => {
      if (error) {
        console.error("Error executing query: ", error);
      }
      
      if(results.length == 0) {
        return res.status(500).json({message: "usuário não encontrado"});
      }
      return res.status(201).json({message: "Login realizado com sucesso"});

    });
});



module.exports = router;
