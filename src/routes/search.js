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

        // Retorna os dados da partida
        return res.status(200).json(results);
    });
});

// Rota POST para fazer a busca e obter todas as informações da partida
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

            // Retorna os dados da partida
            return res.status(200).json(results);
        });
});

// Rota POST para buscar as partidas por CIDADE
router.post("/", (req, res) => {
    const city = req.body.city;

    // Primeiro, busca os IDs dos endereços associados à cidade
    pool.query(
        `SELECT id_address 
         FROM addresses 
         WHERE city = ?`,
        [city],
        (err, results) => {
            if (err) return res.status(500).json("Erro ao executar a consulta.");

            // Se caso não encontrar nenhum endereço retorna uma mensagem de erro
            if (results.length === 0) {
                return res.status(404).json("Endereço não encontrado.");
            }

            // Extrai os IDs dos endereços das partidas
            const idAddress = results.map(address => address.id_address);

            // Em seguida, busca as partidas associadas aos endereços encontrados
            pool.query(
                `SELECT * 
                 FROM matches 
                 LEFT JOIN addresses ON addresses.id_address = matches.address_match 
                 WHERE addresses.id_address IN (?) 
                 AND matches.total_players_needed - matches.players_registered > 0;`,
                [idAddress],
                (err, resultsSelect) => {
                    if (err) return res.status(500).json("Erro ao buscar as partidas.");

                    // Retorna os dados das partidas
                    return res.status(200).json(resultsSelect);
                }
            );
        }
    );
});



// Rota POST para buscar todas as partidas por NOME e CIDADE
router.post("/name-city", (req, res) => {
    const city = req.body.city;
    const name = req.body.name;

    // Consulta para buscar os IDs de endereço baseado na cidade atual
    pool.query(
        `SELECT id_address 
         FROM addresses 
         WHERE city LIKE ?`,
        [`%${city}%`],
        (err, addressResults) => {
            if (err) {
                return res.status(500).json({ message: "Erro ao executar a consulta", error: err });
            }

            // Se não encontrar a cidade, buscar pelo nome da partida
            if (addressResults.length === 0) {
                return pool.query(
                    `SELECT matches.*, addresses.* 
                     FROM matches 
                     LEFT JOIN addresses ON addresses.id_address = matches.address_match  
                     WHERE matches.name LIKE ?
                     AND matches.total_players_needed - matches.players_registered > 0`,
                    [`%${name}%`],
                    (err, nameResults) => {
                        if (err) {
                            return res.status(500).json({ message: "Erro ao executar a consulta", error: err });
                        }

                        return res.status(200).json(nameResults);
                    }
                );
            }

            // Se encontrar a cidade, buscar as partidas associadas aos endereços encontrados
            const idAddress = addressResults.map(row => row.id_address);

            pool.query(
                `SELECT matches.*, addresses.* 
                 FROM matches 
                 LEFT JOIN addresses ON addresses.id_address = matches.address_match 
                 WHERE addresses.id_address IN (?)
                 AND matches.total_players_needed - matches.players_registered > 0`,
                [idAddress],
                (err, matchResults) => {
                    if (err) {
                        return res.status(500).json({ message: "Erro ao executar a consulta", error: err });
                    }

                    // Retorna os dados das partidas
                    return res.status(200).json(matchResults);
                }
            );
        }
    );
});




// Rota POST  para quando o usuário for participar de uma partida
router.post("/join", (req, res) => {
    pool.query(`SELECT * FROM matches WHERE created_by = ? AND id_match = ?;`, [req.userId, req.body.idMatch], (err, resultsCreatedBy) => {

        // Se caso o usuário for dono da partida ele retorna um erro
        if (resultsCreatedBy.length > 0) {
            return res.status(403).json("O usuário é o criador dessa partida.")
        }

        // Faz um SELECT verificando se o usuário ja não está registrado nessa partida
        pool.query(`SELECT * FROM game_players 
            INNER JOIN matches ON game_players.game_id = matches.id_match
            WHERE user_id = ? AND matches.id_match = ?
            AND matches.total_players_needed - matches.players_registered  >  0;`,
            [req.userId, req.body.idMatch], (err, resultsSelect) => {
                if (err) return res.status(400).json("Ocorreu um erro ao verificar a partida.")

                // Se caso estiver já cadastrado ele retorna uma mensagem de erro
                if (resultsSelect.length > 0) {
                    return res.status(401).json("Usuario já cadastrado nessa partida")
                }

                // Atualiza a tabela, adicionando o usuário à partida, aumentando o numero de jogadores
                pool.query(`UPDATE matches SET players_registered = ?
                WHERE id_match = ?;`,

                    [req.body.playersRegistered + 1, req.body.idMatch], (err, results) => {
                        if (err) return res.status(400).json("Não foi possível dar UPDATE.");

                        // Por ultimo insere o usuário à partida
                        pool.query(`INSERT INTO game_players (user_id, game_id) 
                       VALUES(?, ?)`, [req.userId, req.body.idMatch], (err, results) => {
                            if (err) return res.status(400).json("Não foi possível adicionar os dados na tabela.");

                            // Retorna uma mensagem de sucesso
                            return res.status(201).json("Operações realizadas com sucesso.");
                        });
                    });
            });

    })
});

module.exports = router;
