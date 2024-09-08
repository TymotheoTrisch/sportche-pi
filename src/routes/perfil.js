// Importação das bibliotecas necessárias
const express = require("express");
const pool = require("../dist/connect");
const router = express.Router();

// Rota GET para a busca dos dados do usuário (Nome, email e data da criação da conta)
router.get("/", (req, res) => {
    pool.query(
        `SELECT * FROM users WHERE id_user = ? AND username = ?;`,
        [req.userId, req.username],
        (err, results) => {
            if (err) {
                return res.status(500).send("Erro ao executar a consulta.");
            }

            // Se caso não encontrar nenhum usuário ele retorna um erro.
            if (results.length === 0) {
                return res.status(404).send("Usuário não encontrado.");
            }

            // Retorna os dados
            return res.status(201).json(results);
        }
    );
});

// Rota GET para a buscar as partidas que o usuário criou
router.get("/my-matches", (req, res) => {
    pool.query(
        `SELECT matches.*, addresses.* 
     FROM matches LEFT JOIN addresses ON matches.address_match = addresses.id_address
     WHERE matches.created_by = ?;`,
        [req.userId],
        (err, results) => {
            if (err) return res.status(404).json("Erro ao executar a consulta");

            // Se caso o usuário não criou nenhuma partida, retorna uma mensagem de erro
            if (results.length === 0) {
                return res.status(400).json("Você não criou nenhuma partida.");
            }

            // Retorna os dados das partidas
            return res.status(201).json(results);
        }
    );
});

// Rota GET para buscar as partidas que o usuário está cadastrado
router.get("/joined-matches", (req, res) => {
    pool.query(
        `SELECT game_id FROM game_players WHERE user_id = ?`,
        [req.userId],
        (err, results) => {
            if (err) return res.status(404).json(err);
            
            // Se caso o usuário não estiver cadastrado em nenhuma partida
            // Retorna uma mensagem de erro
            if (results.length === 0) {
                return res.status(400).json("Você não está cadastrado em nenhuma partida.");
            }

            // Esse map extrai o id de cada partida
            // Assim criando um array contendo todos os ids das partidas onde o usuário está cadastrado
            const matchIds = results.map((row) => row.game_id);

            // Executa a query para buscar os dados da partida
            pool.query(
                `SELECT matches.*, addresses.* FROM matches
         LEFT JOIN addresses ON matches.address_match = addresses.id_address
         WHERE id_match IN (?)`,
                [matchIds],
                (err, matches) => {
                    if (err) return res.status(404).json(err);

                    // Retorna as partidas
                    return res.json(matches);
                }
            );
        }
    );
});

// Rota DELETE para deletar a partida
router.delete('/match/:id', (req, res) => {
    const id = parseInt(req.params.id);

    // Exclui os jogadores associados à partida
    pool.query(`DELETE FROM game_players WHERE game_id = ?`, [id], (err, results) => {
        if (err) return res.status(400).json("Não foi possível excluir os jogadores da partida.");

        // Buscar a partida para obter o address_match antes de excluir
        pool.query(`SELECT address_match FROM matches WHERE id_match = ?`, [id], (err, matchResults) => {
            if (err) return res.status(401).json("Erro ao buscar a partida.");
            
            // Se caso não existir a partida, retorna uma mensagem de erro
            if (matchResults.length === 0) {
                return res.status(404).json("Nenhuma partida encontrada.");
            }
            
            // Extrai o id do endereço
            const idAddress = matchResults[0].address_match;

            // Exclui a partida
            pool.query(`DELETE FROM matches WHERE id_match = ?`, [id], (err, results) => {
                if (err) return res.status(402).json("Não foi possível excluir a partida.");

                // Exclui o endereço associado à partida
                pool.query(`DELETE FROM addresses WHERE id_address = ?`, [idAddress], (err, resultsAddress) => {
                    if (err) return res.status(403).json("Não foi possível excluir o endereço cadastrado na partida.");

                    // Após tudo, retorna uma mensagem de sucesso
                    return res.status(201).json("Operações realizadas com sucesso.");
                });
            });
        });
    });
});

// Rota DELETE para excluir o registro do usuário em uma determinada partida
router.delete('/participant/:id', (req, res) => {
    // Busca o id do usuário, id da partida e a quantidade de jogadores registrados na partida
    const idUser = req.userId;
    const idMatch = req.params.id
    const { playersRegistered } = req.body;

    // Exclui o usuário no cadastro dos jogadores da partida
    pool.query(`DELETE FROM game_players WHERE user_id = ?`, [idUser], (err, results) => {
        if (err) return res.status(400).json("Não foi possível excluir a partida.");

        // Se caso não ocorrer nenhum DELETE retorna uma mensagem de erro
        if (results.affectedRows === 0) {
            return res.status(401).json("Nenhuma partida encontrada.");
        }

        // Atualiza a quantidade de jogadores na partida, (reduzindo 1)
        pool.query(`UPDATE matches SET players_registered = ?
                WHERE id_match = ?;`, [playersRegistered - 1, idMatch], (err, resultsUpdate) => {
                if (err) return res.status(400).json("Não foi possível dar UPDATE.");

                // Retorna uma mensagem de sucesso
                return res.status(201).json("Operações realizadas com sucesso.");
            });
    });
});

module.exports = router;
