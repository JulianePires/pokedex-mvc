const closeMessage = document.querySelector("#close");
const message = document.querySelector("#message");
const pokemonSearchInput = document.querySelector("#search");
const pokemonSearchFilter = document.querySelector("#order-filter");
const searchSubmitButton = document.querySelector("#search-submit-button");
const photoInput = document.querySelector("#photo");
const pokemonImage = document.getElementById("#pokemon-image");

let pokemonPhoto = "";

let selectedFilter = {
  name: "",
  order: "cresc",
};

pokemonSearchFilter.addEventListener(
  "change",
  () => (selectedFilter.order = pokemonSearchFilter.value)
);

pokemonSearchInput.addEventListener(
  "change",
  () => (selectedFilter.name = pokemonSearchInput.value)
);

closeMessage.addEventListener("click", function () {
  message.style.display = "none";
});

setTimeout(() => {
  message.style.display = "none";
}, 5000);
