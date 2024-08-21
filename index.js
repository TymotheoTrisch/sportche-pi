const express = require("express");
const bodyParser = require("body-parser");
const loginRoutes = require("./src/routes/login");
const criarPartidas = require("./src/routes/criarpartidas")
const search = require("./src/routes/search")
const cors = require('cors')

const server = express();

server.use(express.json());
server.use(bodyParser.json());
server.use(cors());

server.listen(3000, () => {
  console.log("Server is running.");
});

server.use("/", loginRoutes); 
server.use("/criarpartidas", criarPartidas)
// server.use("/search", search)