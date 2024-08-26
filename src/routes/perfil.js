const express = require("express");
const pool = require("../dist/connect");
const jwt = require("jsonwebtoken");
const router = express.Router();
const SECRET = "sportche"; 


function verifyJWT(req, res, next) {
  const authHeader = req.headers["authorization"]; 

  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "Token não fornecido", token: authHeader });
  }

  const token = authHeader.split(" ")[1]; 

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Token inválido", token: token });
    }

    req.userId = decoded.userId; 
    req.name = decoded.name;

    next(); 
  });
}

router.get("/", verifyJWT, (req, res) => {
  pool.query(
    `SELECT * FROM users WHERE id_user = ? AND username = ?;`,
    [req.userId, req.name],
    (err, results) => {
      if (err) {
        return res.status(500).send("Erro ao executar a consulta.");
      }

      if (results.length === 0) {
        return res.status(404).send("Endereço não encontrado.");
      }

      console.log(results)
      return res.json(results);
    }
  );
});

module.exports = router;
