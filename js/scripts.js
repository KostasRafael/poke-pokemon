let pokemonList = [{name: 'butterfree', type: ['bug','flying'], abilities: ['compoundeyes','tinted-lens'], height: 1.1, },
                   {name: 'bulbasaur', type: ['grass','poison'], abilities: ['chlorophyll','overgrow'], height: 0.7, },
                   {name: 'charmander',  type: 'fire', abilities: ['blaze', 'solar-power'], height: 0.6,},
                   {name: 'ninetales', type: 'fire', abilities: ['flash-fire','drought'], height: 1.1, },
                   {name: 'pikachu', type: 'electric', abilities: ['static','lightningrod'], height: 0.4, },
                   {name: 'squirtle', type: 'water', abilities: ['rain-dish','torrent'], height: 0.5, },
                ];

for (let i = 0; i < pokemonList.length; i++) {
    let types = Array.isArray(pokemonList[i].type) ? pokemonList[i].type: [pokemonList[i].type];
    if (pokemonList[i].height > 1 && types.includes('flying')) {
    document.write('<h1>' + pokemonList[i].name + ' (height: ' + pokemonList[i].height + ')' + ' -' + ' Wow, that\'s a big pokemon and can also fly!' + '</h1>');
    } else {
        document.write('<h1>' + pokemonList[i].name + ' (height: ' + pokemonList[i].height + ')' + '</h1>');
    }
}

