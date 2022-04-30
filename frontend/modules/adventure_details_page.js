import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  if (search) {
    return search.split("=")[1];
  }
  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    let response = await fetch(`${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`);
    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      throw error;
    } 
  } catch (error) {
    console.log(error);
  }

  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM

  const adventureName = document.querySelector('#adventure-name');
  const adventureSubtitle = document.querySelector('#adventure-subtitle');
  const photoGallery = document.querySelector('#photo-gallery');
  const adventureContent = document.querySelector('#adventure-content');

  adventure.images.forEach(image => {
    // creating div and img elements
    const div = document.createElement('div');
    const img = document.createElement('img');

    // settings attributes
    div.style.width='100%';
    img.setAttribute('src', `${image}`);
    img.setAttribute('class', 'activity-card-image');

    // appending elements
    div.append(img);
    photoGallery.appendChild(div);
  })

  adventureName.textContent = adventure.name;
  adventureSubtitle.textContent = adventure.subtitle;
  adventureContent.textContent = adventure.content;
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  const photoGallery = document.querySelector('#photo-gallery');
  photoGallery.innerHTML = "";
 
  photoGallery.setAttribute('class', 'carousel slide');
  photoGallery.setAttribute('data-ride', 'carousel');

  // creating carousel indicators
  const ol = document.createElement('ol');
  ol.setAttribute('class', 'carousel-indicators');

  for (let i=0; i< 3; i++) {
    let li = document.createElement('li');
    if (i==0) {
      li.setAttribute('class', 'active');
    } else {
      li.setAttribute('class', '');
    }
    li.setAttribute('data-target', '#photo-gallery');
    li.setAttribute('data-slide-to', `${i}`);
    ol.appendChild(li);
  }
  
  // appending carousel indicators
  photoGallery.appendChild(ol);

  // creating inner Carousel div
  const divCarouselInner = document.createElement('div');
  divCarouselInner.setAttribute('class', 'carousel-inner');

  // looping over images and appending each div with image
  images.forEach((image, i) => {
    const div = document.createElement('div');
    div.style.width = '100%';

    // condition to add active class
    if (i === 0) {
      div.setAttribute('class', 'carousel-item activity-card-image active');
    } else {
      div.setAttribute('class', 'carousel-item activity-card-image');
    }

    const img = document.createElement('img');
    img.setAttribute('src', `${image}`);
    img.setAttribute('alt', `${i}`);
    img.setAttribute('class', 'd-block w-100');
    div.appendChild(img);
    
    divCarouselInner.appendChild(div);
  })
  
  //appending carousel div 
  photoGallery.appendChild(divCarouselInner);

  // creating carousel control prev button
  let carouselControlPrevious = document.createElement('a');
  carouselControlPrevious.setAttribute('class', 'carousel-control-prev');
  carouselControlPrevious.setAttribute('href', '#photo-gallery');
  carouselControlPrevious.setAttribute('role', 'button');
  carouselControlPrevious.setAttribute('data-slide', 'prev');

  carouselControlPrevious.innerHTML = ` <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span class="sr-only">Previous</span>`;

  photoGallery.appendChild(carouselControlPrevious);

  // creating carousel control next button
  let carouselControlNext = document.createElement('a');
  carouselControlNext.setAttribute('class', 'carousel-control-next');
  carouselControlNext.setAttribute('href', '#photo-gallery');
  carouselControlNext.setAttribute('role', 'button');
  carouselControlNext.setAttribute('data-slide', 'next');   
  
  carouselControlNext.innerHTML = `<span class="carousel-control-next-icon" aria-hidden="true"></span>
                                   <span class="sr-only">Next</span>`;
  
  photoGallery.appendChild(carouselControlNext);
}


//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  if (adventure.available) {
    document.querySelector('#reservation-panel-sold-out').style.display = 'none';
    document.querySelector('#reservation-panel-available').style.display = 'block';
    document.querySelector('#reservation-person-cost').textContent = adventure.costPerHead;
  } else {
    document.querySelector('#reservation-panel-available').style.display = 'none';
    document.querySelector('#reservation-panel-sold-out').style.display = 'block';
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  console.log(persons);
  const reservationCost = document.querySelector('#reservation-cost');
  const perHeadCost = adventure.costPerHead;
  if (persons) {
    reservationCost.textContent = persons*perHeadCost;
  } else {
    reservationCost.textContent = "0";
  }
}

//Implementation of reservation form submission using JQuery
function captureFormSubmitUsingJQuery(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using JQuery to make the reservation

  $("#myForm").submit(function (e) {
    //prevent Default functionality
    e.preventDefault();
    console.log(adventure.id);

    //get the action-url of the form
    let actionurl = `${config.backendEndpoint}/reservations/new`;
    let adventurData = $(this).serialize() + "&adventure=" + adventure.id;

    $.ajax({
      url: actionurl,
      type: "POST",
      data: adventurData,
      success: function (data) {
        
        /* do these two things inside success, it expects a window reload hence it is failing.
          alert("Success!");
          window.location.reload();
        */
        alert("Success!");
        window.location.reload();
      },
      error: function (data) {
        /* here also give an alert don't console 
        alert("Failed!")
        */
        alert("Failed!");
      //  window.location.reload();
      },
    });
  });
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  console.log(adventure);
  const reservedBanner = document.getElementById('reserved-banner');
  if (adventure.reserved) {
    reservedBanner.style.display = 'block';
  } else {
    reservedBanner.style.display = 'none';
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmitUsingJQuery,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
