let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/";

  let modalContainer = document.querySelector('#modal-container');
// makes the modalContainer visible and appends the modal to it  
function showModal(name, height, image) {
  modalContainer.innerHTML = '';
  let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal)
    let modal = document.createElement('div');
    modal.classList.add('modal');
    modalContainer.appendChild(modal);
    let imageElement = document.createElement('img');
    imageElement.src = image; 
    let modalTitle = document.createElement('h1');
    modalTitle.innerText = name;
    let modalText = document.createElement('p');
    modalText.innerText = height;
    modal.appendChild(closeButtonElement);
    modal.appendChild(modalTitle);
    modal.appendChild(modalText);
    modal.appendChild(imageElement);
    modalContainer.classList.add('is-visible');
  } 

  function hideModal() {
    modalContainer.classList.remove('is-visible');
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();  
    }
  });

  modalContainer.addEventListener('click', (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });


  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function addListItem(pokemon) {
    let ul = document.querySelector(".ul");
    let liUl = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("pokemon-button");
    liUl.appendChild(button);
    ul.appendChild(liUl);
    button.addEventListener("click", function (event) {
      showDetails(pokemon);
    });
  }

  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
      showModal(pokemon.name, pokemon.height, pokemon.image);
    });
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
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          pokemonRepository.add(pokemon);
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
        item.types = details.types;
      })
      .catch(function (e) {
        console.error(e);
      })
        .finally(() => {
          hideLoadingMessage();
        })
  }

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    showDetails: showDetails,
    loadDetails: loadDetails,
    showLoadingMessage: showLoadingMessage,
    hideLoadingMessage: hideLoadingMessage,
    showModal: showModal,
  };
})();

//Calling loadList to fetch the pokemons, then calling getAll to insert all the pokemons in the pokemonList variable, and then, using the forEach method to call addListItem for each pokemon in the pokemonList variable.
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    // each pokemon object
    pokemonRepository.addListItem(pokemon); // each pokemon object
  });
});
