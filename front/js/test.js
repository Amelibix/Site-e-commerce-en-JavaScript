const a = [{
    nom: "Paul",
    prenom: "Lucile",
    price: 10,
    quantity: 1,
},
{
    nom: "Dupont",
    prenom: "Thomas",
    price: 25,
    quantity: 5,
},
{
    nom: "Clément",
    prenom: "Aurélie",
    price: 13,
    quantity: 2,
}];

function getTotalPrice(tableau) {
    total = 0;
    for (let i = 0; i < tableau.length; i++) {
        total += tableau[i].price * tableau[i].quantity
    }
    return total
};



setTimeout(() => {
    console.log(getTotalPrice(a));
}, 6000)

let test = document.querySelector(".itemQuantity");
test.addEventListener("input", () => {


});



/*const tableau = [1, 2, 3, 4];
const total = tableau.reduce((acc, curr) => acc + curr);
console.log(total);*/

const tableau = [[1, 2], { a: 1 }];
const tableau2 = JSON.parse(JSON.stringify(tableau));

tableau2[0].push(42);
tableau2[1].a = 2;

console.log(tableau)