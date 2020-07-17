const BASE_URL = "http://localhost:3000"

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
            container.appendChild(div)
            
        })
        make_clickable()
    })
}



function make_clickable(){
    let links = document.querySelectorAll(".nav-links")
    let home = document.querySelector(".logo")
    home.addEventListener("click", homePage)
    links.forEach(link => {
        link.addEventListener("click", displayLinks)
    })

    let cards = document.querySelectorAll(".grocery-card")
    cards.forEach(card=>{
        card.querySelector("img").addEventListener("click", displayCard)})
    
    let form = document.getElementById("recipeForm")
    form.addEventListener("click", displayForm)

    
}

function displayForm(){
    let formPage = document.getElementById("recipe-Form")
    let form = `
    
    <form>
    <label>Title</label>
    <input type="text" id="title"><br>
    <label>Product Details</label>
    <input type="text" id="product_details"><br>
    <label>Quanity</label>
    <input type="text" id="quanity"><br>
    <input type="submit">
    </form>   `

    formPage.innerHTML = form

    document.querySelector("form").addEventListener("submit", addGrocery)

}

function addGrocery(){
    event.preventDefault()

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