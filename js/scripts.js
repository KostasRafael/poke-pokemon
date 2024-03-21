let pokemonList = [{name: 'butterfree', type: ['bug','flying'], abilities: ['compoundeyes','tinted-lens'], height: 1.1, },
                   {name: 'bulbasaur', type: ['grass','poison'], abilities: ['chlorophyll','overgrow'], height: 0.7, },
                   {name: 'charmander',  type: 'fire', abilities: ['blaze', 'solar-power'], height: 0.6,},
                   {name: 'ninetales', type: 'fire', abilities: ['flash-fire','drought'], height: 1.1, },
                   {name: 'pikachu', type: 'electric', abilities: ['static','lightningrod'], height: 0.4, },
                   {name: 'squirtle', type: 'water', abilities: ['rain-dish','torrent'], height: 0.5, },
                ];


pokemonList.forEach(function(pokemon) {
    console.log(pokemon.name + ' is a ' + pokemon.type + ' pokemon, and has the abilities of ' + pokemon.abilities + ' a height of ' + pokemon.height + '.')
});

