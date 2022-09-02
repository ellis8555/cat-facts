// get button when pressed will fetch and display a new cat fact
const button = document.querySelector("button");

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

// display new cat fact when pressing 'Get fact' button
button.addEventListener("click", getCatFact);
