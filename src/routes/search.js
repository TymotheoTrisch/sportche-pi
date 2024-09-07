const express = require("express");
const pool = require("../dist/connect");
const router = express.Router();

// Get padrão buscando todas as partidas
router.get("/", (req, res) => {
    pool.query(`SELECT matches.*, addresses.* FROM matches 
               LEFT JOIN addresses ON matches.address_match = addresses.id_address 
               WHERE matches.total_players_needed - matches.players_registered  >  0`, (err, results) => {
        if (err) {
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
               WHERE matches.id_match = ? 
               AND matches.total_players_needed - matches.players_registered  >  0`,
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
                 WHERE addresses.id_address = ? 
                 AND matches.total_players_needed - matches.players_registered  >  0;`,
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
        // Consulta para buscar os IDs de endereço baseado na cidade atual
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
                 WHERE name LIKE ?
                 AND matches.total_players_needed - matches.players_registered  >  0;`,
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
                 WHERE addresses.id_address = ?
                 AND matches.total_players_needed - matches.players_registered  >  0`,
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
            WHERE user_id = ? AND matches.id_match = ?
            AND matches.total_players_needed - matches.players_registered  >  0;`,
            [req.userId, req.body.idMatch], (err, resultsSelect) => {
                if (err) return res.status(400).json("Ocorreu um erro ao verificar a partida.")
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

router.delete('/match/:id', (req, res) => {
    const id = parseInt(req.params.id);


    pool.query(`DELETE FROM game_players WHERE game_id = ?`, id, (err, results) => {
        if (err) return res.status(400).json("Não foi possível excluir a partida.");

        if (results.length === 0) {
            return res.status(401).json("Nenhuma partida encontrada.");
        }

        pool.query(`DELETE FROM matches WHERE id_match = ?`, id, (err, resultsParticipants) => {
            if (err) return res.status(402).json("Não foi possível excluir os jogadores cadastrados na partida.")

            return res.status(201).json("Operações realizadas com sucesso.");

        })

    });
});


router.delete('/participant/:id', (req, res) => {
    const idUser = req.userId;
    const idMatch = req.params.id
    const { playersRegistered } = req.body;

    pool.query(`DELETE FROM game_players WHERE user_id = ?`, [idUser], (err, results) => {
        if (err) return res.status(400).json("Não foi possível excluir a partida.");

        if (results.affectedRows === 0) {
            return res.status(401).json("Nenhuma partida encontrada.");
        }

        pool.query(`UPDATE matches SET players_registered = ?
                WHERE id_match = ?;`, [playersRegistered - 1, idMatch], (err, resultsUpdate) => {
                if (err) return res.status(400).json("Não foi possível dar UPDATE.");

                return res.status(201).json("Operações realizadas com sucesso.");
            });
    });
});

module.exports = router;
