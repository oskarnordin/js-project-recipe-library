const buttonCuisine = document.querySelectorAll(".buttonCuisine")
const buttonTime = document.querySelectorAll(".buttonTime")

buttonCuisine.forEach(button => {
    button.addEventListener("click", () => {
        console.log(`${button.textContent} button clicked`);
    });
});

buttonTime.forEach(button => {
    button.addEventListener("click", () => {
        console.log(`${button.textContent} button clicked`);
    });
});
