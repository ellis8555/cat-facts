/* QUERY PAGE ELEMENTS */

// get array of buttons on the page
const buttons = document.querySelectorAll("button");

// get the image element used to display the pages image and random images
const imageHolder = document.querySelector('img[alt="No kittie for you!"]');

/*  GET AND DISPLAY RANDOM FACT SCRIPTS */

// display fact on initial page visit
getCatFact();

// get button when pressed will fetch and display a new cat fact
const getFactButton = buttons[1];

// display new cat fact when pressing 'Get fact' button
getFactButton.addEventListener("click", getCatFact);

// get element to display cat fact in
const factElement = document.querySelector("#catFact p");

// displays the fact on the webpage
function displayCatFact(fact) {
  factElement.innerHTML = fact;
}

// fetch fact from API
async function getCatFact() {
  const response = await fetch("https://catfact.ninja/fact?max_length=140");
  const unPackFact = await response.json();
  const fact = unPackFact.fact;
  displayCatFact(fact);
}

/* GET AND DISPLAY A RANDOM BREED'S IMAGE AND DESCRIPTION SCRIPTS*/

// get "replace kittie "button when clicked will fetch and display a new cat image
const getReplaceKittieButton = buttons[0];

// display breed information when clicking 'replace kittie' button
getReplaceKittieButton.addEventListener("click", getRandomImageOfBreed);

// get span element to display cat breed
catBreedSpan = document.querySelector("#breedContainer span");
catBreedDescription = document.querySelector("#breedContainer p:last-child");

// function to display the fetched breed name
function displayCatBreed(breed) {
  catBreedSpan.innerHTML = breed;
}

// function to display the fetched description for this particular breed
function displayCatDescription(description) {
  catBreedDescription.innerHTML = description;
}

// display the image on the page
function displayCatImage(isImage, breed, thisBreedsData) {
  let breedImage;
  if (isImage) {
    breedImage = thisBreedsData.image.url;
    imageHolder.src = breedImage;
    displayCatBreed(breed);
  } else {
    imageHolder.src = "kittie.png";
    displayCatBreed("No image available for this breed");
  }
}

// api request constants
const apiHeader = '["x-api-key"]';
const key =
  "live_XnQp1h9K9z3ObRCrpSLO8gAwOAPWG8nCMjMhvvgKcXHYV457i53UhGcTnufrwzl5";
const breedsListApi = "https://api.thecatapi.com/v1/breeds";

// fetch cat api image and description
async function getRandomImageOfBreed() {
  const response = await fetch(breedsListApi, {
    method: "GET",
    headers: {
      apiHeader: key,
    },
  });
  const data = await response.json();
  // count how many breeds have been returned
  const breedCount = data.length;
  // generat a random number within the size range of available breeds
  const getRandomNumber = Math.floor(Math.random() * breedCount);
  // select a random breed object from the available options
  const getRandomBreed = data[getRandomNumber];
  // get the breeds name
  const breed = getRandomBreed.name;
  // get a description of the breed
  const description = getRandomBreed.description;
  displayCatDescription(description);
  // checks if there is an image for this breed
  const isImage = "image" in getRandomBreed;
  // if there is an image display it otherwise display default image
  displayCatImage(isImage, breed, getRandomBreed);
}
