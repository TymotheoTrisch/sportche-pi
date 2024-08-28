const express = require("express");
const pool = require("../dist/connect");
const router = express.Router();



router.post("/", async (req, res) => {
    //Problema na verificação
    const { street, city, state, name, description, id_sport, date_match, start_match, end_of_match, total_players_needed, players_registered, contact_phone } = req.body;
    const created_by = req.userId
        
    
    if(!street || !city || !state || !name || !description || !id_sport || !date_match || !start_match || !end_of_match || !total_players_needed || !contact_phone || !created_by) {
        return res.status(400).json({ message: 'Missing required fields: street, city, state, name, id_sport, date_match, start_match, end_of_match, total_players_needed, players_registered, contact_phone, created_by.' });
    }

    try {
        pool.query(
            "INSERT INTO addresses(street, city, state) VALUES (?, ?, ?)",
            [street, city, state],
            (error, addressResult) => {
                if (error) {
                    console.error("Error executing insert query: ", error);
                    return res.status(500).json({ message: 'Erro ao adicionar endereço.' });
                }

                const addressId = addressResult.insertId;
                
                pool.query(
                    "INSERT INTO matches(name, description, address_match, id_sport, date_match, start_match, end_of_match, total_players_needed, players_registered, created_by, contact_phone) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                    [name, description, addressId, id_sport, date_match, start_match, end_of_match, total_players_needed, players_registered, created_by, contact_phone],
                    (error, matchResult) => {
                        if (error) {
                            console.error("Error executing insert query: ", error);
                            return res.status(500).json({ message: 'Erro ao adicionar partida.' });
                        }

                        res.status(201).json({ message: 'Partida e endereço adicionados com sucesso.' });
                    }
                );
            }
        );
    } catch (error) {
        console.error("Unexpected error: ", error);
        res.status(500).json({ message: 'Erro inesperado ao adicionar partida e endereço.' });
    }
});


router.put("/:id", (req, res) => {
    const idMatch = parseInt(req.params.id);
    const updateMatch = req.body;
    
    pool.query(
        "UPDATE matches SET name = ?, description = ?, address_match = ?, id_sport = ?, date_match = ?, time_match = ?, total_players = ?, players_registered = ?, created_by = ?) VALUES (?, ?, ?)",
        [updateMatch.name, updateMatch.description, updateMatch.addressId, updateMatch.id_sport, updateMatch.date_match, updateMatch.time_match, updateMatch.total_players, updateMatch.players_registered, updateMatch.created_by],
        (error, res) => {
            if (error) {
                console.error("Error executing insert query: ", error);
                return res.status(500).json({ message: 'Erro ao adicionar partida.' });
            }
            res.status(201).json({ message: 'Partida adicionada com sucesso.' });
        }
    );

    return res.json({ message: "Update sucessfully." });
});

router.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    data.Images = data.Images.filter((i) => i.id !== id);
    saveData(data);
    return res.status(200).json({ message: "Image deleted." });
});

module.exports = router;
