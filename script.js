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

const currentCuisine = "all";

const buttonCuisine = document.querySelectorAll(".buttonCuisine") //An array with all cuisine buttons
const buttonTime = document.querySelectorAll(".buttonTime") // An array with all time buttons

const loadRecipes = (arg1) => {  //Loads recipes function
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

buttonCuisine.forEach(button => { //Adds eventlisteners to all cuisine-buttons
    button.addEventListener("click", (button) => {
        const cuisine = button.target.getAttribute("data-cuisine")
        filterByCuisine(cuisine)
    })
})

const filterByCuisine = (cuisine) => { //Function that checks if or which cuisine is attributed to the recipe  
    if (cuisine === "all") {
        loadRecipes(recipes)
    } else {
        const filteredRecipes = recipes.filter(recipe => recipe.cuisine === cuisine)
        loadRecipes(filteredRecipes)
    }
}

buttonTime.forEach(button => { //Adds eventlisteners to all time-buttons
    button.addEventListener("click", (button) => {
        const time = button.target.value("ascending")
        filterByTime(time)
    })
})


buttonTime.forEach(button => {
    button.addEventListener("change", (button) => { // Use "change" event for radio buttons
        const time = button.target.value; // Get selected value (ascending or descending)
        filterByTime(time);
    });
});

const filterByTime = (time) => {
    const filteredByTime = [...recipes]

    if (time === "ascending") {
        filteredByTime.sort((a, b) => a.readyInMinutes - b.readyInMinutes);
    } else {
        filteredByTime.sort((a, b) => b.readyInMinutes - a.readyInMinutes);
    }

    loadRecipes(filteredByTime)
}

loadRecipes(recipes)