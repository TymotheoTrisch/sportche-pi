const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors')
const jwt = require('jsonwebtoken')
const SECRET = 'Sportche';
const server = express();

function verifyJWT(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.redirect("../../index.html");
  }

  const token = authHeader.split(' ')[1];


  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      return res.redirect("../../index.html");
    }

    req.userId = decoded.userId;
    req.username = decoded.username;

    next();
  });
}




const loginRoutes = require("./src/routes/login");
const criarPartidas = require("./src/routes/criarpartidas")
const signInRoutes = require("./src/routes/signIn")
const search = require("./src/routes/search")
const perfil = require("./src/routes/perfil")

server.use(express.json());
server.use(bodyParser.json());
server.use(cors());

server.listen(3000, () => {
  console.log("Server is running.");
});

server.use("/login", loginRoutes);
server.use("/criarpartidas", verifyJWT, criarPartidas);
server.use("/register", signInRoutes);
server.use("/search", verifyJWT, search)
server.use("/profile", verifyJWT, perfil)

server.post('/verifyToken', verifyJWT, (req, res) => {
  res.status(200).json({ message: 'Token válido', userId: req.userId, username: req.username });
});