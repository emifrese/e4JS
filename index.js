const typeColors = {
  rock: [182, 158, 49],
  ghost: [112, 85, 155],
  steel: [183, 185, 208],
  water: [100, 147, 235],
  grass: [116, 203, 72],
  psychic: [251, 85, 132],
  ice: [154, 214, 223],
  dark: [117, 87, 76],
  fairy: [230, 158, 172],
  normal: [170, 166, 127],
  fighting: [193, 34, 57],
  flying: [168, 145, 236],
  poison: [164, 62, 158],
  ground: [222, 193, 107],
  bug: [167, 183, 35],
  fire: [245, 125, 49],
  electric: [249, 207, 48],
  dragon: [112, 55, 255],
};

const pokemonForm = document.querySelector(".pokemonForm");
const pokemonInput = document.querySelector("#pokemonNumber");
const pokemonCard = document.querySelector(".pokemonCard");
const pokemonName = document.querySelector(".pokeName");
const pokemonNumber = document.querySelector("#pokeId");
const pokemonImg = document.querySelector(".pokemonImg").children[0];
const pokemonHeight = document.querySelector("#height");
const pokmeonWeight = document.querySelector("#weight");
const pokemonTypes = document.querySelector(".types");

pokemonCard.style.backgroundColor = "rgb(123,123,123)";

const pokemonData = (pokemon) => {
  return {
    name: pokemon.name,
    id: pokemon.id,
    types: pokemon.types.map((type) => type.type),
    img: pokemon.sprites.other["official-artwork"].front_default,
    weight: pokemon.weight,
    height: pokemon.height,
  };
};

const searchPokemon = async (number) => {
  try {
    const result = await fetch(`https://pokeapi.co/api/v2/pokemon/${number}`);
    const data = await result.json();
    const { name, id, types, img, height, weight } = pokemonData(data);
    const newColor = typeColors[types[0].name];
    pokemonName.innerHTML = name;
    pokemonNumber.innerHTML = id;
    pokemonCard.style.backgroundColor = `rgb(${newColor})`;
    pokemonHeight.innerHTML = `${height / 10}m`;
    pokmeonWeight.innerHTML = `${weight / 10}kg`;
    pokemonImg.setAttribute("src", img);
    pokemonTypes.innerHTML = "";
    // pokemonTypes.removeChild(pokemonTypes.children[0]);
    types.forEach((type) => {
      const pokemonTypeContainer = document.createElement("div");
      const pokemonTypeImg = document.createElement("img");
      pokemonTypeContainer.classList.add("typeContainer");
      console.log(pokemonTypeContainer);
      pokemonTypeImg.setAttribute("src", `./assets/${type.name}.svg`);
      const pokeColor = typeColors[type.name];
      pokemonTypeContainer.style.backgroundColor = `rgb(${pokeColor})`;
      pokemonTypeContainer.style.boxShadow = `0 0 20px ${pokeColor}`;
      pokemonTypeContainer.appendChild(pokemonTypeImg);
      pokemonTypes.appendChild(pokemonTypeContainer);
    });
  } catch (error) {
    console.log(error);
  }
};

const pokemonHandler = (e) => {
  e.preventDefault();

  searchPokemon(pokemonInput.value);
};

(() => {
  pokemonForm.addEventListener("submit", pokemonHandler);
})();
