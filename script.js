let recipes = []
const container = document.querySelector('.container') 
const URL = "https://api.spoonacular.com/recipes/random?number=2&apiKey=9140586d9ad349ee88356eff9045445c"
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
    const validRecipes = data.recipes.filter(recipe => {
       return recipe.diets.length > 0
    })
    recipes = validRecipes
    console.log(recipes)
    applyFilters() // Load initial recipes
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
    container.innerHTML = ''
    arg1.forEach(recipe => {
        container.innerHTML += `
        <div class="cards">
        <p><img src="${recipe.image}" alt="${recipe.title}"></p>
        <h2>${recipe.title}</h2>
        <p>Time to cook: ${recipe.readyInMinutes} minutes<br>
        Cuisine: ${recipe.cuisine ? recipe.cuisine : 'Unknown'}<br>
        Health score: ${recipe.healthScore}<br>
        Diets: ${recipe.diets.join(", ")}
        </p>
        </div>
        `
    })
}

const filterByTime = (time) => { 
    const filteredRecipes = getCurrentDietFiltered()
    if (time === "ascending") {
        filteredRecipes.sort((a, b) => a.readyInMinutes - b.readyInMinutes) //Ascending
    } else {
        filteredRecipes.sort((a, b) => b.readyInMinutes - a.readyInMinutes) //Descending
    }
    loadRecipes(filteredRecipes)
}

const filterByDiet = (diet) => {
    currentDiet = diet
    applyFilters()
}

const getCurrentDietFiltered = () => {
    if (currentDiet === "all") {
        return recipes
    }
    return recipes.filter(recipe => {
        if (currentDiet === "vegan") {
            return recipe.vegan === true // Check if vegan is true
        }
        if (currentDiet === "vegetarian") {
            return recipe.vegetarian // Check the boolean value
        }
        if (currentDiet === "gluten free") {
            return recipe.glutenFree // Check the boolean value
        }
        if (currentDiet === "dairy free") {
            return recipe.dairyFree // Check the boolean value
        }
        if (currentDiet === "ketogenic") {
            return recipe.ketogenic // Check the boolean value
        }
        if (currentDiet === "pescetarian") {
            return recipe.pescetarian // Check the boolean value
        }
        if (currentDiet === "lacto ovo vegetarian") {
            return recipe.lactoOvoVegetarian // Check the boolean value
        }
        if (currentDiet === "whole30") {
            return recipe.whole30 // Check the boolean value
        }
        if (currentDiet === "paleo") {
            return recipe.paleo // Check the boolean value
        }
        if (currentDiet === "primal") {
            return recipe.primal // Check the boolean value
        }
        if (currentDiet === "fodmap friendly") {
            return recipe.lowFodmap // Check the boolean value
        }
        return recipe.diets.includes(currentDiet) // For other diets
    })
}

const applyFilters = () => {
    const filteredRecipes = getCurrentDietFiltered()
    loadRecipes(filteredRecipes)
}

//Event listeners
const buttonDiet = document.querySelectorAll(".buttonDiet")
const buttonTime = document.querySelectorAll(".buttonTime")

buttonDiet.forEach(button => { 
    button.addEventListener("change", (event) => {
        const diet = event.target.getAttribute("data-diet").toLowerCase()
        filterByDiet(diet)
    })
})

buttonTime.forEach(button => { 
    button.addEventListener("change", (event) => {
        const time = event.target.value
        filterByTime(time)
    })
})

document.querySelector('.buttonRandom').addEventListener('click', () => { 
    const filteredRecipes = getCurrentDietFiltered()
    const randomNumber = Math.floor(Math.random() * filteredRecipes.length)
    loadRecipes([filteredRecipes[randomNumber]])
})