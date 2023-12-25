// blocks


{
    let a = 10
    {
        let b = 20
        {
            let c = 30
            //які тут будуть значення змінних a, b, c, d
            // a = 10, b = 20, c = 30, d = ошибка
            b++
            a *= 10
        }
        {
            let c = 50
            //які тут будуть значення змінних a, b, c, d
            // a = 100, b = 21, c = 50, d = ошибка
            b += 500
        }
        {
            const a = 100500
            const d = "value"
            //які тут будуть значення змінних a, b, c, d
            // a = 100500, b = 521, c = ошибка, d = "value"
            {
                let a = -50
                b     = 1000
                //які тут будуть значення змінних a, b, c, d
                // a = -50, b = 1000, c = ошибка, d = "value"
            }
            //які тут будуть значення змінних a, b, c, d
            // a = 100500, b = 1000, c = ошибка, d = "value"
        }
        //які тут будуть значення змінних a, b, c, d
        // a = 100, b = 1000, c = ошибка, d = ошибка
    }
    //які тут будуть значення змінних a, b, c, d
    // a = 100, b = ошибка, c = ошибка, d = ошибка
}


// comparison if


{
    var age = + prompt ("Скільки вам років?", "");


    if (isNaN(age)) {
        alert("Введіть коректний вік")
    }
    else {
        if (age < 6) {
            alert("дитячій садок");
        }
        else {
            if (age < 18) {
                alert("школяр");
            }
            else {
                if (age < 30){
                    alert("молодь");
                }
                else {
                    if (age < 45){
                        alert("зрілість");
                    }
                    else {
                        if (age < 60){
                            alert("захід сонця");
                        }
                        else {
                            if (age >= 60) {
                                alert("як пенсія?");
                            }
                            else {
                                alert("чи кіборг, чи KERNESS");
                            }
                        }
                    }
                }
            }
        }
    }
}


// switch: sizes


{
    let userSize = prompt("Введите размер одежды в формате S, M, L, XL, XXL для перевода в Итальянский размер" ).toUpperCase()

    switch (userSize) {
        case "S" :
            alert("Интересующий вас итальянский размер 38")
            break;
        case "M" :
            alert("Интересующий вас итальянский размер 40")
            break;
        case "L" :
            alert("Интересующий вас итальянский размер 44")
            break;
        case "XL" :
            alert("Интересующий вас итальянский размер 48")
            break;
        case "XXL" :
            alert("Интересующий вас итальянский размер 52")
            break;
        default:
            alert("Введен не корректный размер")
    }
}


// switch: if


{
    let color = prompt("Введіть колір","");

    // switch (color) {
    //     case "red": document.write("<div style='background-color: red;'>червоний</div>");
    //     case "black": document.write("<div style='background-color: black; color: white;'>чорний</div>");
    //                 break;
    //     case "blue": document.write("<div style='background-color: blue;'>синій</div>");
    //     case "green": document.write("<div style='background-color: green;'>зелений</div>");
    //                 break;
    //     default: document.write("<div style='background-color: gray;'>Я не зрозумів</div>");
    // }

    // if (color === "red") {
    //     document.write("<div style='background-color: red;'>червоний</div>");
    //     document.write("<div style='background-color: black; color: white;'>чорний</div>");
    // } else {
    //     if (color === "black") {
    //         document.write("<div style='background-color: black; color: white;'>чорний</div>");
    //     } else {
    //         if (color === "blue") {
    //             document.write("<div style='background-color: blue;'>синій</div>");
    //             document.write("<div style='background-color: green;'>зелений</div>");
    //         } else {
    //             if (color === "green") {
    //                 document.write("<div style='background-color: green;'>зелений</div>");
    //             } else {
    //                 document.write("<div style='background-color: gray;'>Я не зрозумів</div>")
    //             }
    //         } 
    //     }
    // }

    if (color === "red") {
        document.write("<div style='background-color: red;'>червоний</div>");
        document.write("<div style='background-color: black; color: white;'>чорний</div>");
    } else if (color === "black") {
        document.write("<div style='background-color: black; color: white;'>чорний</div>");
    } else if (color === "blue") {
        document.write("<div style='background-color: blue;'>синій</div>");
        document.write("<div style='background-color: green;'>зелений</div>");
    } else if (color === "green") {
        document.write("<div style='background-color: green;'>зелений</div>");
    } else {
        document.write("<div style='background-color: gray;'>Я не зрозумів</div>")
    }
}


// noswitch


{
    const noSwitch = (key, cases, defaultKey='default') => {
        if (key in cases) {
           return cases[key]()
        } else return cases[defaultKey]()
    }
    
    const drink = prompt("Що ви любите пити")
    noSwitch(drink, {
        воду: () => console.log('Найздоровіший вибір!'),
        чай(){
            console.log('Смачна та корисна штука. Не перестарайтеся з цукром')
        },
        "пиво": () => console.log('Добре влітку, та в міру'),
        віскі: function(){
            console.log('Та ви, батечку, естет! Не забудьте лід і сигару')
        },
        default(){
            console.log('шото я не зрозумів')
        }
    })
}


// closure calc


{
    fetch('https://open.er-api.com/v6/latest/USD').then(res => res.json())
     .then(data => {
            const d = document.createElement("div")
            document.body.append(d)

            d.style.display = "flex"
            d.style.flexWrap = "wrap"
            d.style.gap = "8px"

            const rates = Object.keys(data.rates)
    
            for (const currency of rates){
                const btn = document.createElement("button")
                btn.innerText = currency
                btn.onclick = () => {
                    const userRates = prompt(`Введите сумму в ${currency}`)
                    const result = userRates / data.rates[currency]
                    alert(`Ваша сумма в USD составляет ${result.toFixed(2)}`)
                }

                d.append(btn)
            }
            
            console.log(data, rates)
        })
}


// closure calc 2 


{
    fetch('https://open.er-api.com/v6/latest/USD').then(res => res.json())
     .then(data => {
            const d = document.createElement("div")
            document.body.append(d)

            d.style.display = "flex"
            d.style.flexWrap = "wrap"
            d.style.gap = "8px"

            const sForm = document.createElement("select")
            const sTo = document.createElement("select")
            const dRate = document.createElement("div")
            const inptAmount = document.createElement("input")
            const dResult = document.createElement("div")

            d.append(sForm, sTo, dRate, inptAmount, dResult)

            sForm.id = "form"
            sTo.id = "to"
            dRate.id = "rate"
            inptAmount.id = "amount"
            inptAmount.type = "number"
            dResult.id = "result"

            const rates = Object.keys(data.rates)
    
            for (const currency of rates){
                const optForm = document.createElement("option")
                const optTo = document.createElement("option")

                optForm.innerText = currency
                optTo.innerText = currency

                form.append(optForm)
                to.append(optTo)
            }

            const calcRate = () => {
                const sFormVal = form.value
                const sToVal = to.value
                const inptAmountVal = amount.value

                const rate = data.rates[sToVal] / data.rates[sFormVal]
                const result = inptAmountVal * rate

                dRate.innerText = `Курс обмена: ${rate}`
                dResult.innerText = `Результат: ${result.toFixed(2)} ${sToVal}`
            }

            form.onchange = calcRate
            to.onchange = calcRate
            amount.onchange = calcRate
            
            console.log(data, rates)
        })
}


// countries and cities


{

}