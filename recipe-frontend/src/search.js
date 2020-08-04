const searchForCategories = () => {
    let searchBar = document.getElementById("searchBar");
  
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
    });
  };
  
