const express = require("express");
const bodyParser = require("body-parser");
const loginRoutes = require("./routes/login");
const cors = require('cors')

const server = express();

server.use(express.json());
server.use(bodyParser.json());
server.use(cors());

server.listen(3000, () => {
  console.log("Server is running.");
});

server.use("/login", loginRoutes); 
