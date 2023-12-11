// Literals


{
    const car = {
        brand: "skoda",
        model: "oktavia",
        engine: "1.8TSI",
        transmission: "mechanical",
        year: "2009",
        color: "beige",
        fuel: "petrol"
    }

    const smartphone = {
        model: "iphone",
        camera: "12mp",
        accumulator: "3000mAh",
        displayDiagonal: "6.1",
        os: "IOS",
        protectionClass: "IP68"
    }

    console,log(car, smartphone)
}


// Literals expand


{
    const car = {
        brand: "skoda",
        model: "oktavia",
        engine: "1.8TSI",
        transmission: "mechanical",
        year: "2009",
        color: "beige",
        fuel: "petrol",
        [prompt("Введите название ключа")]: prompt("Введите опцию"),
        [prompt("Введите название ключа")]: prompt("Введите опцию")
    }

    const smartphone = {
        model: "iphone",
        camera: "12mp",
        accumulator: "3000mAh",
        displayDiagonal: "6.1",
        os: "IOS",
        protectionClass: "IP68",
        [prompt("Введите название ключа")]: prompt("Введите опцию"),
        [prompt("Введите название ключа")]: prompt("Введите опцию")
    }

    console.log(car, smartphone)
}


// Literals copy


{
    const car = {
        brand: "skoda",
        model: "oktavia",
        engine: "1.8TSI",
        transmission: "mechanical",
        year: "2009",
        color: "beige",
        fuel: "petrol",
        [prompt("Введите название ключа")]: prompt("Введите опцию"),
        [prompt("Введите название ключа")]: prompt("Введите опцию")
    }

    const neuKey = prompt("Введите название ключа")
    const neuMeaning = prompt("Введите опцию")

    const tuningCar = {
        ...car,
        [neuKey]: neuMeaning
    }

    console.log(car, tuningCar)
}


// Html tree


{
    const body = {
        tagName: "body",
        children: [
            {
                tagName: "div",
                children: [
                    {   tagName: "span",
                        children: [
                            "Enter a data please:"
                        ]
                    },
                    {
                        tagName: "br",
                    },
                    {
                        tagName: "input",
                        attrs: {
                            type: "text",
                            id: "name"
                        },
                    },
                    {
                        tagName: "input",
                        attrs: {
                            type: "text",
                            id: "surname"
                        }
                    }
                ],
            },
            {
                tagName: "div",
                children: [
                    {   tagName: "button",
                        attrs: {
                            id: "ok"
                        },
                        children: [
                            "OK"
                        ],
                    },
                    {
                        tagName: "button",
                        attrs: {
                            id: "cancel"
                        },
                        children: [
                            "Cancel"
                        ]
                    }
                ]
            }
        ]
    }

    console.log(body)

    alert(`Значение второй кнопки "${body.children[1].children[1].children[0]}"`)
    alert(`Значение арибута id второго input "${body.children[0].children[3].attrs.id}"`)
}


// Parent


{
    const body = {
        tagName: "body",
        children: [
            {
                tagName: "div",
                children: [
                    {   tagName: "span",
                        children: [
                            "Enter a data please:"
                        ]
                    },
                    {
                        tagName: "br",
                    },
                    {
                        tagName: "input",
                        attrs: {
                            type: "text",
                            id: "name"
                        },
                    },
                    {
                        tagName: "input",
                        attrs: {
                            type: "text",
                            id: "surname"
                        }
                    }
                ],
            },
            {
                tagName: "div",
                children: [
                    {   tagName: "button",
                        attrs: {
                            id: "ok"
                        },
                        children: [
                            "OK"
                        ],
                    },
                    {
                        tagName: "button",
                        attrs: {
                            id: "cancel"
                        },
                        children: [
                            "Cancel"
                        ]
                    }
                ]
            }
        ]
    }

    console.log(body)

    body.children[0].parent = body
    body.children[1].parent = body

    body.children[0].children[0].parent = body.children[0]
    body.children[0].children[1].parent = body.children[0]
    body.children[0].children[2].parent = body.children[0]
    body.children[0].children[3].parent = body.children[0]
    
    body.children[1].children[0].parent = body.children[1]
    body.children[1].children[1].parent = body.children[1]

    body.children[0].children[0].children.parent = body.children[0].children[0]
    body.children[0].children[2].attrs.parent = body.children[0].children[2]
    body.children[0].children[3].attrs.parent = body.children[0].children[3]

    body.children[1].children[0].children.parent = body.children[1].children[0]
    body.children[1].children[0].attrs.parent = body.children[1].children[0]

    body.children[1].children[1].children.parent = body.children[1].children[1]
    body.children[1].children[1].attrs.parent = body.children[1].children[1]


    console.log(body, body.children[0].children[0])
}


// Change OK


