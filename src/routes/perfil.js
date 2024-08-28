const express = require("express");
const pool = require("../dist/connect");
const jwt = require("jsonwebtoken");
const router = express.Router();
const SECRET = "sportche"; 

router.get("/", (req, res) => {
  pool.query(
    `SELECT * FROM users WHERE id_user = ? AND username = ?;`,
    [req.userId, req.username],
    (err, results) => {

      if (err) {
        return res.status(500).send("Erro ao executar a consulta.");
      }

      if (results.length === 0) {
        return res.status(404).send("Endereço não encontrado.");
      }

      return res.status(201).json(results);
    }
  );
});

module.exports = router;
