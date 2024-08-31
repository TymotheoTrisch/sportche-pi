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

router.get("/myMatches", (req, res) => {
  pool.query(`SELECT * FROM matches WHERE created_by = ?`, [req.userId], (err, results) => {
    if(err) return res.status(404).json('Error: ' + err);

    if(!results) return res.status(400).json('Você não criou nenhuma partida.')

    return res.status(201).json(results)
  });
})

router.get("/joined-matches", (req, res) => {
  pool.query(`SELECT game_id FROM game_players WHERE user_id = ?`, [req.userId], (err, results) => {
    if (err) return res.status(404).json(err);

    if (!results || results.length === 0) return res.status(400).json('Nenhuma partida.');

    console.log(results)
    const matchIds = results.map(row => row.game_id);
    console.log(matchIds);
    
    pool.query(`SELECT * FROM matches WHERE id_match IN (?)`, [matchIds], (err, matches) => {
      if (err) return res.status(404).json(err);

      return res.json(matches);
    });
  });
});


module.exports = router;
