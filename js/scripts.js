/* global $ */
/* global document */
/* global fetch */
/* global console */
const pokemonRepository = (function () {
  const pokemonList = [];
  const apiUrl = "https://pokeapi.co/api/v2/pokemon/";

  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    pokemonList.push(pokemon);
  }
  

  function showModal(pokemon) {
    const modalBody = $(".modal-body");
    const modalTitle = $(".modal-title");
    const modalHeader = $(".modal-header");

    modalTitle.empty();
    modalHeader.empty();
    modalBody.empty();

    const nameElement = $("<h1>" + pokemon.name + "</h1>");
    const imageElementFront = $('<img class="modal-img" style="width:50%">').attr(
      "src",
      pokemon.image
    );
    const imageElementBack = $('<img class="modal-img" style="width:50%">');
    imageElementBack.attr("src", pokemon.imageUrlBack);
    const heightElement = $("<p>" + "height: " + pokemon.height + "</p>");
    const weightElement = $("<p>" + "weight: " + pokemon.weight + "</p>");
    const typesElement = $("<p>" + "types: " + pokemon.types + "</p>");
    const abilitiesElement = $(
      "<p>" + "abilities: " + pokemon.abilities + "</p>"
    );

    modalHeader.append(nameElement);
    modalBody.append(imageElementFront);
    modalBody.append(imageElementBack);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
    modalBody.append(abilitiesElement);
  }

  function addListItem(pokemon) {
    const ul = document.querySelector(".ul");
    const liUl = document.createElement("li");
    liUl.classList.add("list-group-item");
    const button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("pokemon-button");
    button.classList.add("btn");
    button.addEventListener("click", () => {
      loadDetails(pokemon).then(() => {
        showModal(pokemon);
      });
    });
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#exampleModal");
    liUl.appendChild(button);
    ul.appendChild(liUl);
  }

  const loading = document.createElement("h1");
  loading.innerText = "loading...";
  loading.classList.add("loading-message");

  function showLoadingMessage() {
    document.body.appendChild(loading);
  }

  function hideLoadingMessage() {
    if (document.body.contains(loading)) {
      document.body.removeChild(loading);
    }
  }

  function loadList() {
    pokemonRepository.showLoadingMessage();
    return fetch(apiUrl)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        json.results.forEach(function (item) {
          // go in the results, and for each item (object) create a pokemon with the name and the url.
          const pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          pokemonRepository.add(pokemon); // 20 item objects are added to pokemonList.
        });
      })
      .catch(function (e) {
        console.error(e);
      })
      .finally(() => {
        hideLoadingMessage();
      });
  }

  function loadDetails(item) {
    pokemonRepository.showLoadingMessage();
    const url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        item.image = details.sprites.front_default;
        item.imageUrlBack = details.sprites.back_default;
        item.height = details.height;
        item.weight = details.weight;
        item.types = details.types.map((type) => type.type.name).join(', ');
        item.abilities = details.abilities
          .map((ability) => ability.ability.name)
          .join(", ");
      })
    

      .catch(function (e) {
        console.error(e);
      })
      .finally(() => {
        hideLoadingMessage();
      });
  }

  function pokePokemon() {
    const input = document.getElementById('pokemon-input').value;
    const x = document.getElementsByClassName('list-group-item');

    for (let i = 0; i < x.length; i++) {
      if (!x[i].innerHTML.includes(input)) {
        x[i].style.display = "none";
      }
      else {
        x[i].style.display = "list-item";
      }
    }
  }



  

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showLoadingMessage: showLoadingMessage,
    hideLoadingMessage: hideLoadingMessage,
    showModal: showModal,
    pokePokemon: pokePokemon
  };
})(); 

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
