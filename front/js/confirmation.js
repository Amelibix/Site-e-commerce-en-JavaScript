let params = new URLSearchParams(document.location.search).get("numero");
console.log(params)


document.querySelector("#orderId").innerHTML = `<br>${params}<br>Merci pour votre achat`;

setTimeout(function () {

    document.location.href = "index.html";

    localStorage.removeItem("product");
}, 15000);
