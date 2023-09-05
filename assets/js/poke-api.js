
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}

//novas implementações
function carregaDetailsPokemon(pokemon_id){
    
    exibirDetalhes();
    fetch("https://pokeapi.co/api/v2/pokemon/" + pokemon_id)
    .then((response) => response.json())
    .then( (myJson) => {
        document.getElementById(myJson.name).style.display = "block";
        document.getElementById(myJson.name).innerHTML = 
        `
        <h3>${myJson.name}</h3>
        <p>Experience -> ${myJson.base_experience}</p>
        <p>Height -> ${myJson.height}</p>
        <p>Weight -> ${myJson.weight}</p>
        <img src="${myJson.sprites.other.dream_world.front_default}"
            alt="${myJson.name}">

        <button type="button" onclick="ocultarDetalhes('${myJson.name}')">
            Close details
        </button>
        `;
    })
}


function ocultarDetalhes(myJson_name){
    document.getElementById(myJson_name).style.display = "none";
}