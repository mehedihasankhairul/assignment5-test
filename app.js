const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');


// add event listener

searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);

function getMealList() {
    let searchInputText = document.getElementById('search-input').value

    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputText}`)
        .then(response => response.json())
        .then(data => {
            let htmlCode = " ";
            if (data.meals) {
                data.meals.forEach(meal => {
                    htmlCode += `
                            <div class="meal-item data-id ="${meal.idmeal} ">
                            <div class="meal-img ">
                            <img src="${meal.strMealThumb}" alt=" meal
                            "> 
                            </div>
                            <div class="meal-name">
                            <h3> ${meal.strMeal}</h3>
                            <a href = "#" class = "recipe-btn"> Details </a>
                            </div>
                            </div>
                    `;
                    mealList.classList.remove('itemNotFound');
                })
            }
            else{
                htmlCode = "We are sorry😢. This item is not available at this moment! <br> Please Try Another Item";
                mealList.classList.add('itemNotFound');
            }
            mealList.innerHTML = htmlCode;
        })
}

// Meal Details
// Details API
// https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772
// X Details API

function getMealRecipe(e){
    e.preventDefault();
  if(e.target.classList.contains('recipe-btn')){
      let mealItem = e.target.parentElement.parentElement;
    console.log(mealItem);
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
      .then(res => res.json())
      .then(data => {
          console.log(data);
      })
  }
    
}



