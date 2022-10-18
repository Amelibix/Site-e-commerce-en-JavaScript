let orderId = JSON.parse(localStorage.getItem("nbOrderId"));

for (let i in orderId) {
    document.querySelector("#orderId").innerHTML = `<br>${orderId[i]}`;
}
setTimeout(function () {
    document.location.href = "index.html";
    localStorage.removeItem("nbOrderId");
    localStorage.removeItem("product");
}, 15000);
