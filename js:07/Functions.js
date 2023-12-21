// Temperature


{
    const temperatureFahrenheit = c => ( c * 9 / 5 ) + 32 ; // Из цельсия в фаренгейты
    const temperatureCelsius = f => 5/9 * ( f - 32 ) ; // Из фаренгейта в цельсий
}


// RGB


{
    const rgbHex = (r, g, b) => "#" + r.toString(16).padStart(2, 0).slice(0, 2) + g.toString(16).padStart(2, 0).slice(0, 2) + b.toString(16).padStart(2, 0).slice(0, 2);

    // const rgbHex = (r, g, b) => ( "#" +
    //     (r < 16 ? "0" : "") + r.toString(16).slice(0, 2) +
    //     (g < 16 ? "0" : "") + g.toString(16).slice(0, 2) +
    //     (b < 16 ? "0" : "") + b.toString(16).slice(0, 2) 
    // );


    const hexColor = rgbHex(11, 6, 3);
    const hexColor1 = rgbHex(1000, 5, 24);
    const hexColor2 = rgbHex(2222, 55, 6);

    console.log(hexColor, hexColor1, hexColor2);
    console.log(hexColor);
}


// Flats


{
    // numberFloors: Это количество этажей в вашем доме;
    // floorApartments: Это количество квартир на этаже;
    // numberApartments: Это номер квартиры;


    const flats = (numberFloors, floorApartments, numberApartments) => {
        let entrance = Math.ceil(numberApartments / (numberFloors * floorApartments))
        let floor = Math.ceil((numberApartments - numberFloors * floorApartments * (entrance - 1)) / floorApartments)
    
        return{
            entrance: entrance,
            floor: floor
        }
    }

    const result = flats(12, 5, 444)
    const result1 = flats(10, 3, 234)
    const result2 = flats(5, 4, 56)


    console.log(result, result1, result2)
}


// Credentials


{
    const firstBig = text => text.slice(0, 1).toUpperCase() + text.slice(1, ).toLowerCase()

    const fullNameObj = () => {
        let name = firstBig(prompt("Напишите ваше имя."));
        let surname = firstBig(prompt("Напишите вашу фамилию."));
        let fatherName = firstBig(prompt("Напишите ваше отчество."));

        let fullName =  surname + " " + name + " " + fatherName;

        return {
            name: name,
            surname: surname,
            fatherName: fatherName,
            fullName: fullName
        }
   }
   console.log(fullNameObj())
}


// New line


{
    const newLine = str => str.split(" \\n ").join("\n");

    // let str = prompt("Напишите рассаз на тему как я провел лето.\nДля перехода на новый рядок используйте \"\\n\"");
    // let fixStr = newLine(str)
    
    let fixStr = newLine(prompt("Напишите рассаз на тему как я провел лето.\nДля перехода на новый рядок используйте \"\\n\""))
    console.log(fixStr)
}


// Prompt OR


{
    const promptOr = (defaultYears) => prompt("Сколько вам лет?") || defaultYears
    let years = promptOr(0) // Задаем возраст по умолчанию


    // const promptOr = () => prompt("Сколько вам лет?") || 0 // Задаем возраст по умолчанию
    // let years = promptOr() 

    // const promptOr = (year = prompt("Сколько вам лет?") || 0) => 2023 - year

    let birthYears = 2023 - years ;

    alert(`Ваш год родения  ${birthYears}`)
    // alert(`Ваш год родения  ${promptOr()}`)
}


//Login And Password


{
    const loginandpassword = (rightLogin, rightPassword) => {
        let login = prompt("Введите логин");
    
        if ( login === rightLogin ) {
            let password = prompt("Введите пароль");

            return password === rightPassword;
        } else {
            return false;
        }
    }

    const enterSite = loginandpassword("admin", "qwerty")

    console.log(enterSite)
}


// For Table


const forTable = (arraysArrays) => {
    let i = 1
    let str = "<table>"

    for (const arrChild of arraysArrays){
        if ( i % 2 ){
            str += "<tr style= \"color: blue\">";
        }
        else {
        str += "<tr style= \"color: green\">";
        }
        i++
        for (const arrOne of arrChild){
            str += "<td>" + arrOne + "</td>"
        }
        str += "</tr>"
    }

    str += "</table>"

    return str
}

const arr = [
    [ 0, 0, 0, 0, 0 ],
    [ 0, 1, 2, 3, 4 ],
    [ 0, 2, 4, 6 , 8 ],
    [ 0, 3, 6, 9, 12 ],
    [ 0, 4, 8, 12, 16 ]
];

document.write(forTable(arr))
console.log(forTable(arr))


// Filter Lexics


{
    const filterLexics = (userText, exceptions) => {
        let = rightText = userText.split(" ").filter( x => !exceptions.includes(x) ).join(" ").trim();
        return rightText
    }
    
    const exceptions = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "блин", "оладь", "сука", " "];
    const userText = prompt("напишите ваш рассказ");
    
    console.log(filterLexics(userText, exceptions))
    console.log(userText)
}


// Currency Table


