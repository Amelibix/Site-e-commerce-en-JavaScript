fetch("http://localhost:3000/api/products") // Récupération de l'API//
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {

    productsCart(data)
  });



function productsCart(product) {

  let saveProducts = JSON.parse(localStorage.getItem("product")); //Récupération du LocalStorage // 

  for (article of saveProducts) {

    //Mise en lien du tableau de l'API et du tableau du LocalStorage //
    for (i = 0; i < product.length; i++) {

      if (article.id == product[i]._id) {

        article.price = product[i].price;
        article.name = product[i].name;
        article.image = product[i].imageUrl;
        article.alt = product[i].altTxt;
      }
    }
  }

  createProducts(saveProducts)
  changeValueQuantity()
  valueQuantityTotal(saveProducts)
  valuePriceTotal(saveProducts)
  deleteItem()
}


let itemsCart = document.querySelector("#cart__items");

function createProducts(product) {

  itemsCart.innerHTML += product.map((article) =>  // Crée un nouveau tableau avec toutes les informations du produit // 

    `<article class="cart__item" data-id="${article.id}" data-color="${article.color}">
    <div class="cart__item__img">
    <img src="${article.image}" alt="${article.alt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${article.name}</h2>
        <p>${article.color}</p>
        <p>${article.price} €</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${article.quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article>`);

}


//----------------Changement de quantité------------------------//

function changeValueQuantity() {

  let changeQuantity = document.querySelectorAll(".cart__item")

  changeQuantity.forEach((element) => {
    element.addEventListener("click", (param) => {

      let saveProducts = JSON.parse(localStorage.getItem("product"));
      // On rappelle les produits du LocalStorage pour changer ensuite la quantité // 

      for (let article of saveProducts) {

        if (
          article.id == element.dataset.id &&
          article.color == element.dataset.color) {

          article.quantity = parseInt(param.target.value);

          localStorage.setItem("product", JSON.stringify(saveProducts))
        }
      }
      /*location.reload()*/
    });
  });
}

//--------------- Calcul du prix et de la quantité total  --------------------//



function valueQuantityTotal(param) {

  let totalQuantity = document.querySelector("#totalQuantity");

  // On parcours notre tableau pour additionner la quantité // 
  let total = param.reduce((acc, value) => {

    acc = acc + value.quantity
    return acc
  }, 0);

  totalQuantity.textContent += total;
}

function valuePriceTotal(param) {

  let totalPrice = document.querySelector("#totalPrice");

  let priceProduct = param.reduce((acc, value) => {
    acc += value.price * value.quantity
    return acc

  }, 0);

  totalPrice.textContent += priceProduct;
}

//-------------------------Ajout du bouton supprimer ------------------------//

function deleteItem() {

  let deleteProduct = document.querySelectorAll(".deleteItem");

  deleteProduct.forEach((element) => {

    element.addEventListener("click", () => {

      let article = element.closest("article")
      let productId = article.dataset.id;
      let productColor = article.dataset.color;

      let saveProducts = JSON.parse(localStorage.getItem("product"));


      let foundProduct = saveProducts.find(element => element.id == productId && element.color == productColor)


      saveProducts.splice(foundProduct, 1) // Permet de supprimer une valeur de notre tableau //

      localStorage.setItem("product", JSON.stringify(saveProducts))

      console.log(saveProducts)
      console.log(foundProduct)

      article.parentElement.removeChild(article) // Suprimer le DOM


      /*location.reload()*/
    });
  });
}

