
//Declaring the pokemonRepository variable that stores the IIFE.
//Declaring the pokemonList variable locally, within the IIFE.

let pokemonRepository = (function () {
  let pokemonList = [
    {
      name: "Butterfree",
      type: ["bug", "flying"],
      abilities: ["compoundeyes", "tinted-lens"],
      height: 1.1,
    },
    {
      name: "Bulbasaur",
      type: ["grass", "poison"],
      abilities: ["chlorophyll", "overgrow"],
      height: 0.7,
    },
    {
      name: "Charmander",
      type: "fire",
      abilities: ["blaze", "solar-power"],
      height: 0.6,
    },
    {
      name: "Ninetales",
      type: "fire",
      abilities: ["flash-fire", "drought"],
      height: 1.1,
    },
    {
      name: "Pikachu",
      type: "electric",
      abilities: ["static", "lightningrod"],
      height: 0.4,
    },
    {
      name: "Squirtle",
      type: "water",
      abilities: ["rain-dish", "torrent"],
      height: 0.5,
    },
  ];

  //Declaring all the functions
  function getAll() {
    return pokemonList;
  }

  function add(item) {
    typeof item === "object"
      ? pokemonList.push(item)
      : console.log("invalid input, expected object.");
  }

  //manipulating the DOM in order to create an unordered list that has the pokemons as its list items.
  function addListItem(pokemon) {
    let pokemonUnorderedList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('pokemon-button');
    listItem.appendChild(button);
    pokemonUnorderedList.appendChild(listItem);
    consoleDetails(button, pokemon);
    }
  //Adding an event listener so when the button is clicked the pokemon is displayed on the console.
    function consoleDetails(button, pokemon) {
      button.addEventListener('click', function() {
        showDetails(pokemon)
      })
    }

  function showDetails(pokemon) {
    console.log(pokemon);
  }

  //Declaring the returns of the IIFE, which are the functions written above.
  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    showDetails: showDetails,
    consoleDetails: consoleDetails,
  };
})();

//Adding a pokemon object to the pokemonList variable using the add() function.
pokemonRepository.add({
  name: "Sandslash",
  type: "ground",
  abilities: ["Sand-veil", "Sand-rush"],
  height: 1,
});

//Adding the forEach() method to run the addListItem(pokemon) function on every object within the array in the pokemonList variable.
pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);

});
