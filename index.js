const charactersNames = document.querySelector(".characters-names");
const characterInfo = document.querySelector(".character-info");
const characterHomePlanet = document.querySelector(".character-home-planet");
const navigation = document.querySelector(".navigation");
const navigationCounter = document.querySelector('.navigation-counter');

let charactersList = [];
let characterIndex = 0;

const fetchCharacters = async () => {
    try {
        const res = await fetch("https://swapi.dev/api/people/");
        if (!res.ok){
            throw new Error('Failed to fetch data from people')
        }
        const data = await res.json();
        let characters = data.results;
        return characters;     
    } catch (err){
        console.log(err);
    }
}
charactersList = await fetchCharacters();

function displayCharactersNames() {
  charactersList.forEach((character, index) => {
    if (index < 6) {
      let html = `<li class="character-name">${character.name}</li>`;
      charactersNames.innerHTML += html;
      fetchHomeWorld();
    }
  });
}
displayCharactersNames();

function displaycharacterDetails(){
    charactersList.forEach((character, index) => {
        if (index === characterIndex){
            let html = `
            <h4>${character.name}</h4>
            <li>Mass: ${character.mass}</li>
            <li>Hair color: ${character.hair_color}</li>
            <li>Skin color: ${character.skin_color}</li>
            <li>Eye color: ${character.eye_color}</li>
            <li>Birth year: ${character.birth_year}</li>
            <li>Gender: ${character.gender}</li>
            `;
            characterInfo.innerHTML = html;
            addActiveClass();
        }
    })
}
displaycharacterDetails();

async function fetchHomeWorld(url = "https://swapi.dev/api/planets/1/") {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Failed fetch data from homeworld");
    }
    const data = await res.json();
    displayHomeWorldDetails(data);
  } catch (err) {
    console.log(err);
  }
}

function displayHomeWorldDetails(homeWorld) {
  let html = `
            <h4>${homeWorld.name}</h4>
            <li>Rotation period: ${homeWorld.rotation_period}</li>
            <li>Orbital period: ${homeWorld.orbital_period}</li>
            <li>Diameter: ${homeWorld.diameter}</li>
            <li>Climate: ${homeWorld.climate}</li>
            <li>Gravity: ${homeWorld.gravity}</li>
            <li>Terrain: ${homeWorld.terrain}</li>
            `;
  characterHomePlanet.innerHTML = html;
}


charactersNames.addEventListener('click', e => {
  e.preventDefault();
  charactersList.forEach((character, index) => {
    if (character.name === e.target.innerText){
      characterIndex = index;
      displaycharacterDetails();
      fetchHomeWorld(character.homeworld);
      navigationHander(characterIndex);
      addActiveClass();
    }
  })
});


navigation.addEventListener('click', e => {
  e.preventDefault();
  if (e.target.innerText === 'arrow_drop_down' && characterIndex < 5){
      characterIndex = characterIndex + 1;
      moveBetweenItems();
  }
  if (e.target.innerText === 'arrow_drop_up' && characterIndex > 0){
      characterIndex = characterIndex - 1;
      moveBetweenItems();
  }
})


function moveBetweenItems (){
  charactersList.forEach((character, index) => {
    if (characterIndex === index) {
      displaycharacterDetails();
      fetchHomeWorld(character.homeworld);
      navigationHander(characterIndex);
      addActiveClass();
    }
  });
}


function addActiveClass (){
  let html = document.querySelectorAll(".character-name");
  html.forEach((element, index) => {
    element.classList.remove('active');
    if (characterIndex === index){
      element.classList.add('active');
    }
  })
};


function navigationHander (index){
  navigationCounter.innerText = `${index + 1}/6`;
}