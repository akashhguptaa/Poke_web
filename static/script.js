document.addEventListener('DOMContentLoaded', () => {
    const pokeContainer = document.getElementById('poke-container');
    const modal = document.getElementById("myModal");
    const closeModal = document.getElementsByClassName("close")[0];
    const modalBody = document.getElementById("modal-body");
    const pokemonCount = 250;

    // Hide the modal initially
    modal.style.display = "none";

    const fetchPokemon = async (id) => {
        try {
            const response = await fetch(`/pokemon/${id}`);
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            const data = await response.json();
            createPokemonCard(data);
        } catch (error) {
            console.error('Error fetching Pokémon data:', error);
        }
    };

    const createPokemonCard = (pokemon) => {
        const pokemonEl = document.createElement('div');
        pokemonEl.classList.add('pokemon');
        pokemonEl.style.background = pokemon.color;

        const pokemonInnerHTML = `
            <div class="img-container">
                <img src="${pokemon.image_url}" alt="${pokemon.name}">
            </div>
            <div class="info">
                <span class="number">#${pokemon.id.toString().padStart(3, '0')}</span>
                <h3 class="name">${pokemon.name}</h3>
                <small class="type">Type: ${pokemon.type}</small>
            </div>
        `;

        pokemonEl.innerHTML = pokemonInnerHTML;
        pokemonEl.addEventListener('click', () => showModal(pokemon));
        pokeContainer.appendChild(pokemonEl);
    };

    const fetchAllPokemon = async () => {
        for (let i = 1; i <= pokemonCount; i++) {
            await fetchPokemon(i);
        }
    };

    const showModal = (pokemon) => {
        modal.style.display = "flex";
        modalBody.innerHTML = `
            <h2>${pokemon.name}</h2>
            <img src="${pokemon.image_url}" alt="${pokemon.name}">
            <table>
                <tr style="background-color:${pokemon.color}">
                    <th>Number</th>
                    <td>#${pokemon.id.toString().padStart(3, '0')}</td>
                </tr>
                <tr style="background-color:${pokemon.color}">
                    <th>Type</th>
                    <td>${pokemon.type}</td>
                </tr>
                <tr>
                    <th>Height</th>
                    <td>${pokemon.height}</td>
                </tr>
                <tr>
                    <th>Weight</th>
                    <td>${pokemon.weight}</td>
                </tr>
                <tr>
                    <th>HP</th>
                    <td>${pokemon.hp}</td>
                </tr>
                <tr>
                    <th>Attack</th>
                    <td>${pokemon.attack}</td>
                </tr>
                <tr>
                    <th>Defense</th>
                    <td>${pokemon.defense}</td>
                </tr>
                <tr>
                    <th>Special Attack</th>
                    <td>${pokemon["special-attack"]}</td>
                </tr>
                <tr>
                    <th>Special Defense</th>
                    <td>${pokemon["special-defense"]}</td>
                </tr>
                <tr>
                    <th>Speed</th>
                    <td>${pokemon.speed}</td>
                </tr>
            </table>
            <button class="learn-more-btn" style="background-color:${pokemon.color}" onclick="window.open('${pokemon.bulbURL}', '_blank')">Learn More</button>
        `;
    };

    closeModal.onclick = function () {
        modal.style.display = "none";
    };

    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };

    fetchAllPokemon();
});
