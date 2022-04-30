import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  // debugger;
  let cities = await fetchCities();
  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try {
    const response = await fetch(`${config.backendEndpoint}/cities`);
    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      throw error;
    }
  } catch (err) {
    console.log(err.name);
    return null;
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  
  // div selector in which to append card details
  let cardId = document.getElementById('data');

  // creating div element
  let divCard = document.createElement('div');
  divCard.setAttribute('class', 'col-12 col-md-3 col-lg-3 col-sm-6 mt-4');
  // divCard.setAttribute('id', `${id}`);

  // each Div tile 
  let divTile = `<div class="tile">
                  <img src=${image} class="img-responsive" alt=${city}>
                  <div class="tile-text">
                    <h5>${city}</h5>
                    <p>${description}</p>
                  </div>
                </div>
                `;

  // creating link element
  let link = document.createElement('a');
  link.setAttribute('href', `pages/adventures/?city=${id}`);
  link.setAttribute('id', `${id}`)
  // appending each tile in link element
  link.innerHTML = divTile;
  
  // appending link in divCard
  divCard.appendChild(link);
  // debugger;
  // appending each divCard in cardId
  cardId.appendChild(divCard);
  // debugger;
}

export { init, fetchCities, addCityToDOM };
