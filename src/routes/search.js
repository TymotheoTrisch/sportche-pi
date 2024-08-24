const express = require("express");
const pool = require("../dist/connect");
const router = express.Router();

router.post("/", (req, res) => {
  const city = req.body;
  pool.query(
    `SELECT * FROM matches WHERE address_match IN ( SELECT id_address FROM addresses WHERE city = ? );`, [city],
    (err, results) => {
      if (err) {
        return res.status(500).send("Erro ao executar a consulta.");
      }
      console.log(results);
    }
  );
});

module.exports = router;

// // `SELECT m.name AS search, a.city AS city FROM matches m
// INNER JOIN address a ON m.address_match = a.id_address
// WHERE search LIKE ? AND city = ?;
// `,
