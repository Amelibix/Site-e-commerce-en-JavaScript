
function displayOrderNumber() {
    let numero = new URLSearchParams(document.location.search).get("numero");

    document.querySelector("#orderId").innerHTML = `<br>${numero}<br>Merci pour votre achat`;

    setTimeout(function () {

        document.location.href = "index.html";

        localStorage.removeItem("product");
    }, 15000);
};
displayOrderNumber()