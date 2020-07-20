const BASE_URL = "http://localhost:3000"

class Category{
    constructor(cat){
        this.id = cat.id 
        this.name = cat.name
    }

    renderCat(){
        return `
        <button id="${this.name}" data-id = "${this.id}">${this.name}</button>`
    }
}

class Grocery{
    constructor(g){
        this.id = g.id
        this.title = g.title
        this.product_details = g.product_details
        this.quanity = g.quanity
        this.img_url = g.img_url
        this.category = g.category 

    }
    renderGrocery(){
    return `<div class="grocery-card" data-id="${this.id}">
    <img data-id="${this.id}" src="${this.img_url}"/>
    <div class="container" >
    <h2>${this.title}</h2>
   
    <p data-category="${this.category.id}">${this.category.name}</p>
    <a class= "add-to-cart" href="#">Add to cart</a>
     </div>
    </div>`
    }
}

function fetchGroceries(){

    let container = document.getElementById("grocery-container")
    let div = document.createElement("div")
    return fetch(BASE_URL+"/items")

    .then(resp => resp.json())

    .then(json => {
        json.forEach(g =>{
            let grocer = new Grocery(g)
          
            div.innerHTML += grocer.renderGrocery()
            make_clickable() 
            
        })
       
    })
}



function make_clickable(){
    let link = document.querySelector(".nav-links")
    let home = document.querySelector(".logo")
    home.addEventListener("click", homePage)
    
    link.addEventListener("click", displayCats)
    
    let cards = document.querySelectorAll(".grocery-card")
    cards.forEach(card=>{
        card.querySelector("img").addEventListener("click", displayCard)})
    
    let form = document.getElementById("recipeForm")
    form.addEventListener("click", displayForm)

    
}

function displayForm(){
    clearPage()

    let formPage = document.getElementById("recipe-Form")
    fetch(BASE_URL+"/categories")
     .then(resp => resp.json())
     .then(categories =>{
        let category_buttons = categories.map(category=>
            `
            <input type="radio" class="radio-g" id="category" name="${category.name}" value="${category.id}"></input>
            <label>${category.name}</label>`
        ).join("")
   
    let form = `
    
    <form>
    <label>Category</label><br>
        
    ${category_buttons}<br>

    <label>Title</label>
    <input type="text" id="title"><br>

    <label>Product Details</label>
    <input type="text" id="product_details"><br>

    <label>Quanity</label>
    <input type="text" id="quanity"><br>

    <label>Img-url:</label>
    <input type="text" id="img_url"><br>
    
    <input type="submit">
    </form>   `

    formPage.innerHTML = form

    document.querySelector("form").addEventListener("submit", addGrocery)

    })
}

function updateGrocery(){

    event.preventDefault()

    let id = event.target.dataset.id

    const grocery = {
        title: document.getElementById("title").value,
        product_details:  document.getElementById("product_details").value,
        quanity:    document.getElementById("quanity").value,
        img_url: document.getElementById("img_url").value,
        category_id:   id
    }
    fetch(BASE_URL+"/items/"+id,{
        method: "PATCH",
        body: JSON.stringify(grocery),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then(resp => resp.json())
    .then(data =>{
        document.querySelector(`.back-card img[data-id="${id}"`).parentElement.innerHTML = `<div class="back-card">
        <h3>${data.title}</h3>
        <img data-id="${data.id}" src="${data.img_url}"/>
        <p>${data.product_details}</p>
        <p>${data.quanity} boxes in stock</p>
        <button id="delete" data-id="${data.id}">Delete</button>
        <button id="update" data-id="${data.id}">Edit</button>
       </div>
        `
        make_clickable()
        clearForm()
    })
}

function deleteItem(){

    event.preventDefault()

    let id = event.target.dataset.id
    fetch(BASE_URL+"/items/"+id,{
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
         
        }
    })
    .then(event.target.parentElement.remove())
    make_clickable()
}

function addGrocery(){
    event.preventDefault()

    let id = Array.from(document.querySelectorAll(".radio-g")).find(r => r.checked).value;

    const grocery = {
         title: document.getElementById("title").value,
         product_details:  document.getElementById("product_details").value,
         price:       document.getElementById("price").value,
         quanity:    document.getElementById("quanity").value,
         img_url: document.getElementById("img_url").value,
         category_id:   id

    }

    fetch(BASE_URL+"/items",{
        method: "POST",
        body: JSON.stringify(grocery),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'

        }
    })

    .then(resp => resp.json())
    .then(json => {
        json.forEach(g =>{
            let groc = new Grocery(g)
            let container = document.querySelector("#grocery-container") 
            container.innerHTML += groc.renderGrocery()
            
            clearForm()
            make_clickable()
            
        })
        
        
    })

}

function homePage(){
    clearPage()
    clearThisPage()
    fetchGroceries()
}


function clearPage(){
  let container = document.getElementById("grocery-container")
  container.innerHTML = ""  
}

function clearThisPage(){
    let cartsContain = document.getElementById("carts-container")
    cartsContain.innerHTML = ""
}

function displayCard(){
    
    let id = event.target.dataset.id
    let container = document.getElementById("grocery-container")
    let div = document.createElement("div")
    clearPage()

    fetch(BASE_URL+"/items/"+id)
     .then(resp => resp.json())
 
     .then(data => {
         div.innerHTML += `<div class="back-card">
         <h3>${data.title}</h3>
         <img data-id="${data.id}" src="${data.img_url}"/>
         <p>${data.product_details}</p>
         <p>${data.quanity}<p>
         
         `
         
     })
   
     container.appendChild(div)
}


function displayLinks(){
    clearPage()
    clearThisPage()
    let cartsContainer = document.getElementById("carts-container")
    let div = document.createElement("div")
    let id = event.target.dataset.id
    return fetch(BASE_URL+"/categories/"+id)
    .then(resp => resp.json())
    .then(data => {
            data.recipes.forEach(s => {
            
            div.innerHTML += `
            <div data-id="${data.id}" class="category">
            <h1>${data.name}</h1>
            <img src="${s.img_url}"/>
            <p>${s.title}</p>
            </div>`

        
        cartsContainer.appendChild(div)})
    })   
}

function cartArray(){
    fetch(BASE_URL+"/items")
    .then(resp => resp.json())
    .then(items => {
        items.forEach(item =>{
            arrayCart.push(item)
        })
    })
}




document.addEventListener("DOMContentLoaded", ()=>{
    fetchGroceries()
    cartArray()
    
    
    
    
})