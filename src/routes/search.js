const express = require("express");
const pool = require("../dist/connect");
const router = express.Router();

router.get("/", (req, res) => {
    pool.query(`SELECT * FROM matches`, (err, results) => {
        if (err) {
            return res.status(500).send("Erro ao executar a consulta.");
        }
        return res.status(200).json(results);
    });
});

router.post("/id", (req, res) => {
    pool.query(`SELECT * FROM matches WHERE id_match = ?`, [req.body.idMatch], (err, results) => {
        if (err) {
            return res.status(500).send("Erro ao executar a consulta.");
        }
        return res.status(200).json(results);
    });
});

router.post("/", async (req, res) => {
    const city = req.body.city || null;
    const name = req.body.name || null;

    try {
        const [results] = await pool.promise().query(
            `SELECT id_address FROM addresses WHERE city = ? OR ? IS NULL`,
            [city, city]
        );

        if (results.length === 0) {
            return res.status(404).send("Endereço não encontrado.");
        }

        const idAddress = results.length > 1 
            ? results.map(address => address.id_address) 
            : [results[0].id_address];

        const queries = idAddress.map(addressMatch => {
            return pool.promise().query(
                `SELECT * 
                 FROM matches 
                 LEFT JOIN addresses ON addresses.id_address = matches.address_match 
                 WHERE (addresses.id_address = ? OR ? IS NULL)
                 AND (matches.name LIKE ? OR ? IS NULL);`,
                [addressMatch, addressMatch, "%" + name + "%", name]
            );
        });

        const resultsSelectArray = await Promise.all(queries);
        const resultsSelect = resultsSelectArray.flatMap(result => result[0]);

        return res.status(200).json(resultsSelect);

    } catch (err) {
        return res.status(500).send("Erro ao executar a consulta.");
    }
});

module.exports = router;
