const express = require("express");
const pool = require("../dist/connect");
const jwt = require("jsonwebtoken");
const getHash = require("../scripts/getHash");
const router = express.Router();
const SECRET = "sportche";

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  pool.query(
    "SELECT * FROM users WHERE email = ? AND password = ?",
    [email, password],
    async (error, results) => {
      if (error) {
        console.error("Error executing query: ", error);
        return res.status(500).json({ message: "Erro no servidor" });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      const user = results[0];
      const token = jwt.sign(
        { userId: user.id_user, name: user.username },
        SECRET,
        { expiresIn: 300 }
      );

      return res.status(201).json({
        message: "Login realizado com sucesso",
        auth: true,
        token: token,
      });
    }
  );
});

module.exports = router;
