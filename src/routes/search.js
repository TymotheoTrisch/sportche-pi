const express = require("express");
const pool = require("../dist/connect");
const router = express.Router();

// Get padrão buscando todas as partidas
router.get("/", (req, res) => {
    pool.query(`SELECT matches.*, addresses.* FROM matches 
               LEFT JOIN addresses ON matches.address_match = addresses.id_address `, (err, results) => {
        if (err) {
            console.log(results);
            return res.status(500).send("Erro ao executar a consulta.");
        }

        return res.status(200).json(results);
    });
});

// Usado para fazer a busca para obter todas as informações da partida.
// Usado quando o usuário clica em saber mais
router.post("/id", (req, res) => {
    pool.query(`SELECT matches.*, addresses.*, sports.name AS sport_name
               FROM matches 
               LEFT JOIN addresses ON matches.address_match = addresses.id_address 
               LEFT JOIN sports ON matches.id_sport = sports.id_sport 
               WHERE matches.id_match = ?`,
        [req.body.idMatch], (err, results) => {
            if (err) {
                return res.status(500).send("Erro ao executar a consulta.");
            }
            return res.status(200).json(results);
        });
});

// Get para buscar as partidas por CIDADE
router.post("/", async (req, res) => {
    const city = req.body.city;

    try {
        const [results] = await pool.promise().query(
            `SELECT id_address 
             FROM addresses 
             WHERE city = ?`,
            [city]
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
                 WHERE addresses.id_address = ?;`,
                [addressMatch]
            );
        });

        const resultsSelectArray = await Promise.all(queries);
        const resultsSelect = resultsSelectArray.flatMap(result => result[0]);

        return res.status(200).json(resultsSelect);

    } catch (err) {
        return res.status(500).send("Erro ao executar a consulta.");
    }
});


// POST usado para buscar todas as partidas por NOME e CIDADE
router.post("/name-city", async (req, res) => {
    const city = req.body.city;
    const name = req.body.name;

    try {
        // Consulta para buscar o(s) ID(s) de endereço baseado na cidade
        const [addressResults] = await pool.promise().query(
            `SELECT id_address 
             FROM addresses 
             WHERE city LIKE ?`,
            [`%${city}%`]
        );
        

        if (addressResults.length === 0) {
            // Se não encontrar a cidade, buscar pelo nome da partida
            const [nameResults] = await pool.promise().query(
                `SELECT matches.*, addresses.* 
                 FROM matches 
                 LEFT JOIN addresses ON addresses.id_address = matches.address_match  
                 WHERE name LIKE ?;`,
                [`%${name}%`]
            );  

            return res.status(201).json(nameResults);
        }

        // Se encontrar a cidade, buscar as partidas associadas aos endereços encontrados
        const idAddress = addressResults.map(address => address.id_address);

        const queries = idAddress.map(id => {
            return pool.promise().query(
                `SELECT * 
                 FROM matches 
                 LEFT JOIN addresses ON addresses.id_address = matches.address_match 
                 WHERE addresses.id_address = ?`,
                [id]
            );
        });

        const resultsSelectArray = await Promise.all(queries);
        const resultsSelect = resultsSelectArray.flatMap(result => result[0]);

        return res.status(200).json(resultsSelect);

    } catch (err) {
        return res.status(500).send(`Erro ao executar a consulta: ${err.message}`);
    }
});


// Post e update quando o usuário vai participar de uma partida
router.post("/join", (req, res) => {
    pool.query(`SELECT * FROM matches WHERE created_by = ? AND id_match = ?;`, [req.userId, req.body.idMatch], (err, resultsCreatedBy) => {

        if (resultsCreatedBy.length > 0) {
            return res.status(403).json("O usuário é o criador dessa partida.")
        }

        pool.query(`SELECT * FROM game_players 
            INNER JOIN matches ON game_players.game_id = matches.id_match
            WHERE user_id = ? AND matches.id_match = ?;`,
            [req.userId, req.body.idMatch], (err, resultsSelect) => {
                if (resultsSelect.length > 0) {
                    return res.status(401).json("Usuario já cadastrado nessa partida")
                }

                pool.query(`UPDATE matches SET players_registered = ?
                WHERE id_match = ?;`,
                
                    [req.body.playersRegistered + 1, req.body.idMatch], (err, results) => {
                        if (err) return res.status(400).json("Não foi possível dar UPDATE.");

                        pool.query(`INSERT INTO game_players (user_id, game_id) 
                       VALUES(?, ?)`, [req.userId, req.body.idMatch], (err, results) => {
                            if (err) return res.status(400).json("Não foi possível adicionar os dados na tabela.");

                            return res.status(201).json("Operações realizadas com sucesso.");
                        });
                    });
            });

    })
});



module.exports = router;
