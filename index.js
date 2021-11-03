const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/index", (req, res) => {
  res.render("index", { title: "Pokédex" });
});

app.listen(port, () =>
  console.log(`Servidor rodando em http://localhost:${port}`)
);
