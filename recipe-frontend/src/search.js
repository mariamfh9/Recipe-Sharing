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
    if (data == input){
      
    }
  });
}
