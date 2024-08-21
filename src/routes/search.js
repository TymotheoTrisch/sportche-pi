const express = require("express");
const pool = require("../dist/connect");
const router = express.Router();

router.get("/", (req, res) => {
    pool.query(
      `SELECT m.name AS search, a.city AS city FROM matches m
          INNER JOIN address a ON m.address_match = a.id_address
          WHERE search LIKE ? AND city = ?;
  `,
      [`%${req.query.q}%`,getLocation()],
      (err, results) => {
        if (err) {
          return res.status(500).send("Erro ao executar a consulta.");
        }
        console.log(results);
      }
    );
  });