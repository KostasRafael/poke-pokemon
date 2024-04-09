// pokemonRepository variable that holds the IIFE
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/"; // The URL of the external API

  // returns the pokemonList in order to be able to access it from outside the IIFE
  function returnPokemonList() {
    return pokemonList;
  }

  // enables us to add pokemons to the pokemonList variable
  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  // When called, will create a list item buttoe with the name of the pokemon.
  function addListItem(pokemon) {
    let ul = document.querySelector(".ul");
    let liUl = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("pokemon-button");
    liUl.appendChild(button);
    ul.appendChild(liUl);
    button.addEventListener("click", function (event) {  // Everytime the button is clicked, the details of the respective pokemon are console loged.
      showDetails(pokemon);
    });
  }

  //Defines loading which holds the loading message
  let loading = document.createElement("h1");
  loading.innerText = "loading...";
  loading.classList.add("loading-message");

  //When called will display the loading message
  function showLoadingMessage() {
    document.body.appendChild(loading);
  }

  //When called will hide the loading message
  function hideLoadingMessage() {
    loading.parentElement.removeChild(loading);
  }

  //fetches the pokemons, creates the pokemon objects, and adds them to the pokemonList variable.
  function loadList() {
    pokemonRepository.showLoadingMessage(); // To display the loading message after the loadList function is called.
    return fetch(apiUrl)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          setTimeout(pokemonRepository.hideLoadingMessage, 1000); // To hide the loading message once the promise is resolved. The setTimeout method is used for testin reasons.
          add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
        setTimeout(pokemonRepository.hideLoadingMessage, 1000); // To hide the loading message once the promise is rejected. The setTimeout method is used for testing reasons.
      });
  }

  // fetches the details of the pokemon object and adds them to the item.
  function loadDetails(item) {
    pokemonRepository.showLoadingMessage();
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        item.imageURL = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      })
      .catch(function (e) {
        console.error(e);
        setTimeout(pokemonRepository.hideLoadingMessage, 1000);
      });
  }
  // When called will console log the details of the pokemon.
  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
      console.log(item);
    });
  }

  // Returns of all the functions in order to be able to access the functions from outside the IIFE.
  return {
    returnPokemonList: returnPokemonList,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    showDetails: showDetails,
    loadDetails: loadDetails,
    showLoadingMessage: showLoadingMessage,
    hideLoadingMessage: hideLoadingMessage,
  };
})();

//Calling loadList to fetch the pokemons, then calling returnPokemonList to insert all the pokemons in the pokemonList variable, and then, using the forEach method to call addListItem for each pokemon in the pokemonList variable.
pokemonRepository.loadList().then(function () {
  pokemonRepository.returnPokemonList().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
