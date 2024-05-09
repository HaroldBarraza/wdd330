const apiUrl = 'https://pokeapi.co/api/v2/pokemon'
pokeapi(apiUrl)

function pokeapi(url){
    fetch (url)
    .then(response => response.json())
    .then(data =>{
        console.log('Second:', data);
        const pokemonlist = document.getElementById('pokemonlist');
        data.results.forEach(pokemon => {
            const option = document.createElement('option');
            option.textContent = pokemon.name;
            pokemonlist.appendChild(option)
            console.log("1). Total count of Pokémon records: ", data.count);
            console.log("2). Number of Pokémon character records returned by default: ", data.results.length);
        });
    })
    .catch(error => console.error(('console error to read api'), error));
}