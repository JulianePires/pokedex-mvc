const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());

const types = [
  "bug",
  "dark",
  "dragon",
  "electric",
  "fairy",
  "fighting",
  "fire",
  "flying",
  "ghost",
  "grass",
  "ground",
  "ice",
  "normal",
  "poison",
  "psychic",
  "rock",
  "steel",
  "water",
];

const pokemons = [
  {
    name: "Pikachu",
    image: "/images/pikachu.png",
    tags: ["electric"],
  },
  {
    name: "Charmander",
    image: "/images/charmander.png",
    tags: ["fire"],
  },
];

const filters = [
  {
    type: "cresc",
    name: "Ordem alfabética crescente",
  },
  {
    type: "decresc",
    name: "Ordem alfabética decrescente",
  },
];

let selectedFilter = {
  name: "",
  order: "cresc",
};

app.get("/", (req, res) => {
  const ordered = pokemons
    .filter((pok) => pok.name.toLowerCase().includes(selectedFilter.name))
    .sort((a, b) => (selectedFilter.order === "cresc" ? a < b : a > b));

  setTimeout(() => {
    selectedFilter = {
      name: "",
      order: "cresc",
    };
  }, 1000);

  res.render("index", { title: "Pokédex", filters, pokemons: ordered });
});

app.post("/search", (req, res) => {
  const { name, order } = req.body;
  selectedFilter = { name, order };
});

app.get("/create", (req, res) => {
  res.render("create", { types });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.listen(port, () =>
  console.log(`Servidor rodando em http://localhost:${port}`)
);
