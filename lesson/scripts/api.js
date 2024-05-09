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
        });
    })
    .catch(error => console.error(('console error to read api'), error));
}