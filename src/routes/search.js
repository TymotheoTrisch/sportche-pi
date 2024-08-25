const express = require("express");
const pool = require("../dist/connect");
const router = express.Router();

router.post("/", (req, res) => {
  const city = req.body.city || null;
  const name = req.body.name || null;
  console.log(city, name);
  

  pool.query(
    `SELECT id_address FROM addresses WHERE city = ? OR ? IS NULL`,
    [city, city],
    (err, results) => {
      if (err) {
        return res.status(500).send("Erro ao executar a consulta.");
      }

      if (results.length === 0) {
        return res.status(404).send("Endereço não encontrado.");
      }
      
      console.log(results);
      

      const idAddress =  results.length > 1 ?  null : results[0].id_address;
      console.log(idAddress);
      

      pool.query(
        `SELECT * 
         FROM matches 
         LEFT JOIN addresses ON addresses.id_address = matches.address_match 
         WHERE (addresses.id_address = ? OR ? IS NULL)
         AND (matches.name LIKE ? OR ? IS NULL);`,
        [idAddress, idAddress, "%" + name + "%", name],
        (err, results) => {
          if (err) {
            return res.status(500).send("Erro ao executar a consulta.");
          }
      
          console.log(results);
          return res.json(results);
        }
      );
    }
  );
});


// asd
// teste para puxar o endereço da partida

// router.post("/address", (req, res) => {
//   const { id } = req.body; // Desestrutura para obter o id
//   pool.query(
//     `SELECT street FROM addresses WHERE id_address = ?;`, [id],  // Passa o id para a consulta
//     (err, results) => {
//       if (err) {
//         return res.status(500).send("Erro ao executar a consulta.");
//       }

//       // Se resultados forem encontrados, retornar o primeiro item, se não, retornar um erro 404
//       if (results.length > 0) {
//         return res.json(results[0]);
//       } else {
//         return res.status(404).send("Endereço não encontrado.");
//       }
//     }
//   );
// });
// asd

module.exports = router;

// // `SELECT m.name AS search, a.city AS city FROM matches m
// INNER JOIN address a ON m.address_match = a.id_address
// WHERE search LIKE ? AND city = ?;
// `,
