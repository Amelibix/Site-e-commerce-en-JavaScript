

getInitialData("http://localhost:3000/api/products");

function getInitialData(url) {

    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            for (let valeur of data) {

                document.querySelector('#items').innerHTML += createSingleProduct(valeur);

            }

        });
}


function createSingleProduct(product) {


    return `<a href="./product.html?id=${product._id}">
    <article>
      <img src="${product.imageUrl}" alt="${product.altTxt}">
      <h3 class="productName">${product.name}</h3>
      <p class="productDescription">${product.description}</p>
    </article>
  </a>`;

}

