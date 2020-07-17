class Todo{
    constructor(description, recipe_id){
    this.description = description;
    this.recipe_id = recipe_id;
    }
}

function displayTodos(){       
    clearForm()
    let main = document.querySelector('#main')
    main.innerHTML = ""

    fetch(BASE_URL+"/todos")
	.then(response => response.json())
    .then(main.innerHTML += `<h2> Here's your Todo List!</h2> <ol id="todosOl"></ol>`)
    .then(todos => {
        todos.forEach(todo => {
            let li = `
                <li id="todoLi-${todo.id}">               
                
                <a href="#" class="todo-li" data-todo-id="${todo.id}">${todo.description}</a> 
                    <a href="#" class='edit-todo-link' data-edit-todo-id="${todo.id}">  Edit</a> 
                    <a href="#" class='delete-todo-link' data-delete-todo-id="${todo.id}">  Delete</a>
                    <ul>
                        <li> Description: ${todo.description} </li>
                        <li id="todoRecipe"> Going to: <a href="#" data-recipe-id="${todo.recipe.id}">${todo.recipe.ingredients}</a></li>
                    </ul>
                </li>
            `
            document.querySelector("#todosOl").innerHTML += li
        })
        
        clickableLinks()
    })
}

function showTodo(){        
    let id = event.target.dataset.todoId                          
    let main = document.querySelector('#main')

    fetch(BASE_URL+`/todos/${id}`)
	.then(response => response.json())
	.then(todo => {
        main.innerHTML = `
            <h2>Todo: ${todo.description}</h2>
          

            <a href="#" class='edit-todo-link' data-edit-todo-id="${todo.id}">  Edit todo</a> 
            <a href="#" class='delete-todo-link' data-delete-todo-id="${todo.id}">  Delete todo</a>
        
        `
    })
    clickableLinks()
}

function createTodoForm(){      
    let id = 'test'
    let form = document.getElementById('createTodoForm')
    let html = `
            <form>
                <label for="name">Enter Your Todo List:</label><br><br>
                
                <input type="text" id="todo-description" name="description" value="Type Description Here"><br><br>
                
                <input type="hidden" id="todo-recipe_id" name="recipe_id" value="${id}"><br><br>
                <input type="submit" value="Submit">
                <br>
            </form> 
    `
    form.innerHTML = html
        let nameField = document.getElementById('todo-description').addEventListener('click', clearPlaceHolderOnClick)
       
        document.querySelector("form").addEventListener('submit', createTodo)
}
function deleteTodo(){        //Todo delete action
    event.preventDefault();
    fetch(BASE_URL+`/todos/${event.target.dataset.deletetodoId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
        .then(event.target.parentElement.remove())
}