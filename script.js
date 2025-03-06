const recipes = [ 
{
    id: 1,
    title: "Vegan Lentil Soup",
    image: "./chicken.webp",
    readyInMinutes: 30,
    servings: 4,
    sourceUrl: "https://example.com/vegan-lentil-soup",
    diets: ["vegan"],
    cuisine: "Mediterranean",
    ingredients: [
    "red lentils",
    "carrots",
    "onion",
    "garlic",
    "tomato paste",
    "cumin",
    "paprika",
    "vegetable broth",
    "olive oil",
    "salt"
    ],
    pricePerServing: 2.5,
    popularity: 85
},
{
    id: 2,
    title: "Vegetarian Pesto Pasta",
    image: "./chicken.webp",
    readyInMinutes: 25,
    servings: 2,
    sourceUrl: "https://example.com/vegetarian-pesto-pasta",
    diets: ["vegetarian"],
    cuisine: "Italian",
    ingredients: [
    "pasta",
    "basil",
    "parmesan cheese",
    "garlic",
    "pine nuts",
    "olive oil",
    "salt",
    "black pepper"
    ],
    pricePerServing: 3.0,
    popularity: 92
},
{
    id: 3,
    title: "Gluten-Free Chicken Stir-Fry",
    image: "./chicken.webp",
    readyInMinutes: 20,
    servings: 3,
    sourceUrl: "https://example.com/gluten-free-chicken-stir-fry",
    diets: ["gluten-free"],
    cuisine: "Asian",
    ingredients: [
    "chicken breast",
    "broccoli",
    "bell pepper",
    "carrot",
    "soy sauce (gluten-free)",
    "ginger",
    "garlic",
    "sesame oil",
    "cornstarch",
    "green onion",
    "sesame seeds",
    "rice"
    ],
    pricePerServing: 4.0,
    popularity: 78
},
{
    id: 4,
    title: "Dairy-Free Tacos",
    image: "./chicken.webp",
    readyInMinutes: 15,
    servings: 2,
    sourceUrl: "https://example.com/dairy-free-tacos",
    diets: ["dairy-free"],
    cuisine: "Mexican",
    ingredients: [
    "corn tortillas",
    "ground beef",
    "taco seasoning",
    "lettuce",
    "tomato",
    "avocado"
    ],
    pricePerServing: 2.8,
    popularity: 88
},
{
    id: 5,
    title: "Middle Eastern Hummus",
    image: "./chicken.webp",
    readyInMinutes: 10,
    servings: 4,
    sourceUrl: "https://example.com/middle-eastern-hummus",
    diets: ["vegan", "gluten-free"],
    cuisine: "Middle Eastern",
    ingredients: [
    "chickpeas",
    "tahini",
    "garlic",
    "lemon juice",
    "olive oil"
    ],
    pricePerServing: 1.5,
    popularity: 95
},
{
    id: 6,
    title: "Quick Avocado Toast",
    image: "./chicken.webp",
    readyInMinutes: 5,
    servings: 1,
    sourceUrl: "https://example.com/quick-avocado-toast",
    diets: ["vegan"],
    cuisine: "Mediterranean",
    ingredients: [
    "bread",
    "avocado",
    "lemon juice",
    "salt"
    ],
    pricePerServing: 2.0,
    popularity: 90
},
{
    id: 7,
    title: "Beef Stew",
    image: "./chicken.webp",
    readyInMinutes: 90,
    servings: 5,
    sourceUrl: "https://example.com/beef-stew",
    diets: [],
    cuisine: "European",
    ingredients: [
    "beef chunks",
    "potatoes",
    "carrots",
    "onion",
    "garlic",
    "tomato paste",
    "beef broth",
    "red wine",
    "bay leaves",
    "thyme",
    "salt",
    "black pepper",
    "butter",
    "flour",
    "celery",
    "mushrooms"
    ],
    pricePerServing: 5.5,
    popularity: 80
}
]

const loadRecipes = (arg1) => {  //Loads recipes function with title, number of minutes it takes to cook and the type of cuisine.
    container.innerHTML = '' //Resets all recipes when loaded

    arg1.forEach(recipe => { 
        container.innerHTML += 
        `<div class="cards">
            <p>${recipe.title}</p>
            <p>${recipe.readyInMinutes} minutes</p>
            <p>${recipe.cuisine}</p>
        </div>`
    })
}

const buttonCuisine = document.querySelectorAll(".buttonCuisine") //An array with all cuisine buttons
const buttonTime = document.querySelectorAll(".buttonTime") // An array with all time buttons
const buttonRandom = document.querySelectorAll(".buttonRandom")

let currentCuisine = "all"

buttonCuisine.forEach(button => { //Adds eventlisteners to all cuisine-buttons and then calls the function filterByCuisine.
    button.addEventListener("click", (button) => {
        const cuisine = button.target.getAttribute("data-cuisine")
        filterByCuisine(cuisine)
    })
})

const filterByCuisine = (arg1) => { //Function that takes in an argument (cuisine) and applies it to the variable currentCuisie before calling the function applyFilters.
    currentCuisine = arg1
    applyFilters()
    }

buttonTime.forEach(button => { //Adds eventlisteners to all time-buttons (and get either ascending or descending from them) and then calls the function filterByTime.
    button.addEventListener("change", (button) => {
        const time = button.target.value
        filterByTime(time)
    })
})

const filterByTime = (time) => { //Takes in the variable carrying either ascending or descending and performs an if-statement, sorting them accordingly. At the end it callst he loadsRecipes function with the filteredRecipes as an argument.
    const filteredRecipes = getCurrentCuisineFiltered()
    if (time === "ascending") {
        filteredRecipes.sort((a, b) => a.readyInMinutes - b.readyInMinutes) //Ascending
    } else {
        filteredRecipes.sort((a, b) => b.readyInMinutes - a.readyInMinutes) //Descending
    }
    loadRecipes(filteredRecipes)
}

const getCurrentCuisineFiltered = () => { //Performs an if-statement, returning either all recipes or performs a method to return a filtered version of recipes. The filtered version makes sure it is the same as currentCuisine.
    if (currentCuisine === "all") {
        return [... recipes]
    }
        return recipes.filter(recipe => recipe.cuisine === currentCuisine)
    }

const applyFilters = () => { //Gives the filteredRecipes variable the value returned when calling function getCurrentCuisineFiltered(). Then loads in as an argument when calling loading loadRecipes.
    const filteredRecipes = getCurrentCuisineFiltered()
    loadRecipes(filteredRecipes)
}

document.querySelector('.buttonRandom').addEventListener('click', () => { //Queryselector for random button that picks out a random number between 0 and 6 (since there are 7 recipes) and then creates a for-loop that hides all cards except for the one with the randomized index spot.
    randomNumber = Math.floor(Math.random() * recipes.length)
    const cards = document.querySelectorAll('.cards')
    
    cards.forEach(card => {
    card.style.display = 'none'
    })
    cards[randomNumber].style.display = 'block'
})

loadRecipes(recipes)