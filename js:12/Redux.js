function createStore(reducer){
    let state       = reducer(undefined, {}) //стартова ініціалізація стану, запуск редьюсера зі state === undefined
    let cbs         = []                     //масив пiдписникiв
    
    const getState  = () => state            //функція, що повертає змінну із замикання
    const subscribe = cb => (cbs.push(cb),   //запам'ятовуємо пiдписника у масиві
                             () => cbs = cbs.filter(c => c !== cb)) //повертаємо функцію unsubscribe, яка видаляє пiдписника зі списку
                             
    const dispatch  = action => { 
        const newState = reducer(state, action) //пробуємо запустити редьюсер
        if (newState !== state){ //перевіряємо, чи зміг ред'юсер обробити action
            state = newState //якщо зміг, то оновлюємо state 
            for (let cb of cbs)  cb() //та запускаємо пiдписникiв
        }
    }
    
    return {
        getState, //додавання функції getState в результуючий об'єкт
        dispatch,
        subscribe //додавання subscribe в об'єкт
    }
}


function reducer(state, {type, what, how, money}){ //об'єкт action деструктуризується на три змінні
    if (!state){ //початкове прибирання в кіоску:
        return {
            beer: {
                price : 50,
                quantity: 80
                },
            chips: {
                price : 40,
                quantity: 70
                },
            cigarettes: {
                price : 100,
                quantity: 150
                },
            bread: {
                price : 20,
                quantity: 26
                },
            milk: {
                price : 56,
                quantity: 30
                },
            cheese: {
                price : 230,
                quantity: 16
                },
            sausage: {
                price : 140,
                quantity: 90
                },
            cashRegister: 0  
        }
    }
    if (type.toLowerCase() === 'buy'){ //якщо тип action - КУПИТИ, то:
        const totalPrice = state[what].price * how
        if (money >= totalPrice && state[what].quantity >= how){
            return {
                ...state, //беремо все що було з асортименту
    
                cashRegister: totalPrice + state.cashRegister,
                [what]: {
                    ...state[what],
                    quantity: state[what].quantity - how
                    }
            }
        }else {
            console.log("не хватает денег или товара")
            return state
        }
    }
    return state //якщо ми не зрозуміли, що від нас просять в `action` - залишаємо все як є
}

const store = createStore(reducer)

const products = Object.keys(store.getState()).filter(x => x !== "cashRegister")

for (const product of products) {
    store.subscribe(() => {
        const obj = store.getState()
        document.getElementById(product + "Quantity").innerHTML = "Количество: " + obj[product].quantity + " штук"
        document.getElementById(product + "Price").innerHTML = "Цена: " + obj[product].price + " грн."
    })

    const option = document.createElement("option")

    productMagazin.append(option)
    option.value = product
    option.innerHTML = product
}

store.subscribe(() => {
    const obj = store.getState()
    document.title = obj.cashRegister
})

const buy = (what, how, money) => store.dispatch({type: 'buy', what: what, how: how, money: money})


function inputSum(element) {
    element.addEventListener("input", function() {
    const quantity = parseInt(quantityGoods.value, 10)

    if (quantityGoods.value !== "") {
        if ((store.getState()[productMagazin.value].quantity) >= quantity) {
            moneyUser.disabled = false
            onePrice.innerHTML = "С вас: " + store.getState()[productMagazin.value].price * quantity + " грн."
        } else {
            moneyUser.disabled = true
            onePrice.innerHTML = "Количества товара нет в наличии, можете выбрать что-то еще"
        }
    } else (
        onePrice.innerHTML = "Введите сумму:"
    )
})
}

inputSum(quantityGoods)
inputSum(productMagazin)


buyUseer.addEventListener("click", function (event) {
    event.preventDefault();  // предотвращаем перезагрузку страницы
    const what = productMagazin.value
    const how = +quantityGoods.value
    const money = +moneyUser.value

    if ((store.getState()[what].quantity) >= how) {
        if (money - (store.getState()[what].price * how) >= 0) {
            quantityGoods.value = ""
            moneyUser.value = money - (store.getState()[what].price * how)

            if (!document.getElementById(what)) {
                const p = document.createElement("p")
                basket.append(p)
                p.id = what
                p.innerHTML = what + ": " + how
            } else {
                const length = (what + ": ").length
                const localHow = document.getElementById(what).innerHTML.slice(length, )
                console.log(length)
                document.getElementById(what).innerHTML = what + ": " + (+how + +localHow)
            }

            onePrice.innerHTML = "Сдача: "

        } else {
            confirm("Вам не хватает денег.")
        }
    } else {
        confirm("Количества товара нет в наличии, можете выбрать что-то еще")
    }

    buy(what, how, money)
})

buy(productMagazin.value, quantityGoods.value, moneyUser.value)
