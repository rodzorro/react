import fetch from 'node-fetch';

const response = await fetch("http://makeup-api.herokuapp.com/api/v1/products.json");
const makeup = await response.json();
//console.log(makeup);

const car = "Toyota";
const carDetail = `Car detail: ${car}`;
console.log(carDetail);

/*
for (let make of makeup){
    console.log(make);
}*/