const $container = document.getElementById("container");
const counter = 1010;
const borderColors = {
  fire: "#e03a3a",
  grass: "#50C878",
  electric: "#fad343",
  water: "#1E90FF",
  ground: "#735139",
  rock: "#63594f",
  fairy: "#EE99AC",
  poison: "#b34fb3",
  bug: "#A8B820",
  dragon: "#fc883a",
  psychic: "#882eff",
  flying: "#87CEEB",
  fighting: "#bf5858",
  normal: "#D2B48C",
  ghost: "#7B62A3",
  dark: "#414063",
  steel: "#808080",
  ice: "#98D8D8",
};
const colors = {
  fire: "#ffb3b3",
  grass: "#a3e0a3",
  electric: "#ffecb3",
  water: "#b3d9ff",
  ground: "#b3a092",
  rock: "#b3ab9e",
  fairy: "#ffc0cb",
  poison: "#dab3da",
  bug: "#c6d9a3",
  dragon: "#ffd8b3",
  psychic: "#ebb3ff",
  flying: "#b3e0f0",
  fighting: "#d9a3a3",
  normal: "#e0d9c0",
  ghost: "#b3a3cc",
  dark: "#a3a3b3",
  steel: "#b3b3b3",
  ice: "#cfe8e8",
};

const regions = {
  kanto: {
    start: 1,
    end: 151,
  },
  johto: {
    start: 152,
    end: 251,
  },
  hoenn: {
    start: 252,
    end: 386,
  },
  sinnoh: {
    start: 387,
    end: 493,
  },
  unova: {
    start: 494,
    end: 649,
  },
  kalos: {
    start: 650,
    end: 721,
  },
  alola: {
    start: 722,
    end: 809,
  },
  galar: {
    start: 810,
    end: 898,
  },
  hisui: {
    start: 899,
    end: 905,
  },
  paldea: {
    start: 906,
    end: 1010,
  },
};

const $loader = document.querySelector(".lds-ring");
const fetchPokemons = async (region) => {
  const { start, end } = regions[region];
  $loader.classList.add("ring-active");
  $container.innerHTML = "";
  const promises = [];

  for (let i = start; i <= end; i++) {
    const pokemonName = i.toString();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
    promises.push(fetch(url));
    // // fetching
    // let response = await fetch(url);
    // let pokemon = await response.json();
    // $loader.classList.remove("ring-active");

    // // creating elements
    // createPokemonCard(pokemon);
    // setTimeout(() => {}, "150");
  }

  try {
    const response = await Promise.all(promises);
    const pokemons = await Promise.all(
      response.map((response) => response.json())
    );
    $loader.classList.remove("ring-active");
    pokemons.forEach((pokemon) => createPokemonCard(pokemon));
  } catch (error) {
    $loader.classList.remove("ring-active");
  }
};

const mainTypes = Object.keys(colors);

const createPokemonCard = (pokemon) => {
  const $pokemonCard = document.createElement("div");
  $pokemonCard.classList.add("card");
  $pokemonCard.id = pokemon.id;

  let name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  if (name.length > 9) {
    name = name.split("-")[0];
  } else {
    name = name;
  }

  const id = pokemon.id.toString().padStart(3, "0");

  let weight = pokemon.weight / 10 + "kg";
  let height = pokemon.height / 10 + "m";

  const pokeTypes = pokemon.types.map((type) => type.type.name);
  const type = mainTypes.find((type) => pokeTypes.indexOf(type) > -1);
  const color = colors[type];
  const borderColor = borderColors[type];

  let frontImg;
  let backImg;

  try {
    frontImg = pokemon.sprites.front_default;
    backImg = pokemon.sprites.back_default;
  } catch (error) {
    frontImg = "#";
    backImg = "#";
  }

  $pokemonCard.style.backgroundColor = color;
  $pokemonCard.style.borderColor = borderColor;

  const pokemonInnerHTML = `
  <div class="front side">
  <div class="img-container">
    <img class="background" src="./Icons/pokeball.svg" alt="pokeball" />
    <img class="image" src="${frontImg}" alt="${name}" />
  </div>
  <span class="number">#${id}</span>
  <h3 class="name">${name}</h3>
  <div class="types">
    ${pokeTypes
      .map(
        (type) => `
            <div class="type ${type}">
                <img src="./Icons/${type}.svg" alt="${type}" />    
            </div>`
      )
      .join("")}
  </div>
</div>
<div class="back side">
  <div class="img-container">
    <img class="image" src="${
      backImg == null ? frontImg : backImg
    }" alt="${name}" />
    <img src="./Icons/pokeball.svg" alt="pokeball" class="background">
  </div>
  <span class="number">#${id}</span>
  <div class="stats">
    <div>Weight:<br> <b>${weight}</b></div>
    <div>Height:<br> <b>${height}</b></div>
  </div>
</div>
  `;

  $pokemonCard.innerHTML = pokemonInnerHTML;

  const pokemonCardHolder = document.createElement("div");
  pokemonCardHolder.classList.add("cardContainer");
  pokemonCardHolder.appendChild($pokemonCard);
  $container.appendChild(pokemonCardHolder);
};

const changeRegion = () => {
  const $regionSelect = document.getElementById("regionSelect");
  $regionSelect.addEventListener("click", (e) => {
    const selectedRegion = e.target.getAttribute("data-value");
    const activeRegion = document.querySelector(".active");
    if (selectedRegion) {
      $container.innerHTML = "";
      fetchPokemons(selectedRegion);
      activeRegion.classList.remove("active");
      e.target.classList.add("active");
    }
  });
};

window.addEventListener("click", (e) => {
  const $logo = document.getElementById("logo");
  const $popup = document.getElementById("popup");
  const $overlay = document.getElementById("overlay");
  const $close = document.getElementById("close");

  if (e.target === $logo) {
    console.log("yes");
    $overlay.style.display = "block";
    $popup.style.display = "flex";
  }
  if (e.target === $overlay || e.target === $close) {
    $overlay.style.display = "none";
    $popup.style.display = "none";
  }
});

window.addEventListener('keydown', (e) => {
  const $popup = document.getElementById("popup");
  const $overlay = document.getElementById("overlay");

  if ($overlay.style.display == 'block' && e.key === 'Escape') {
    $overlay.style.display = "none";
    $popup.style.display = "none";
  }
})


fetchPokemons("kanto");
changeRegion();
