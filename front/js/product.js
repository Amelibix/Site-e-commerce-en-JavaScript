let params = new URL(document.location).searchParams;
let id = params.get("id");

//-------On récupère uniquement le produit dont on a besoin-----------//

let url = `http://localhost:3000/api/products/${id}`;



const productName = document.querySelector("#title");
const productImage = document.querySelector(".item__img");
const productPrice = document.querySelector("#price");
const productDescription = document.querySelector("#description");
const productColor = document.querySelector("#colors");
const productQuantity = document.querySelector("#quantity");



//----------On place les donnés de l'API récupéré---------------//

async function getInitialData(url) {
    let res = await fetch(url);
    let article = await res.json();

    productName.textContent = article.name;
    productImage.innerHTML = `<img src="${article.imageUrl}" alt="${article.altTxt}" />`;
    productPrice.textContent = article.price;
    productDescription.textContent = article.description;

    for (let selectColor of article.colors)
        productColor.innerHTML += `<option value="${selectColor}">${selectColor}</option>`;

}
getInitialData(url)




//-------------Mise en place du bouton "Ajouter au panier" et création de la liste d'objet pour le Local Storage----------//

const btn_Ajout = document.querySelector("#addToCart");

let newDiv = document.createElement("div")
let confirmation = document.querySelector(".item__content");
confirmation.appendChild(newDiv)

btn_Ajout.addEventListener("click", () => {

    if (productQuantity.value > 0 && productQuantity.value < 100 && productColor.value !== "") {


        let productAdded = {

            quantity: parseInt(productQuantity.value),
            id: id,
            color: productColor.value,
        }


        //---------------------------------------Local Storage -------------------------------//



        let localStorageData = localStorage.getItem("product")
        let listProduct = JSON.parse(localStorageData) // On passe du format JSON en objet JSON //


        if (listProduct == null) {

            listProduct = []; // Création du tableau Local Storage //
        }

        let foundProduct = listProduct.find(element => element.id == productAdded.id && element.color == productAdded.color)
        //On cherche les produits qui sont identiques pour les additionner//

        if (foundProduct != undefined) {

            foundProduct.quantity += productAdded.quantity;

        } else {
            productAdded.quantity;
            listProduct.push(productAdded);
        };

        localStorage.setItem("product", JSON.stringify(listProduct))


        //-----------------Création du message de confirmation -------------------------//



        newDiv.textContent = `Vous avez ajouté ${productAdded.quantity} ${productName.textContent} couleur ${productAdded.color} à votre panier`;

        newDiv.style.padding = "10px 0";
        newDiv.style.color = "black";
        newDiv.style.visibility = "visible";
        /*newDiv.style.background = "green";*/


        setTimeout(function () {
            newDiv.innerHTML = "";

        }, 2000);


    } else {
        alert("Veuillez choissir une quantité entre 0 et 99 et une couleur à votre produit")
    };



});
















