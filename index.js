$(document).ready(addFormEventHandler)


function addFormEventHandler (){
  $('form#recipe-form').submit(handleFormSubmit)
}

function handleFormSubmit (event){
  console.log(event)
  event.preventDefault()
  findAndRenderRecipes()
}

function findAndRenderRecipes(){
  const URL = 'http://www.recipepuppy.com/api/'
  // find the user's search query and interpolate that into the URL
  let $ingInput = $('input#ingredients')
  let ingredients = $ingInput.val()
  let ingredientsQuery = ingredients.split(' ').join(',')
  $ingInput.val('')

  let $mealInput = $('input#meal')
  let meal = $mealInput.val()
  let mealQuery = meal.split(' ').join('+')
  $mealInput.val('')

  // 1. Find what the user put in the input field and then append that into the url as so
  // 'http://www.recipepuppy.com/api/?i=onions,garlic&q=omelet&p=3 '
  // 'https://www.googleapis.com/books/v1/volumes?q=dogs'

  // 1. Fire an XHR reqeust to the google books API

  $.ajax({
    url: `${URL}?i=${ingredientsQuery}&q=${mealQuery}&p=1`,
    dataType: 'jsonp',
    jsonpCallback: 'callback',
    success: renderRecipes,
    error: (data) => {
      console.log(data)
    }
  })
}

function renderRecipes (data){
  // 2. When the response comes back, append some lis to my ul for the user

  let recipeList = $('.js--recipe-list')
  recipeList.html('<h4 class = "center-align">Recipes Found</h4><hr>')

  function renderRecipe (  recipe ) {

    let title = recipe.title
    let ingredients = recipe.ingredients
    let link = recipe.href
    let thumbnail = recipe.thumbnail
    recipeList.append(`<li class='collection-item'> <a href=${link} >${title }</a><img align="right"  src=${thumbnail}></li><li class='collection-item ingredients'>Ingredients: ${ingredients}</li>`)
  }

if (data.results.length < 1) {
  recipeList.append("<li class='collection-item'><h5>No Results Found </h5></li>")
} else {
  data.results.forEach(renderRecipe)
}}

//
// for (var i = 0; i < array.length; i++) {
//   // every pass through the loop, we get a new i
//   // otherwise, we overwrite what i is
//   array[i]
// }