{
    const body = {
        tagName: "body",
        children: [
            {
                tagName: "div",
                children: [
                    {   tagName: "span",
                        children: [
                            "Enter a data please:"
                        ]
                    },
                    {
                        tagName: "br",
                    },
                    {
                        tagName: "input",
                        attrs: {
                            type: "text",
                            id: "name"
                        },
                    },
                    {
                        tagName: "input",
                        attrs: {
                            type: "text",
                            id: "surname"
                        }
                    }
                ],
            },
            {
                tagName: "div",
                children: [
                    {   tagName: "button",
                        attrs: {
                            id: "ok"
                        },
                        children: [
                            "OK"
                        ],
                    },
                    {
                        tagName: "button",
                        attrs: {
                            id: "cancel"
                        },
                        children: [
                            "Cancel"
                        ]
                    }
                ]
            }
        ]
    }


    confirm("Если вы желаете добавить атрибут первой кнопке нажмите \"ОК\". \n Если желаете удалить нажмите \"ОТМЕНА\" ") ? body.children[1].children[0].attrs[prompt("Введите атрибут для добавления")] = prompt("Введите значение атрибута для добавления") : delete body.children[1].children[0].attrs[prompt("Введите атрибут для удаления")]

    

    console.log(body, body.children[1].children[0].attrs)
}


// Destructure


{
    const body = {
        tagName: "body",
        children: [
            {
                tagName: "div",
                children: [
                    {   tagName: "span",
                        children: [
                            "Enter a data please:"
                        ]
                    },
                    {
                        tagName: "br",
                    },
                    {
                        tagName: "input",
                        attrs: {
                            type: "text",
                            id: "name"
                        },
                    },
                    {
                        tagName: "input",
                        attrs: {
                            type: "text",
                            id: "surname"
                        }
                    }
                ],
            },
            {
                tagName: "div",
                children: [
                    {   tagName: "button",
                        attrs: {
                            id: "ok"
                        },
                        children: [
                            "OK"
                        ],
                    },
                    {
                        tagName: "button",
                        attrs: {
                            id: "cancel"
                        },
                        children: [
                            "Cancel"
                        ]
                    }
                ]
            }
        ]
    }

    const {children:textSpan} = body.children[0].children[0]
    const {children:text2Button} = body.children[1].children[1]
    const {id:id2Input} = body.children[0].children[3].attrs

    console.log(body, textSpan, text2Button, id2Input)
}


// Destruct array


{
    let arr = [1,2,3,4,5, "a", "b", "c"]

    let [odd1, odd2, odd3] = arr.filter( x => x % 2 ) 
    let [even1, even2] = arr.filter( x => x % 2 === 0 )
    let [...letters] = arr.filter( x => typeof x === "string" )


    const obj = {
        even1: even1,
        even2: even2,
        odd1: odd1,
        odd2: odd2,
        odd3: odd3,
        letters: letters
    }

    console.log(obj)
}


// Destruct string


{
    let arr = [1, "abc"]

    let[number] = arr.filter( n => typeof n === "number" )
    let[[s1, s2, s3]] = arr.filter( x => x !== number )

    const obj = {
        number: number,
        s1: s1,
        s2: s2,
        s3: s3
    }


    //console.log( number, s1, s2, s3 )
    console.log(obj)
}


// Destruct 2


{
    let obj = {name: 'Ivan',
           surname: 'Petrov',
           children: [{name: 'Maria'}, {name: 'Nikolay'}]}

    const { name: name1} = obj.children[0]
    const { name: name2} = obj.children[1]

    console.log(name1, name2)
}


// Destruct 3


{
    let arr = [1,2,3,4, 5,6,7,10]


    const {0: a, 1: b, length} = arr

    console.log(a, b, length)
}


// Copy delete


{
    const car = {
        brand: "skoda",
        model: "oktavia",
        engine: "1.8TSI",
        transmission: "mechanical",
        year: "2009",
        color: "beige",
        fuel: "petrol"
    }

    const userKey = prompt("Введите ключ который хотите исключить из объекта")

    const { [userKey]: del, ...fixCar } = car

    console.log(del, fixCar)
}


// Currency real rate


{
    const userCurrency = prompt("Введите валюту для конвертации").toUpperCase()
    const userCurrency2 = prompt("Введите валюту в которую нужно конвертировать").toUpperCase()
    const userSum = +prompt("Введите сумм для конвертацыи")
    let result

    // fetch(`https://open.er-api.com/v6/latest/${userCurrency}`).then(res => res.json())
    // .then(data => {
    //     const { [userCurrency2]: currency2}= data.rates

    //     result = userSum * currency2

    //     alert(`Ваша сумма после конвертации составит ${result.toFixed(2)}`)
    //     console.log(data, currency2, result.toFixed(2))
    // })


    fetch('https://open.er-api.com/v6/latest/USD').then(res => res.json())
    .then(data => {
        const { [userCurrency]: currency}= data.rates
        const { [userCurrency2]: currency2}= data.rates
        
        if ( currency && currency2 ) {
            result = (userSum / currency) * currency2

            alert(`Ваша сумма после конвертации составит ${result.toFixed(2)}`)
            console.log(data, currency, currency2, result.toFixed(2))
        } else {
            alert("Неверные данные для конвертации")
        }

    })
}


// Currency drop down


{
    fetch('https://open.er-api.com/v6/latest/USD').then(res => res.json())
    .then(data => {

        let rates = data.rates
        let str = "<select>"

        for (let currency in rates) {
            str += `<option>${currency}</option>`;
        }

        str += "</select>"

        document.write(str)
        console.log(data, rates)
    })

}


// Currency table


{
    
}