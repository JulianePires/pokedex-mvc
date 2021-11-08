const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());

let message = "";

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

let pokemons = [
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

  res.render("index", {
    title: "Pokédex",
    filters,
    pokemons: ordered,
    selectedFilter,
    message,
  });

  setTimeout(() => {
    selectedFilter = {
      name: "",
      order: "cresc",
    };
    message = "";
  }, 1000);
});

app.post("/search", (req, res) => {
  const { name, order } = req.body;
  selectedFilter = { name, order };
  res.redirect("/");
});

app.get("/create", (req, res) => {
  res.render("create", { types });
});

//TODO --> Salvamento de arquivos não está funcionando

app.post("/new", (req, res) => {
  const {
    number,
    name,
    photo,
    type,
    description,
    height,
    weight,
    category,
    ability,
  } = req.body;

  console.log(type);

  pokemons.push({
    number: number,
    name: name,
    image: photo,
    tags: type,
    description: description,
    height: height,
    weight: weight,
    category: category,
    ability: ability,
  });

  message = `Seu pokemon ${name}, foi adicionado com sucesso!`;
  res.redirect("/");
});

app.listen(port, () =>
  console.log(`Servidor rodando em http://localhost:${port}`)
);
