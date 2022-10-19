
fetch("http://localhost:3000/api/products") // Récupération de l'API//
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {

    productsCart(data)
  });



function productsCart(product) {
  let saveProducts = JSON.parse(localStorage.getItem("product")); //Récupération du LocalStorage // 


  if (saveProducts != 0) {

    for (article of saveProducts) {

      //Mise en lien du tableau de l'API et du tableau du LocalStorage //
      for (i = 0; i < product.length; i++) {

        if (article.id == product[i]._id) {

          article.price = (new Intl.NumberFormat('de-DE').format(product[i].price));
          article.name = product[i].name;
          article.image = product[i].imageUrl;
          article.alt = product[i].altTxt;
        }
      }
      itemsCart.innerHTML += createProducts(article)
    }


  } else {
    document.querySelector(".cartAndFormContainer").innerHTML = "<h1> Votre Panier est vide <br> Veillez retourner sur la page <a href ='index.html'>d'Acceuil</a></h1>"
  }
  createProducts(saveProducts)
  changeValueQuantity()
  valueQuantityTotal(saveProducts)
  valuePriceTotal(saveProducts)
  deleteItem()
}


let itemsCart = document.querySelector("#cart__items");

function createProducts(article) {

  return `<article class="cart__item" data-id="${article.id}" data-color="${article.color}">
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
  </article>`;


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
          valueQuantityTotal(saveProducts)

        }
      }
      /*location.reload()*/
      console.log("changement de valeur", saveProducts)


    });
  });
}



//--------------- Calcul du prix et de la quantité total  --------------------//



function valueQuantityTotal(productList) {

  let totalQuantity = document.querySelector("#totalQuantity");

  // On parcours notre tableau pour additionner la quantité // 
  let total = productList.reduce((acc, product) => {

    acc = acc + product.quantity
    return acc
  }, 0);

  totalQuantity.textContent = total;
}

function valuePriceTotal(productList) {

  let totalPrice = document.querySelector("#totalPrice");

  let priceProduct = productList.reduce((acc, product) => {
    acc += product.price * product.quantity
    return acc

  }, 0);

  totalPrice.textContent = priceProduct;
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

      let indexProduct = saveProducts.indexOf(foundProduct)

      saveProducts.splice(indexProduct, 1) // Permet de supprimer une valeur de notre tableau //

      localStorage.setItem("product", JSON.stringify(saveProducts))

      console.log(saveProducts)
      console.log(foundProduct)


      article.parentElement.removeChild(article) // Suprimer le DOM


      /*location.reload()*/
    });
  });
}

//----------------------------------Formulaire ---------------------------------------------------------//

const form = document.querySelector(".cart__order__form");

const formFirstName = document.querySelector("#firstName");
const formLastName = document.querySelector("#lastName");
const formAddress = document.querySelector("#address");
const formCity = document.querySelector("#city");
const formEmail = document.querySelector("#email")
const btn_cart = document.querySelector("#order")

// Ecouter la modification de l'email //

formEmail.addEventListener('change', function () {
  validEmail(this);

});

const validEmail = function (parametre) {

  let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g');

  let testEmail = emailRegExp.test(parametre.value);
  let messageEmail = document.querySelector("#emailErrorMsg");

  if (testEmail == true) {
    messageEmail.innerHTML = "Adresse mail valide";
    messageEmail.style.color = "green";
    return true;

  } else {
    messageEmail.innerHTML = "Adresse mail non valide";
    messageEmail.style.color = "red";
    return false;
  }
};

//Ecoute de la modification du Prénom //

formFirstName.addEventListener('change', function () {
  validFirstName(this);

});
const validFirstName = function (parametre) {
  let firstNameRegExp = new RegExp('^[a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ\s-]{1,31}$', 'g');

  let testFristName = firstNameRegExp.test(parametre.value);
  let messageFirstName = document.querySelector("#firstNameErrorMsg");

  if (testFristName == true) {
    messageFirstName.innerHTML = "Prénom valide";
    messageFirstName.style.color = "green";
    return true;

  } else {
    messageFirstName.innerHTML = "Prénom non valide";
    messageFirstName.style.color = "red";
    return false;
  }
};

//Ecoute de la modification du nom // 

formLastName.addEventListener('change', function () {
  validLastName(this);

});
const validLastName = function (parametre) {
  let lastNameRegExp = new RegExp('^[a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ\s-]{1,31}$', 'g');

  let testLastName = lastNameRegExp.test(parametre.value);
  let messageLastName = document.querySelector("#lastNameErrorMsg");

  if (testLastName == true) {
    messageLastName.innerHTML = "Nom valide";
    messageLastName.style.color = "green";
    return true;

  } else {
    messageLastName.innerHTML = "Nom non valide";
    messageLastName.style.color = "red";
    return false;
  }
};

// Ecoute de la modification de l'adresse // 
formAddress.addEventListener('change', function () {
  validAddress(this);

});
const validAddress = function (parametre) {
  let adressRegExp = new RegExp('[A-z]{5,10}', 'g');

  let testAddress = adressRegExp.test(parametre.value);
  let messageAddress = document.querySelector("#addressErrorMsg");

  if (testAddress == true) {
    messageAddress.innerHTML = "Adresse valide";
    messageAddress.style.color = "green";
    return true;

  } else {
    messageAddress.innerHTML = "Adresse non valide";
    messageAddress.style.color = "red";
    return false;
  }
};

// Ecoute la modification de la ville // 

formCity.addEventListener('change', function () {
  validCity(this);

});
const validCity = function (parametre) {
  let cityRegExp = new RegExp('[A-z]{2,10}', 'g');

  let testCity = cityRegExp.test(parametre.value);
  let messageCity = document.querySelector("#cityErrorMsg");

  if (testCity == true) {
    messageCity.innerHTML = "Ville valide";
    messageCity.style.color = "green";
    return true;

  } else {
    messageCity.innerHTML = "Ville non valide";
    messageCity.style.color = "red";
    return false;
  }
};



// On recupères les informations dans un objet // 


btn_cart.addEventListener("click", (e) => {
  e.preventDefault();

  let saveProducts = JSON.parse(localStorage.getItem("product"));
  let cartId = [];

  for (let article of saveProducts) {
    cartId.push(article.id)
  }

  if (validEmail(formEmail) && validFirstName(formFirstName) && validLastName(formLastName) && validAddress(formAddress) && validCity(formCity)) {

    let values = {
      contact: {
        firstName: formFirstName.value,
        lastName: formLastName.value,
        address: formAddress.value,
        city: formCity.value,
        email: formEmail.value,
      },
      products: cartId,
    };

    // Envoie à l'API // 

    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json"
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data.orderId)
        document.location.href = `./confirmation.html?numero=${data.orderId}`;
      })
  }
})













