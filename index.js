/* PAGE ELEMENTS */

// get array of buttons on the page
const buttons = document.querySelectorAll("button");

// get the image element used to display the pages image and random images
const imageHolder = document.querySelector('img[alt="No kittie for you!"]');

/*  GET RANDOM FACT SCRIPTS */

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

// display fact on initial page visit
getCatFact();

/* GET RANDOM IMAGE SCRIPTS */

// get button when pressed will fetch and display a new cat image
const getReplaceKittieButton = buttons[0];

// display new random image when clicking 'replace kittie' button
getReplaceKittieButton.addEventListener("click", getCatImage);

// display the image on the page

function displayCatImage(image) {
  imageHolder.src = image;
}

// fetch random image from API

async function getCatImage() {
  const response = await fetch("https://api.thecatapi.com/v1/images/search", {
    method: "GET",
    headers: {
      ["x-api-key"]:
        "live_XnQp1h9K9z3ObRCrpSLO8gAwOAPWG8nCMjMhvvgKcXHYV457i53UhGcTnufrwzl5",
    },
  });
  const data = await response.json();
  console.log(data);
  const randomImage = await data[0].url;
  displayCatImage(randomImage);
}
