const pokemonName = document.querySelector('#pokemonName')
const pokemonType = document.querySelector('#pokemonType')
const pokemonProfilePic = document.querySelector('#imgPlaceholderFront')
const pokemonProfileGif = document.querySelector('#imgBlur')

const searchBtn = document.querySelector('.searchBtn')
const searchInput = document.querySelector('.searchInput')

const apiUrl = 'https://pokeapi.co/api/v2/pokemon/'

const fetchData = async (pokemon) => {
    const apiResponse = await fetch(`${apiUrl}${pokemon}`)
    
    if (apiResponse.status === 200) {
        const data = await apiResponse.json()
        return data
    }
}

const renderPokemon = async (pokemon) => {
    const data = await fetchData(pokemon)

    if (data) {
        pokemonName.innerHTML = 'id: ' + data.id + '<br>' + data.name
        pokemonType.innerHTML = data.types[0].type.name
        pokemonProfilePic.src = data.sprites.front_default
        pokemonProfilePic.classList.remove('imgPlaceholderBorder')
        pokemonProfilePic.classList.add('imgPlaceholder')
        imgBlur.src = data.sprites.other.showdown.front_default
    } else {
        pokemonName.innerHTML = 'Not Found'
        pokemonType.innerHTML = 'Not Found'
    }
}

searchBtn.addEventListener('click', () => {
    renderPokemon(searchInput.value.toLowerCase())
})

searchInput.addEventListener('keypress', (key) => {
    if (key.key === 'Enter') {
        renderPokemon(searchInput.value.toLowerCase())
    }
})
