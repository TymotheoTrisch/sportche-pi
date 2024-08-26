const express = require("express");
const pool = require("../dist/connect");
const router = express.Router();

router.get("/", (req, res) => {
    pool.query(`SELECT * FROM matches`, (err, results) => {
        return res.status(201).json(results)
    })
})

router.post("/", (req, res) => {
    const city = req.body.city || null;
    const name = req.body.name || null;
    
    // console.log(req.userId)

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
      
            const idAddress = results.length > 1 ? null : results[0].id_address;

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

                    return res.json(results);
                }
            );
        }
    );
});

module.exports = router;
