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
    <p>Price per box: $${this.price}</p>
    <p>In Stock: ${this.quanity}</p>
    <p data-category="${this.category.id}">${this.category.name}</p>
     </div>
    </div>`
    }
}

function fetchGroceries(){

    let container = document.getElementById("groceries-container")
    let div = document.createElement("div")
    return fetch(BASE_URL+"/items")

    .then(resp => resp.json())

    .then(json => {
        json.forEach(g =>{
            let groc = new Grocery(g)
            container.innerHTML += groc.renderGrocery()
            
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
    
        <label>Title:</label>
        <input type="text" id="title"><br>
    
        <label>Product Details:</label>
        <input type="text" id="product_details"><br>
    
        <label>Quanity:</label>
        <input type="text" id="quanity"><br>
    
        <label>Img-url:</label>
        <input type="text" id="img_url"><br>
    
        <input type="submit">
        </form>   `
    
        formPage.innerHTML = form
    
        document.querySelector("form").addEventListener("submit", addGrocery)

     })
}

function editItem(){
    event.preventDefault()

    let id = event.target.dataset.id
    let formPage = document.getElementById("recipe-Form")
    fetch(BASE_URL+"/items/"+id)
     .then(resp => resp.json())
     .then(item => { 
       

        let form =  `<form data-id ="${id}">
            
        <label>Title:</label>
        <input type="text" id="title" value="${item.title}"><br>
    
        <label>Product Details:</label>
        <input type="text" id="product_details" value="${item.product_details}"><br>
    
    
        <label>Quanity:</label>
        <input type="text" id="quanity" value="${item.quanity}"><br>
    
        <label>Img-url:</label>
        <input type="text" id="img_url" value="${item.img_url}"><br>
    
        <input type="submit">
        </form>   `

        formPage.innerHTML = form
    
        document.querySelector("form").addEventListener("submit", updateGrocery)
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
            let container = document.querySelector("#groceries-container") 
            container.innerHTML += choco.renderGrocery()
            
            clearForm()
            make_clickable()
            
        })
        
        
    })

}

function homePage(){
    clearPage()
    clearForm()
    fetchGroceries()
}

function clearForm(){
    let fod = document.getElementById("recipe-Form")
    fod.innerHTML = ""
}


function clearPage(){
  let container = document.getElementById("groceries-container")
  container.innerHTML = ""  
}

function clearThisPage(){
    let grocContain = document.getElementById("groc-container")
    grocContain.innerHTML = ""
}

function clearLinks(){
    let links = document.getElementById("linked")
    linked.innerHTML = ""
}

function displayCard(){
    
    let id = event.target.dataset.id
    let container = document.getElementById("groceries-container")
    let div = document.createElement("div")
    clearPage()

    fetch(BASE_URL+"/items/"+id)
     .then(resp => resp.json())
 
     .then(data => {
         div.innerHTML += `<div class="back-card">
         <h3>${data.title}</h3>
         <img data-id="${data.id}" src="${data.img_url}"/>
         <p>${data.product_details}</p>
         <p>${data.quanity} boxes in stock</p>
         <button id="delete" data-id="${data.id}">Delete</button>
         <button id="update" data-id="${data.id}">Edit</button>
        </div>
         `
         
         document.getElementById("delete").addEventListener("click", deleteItem)
         document.getElementById("update").addEventListener("click", editItem)
     })
   
     container.appendChild(div)
}

function displayCats(){
    clearPage()
    clearForm()
    let container = document.getElementById("groceries-container")
    fetch(BASE_URL+"/categories")
    .then(resp => resp.json())
    .then(cats =>{
        cats.forEach(cat =>{
            let catt = new Category(cat)
            container.innerHTML += catt.renderCat()
            make_clickable()

            let linkz = document.querySelectorAll("#groceries-container > button")
            linkz.forEach(link =>{
                link.addEventListener("click", displayLinks)
            })

        }) 
    })
}


function displayLinks(){
    
    
    let container = document.getElementById("groceries-container")
    container.innerHTML = "" 
    let id = event.target.dataset.id
    return fetch(BASE_URL+"/categories/"+id)
    .then(resp => resp.json())
    .then(data => {
            data.items.forEach(s => {
            
            container.innerHTML += `
            
            <div data-id="${s.id}" class="category">
            <h3>${s.title}</h3>
            <img data-id="${s.id}" src="${s.img_url}"/>
            <p>Stock Inventory: ${s.quanity}</p>
            
            </div>`

            let classes = document.querySelectorAll(".category")
            classes.forEach(c =>{
                c.addEventListener("click", displayCard)

            })
        })
    })   
}

window.addEventListener("DOMContentLoaded", ()=>{
    fetchGroceries()
    
    
    
    
    
    
})