const express = require("express");
const pool = require("../dist/connect"); 
const getHash = require('../scripts/getHash')
const router = express.Router();

// router.post("/", async (req, res) => {
//     const { username, email, password } = req.body;

//     if (!username || !email || !password) {
//       return res.status(400).json({message: 'Missing required fields: username, email, and senha.'});
//     }

//     pool.query(
//       "INSERT INTO users(username, email, password) VALUES (?, ?, ?)",
//       [username, email, await getHash(password)],
//       async (error, results) => {
//         if (error) {
//           console.error("Error executing insert query: ", error);
//           return res.status(500).json({message: 'Erro ao adicionar usuário.'});
//         }

//         pool.query("SELECT id_user FROM users WHERE email = ? AND password = ?", [email, await getHash(password)], (err, results) => {
//           const token = jwt.sign(
//           { userId: results[0].id_user, name: user.username },
//           SECRET,
//           { expiresIn: 300 }
//         );
  
//         return res.status(201).json({
//           message: "Login realizado com sucesso",
//           auth: true,
//           token: token,
//         });
//         })

        
//       }
//     );
// });

// module.exports = router
