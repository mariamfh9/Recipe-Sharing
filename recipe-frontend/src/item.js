class Item {
    constructor(data) {
      this.id = data.id;
      this.categoryId = data.category_id;
      this.title = data.title;
      this.quanity = data.quantity;
    
    }
  
    renderItem() {
      let card = document.querySelector(`[data-id='${this.categoryId}']`);
      let ul = card.querySelector(".items-list");
  
      let itemCard = document.createElement("li");
      itemCard.id = `item-${this.id}`;
      itemCard.innerText = `Title: ${this.title}`;
      let releaseBtn = document.createElement("button");
      releaseBtn.className = "delete";
      releaseBtn.dataset.itemId = this.id;
      releaseBtn.innerText = "Delete";
      releaseBtn.addEventListener("click", deleteItem);
      ul.appendChild(itemCard);
      itemCard.appendChild(releaseBtn);
    }
  }