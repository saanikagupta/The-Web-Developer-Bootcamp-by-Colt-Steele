const faker = require('faker');
console.log("===================")
console.log("WELCOME TO MY SHOP!")
console.log("===================")
for(let i = 0; i < 10; i++){
    let str = faker.commerce.productName() + ": $" + faker.commerce.price();
    console.log(str);
}
