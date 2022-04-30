
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  return search.split("=")[1];
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try{
    const response = await fetch(`${config.backendEndpoint}/adventures?city=${city}`);
    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      throw error;
    }
  } catch (err) {
      console.log(err);
      return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM

  const div = document.querySelector('#data');
  adventures.forEach(({id, name, category, image, costPerHead, currency, duration}) => {

    const divMain = document.createElement('div');
    divMain.setAttribute('class', 'col-12 col-md-3 col-lg-3 col-sm-6 mt-4 d-flex');
    // divMain.setAttribute('id', `${id}`);

    const link = document.createElement('a');
    link.setAttribute('href', `detail/?adventure=${id}`);
    link.setAttribute('id', `${id}`);

    const card = `<div class="activity-card">
                  <img src=${image} alt=${name}/>
                  <div class="category-banner">${category}</div>
                  <div class="d-flex justify-content-between mt-1">
                    <div class="d-flex flex-column pr-3">
                      <p>${name}</p>
                      <p>Duration</p>
                    </div> 
                    <div class="d-flex flex-column pl-3">
                      <p>${currency}.${costPerHead}</p>
                      <p>${duration}hr</p>
                    </div>
                  </div>
                </div>
                 `;

    link.innerHTML +=card;
    divMain.appendChild(link);

    div.appendChild(divMain); 
  })
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let filteredList = list.filter(item => {
    if ((item.duration > parseInt(low, 10)) && (item.duration <= parseInt(high))) {
      return true;
    }
  })
  return filteredList;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  return list.filter(item => categoryList.includes(item.category));
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  // when both are selected
  if (filters.category.length && filters.duration !== "") {
    let listsByDuration = filterByDuration(list, filters.duration.split("-")[0], filters.duration.split("-")[1]);
    let listsByCategory = filterByCategory(list, filters.category);
    return listsByCategory.filter(el => listsByDuration.includes(el));

  } else if (filters.duration !== "") {
    return filterByDuration(list, filters.duration.split("-")[0], filters.duration.split("-")[1]); // when only duration is selected
  } else if (filters.category.length) {
    return filterByCategory(list, filters.category); // when only category is selected
  }

  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters to localStorage using JSON.stringify()
  localStorage.setItem('filters', JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return in JSON format
  let filters = JSON.parse(localStorage.getItem('filters'));  

  if (filters !== null) {
      return filters;
  }
  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter and Generate Category Pills
   // selecting category List div
   const categoryList = document.querySelector('#category-list');
  
   filters.category.forEach(item => {
     // creating a div element
     const div = document.createElement('div');
     div.setAttribute('class', 'category-filter');
     div.textContent = item;
     
     const cross = document.createElement('span');
     cross.textContent = 'X';
     cross.style.color = 'red';
     cross.style.fontSize = '15px';
     cross.style.fontWeight = '900';
     cross.style.paddingLeft = '10px';
     cross.style.cursor = 'pointer'; 
     div.appendChild(cross);
     
     cross.addEventListener('click', function() {
       
     })
 
     // appending each category in categoryList
     categoryList.appendChild(div);
   }) 
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
