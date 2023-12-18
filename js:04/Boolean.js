// Additional task


let startTask = (prompt("Введите задание из списка ниже которое хотите просмотреть.  \nNumber odd, String lexics, Boolean, Boolean if, Comparison sizes, Ternary, Prompt or, Confirm or this days, Confirm if this days, Default or, Default if, Login and password, Currency exchange, Scissors").toLowerCase()).replace(/\s/g,"")
console.log(startTask)


// Number: odd


if ( startTask === "numberodd" ) {
    let userNumber = +prompt("Введите любое число");

    if (!isNaN(userNumber) ){
        let doubles = userNumber % 2 === 0;

        alert( doubles ? "Ваше число четное" : "Ваше число не четное")
    }
    else {
        alert("Вы ввели не чило (не только числа)")
    }

}


// String: lexics


if ( startTask === "stringlexics" ) {
    let userText = prompt("Введите текст")
    userText.includes('1')
    userText.includes('пока')
    userText.includes('9')
}


// Boolean


if ( startTask === "boolean" ) {
    let age = confirm("Вам больше 18 лет?")
    let gender = confirm("Вы мужчина")
    let familyStatus = confirm("Вы состоите в браке?")

    console.log(age ? "Вы совершеннолетний" : "Вы не совершеннолетний");
    console.log("Ваш пол:", gender ? "мужской" : "женский");
    console.log("Ваше семейное положение:", familyStatus ? (gender ? "женат" : "за мужем") : (gender ? "не женат" : "не за мужем"));
}


// Boolean: if


if ( startTask === "booleanif" ) {
    const age = confirm("Вам больше 18 лет?")
    const gender = confirm("Вы мужчина")
    const familyStatus = confirm("Вы состоите в браке?")


    if (age === true) {
        alert("Вам больше 18 лет!")
    }
    else {
        alert("Вам меньше 18 лет!")
    }

    if (gender === true) {
        alert("Вы мужчина!")
    }
    else {
        alert("Вы женщина!")
    }

    if (familyStatus === true) {
        alert("Вы состоите в браке!")
    }
    else {
        alert("Вы не состоите в браке!")
    }
}


// Comparison: sizes 


if ( startTask === "comparisonsizes" ) {
    let userSize = prompt("Введите размер одежды в формате S, M, L, XL, XXL для перевода в Итальянский размер" ).toUpperCase()

    // if (userSize === "S"){
    //     alert("Интересующий вас итальянский размер 38")
    // }
    // if (userSize === "M"){
    //     alert("Интересующий вас итальянский размер 40")
    // }
    // if (userSize === "L"){
    //     alert("Интересующий вас итальянский размер 44")
    // }
    // if (userSize === "XL"){
    //     alert("Интересующий вас итальянский размер 48")
    // }
    // if (userSize === "XXL"){
    //     alert("Интересующий вас итальянский размер 52")
    // }

    if (userSize === "S"){
        alert("Интересующий вас итальянский размер 38")
    }
    else {
        if (userSize === "M"){
            alert("Интересующий вас итальянский размер 40")
        }
        else {
            if (userSize === "L"){
                alert("Интересующий вас итальянский размер 44")
            }
            else {
                if (userSize === "XL"){
                    alert("Интересующий вас итальянский размер 48")
                }
                else {
                    if (userSize === "XXL"){
                        alert("Интересующий вас итальянский размер 52")
                    }
                    else {
                        alert("Введен енкорректный размер")
                    }
                }
            }
        }
    }
}


// Ternary


if ( startTask === "ternary" ) {
    let gender = confirm("Вы мужчина")

    //gender && !alert("Вы мужчина!") || alert("Вы женщина!")

    gender ? alert("Вы мужчина!") : alert("Вы женщина!")
}


// Prompt: or


if ( startTask === "promptor" ) {
    let years = +prompt("Сколько вам лет?") // || alert("Вы некоректно ввели возраст");
    let birthYears = 2023 - years ;

    birthYears < 2023 ? alert(`Ваш год родения  ${birthYears}`) : alert("Вы некоректно ввели возраст")
}


// Confirm: or this days


if ( startTask === "confirmorthisdays" ) {
    confirm("шопінг?") || alert("ти - бяка");
}


// Confirm: if this days


if ( startTask === "confirmifthisdays" ) {
    const userShoping = confirm("шопінг?");

    if (userShoping === true ){
        alert("го шопінг");
    }
    else {
        alert("ти - бяка");
    }
}


// Default: or


