const BASE_URL = 'http://localhost:3000'
//import { deleteRecipe } from "./src/recipe.js";

window.addEventListener('load', () => {
    getRecipes()
    
})

function clickableLinks(){
    let recipes = document.querySelectorAll('.recipe-li')
    recipes.forEach(recipe =>{
        recipe.addEventListener('click', showRecipe)
    })
    let todos = document.querySelectorAll('.todo-li')
    todos.forEach(todo =>{
        todo.addEventListener('click', showTodo)
    })
    document.getElementById('newRecipe').addEventListener('click', createRecipeForm)
    document.getElementById('newRecipe2').addEventListener('click', createRecipeForm)
    document.getElementById('recipes').addEventListener('click', getRecipes)  
    document.getElementById('recipes2').addEventListener('click', getRecipes)  
    document.getElementById('todos').addEventListener('click', displayTodos)
    document.getElementById('todos2').addEventListener('click', displayTodos)
    document.getElementById('new-todo-link').addEventListener('click', createTodoForm)


    let recipeLinks = document.querySelectorAll('#todosOl li ul li a')
    recipeLinks.forEach(link => link.addEventListener('click', showRecipe)) 
    
    let editRecipes = document.getElementsByClassName('edit-recipe-link')
    for (const element of editRecipes) {
        element.addEventListener('click', editRecipe)                            
    }
      
    let deleteRecipes = document.getElementsByClassName('delete-recipe-link')
    for (const element of deleteRecipes) {
        element.addEventListener('click', deleteRecipe)                           
    }

    let editTodos = document.getElementsByClassName('edit-todo-link')
    for (const element of editTodos) {
        element.addEventListener('click', editTodo)                            //define this functions
    }
      
    let deleteTodos = document.getElementsByClassName('delete-todo-link')
    for (const element of deleteTodos) {
        element.addEventListener('click', deleteTodo)                           //define this functions
    }
    
}


function clearPlaceHolderOnClick(textField){
    event.target.value = ""
}


function clearForm(){
    let createRecipeForm = document.getElementById('createRecipeForm')
    createRecipeForm.innerHTML = ""
}


function tempWarning(){
    let warning = document.getElementById("temp-warning")
    warning.remove()
}
