const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors')
const jwt = require('jsonwebtoken')
const SECRET = 'Sportche';
const server = express();

function verifyJWT(req, res, next) {
  const authHeader = req.headers['authorization']; 

  if (!authHeader) {
      return res.status(401).json({ message: 'Token não fornecido', token: authHeader });
  }

  const token = authHeader.split(' ')[1]; 


  jwt.verify(token, SECRET, (err, decoded) => {
      if (err) {
          // window.location.href = './criarpartidas.html';
          return res.status(403).json({ message: 'Token inválido', token: token });
      }

      req.userId = decoded.userId; 
      req.name = decoded.name;
      
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

server.use("/login", verifyJWT, loginRoutes); 
server.use("/criarpartidas", verifyJWT, criarPartidas);
server.use("/register", signInRoutes);
server.use("/search", verifyJWT, search)
server.use("/profile", verifyJWT, perfil)