if ( startTask === "defaultor" ) {
    let firstName = prompt("Напишите ваше имя или желаете пройти анонимно.") || "anonim ";
    let lastName = prompt("Напишите вашу фамилию или желаете пройти анонимно.") || "anonim ";
    let surname = prompt("Напишите ваше отчество или желаете пройти анонимно.") || "anonim ";

    alert(firstName + " " + lastName + " " + surname)
}


// Default: if


if ( startTask === "defaultif" ){
    let firstName = prompt("Напишите ваше имя или желаете пройти анонимно.");
    let lastName = prompt("Напишите вашу фамилию или желаете пройти анонимно.");
    let surname = prompt("Напишите ваше отчество или желаете пройти анонимно.");

    // if (firstName === null || firstName === "") {
    //     firstName = "anonim"
    // }
    // if (lastName === null || lastName === "") {
    //     lastName = "anonim"
    // }
    // if (surname === null || surname === "") {
    //     surname = "anonim"
    // }

    if ( !isNaN(firstName) ) {
        firstName = "anonim"
    }
    if ( !isNaN(lastName) ) {
        lastName = "anonim"
    }
    if ( !isNaN(surname) ) {
        surname = "anonim"
    }

    alert(firstName + " " + lastName + " " + surname)
}


// Login and password


if ( startTask === "loginandpassword" ){
    const rightLogin = "admin"
    const rightPassword = "qwerty"

    let login = prompt("Введите логин")

    if ( login === rightLogin ) {
        let password = prompt("Введите пароль")
        
        if ( password === rightPassword ) {
            alert("Вход выполнен успешно")
        }
        else {
            alert("Вы ввели неверный пароль")
        }
    }
    else {
        alert("Вы ввели неверный логин")
    }
}


// Currency exchange


if ( startTask === "currencyexchange" ){
    const userCurrency = prompt("Введите валюту для обмена(USD, EUR, PLN).").toUpperCase();
    const change = confirm("Вы желаете купить валюту?");
    let userMoney = +prompt("Введите сумму для обмена (покупаем в гривнах, продаем в валюту).");


    let rate

    if ( userCurrency === "USD" ) {
        change ? rate = 37.7 : rate = 37.25
        userMoney = change ? userMoney / rate : userMoney * rate  // Покупаем в гривнах, продаем в валюту
    }
    if ( userCurrency === "EUR" ) {
        change ? rate = 41.1 : rate = 40.55
        userMoney = change ? userMoney / rate : userMoney * rate  // Покупаем в гривнах, продаем в валюту
    }
    if ( userCurrency === "PLN" ) {
        change ? rate = 9.39 : rate = 9.07
        userMoney = change ? userMoney / rate : userMoney * rate  // Покупаем в гривнах, продаем в валюту
    }

    alert(`Ваша сумма после транзакции составит ${userMoney.toFixed(2)}`)
    console.log(rate)
    console.log(userMoney)
    console.log(userCurrency)
}


// Scissors 


if ( startTask === "scissors" ) {
    let userMove = prompt("Сыграем в игру \"камень-ножницы-бумага\" \nСделайте свой ход (напишите: камень ножницы или бумага)").toLowerCase();
    // let computerMove = Math.random() > 0.333 ? ( Math.random() > 0.5 ? "камень" : "бумага" ) : "ножницы"
    let computerMove


    ( Math.random() > 0.333 ? ( Math.random() > 0.5 ? computerMove = "камень" : computerMove = "бумага" ) : computerMove = "ножницы" ) && !alert(`Ход компьютера ${computerMove}`)
    && ( userMove === computerMove ? alert("Ничья") : ( ( userMove === "камень" && computerMove === "ножницы" ) || ( userMove === "ножницы" && computerMove === "бумага" ) || ( userMove === "бумага" && computerMove === "камень" )) ? alert("Вы выиграли") : alert("Вы проигали") ) 


    // if ( Math.random() < 0.33 ){
    //     computerMove = "камень"
    // } else if (Math.random() < 0.5 ) {
    //     computerMove = "бумага"
    // } else {
    //     computerMove = "ножницы"
    // }

    // alert(`Ход компьютера ${computerMove}`)

    // if ( userMove === computerMove ) {
    //     alert("ничья")
    // } else if (
    //             ( userMove === "камень" && computerMove === "ножницы" ) ||
    //             ( userMove === "ножницы" && computerMove === "бумага" ) ||
    //             ( userMove === "бумага" && computerMove === "камень" ) 
    //             ) {
    //                 alert("Вы выиграли")
    //             } else {
    //                 alert("Вы проигали")
    //             }

    console.log(computerMove)
}