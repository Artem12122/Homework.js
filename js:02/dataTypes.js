// Number: age


var years = prompt("Сколько вам лет?");
var birthYears = 2023 - years ;
alert(`Ваш год родения  ${birthYears}`);


// Number: temperature


var celsius = prompt("Сколько градусов цельсия у вас?");
var fahrenheit = (celsius * 9/5) + 32 ;
alert(`Ваша температура в фарингейтах ${fahrenheit} градусов`);


// Number: divide


var a = prompt("Введите число которое нужно разделить");
var b = prompt("Введите число на которое нужно разделить");;
var c = Math.round( a / b );
alert(`${c} ваш результат деления целым числом.`);
console.log(c) ;


// Number: currency


const rate = 36.02 ;
var uan = prompt("Сколько гривен вы хотите поменять?");
var dollar = uan / rate ;
alert(`${dollar.toFixed(2)} долларов вы получите.`);


// Number: RGB


const red = (Number(prompt("Введите значение red в десятичной системе от 16 до 255: "))).toString(16);
const green = (Number(prompt("Введите значение green в десятичной системе от 16 до 255: "))).toString(16);
const blue = (Number(prompt("Введите значение blue в десятичной системе от 16 до 255: "))).toString(16);

// 2 вариант задачи переменных.
// const red = (+prompt("Введите значение red в десятичной системе от 16 до 255: ")).toString(16);
// const green = (+prompt("Введите значение green в десятичной системе от 16 до 255: ")).toString(16);
// const blue = (+prompt("Введите значение blue в десятичной системе от 16 до 255: ")).toString(16);

var cssColorHex = "#" + red + green + blue;
alert(`Ваш цвет в формате Hex ${cssColorHex}.`);


// Number: flats


var numberFloors = prompt("Укажите количество этажей в вашем доме.");
var floorApartments = prompt("Укажите количество квартир на этаже.");
var numberApartments = prompt("Укажите номер квартиры.");
var entrance = Math.ceil(numberApartments / (numberFloors * floorApartments));
var floor = Math.ceil((numberApartments - numberFloors * floorApartments * --entrance) / floorApartments);
alert(`Интересующая вас квартира находится в ${++entrance} подъезде, на ${floor} этаже.`);

console.log(entrance);
console.log(floor);