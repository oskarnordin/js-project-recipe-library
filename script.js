let recipes = []
const container = document.querySelector('.container') 
const URL = "https://api.spoonacular.com/recipes/random?number=10&apiKey=025b168ece454bd28587e077ad0c96d6"
let currentCuisine = "all"
let currentDiet = "all"

//API call
fetch(URL)
.then(response => {
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
})
.then(data => {
    recipes = data.recipes;
    console.log(recipes);
})
.catch(error => {
    console.log(error);
    container.innerHTML += `
    <div class="errorMessages">
        <h2>There was an error loading the recipes</h2>
        <p>${error.message}</p>
        <button class="errorButton">Dismiss</button>
    </div>
    `;
    document.querySelector('.errorButton').addEventListener('click', () => {
        document.querySelector('.errorMessages').classList.add('hidden');
    });
});

//Functions
const loadRecipes = (arg1) => {
    if (arg1.length === 0) {
        container.innerHTML = `
        <div class="cards">
        <p>No recipes found for ${currentCuisine} cuisine</p>
        </div>
        `
    return
    }
        container.innerHTML = ''
        arg1.forEach(recipe => {
        container.innerHTML += `
        <div class="cards">
        <p><img src="${recipe.image}" alt="${recipe.title}"></p>
        <h2>${recipe.title}</h2>
        <p>Time to cook: ${recipe.readyInMinutes} minutes<br>
        Cuisine: ${recipe.cuisine}<br>
        Health score: ${recipe.healthScore}

        </p>
        </div>
        `
    })
}

const filterByCuisine = (arg1) => {
    currentCuisine = arg1
    applyFilters()
}

const filterByTime = (time) => { 
    const filteredRecipes = getCurrentCuisineFiltered()
    if (time === "ascending") {
        filteredRecipes.sort((a, b) => a.readyInMinutes - b.readyInMinutes) //Ascending
    } else {
        filteredRecipes.sort((a, b) => b.readyInMinutes - a.readyInMinutes) //Descending
    }
    loadRecipes(filteredRecipes)
}

const getCurrentCuisineFiltered = () => { 
    if (currentCuisine === "all") {
        return recipes
    }
    return recipes.filter(recipe => recipe.cuisine === currentCuisine)
}

const getCurrentDietFiltered = () => {
    if (currentDiet === "all") {
        return recipes
    }
    return recipes.filter(recipe => recipe.diets.includes(currentDiet))
}

const applyFilters = () => { 
    const filteredRecipes = getCurrentCuisineFiltered()
    loadRecipes(filteredRecipes)
}

const filterByDiet = (diet) => {
    const filteredRecipes = getCurrentCuisineFiltered()
    const filteredDiet = filteredRecipes.filter(recipe => recipe.diets.includes(diet))
    loadRecipes(filteredDiet)
}


//Event listeners
const buttonCuisine = document.querySelectorAll(".buttonCuisine")
const buttonTime = document.querySelectorAll(".buttonTime")
const buttonRandom = document.querySelectorAll(".buttonRandom")
const errorButton = document.querySelector(".errorButton")
const buttonDiet = document.querySelectorAll(".buttonDiet")

buttonCuisine.forEach(button => { 
    button.addEventListener("click", (event) => {
        const cuisine = event.target.getAttribute("data-cuisine")
        filterByCuisine(cuisine)
    })
})

buttonTime.forEach(button => { 
    button.addEventListener("change", (event) => {
        const time = event.target.value
        filterByTime(time)
    })
})

buttonDiet.forEach(button => { 
    button.addEventListener("change", (event) => {
        const diet = event.target.value
        filterByDiet(diet)
    })
})

document.querySelector('.buttonRandom').addEventListener('click', () => { 
    const filteredRecipes = getCurrentCuisineFiltered()
    const randomNumber = Math.floor(Math.random() * filteredRecipes.length)
    loadRecipes([filteredRecipes[randomNumber]])
})