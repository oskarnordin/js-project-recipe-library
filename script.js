let recipes = []
const container = document.querySelector('.container')

const URL = "https://api.spoonacular.com/recipes/random?number=2&apiKey=9140586d9ad349ee88356eff9045445c"

let currentDiet = "all"
const loader = document.getElementById('loader')
loader.style.display = 'block'

// Functions
const loadRecipes = (arg1) => {
    container.innerHTML = ''
    arg1.forEach(recipe => {
        container.innerHTML += `
        <div class="cards">
        <p><img src="${recipe.image}" alt="${recipe.title}"></p>
        <h2>${recipe.title}</h2>
        <p>Time to cook: ${recipe.readyInMinutes} minutes.<br>
        Health score: ${recipe.healthScore}.<br>
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
            return recipe.vegan === true || recipe.diets.includes("vegan")
        }
        if (currentDiet === "vegetarian") {
            return recipe.vegetarian === true || recipe.diets.includes("vegetarian")
        }
        if (currentDiet === "gluten free") {
            return recipe.glutenFree === true || recipe.diets.includes("gluten free")
        }
        if (currentDiet === "dairy free") {
            return recipe.dairyFree === true || recipe.diets.includes("dairy free")
        }
        if (currentDiet === "ketogenic") {
            return recipe.ketogenic === true || recipe.diets.includes("ketogenic")
        }
        if (currentDiet === "pescetarian") {
            return recipe.pescetarian === true || recipe.diets.includes("pescetarian")
        }
        if (currentDiet === "lacto ovo vegetarian") {
            return recipe.lactoOvoVegetarian === true || recipe.diets.includes("lacto ovo vegetarian")
        }
        if (currentDiet === "whole 30") {
            return recipe.whole30 === true || recipe.diets.includes("whole 30")
        }
        if (currentDiet === "paleolithic") {
            return recipe.paleo === true || recipe.diets.includes("paleo")
        }
        if (currentDiet === "primal") {
            return recipe.primal === true || recipe.diets.includes("primal")
        }
        if (currentDiet === "fodmap friendly") {
            return recipe.lowFodmap === true || recipe.diets.includes("fodmap friendly") 
        }
        return recipe.diets.includes(currentDiet) // For other diets
    })
}

const applyFilters = () => {
    const filteredRecipes = getCurrentDietFiltered()
    loadRecipes(filteredRecipes)
}

const filterBySearch = (searchValue) => {
    const filteredRecipes = recipes.filter(recipe => {
        return recipe.title.toLowerCase().includes(searchValue.toLowerCase())
    })
    loadRecipes(filteredRecipes)
}

const showLoader = () => {
    const loader = document.querySelector('.loader')
    loader.style.display = 'flex'
    setTimeout(() => {
        loader.style.display = 'none'
    }, 2000)
}

// Check local storage for recipes
const loadData = () => {
    const storedRecipes = localStorage.getItem('recipes');
    if (storedRecipes) {
        try {
            recipes = JSON.parse(storedRecipes);
            console.log('Recipes loaded from local storage', recipes);
            applyFilters()
        } catch (error) {
            console.error('Error parsing stored recipes:', error);
        }
        loader.style.display = 'none';
    } else {
        // API call
        fetch(URL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            return response.json();
        })
        .then(data => {
            setTimeout(() => {
                loader.style.display = 'none';
            }, 2000)
            
            const validRecipes = data.recipes.filter(recipe => {
                return recipe.diets.length > 0
            })
            recipes = validRecipes;
            localStorage.setItem('recipes', JSON.stringify(recipes)); // Store recipes in local storage
            applyFilters()
        })
        .catch(error => {
            console.log(error);
            loader.style.display = 'none';
            container.innerHTML += 
            `<div class="errorMessages">
                <h2>There was an error loading the recipes</h2>
                <p>${error.message}</p>
                <button class="errorButton">Dismiss</button>
            </div>
            `;
            document.querySelector('.errorButton').addEventListener('click', () => {
                document.querySelector('.errorMessages').classList.add('hidden')
            })
        })
        }
}

// Event listeners
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

document.querySelector("button").addEventListener("click", function() {
    let searchValue = document.getElementById("search").value;
    console.log("Searching for:", searchValue);
    filterBySearch(searchValue);
})

loadData()