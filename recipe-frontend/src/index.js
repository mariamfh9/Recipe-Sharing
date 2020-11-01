const BASE_URL = "http://localhost:3000";
const CATEGORIES_URL = `${BASE_URL}/categories`;
const ITEMS_URL = `${BASE_URL}/items`;

window.addEventListener("load", () => {
  getCategories();
  createNewCategory();
  //displaySearch();

  
});

const main = () => {
  return document.querySelector("main"); //DOM Node, JS object
};


//loads all the categories
const getCategories = () => {
  fetch("http://localhost:3000/categories")
    .then((response) => response.json())
    .then((data) => renderCategories(data));
};

const renderCategories = (categoriesData) => {
  categoriesData.forEach((category) => renderCategoriesCard(category));
};

const renderCategoriesCard = (categories) => {
  let categoriesCard = document.createElement("div");
  categoriesCard.className = "card";
  categoriesCard.dataset.id = categories.id;
  categoriesCard.innerHTML = `
    <p>${categories.name}</p>
    <button data-category-id=${categories.id}>Add Item</button>
  `;
  categoriesCard.lastElementChild.addEventListener("click", displayItemForm);
  main().appendChild(categoriesCard);
  let itemsList = document.createElement("ul");
  itemsList.setAttribute("class", "items-list");
  itemsList.dataset.id = categories.id;
  categoriesCard.appendChild(itemsList);

  categories.items.forEach((item) =>{
    let i = new Item(item); 
    i.renderItem(); 
  });
};


const createNewCategory = () => {
  let form = document.querySelector("a");
  form.addEventListener("click", displayCategoryForm);
};

const displayCategoryForm = () => {
  let categoryForm = document.getElementById("category-form");
  let html = `
  <form>
    <label>Name</label>
    <input type="text" id="name">
    <input type="submit" value="Submit">
  </form>
  `;

  categoryForm.innerHTML = html;
  document.querySelector("form").addEventListener("submit", createCategory);
};

const createCategory = () => {
  event.preventDefault();
  console.log("Form clicked");

const category = {
    name: document.getElementById("name").value,
};

  createNewCategory();



  //fetch POST, configuration object
  fetch(CATEGORIES_URL, {
    method: "POST",
    body: JSON.stringify(category),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((response) => response.json())  //what destination server sent back 
                                          //turns body of response into javascript object
    .then((data) => {   
      renderCategoriesCard(data);  
      clearCategoryForm();
    });
};

const renderItems = (item, list) => {
  let itemCard = document.createElement("li");
  itemCard.id = `item-${item.id}`;
  itemCard.innerText = `Title: ${item.title}`;
  let releaseBtn = document.createElement("button");
  releaseBtn.className = "delete"; 
  releaseBtn.dataset.itemId = item.id;
  releaseBtn.innerText = "Delete";
  releaseBtn.addEventListener("click", deleteItem);
  itemCard.appendChild(releaseBtn);
  if (!list) {
    list = event.target.parentElement.lastElementChild;
  }
  list.appendChild(itemCard);
};

const clearForm = () => {
  let item = document.getElementById("item-form");
  item.innerHTML = "";
};
const clearCategoryForm = () => {
  let category = document.getElementById("category-form");
  category.innerHTML = "";
};

const deleteItem = () => {
  fetch(ITEMS_URL + `/${event.target.dataset.ItemId}`, {
    method: "DELETE",
  }).then(removeItem(event.target.dataset.itemId));
  
};

const removeItem = (id) => {
  let cardToRemove = document.getElementById(`item-${id}`);
  cardToRemove.parentElement.removeChild(cardToRemove);
};



const displayItemForm = () => {
  let itemForm = document.getElementById("item-form");
  let html = `
  <form data-category-id="${event.target.dataset.categoryId}">
    <label>Title</label>
    <input type="text" id="title">
    <label>Item Quantity</label>
    <input type="text" id="quantity">
    <input type="submit" value"Submit">
  </form>
  `;

  itemForm.innerHTML = html;
  document.querySelector("form").addEventListener("submit", createItem);
};
//createNewItem(); 

const createItem = () => {
  event.preventDefault();
  console.log("adding items...");
  let categoryCardId = event.target.dataset.categoryId;
  console.log(categoryCardId);
  const item = {
    title: document.getElementById("title").value,
    quantity: document.getElementById("quantity").value,
    category_id: categoryCardId,
  };
  
  console.log(item);

  fetch(ITEMS_URL, {
    method: "POST",
    body: JSON.stringify(item),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      let item = new Item(data);
      item.renderItem();
      clearForm();
    });
};



// fetch category data

// create category objects and store then in an array

// let categories = []

// fetch(CATEGORIES_URL)
//   .then(r => r.json())
//   .then(cData => {
//     cData.forEach(cJson => {
//       const category = new Category(cJson)
// //imagine in my category class, I have a display( ) method that can add a category to the DOM

//       category.display()
//       categories.push(category)
//   })
 
// })

// document.querySelector('button').addEventListener('click', () => {
//   console.log(categories)
// })


// function deleteCatgory(categoryToBeDeleted) {
//   categories = categories.filter(c => {
//     return  categoryToBeDeleted != c
//   })
//   displayCategories()
// }

// function displayCategories() {

//   // find the div that contains categories and set its innerHTML = ""
//   categories.forEach(c => {
//     c.display()
//   })
// }

// class Category {
//   constructor(){
//     this.items = []
//   }

//   display() {
//     // this could display a category but also loop through the items and display those within it
//   }
// }

