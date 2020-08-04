

//const searchForCategories = () => {
    /*let searchBar = document.getElementById("searchBar");
  
    searchBar.addEventListener("keyup", (event) => {
      let categories = document.querySelectorAll("p");
      const search = event.target.value.toLowerCase();
      Array.from(categories).forEach((category) => {
        let categoryName = category.innerText;
  
        if (categoryName.toLowerCase().indexOf(search) > -1) {
          category.parentElement.style.display = ""; 
        } else {
          category.parentElement.style.display = "none"; 
        }
      });
    });*/

//}
const displaySearch = () => {
  let searchForm = document.getElementById("search-form");
  let html = `
  <form>
    <label>Name</label>
    <input type="text" id="name">
    <input type="submit" value="Submit">
  </form>
  `;

  searchForm.innerHTML = html;
  document.querySelector("form").addEventListener("submit", searchForCategories);
} //this works


const searchForCategories = () => {
  event.preventDefault();
  console.log("Form clicked");

  input = document.getElementById("name"); 


  fetch(CATEGORIES_URL)
  .then((response) => response.json())  
  .then((data) => {   
    console.log(data); 
});
}