fetch('https://open.er-api.com/v6/latest/USD').then(res => res.json())
.then(data => {

    const currencyTable = () => {
        let str = []
        let rates = Object.keys(data.rates)


        let str1 = ["", ...rates]
        str.push(str1)

        for (const currency of rates){
            let arr = [currency]

            for (const toCurrency of rates) {
                const crossRates = data.rates[currency] / data.rates[toCurrency];
                arr.push(crossRates.toFixed(2))
            }
            str.push(arr)
        }
        return str
    }

    document.write(forTable(currencyTable()))
})


// Form 


{
    const form = (obj) => {
        let str = "<form>"

        for (const label in obj) {
            let type = typeof(car[label]) 
            type === "string" ? type = "text" : (type === "boolean" ? type = "checkbox" : type = "number" )

            let value = `value=${obj[label]}`

            if (type === "checkbox") {
                (value = obj[label]) === true ? value = 'checked' : value = ""
            } else {
                value
            }

            str += `<label>${label}: <input type=${type} ${value} />`
            str += "</label></br>"
        }

        str += "</form>"
        document.write(str)
    }

    const car = {
        "Name":"chevrolet chevelle malibu",
        "Cylinders":8,
        "Displacement":307,
        "Horsepower":130,
        "Weight_in_lbs":3504,
        "Origin":"USA",
        "in_production": false
    }

    form(car)
}


// Array of objects sort


const sort = (arr, key, boolean = true) => arr.slice().sort((a, b) => {
    let valA = a[key] !== undefined ? a[key] : null
    let valB = b[key] !== undefined ? b[key] : null
    
    if (valA === null) return (boolean ? 1 : -1 )
    if (valB === null) return (boolean ? -1 : 1 )
    
    return (boolean ? valA > valB : valB > valA ) ? 1 : -1
});
// const sort = (arr, key, boolean = true) => arr.slice().sort((a, b) => (boolean ? a[key] > b[key] : b[key] > a[key]) ? 1 : -1);
// const sort = (arr, key, boolean = true) => arr.slice().sort((a, b) => {
//     var personSort = arr.slice().sort((a, b) => (boolean ? a[key] > b[key] : b[key] > a[key]) ? 1 : -1);
//     return personSort
// });

{
    var persons = [
        {name: "Іван", age: 17},
        {name: "Марія", age: 35},
        {name: "Олексій", age: 73},
        {name: "Яків", age: 12},
    ]  
    
    sort(persons, "age"); //сортує за віком за зростанням
    sort(persons, "name", false); //сортує на ім'я за спаданням

    console.log(sort(persons, "age"))
    console.log(sort(persons, "age", false))

    console.log(sort(persons, "name", false))
    console.log(sort(persons, "name"))
}


// Table


{
    const table = (arr, keys, boolean) => {
        const sortArr = sort(arr, keys, boolean);

        let str =  "<table><tr>"
        let columns = []
    
        for (const column of sortArr) {
            for (const key in column) {
                if (!columns.includes(key)) {
                    columns.push(key)
                }
            }
        }
    
        for (const column of columns) {
            str += `<th>${column}</th>`
        }
        str += "</tr>"
    
        for (const rows of sortArr){
            str += "<tr>"
            for (const column of columns) {
                let tableData = rows[column] !== undefined ? rows[column] : ''
                str += `<td>${tableData}</td>`
            }
            str += "</tr>"
        }
        str += "</table>"
    
        document.write(str)
        return sortArr
    }

    const persons = [
        {
            name: 'Марія',
            fatherName: 'Іванівна',
            surname: 'Іванова',
            sex: 'female'
        },
        {
            name: 'Миколай',
            fatherName: 'Іванович',
            surname: 'Іванов',
            age: 15
        },
        {
            name: 'Петро',
            fatherName: 'Іванович',
            surname: 'Іванов',
            married: true
        },
    ]

    console.log(table(persons, "name", false))
    console.log(table(persons, "age"))
    console.log(table(persons, "sex"))
    console.log(table(persons, "married"))

    console.log(table(persons, "age", false))
    console.log(table(persons, "married", false))
}


//  Calc Func


{
    let fuelExpense = +prompt("Какой расход топлива вашего авто на 100 км?", 10 ) / 100 ;
    let dailyTrip = +prompt("Сколько киллометров вы проезжаете в день?", 40 ) ;

    const carCalk = (fuelExpense, dailyTrip) => {
        const fluePrice = 50
        const changeOil = 10000

        let monthlyExpenses = Math.ceil(dailyTrip * 30 * fuelExpense * fluePrice);

        let changeOilDay =  Math.floor((changeOil / dailyTrip) % 30)
        let changeOilMonth =  Math.floor(((changeOil / dailyTrip) - changeOilDay) / 30)

        return {
            monthlyExpensesCar: monthlyExpenses,
            changeOilCarMonth: changeOilMonth,
            changeOilCarDay: changeOilDay
        }
    }

    const carСonsumption = carCalk(fuelExpense, dailyTrip)


    alert(`Затраты на топливо в месяц составят ${carСonsumption.monthlyExpensesCar} грн.\nЗамена масла через ${carСonsumption.changeOilCarMonth} месяцев и ${carСonsumption.changeOilCarDay} дней.`)

    console.log(carCalk(fuelExpense, dailyTrip))
}