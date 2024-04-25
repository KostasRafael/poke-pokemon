let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/";

  let modalContainer = document.querySelector("#exampleModal");

  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function showModal(pokemon, height) {
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");
    let modalHeader = $(".modal-header");

    modalTitle.empty();
    modalHeader.empty();
    modalBody.empty();

    let nameElement = $("<h1>" + pokemon.name + "</h1>");
    let imageElementFront = $('<img class="modal-img" style="width:50%">').attr(
      "src",
      pokemon.image
    );
    let imageElementBack = $('<img class="modal-img" style="width:50%">');
    imageElementBack.attr("src", pokemon.imageUrlBack);
    let heightElement = $("<p>" + "height: " + pokemon.height + "</p>");
    let weightElement = $("<p>" + "weight: " + pokemon.weight + "</p>");
    let abilitiesElement = $(
      "<p>" + "abilities: " + pokemon.abilities + "</p>"
    );

    modalHeader.append(nameElement);
    modalBody.append(imageElementFront);
    modalBody.append(imageElementBack);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(abilitiesElement);
  }

  function addListItem(pokemon) {
    let ul = document.querySelector(".ul");
    let liUl = document.createElement("li");
    liUl.classList.add("list-group-item");
    let button = document.createElement("button");
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

  

  let loading = document.createElement("h1");
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
          let pokemon = {
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
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        item.image = details.sprites.front_default; 
        item.height = details.height; 
        item.weight = details.weight;
        item.abilities = details.abilities;
      })

      .catch(function (e) {
        console.error(e);
      })
      .finally(() => {
        hideLoadingMessage();
      });
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
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon); 
  });
});
