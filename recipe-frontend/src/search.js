const searchForCategories = () => { // creates a function
let searchBar = document.getElementById("searchBar"); // selects the element with id searchBar

searchBar.addEventListener("keyup", (event) => { // on that searchBar element, adds an event listener that triggers every time a user lets go of a key
  let categories = document.querySelectorAll("p"); // selects all the p elements (paragraphs) on the page
  const search = event.target.value.toLowerCase(); // creates a string with the value of searchBar input element (and makes it all lowerCase)
  Array.from(categories).forEach((category) => { // creates an array from all the p elements and loops over all of them
    let categoryName = category.innerText; //gets the innerText of each p element

    if (categoryName.toLowerCase().indexOf(search) > -1) { // checks if the p element's text contains the same string value as the one in the search bar (true if it does, false if it doesn't)
      category.parentElement.style.display = ""; // makes the element visible, by making the display property empty on the paragraph's parent if the text matches
    } else {
      category.parentElement.style.display = "none"; // hides the element if the text does not match the search text
    }
  });
});
};
