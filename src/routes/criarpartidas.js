// Importação das bibliotecas necessárias
const express = require("express");
const pool = require("../dist/connect");
const router = express.Router();


// 
router.post("/", async (req, res) => {
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

module.exports = router;
