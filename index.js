const http = require("http");
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.static("public"));

const server = http.createServer(app);

server.listen(PORT, () => {
  console.info(`Server running on port ${PORT}`);
});
