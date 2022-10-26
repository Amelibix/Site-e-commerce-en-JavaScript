

async function listLocalStorageProduct() {
  let saveProducts = JSON.parse(localStorage.getItem("product"))
  let itemsCart = document.querySelector("#cart__items");

  if (saveProducts != null) {
    for (let article of saveProducts) {

      let productData = await getProductById(article.id)
      article.price = (new Intl.NumberFormat('de-DE').format(productData.price));
      article.name = productData.name
      article.image = productData.imageUrl
      article.alt = productData.altTxt

      itemsCart.innerHTML += createProducts(article);


    }
  } else {
    document.querySelector(".cartAndFormContainer").innerHTML = "<h1> Votre Panier est vide <br> Veuillez retourner sur la page <a href ='index.html'>d'Acceuil</a></h1>"
  }
  computeTotalQuantity(saveProducts)
  computeTotalPrice(saveProducts)
  changeValueQuantity(saveProducts)
  deleteItem()
}
listLocalStorageProduct()

//-----Appel de l'API-----//

async function getProductById(id) {
  let url = `http://localhost:3000/api/products/${id}`;

  let res = await fetch(url);
  let product = await res.json();
  return product;
}

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
          computeTotalQuantity(saveProducts)
          computeTotalPrice(saveProducts)
        }
      }
    });
  });
}



//--------------- Calcul du prix et de la quantité total  --------------------//



function computeTotalQuantity(productList) {

  let totalQuantity = document.querySelector("#totalQuantity");

  // On parcours notre tableau pour additionner la quantité // 
  let total = productList.reduce((acc, product) => {

    acc = acc + product.quantity
    return acc
  }, 0);

  totalQuantity.textContent = total;
}



async function computeTotalPrice(productList) {


  let totalPriceHtml = document.querySelector("#totalPrice");

  let totalPrice = 0;
  for (let product of productList) {

    let articleList = await getProductById(product.id); //Utilise l'API pour récupérer le prix //

    totalPrice += product.quantity * articleList.price;
  }

  totalPriceHtml.textContent = (new Intl.NumberFormat('de-DE').format(totalPrice));
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


      article.parentElement.removeChild(article) // Suprimer le DOM

      computeTotalPrice(saveProducts)
      computeTotalQuantity(saveProducts)

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


// Ecouter la modification de l'email //

formEmail.addEventListener('change', function () {
  validEmail(this);

});

const validEmail = function (parametre) {

  let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,30}$', 'g');

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
  let firstNameRegExp = new RegExp(/^[A-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ\s-]{1,31}$/, 'g');

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
  let lastNameRegExp = new RegExp(/^[A-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ\s-]{1,31}$/, 'g');

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
  let adressRegExp = new RegExp(/^[A-z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ\s-]{1,31}$/, 'g');

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
  let cityRegExp = new RegExp(/^[A-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ\s-]{1,31}$/, 'g');

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

function productOrder() {
  const btn_cart = document.querySelector("#order")

  btn_cart.addEventListener("click", (e) => {
    e.preventDefault();

    let saveProducts = JSON.parse(localStorage.getItem("product"));
    let cartId = [];

    for (let article of saveProducts) {
      cartId.push(article.id)
    }

    //Si toutes les valeurs du formulaires sont "vraies"//
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

          document.location.href = `./confirmation.html?numero=${data.orderId}`;
        })
    }
  })
}
productOrder()












