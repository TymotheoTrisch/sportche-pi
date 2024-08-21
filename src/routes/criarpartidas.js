const express = require("express");
const pool = require("../dist/connect");
const getHash = require('../scripts/getHash')
const router = express.Router();

router.post("/", async (req, res) => {
    const { street, city, state, name, description, id_sport, date_match, time_match, total_player, players_needed, contact_phone, created_by } = req.body;

    if (!street || !city || !state || !name || !id_sport || !date_match || !time_match || !total_player || !players_needed || !contact_phone || !created_by) {
        return res.status(400).json({ message: 'Missing required fields: username, email, and senha.' });
    }

    pool.query(
        "INSERT INTO addresses(street, city, state) VALUES (?, ?, ?)",
        [street, city, state],
        (error, res) => {
            if (error) {
                console.error("Error executing insert query: ", error);
                return res.status(500).json({ message: 'Erro ao adicionar endereço.' });
            }

            const addressId = res.insertId;
            pool.query(
                "INSERT INTO matches(name, description, address_match, id_sport, date_match, time_match, total_player, players_needed, created_by) VALUES (?, ?, ?)",
                [name, description, addressId, id_sport, date_match, time_match, total_player, players_needed, created_by],
                (error, res) => {
                    if (error) {
                        console.error("Error executing insert query: ", error);
                        return res.status(500).json({ message: 'Erro ao adicionar partida.' });
                    }
                    res.status(201).json({ message: 'Partida adicionada com sucesso.' });
                }
            );

            res.status(201).json({ message: 'Partida e enndereço adicionados com sucesso.' });
        }
    );


});

router.put("/:id", (req, res) => {
    const imageID = parseInt(req.params.id);
    const update = req.body;
    const index = data.Images.findIndex((i) => i.id === imageID);

    if (index == -1) {
        return res.status(404).json({ message: "Image not founded." });
    }

    return res.json({ message: "Update sucessfully." });
});

router.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    data.Images = data.Images.filter((i) => i.id !== id);
    saveData(data);
    return res.status(200).json({ message: "Image deleted." });
});

module.exports = router;
