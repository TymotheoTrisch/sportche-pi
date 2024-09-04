const express = require("express");
const pool = require("../dist/connect");
const router = express.Router();

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

router.get("/myMatches", (req, res) => {
  pool.query(
    `SELECT matches.*, addresses.* 
     FROM matches LEFT JOIN addresses ON matches.address_match = addresses.id_address
     WHERE matches.created_by = ?;`,
    [req.userId],
    (err, results) => {
      if (err) return res.status(404).json("Error: " + err);

      if (!results)
        return res.status(400).json("Você não criou nenhuma partida.");

      return res.status(201).json(results);
    }
  );
});

router.get("/joined-matches", (req, res) => {
  pool.query(
    `SELECT game_id FROM game_players WHERE user_id = ?`,
    [req.userId],
    (err, results) => {
      if (err) return res.status(404).json(err);

      if (!results || results.length === 0)
        return res.status(400).json("Nenhuma partida.");

      const matchIds = results.map((row) => row.game_id);

      pool.query(
        `SELECT matches.*, addresses.* FROM matches
         LEFT JOIN addresses ON matches.address_match = addresses.id_address
         WHERE id_match IN (?)`,
        [matchIds],
        (err, matches) => {
          if (err) return res.status(404).json(err);

          return res.json(matches);
        }
      );
    }
  );
});

module.exports = router;
