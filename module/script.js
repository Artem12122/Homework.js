function getGQL(url) {
    function gql(query, variables = {}) {
        return fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                ...("token" in store.getState().auth ? { Authorization: `Bearer ${store.getState().auth.token}` } : null)
            },
            body: JSON.stringify({ query, variables })
        })
            .then(res => res.json())
            .then(r => {
                if (r.data) {
                    const result = Object.values(r.data)[0]
                    // console.log(result)
                    return result
                }
                throw new Error(r.data.errors[0].message)
            })
            .catch(error => console.log(error))
    }
    return gql
}
const gql = getGQL("http://shop-roles.node.ed.asmer.org.ua/graphql")

function jwtDecode(token) {
    try {
        if (token && token.split(".").length === 3) {
            const tokenArr = token.split(".")
            const decodedToken = atob(tokenArr[1])
            const payload = JSON.parse(decodedToken)
            return payload
        }
        return undefined
    } catch (error) {
        return undefined
    }
}

function createStore(reducer) {
    let state = reducer(undefined, {}) //стартовая инициализация состояния, запуск редьюсера со state === undefined
    let cbs = []                     //массив подписчиков

    const getState = () => state            //функция, возвращающая переменную из замыкания
    const subscribe = cb => (cbs.push(cb),   //запоминаем подписчиков в массиве
        () => cbs = cbs.filter(c => c !== cb)) //возвращаем функцию unsubscribe, которая удаляет подписчика из списка

    const dispatch = action => {
        if (typeof action === 'function') { //если action - не объект, а функция
            return action(dispatch, getState) //запускаем эту функцию и даем ей dispatch и getState для работы
        }
        const newState = reducer(state, action) //пробуем запустить редьюсер
        if (newState !== state) { //проверяем, смог ли редьюсер обработать action
            state = newState //если смог, то обновляем state 
            for (let cb of cbs) cb(state) //и запускаем подписчиков
        }
    }

    return {
        getState, //добавление функции getState в результирующий объект
        dispatch,
        subscribe //добавление subscribe в объект
    }
}

function localStoredReducer(originalReducer, localStorageKey) {
    function wrapper(state, action) {
        if (state === undefined) {
            try {
                //console.log(JSON.parse(localStorage[localStorageKey]))
                return JSON.parse(localStorage[localStorageKey])
            } catch (error) {
                console.log(error)
            }
        }
        //console.log(state, action)
        const newState = originalReducer(state, action)
        localStorage[localStorageKey] = JSON.stringify(newState)
        //console.log(newState)
        return newState
    }
    return wrapper
}

function paswordOrText(knopka, element) {
    knopka.addEventListener('click', () => {
        const pasBulin = element.type === "password"

        if (pasBulin) {
            element.type = "text"
            knopka.innerHTML = "🔒"
        } else {
            element.type = "password"
            knopka.innerHTML = "👁️"
        }
    })
}

// Reducer

function combineReducers(reducers) {
    function totalReducer(state = {}, action) {
        const newTotalState = {}
        for (const [reducerName, reducer] of Object.entries(reducers)) {
            const newSubState = reducer(state[reducerName], action)
            if (newSubState !== state[reducerName]) {
                newTotalState[reducerName] = newSubState
            }
        }
        if (Object.keys(newTotalState).length) {
            return { ...state, ...newTotalState }
        }
        return state
    }
    return totalReducer
}

const reducers = {
    promise: promiseReducer,
    auth: localStoredReducer(authReducer, "auth"),
    cart: localStoredReducer(cartReducer, "cart")
}

const totalReducer = combineReducers(reducers)

function promiseReducer(state = {}, action) {
    const { namePromise, type, status, payload, error } = action
    if (type === 'PROMISE') {
        return {
            ...state,
            [namePromise]: {
                type,
                status,
                payload,
                error
            }
        }

    }
    return state
}

const actionPending = namePromise => ({ namePromise, type: 'PROMISE', status: 'PENDING' })
const actionFulfilled = (namePromise, payload) => ({ namePromise, type: 'PROMISE', status: 'FULFILLED', payload })
const actionRejected = (namePromise, error) => ({ namePromise, type: 'PROMISE', status: 'REJECTED', error })

const actionPromise = (namePromise, promise) => async dispatch => {
    dispatch(actionPending(namePromise))
    try {
        const payload = await promise
        dispatch(actionFulfilled(namePromise, payload))
        return payload
    } catch (error) {
        dispatch(actionRejected(namePromise, error))
    }
}

function authReducer(state = {}, action) {
    const { type, token } = action

    if (type === "AUTH_LOGIN") {
        const payload = jwtDecode(token)
        if (payload) {
            return {
                token,
                payload
            }
        }
    }
    if (type === 'AUTH_LOGOUT') {
        return {}
    }
    return state
}

const actionAuthLogin = token => ({ type: 'AUTH_LOGIN', token })
const actionAuthLogout = () => ({ type: 'AUTH_LOGOUT' })


function cartReducer(state = {}, action) {
    const { type, count, good } = action

    if (type === 'CART_ADD') {
        if (state[good._id]) {
            return {
                ...state,
                [good._id]: {
                    ...state[good._id],
                    count: state[good._id].count + count,
                    good
                }
            }
        }
        return {
            ...state,
            [good._id]: { count, good }
        }
    }

    if (type === 'CART_SUB' && state[good._id]) {
        if (state[good._id].count > count) {
            return {
                ...state,
                [good._id]: {
                    ...state[good._id],
                    count: state[good._id].count - count,
                    good
                }
            }
        }
        const newState = { ...state }
        delete newState[good._id]
        return newState
    }

    if (type === 'CART_DEL' && state[good._id]) {
        const newState = { ...state }
        delete newState[good._id]
        return newState
    }

    if (type === 'CART_SET') {
        if (count > 0) {
            return {
                ...state,
                [good._id]: {
                    count,
                    good
                }
            }
        }
        const newState = { ...state }
        delete newState[good._id]
        return newState
    }

    if (type === 'CART_CLEAR') {
        return {}
    }

    return state
}

const actionCartAdd = (good, count = 1) => ({ type: 'CART_ADD', count, good })
const actionCartSub = (good, count = 1) => ({ type: 'CART_SUB', count, good })
const actionCartDel = (good) => ({ type: 'CART_DEL', good })
const actionCartSet = (good, count = 1) => ({ type: 'CART_SET', count, good })
const actionCartClear = () => ({ type: 'CART_CLEAR' })

const store = createStore(totalReducer) //не забудьте combineReducers если он у вас уже есть

// subscribe

//store.subscribe(() => console.log(store.getState()))

const CategoryFindOne = () => {
    const [, route] = location.hash.split('/')
    if (route !== 'category') return

    const { status, payload, error } = store.getState().promise.categoryById || {}
    if (status === 'PENDING') {
        main.innerHTML = `<img src='https://cdn.dribbble.com/users/63485/screenshots/1309731/infinite-gif-preloader.gif' />`
    }
    if (status === 'FULFILLED') {
        const { name, goods } = payload
        main.innerHTML = `<h1>${name}</h1>`
        for (const { _id, name, price, images } of goods) {
            const div = document.createElement("div")
            div.className = "categoryFindOne"

            const a = document.createElement("a")
            a.href = `#/good/${_id}`
            a.textContent = name
            div.appendChild(a)

            const imageDiv = document.createElement("div")
            const img = document.createElement("img")
            img.style.maxWidth = "15vw"
            img.style.maxHeight = "15vw"
            img.src = images && images[0] && `http://shop-roles.node.ed.asmer.org.ua/${images[0].url}`
            imageDiv.appendChild(img)
            div.appendChild(imageDiv)

            const p = document.createElement("p")
            p.textContent = `Ціна: ${price}`
            div.appendChild(p)

            const button = document.createElement("button")
            button.textContent = "Придбати"

            button.addEventListener("click", () => {
                //console.log("Придбати", _id)
                store.dispatch(actionCartAdd({ _id, name, price, images }))
            })
            div.appendChild(button)

            main.appendChild(div)
        }
    }
}
store.subscribe(CategoryFindOne)

store.subscribe(() => {
    const [, route] = location.hash.split('/')
    if (route !== 'good') return

    const { status, payload, error } = store.getState().promise.goodById || {}
    if (status === 'PENDING') {
        main.innerHTML = `<img src='https://cdn.dribbble.com/users/63485/screenshots/1309731/infinite-gif-preloader.gif' />`
    }
    if (status === 'FULFILLED') {
        const { name, price, _id, description, images } = payload
        main.innerHTML = `
        <div id="goodCartOne" class="goodCartOne">
            <h3>${name}</h3>
            <p class="goodCartOneDescr">${description}</p>
            <p>Ціна: ${price}</p>
        </div>
        `
        const byBtn = document.createElement("button")
        byBtn.innerHTML = "Придбати"

        if (images.length > 1) {
            const divImg = document.createElement("div")
            divImg.className = "slider"

            const btnSliderFront = document.createElement("button")
            const btnSliderBack = document.createElement("button")
            btnSliderFront.className = "next"
            btnSliderBack.className = "prev"
            btnSliderFront.innerHTML = ">"
            btnSliderBack.innerHTML = "<"

            for (const { url } of images || []) {
                const img = document.createElement("img")
                img.src = `http://shop-roles.node.ed.asmer.org.ua/${url}`
                img.style.maxWidth = "20vw"
                img.style.maxHeight = "20vw"

                divImg.append(img)
            }
            divImg.append(btnSliderBack, btnSliderFront)
            goodCartOne.appendChild(divImg)

            let currentIndex = 0;

            const imagess = document.querySelectorAll('.slider>img');

            function showImage(index) {
                imagess[currentIndex].classList.remove('active');
                imagess[index].classList.add('active');
                currentIndex = index;
            }

            divImg.addEventListener('click', function (event) {
                if (event.target.classList.contains('prev')) {
                    let index = currentIndex - 1;
                    if (index < 0) {
                        index = imagess.length - 1;
                    }
                    showImage(index);
                } else if (event.target.classList.contains('next')) {
                    let index = currentIndex + 1;
                    if (index >= imagess.length) {
                        index = 0;
                    }
                    showImage(index);
                }
            });

            showImage(currentIndex);
        } else {
            goodCartOne.innerHTML += `<div><img style="max-width: 20vw; max-height:20vw" src="http://shop-roles.node.ed.asmer.org.ua/${images[0].url}"></div>`
        }

        goodCartOne.appendChild(byBtn)

        byBtn.addEventListener("click", () => {
            store.dispatch(actionCartAdd({ _id, name, price, images }))
        })
    }
})

store.subscribe(() => {
    const { status, payload, error } = store.getState().promise.rootCats || {}
    if (status === 'FULFILLED' && payload) {
        aside.innerHTML = ''
        for (const { _id, name } of payload) {
            aside.innerHTML += `<a class="category" href="#/category/${_id}">${name}</a>`
        }
    }
})

store.subscribe(() => {
    loginTitle.innerHTML = ("token" in store.getState().auth ? store.getState().auth.payload.sub.login : "Anonim")
})

store.subscribe(() => {
    if ("token" in store.getState().auth) {
        logoutBtnHead.style.display = "block"
        document.getElementById('loginBtnHead').style.display = "none"
        document.getElementById('registerBtnHead').style.display = "none"
        document.getElementById('orderTitle').style.display = "flex"
        document.getElementById('delimiterLoginReg').style.display = "none"

    } else {
        logoutBtnHead.style.display = "none"
        document.getElementById('loginBtnHead').style.display = "block"
        document.getElementById('registerBtnHead').style.display = "block"
        document.getElementById('orderTitle').style.display = "none"
        document.getElementById('delimiterLoginReg').style.display = "block"
    }
})
store.subscribe(() => {
    let allCount = 0
    for (const _id in store.getState().cart) {
        allCount += store.getState().cart[_id].count
    }
    orderAmount.innerHTML = allCount
})

const historyPage = () => {
    const [, route] = location.hash.split('/')
    if (route !== 'history') return

    const { status, payload, error } = store.getState().promise.orderFind || {}
    if (status === 'PENDING') {
        historyOrders.innerHTML = `<img src='https://cdn.dribbble.com/users/63485/screenshots/1309731/infinite-gif-preloader.gif' />`
    }
    if (status === 'FULFILLED') {
        if (payload.length !== 0) {
            historyOrders.innerHTML = `
                <div class="tytleOrderHistory">
                    <strong>Найменування</strong>
                    <div>Ціна</div>
                    <div>Кількість</div>
                    <div>Сумма</div>
                    <div>Час заказу</div>
                </div>`
        } else {
            historyOrders.innerHTML = `
            <div style="margin: 20px; font-weight: 600; font-size: 24px;">У вас поки немає замовлень</div>
            `
        }

        for (let i = payload.length - 1; i >= 0; i--) {
            const { createdAt, orderGoods, total } = payload[i]

            let date = new Date(+createdAt)
            const formatData = date.toLocaleString()

            for (const oneOrder of orderGoods) {
                const { good, price, count, goodName } = oneOrder

                historyOrders.innerHTML += `
                <div class="oneOrderHistory">
                    <a href="#/good/${good._id}">${goodName}</a>
                    <div>${price} грн</div>
                    <div>${count}</div>
                    <div>${total} грн</div>
                    <div>${formatData}</div>
                </div>
                `
            }
        }
    }
}
store.subscribe(historyPage)

store.subscribe(() => {
    const [, route] = location.hash.split('/')

    if (["login", "register"].includes(route)) return

    const btnArr = Array.from(document.getElementsByTagName("button"))
    if ("token" in store.getState().auth) {
        btnArr.forEach(el => {
            el.disabled = false
        })
    } else {
        btnArr.forEach(el => {
            el.disabled = true
        })
    }
})

// gql

const gqlRootCats = () =>
    gql(`
        query rootCats{
            CategoryFind(query: "[{\\"parent\\": null}]") {
                _id
                name
            }
        }
    `)
const gqlCategoryById = (_id) =>
    gql(
        `
    query categoryById($q1: String) {
    CategoryFindOne(query: $q1) {
            _id
            name
            goods {
                _id
                name
                price
                images {
                    _id
                    text
                    url
                    originalFileName
                }
            }
            image {
                _id
                text
                url
                originalFileName
            }
        }
    }
    `,
        { q1: JSON.stringify([{ _id }]) }
    )
const gqlGoodById = (_id) =>
    gql(
        `
    query goodById($q1: String) {
        GoodFindOne(query: $q1) {
            _id
            name
            price
            description
            createdAt
            categories {
                _id
                createdAt
                name
            }
            images {
                _id
                createdAt
                text
                url
                originalFileName
            }
        }
    }
    `,
        { q1: JSON.stringify([{ _id }]) }
    )
const gqlFullRegister = (login, password) =>
    gql(
        `
    mutation fullRegister($newUser:UserInput) {
        UserUpsert(user: $newUser) {
            _id
            login
        }
    }
    `,
        {
            "newUser": {
                "login": login,
                "password": password
            }
        }
    )
const gqlLogin = (login, password) =>
    gql(
        `
    query fullLogin($login: String, $password: String) {
        login(login: $login, password: $password)
    }
    `,
        {
            "login": login,
            "password": password
        }
    )
const gqlOrderFind = () =>
    gql(`
        query orderFind {
            OrderFind(query: "[{}]") {
                _id
                total
                createdAt
                orderGoods {
                    _id
                    createdAt
                    price
                    count
                    goodName
                    total
                    good {
                        _id
                    }
                }
            }
        }
    `)
const gqlOrder = (count, _id) =>
    gql(
        `
        mutation Order($o:OrderInput) {
        OrderUpsert(order:$o){
            _id total
            orderGoods{
                good{_id name}
                count
                total
            }
        }
        }
    `,
        {
            "o": {
                "orderGoods": [{
                    "count": count,
                    "good": {
                        "_id": _id
                    }
                }]
            }
        }
    )

// action

const actionRootCats = () => actionPromise('rootCats', gqlRootCats())

store.dispatch(actionRootCats())

const actionCategoryById = (_id) => actionPromise('categoryById', gqlCategoryById(_id))

const actionGoodById = (_id) => actionPromise('goodById', gqlGoodById(_id))

const actionRegister = (login, password) => actionPromise('fullRegister', gqlFullRegister(login, password))

const actionLogin = (login, password) => actionPromise('login', gqlLogin(login, password))

const actionFullLogin = (login, password) => async dispatch => {
    try {
        const token = await dispatch(actionLogin(login, password))

        if (typeof token === "string") {
            dispatch(actionAuthLogin(token))
            location.hash = "#/category/6262ca7dbf8b206433f5b3d1"
        } else {
            messageLogin.innerHTML = "Не верный Логин или Пароль"
        }
    } catch (error) {
        console.log(error)
    }
}

const actionFullRegister = (login, password) => async dispatch => {
    try {
        const data = await dispatch(actionRegister(login, password))

        if (data !== null) {
            await dispatch(actionFullLogin(login, password))
            messageLogin.innerHTML = "Вы успешно зарегестрированны"
        } else {
            messageLogin.innerHTML = "Имя пользователя занято"
        }
    } catch (error) {
        console.log(error)
    }
}

const actionFullOrder = (count, _id) => actionPromise("", gqlOrder(count, _id))

const actionOrderFind = () => actionPromise('orderFind', gqlOrderFind())

// window onhashchange

window.onhashchange = () => {
    const [, route, _id] = location.hash.split('/')

    if (["login", "register", "cart", "history"].includes(route)) {
        aside.style.display = "none"
    } else {
        aside.style.display = "block"
    }


    const routes = {
        category() {
            //console.log("категория:", _id)
            store.dispatch(actionCategoryById(_id))
        },
        good() {
            //console.log('good', _id)
            store.dispatch(actionGoodById(_id))
        },
        login() {
            main.innerHTML = `
            <form class="formLogin">
                <input id="login" type="text" placeholder="логін">
                <input id="password" type="password" placeholder="пароль">
                <span style="top: 37%" id="checkbox">👁️</span>
                <button id="loginBtn">Вхід</button>
                <a href="#/register">Реєстрація</a>
                <p id = "messageLogin"></p>
            </form>
            `
            paswordOrText(checkbox, password)

            document.getElementById('loginBtn').addEventListener('click', () => {
                const login = document.getElementById('login').value
                const password = document.getElementById('password').value

                store.dispatch(actionFullLogin(login, password))
            })
        },
        register() {
            main.innerHTML = `
            <form class="formLogin">
                <input id="login" type="text" placeholder="логін">
                <input id="password" type="password" placeholder="пароль">
                <span id="checkbox">👁️</span>
                <input id="password2" type="password" placeholder="підтвердіть пароль">
                <span id="checkbox2">👁️</span>
                <button id="registerBtn">Реєстрація</button>
                <a href="#/login">Увійти</a>
                <p id = "messageLogin"></p>
            </form>
            `
            paswordOrText(checkbox2, password2)
            paswordOrText(checkbox, password)

            document.getElementById('registerBtn').addEventListener('click', () => {
                console.log("ss")

                const login = document.getElementById('login').value
                const password = document.getElementById('password')
                const password2 = document.getElementById('password2')

                password.style.borderColor = ""
                password2.style.borderColor = ""

                if (password.value === password2.value) {
                    store.dispatch(actionFullRegister(login, password.value))
                } else {
                    console.log("ss")
                    password.style.borderColor = "red"
                    password2.style.borderColor = "red"
                }
            })
        },
        logout() {
            if (confirm("Ви хочете вийти?")) {
                store.dispatch(actionAuthLogout())
                location.hash = "#/category/6262ca7dbf8b206433f5b3d1"
            } else {
                location.hash = "#/category/6262ca7dbf8b206433f5b3d1"
            }
        },
        cart() {
            //console.log("Это корзина")
            main.innerHTML = `
            <div class="cartHistoryBlockBtn">
                <a class="cartHistoryBtn" href="#/cart">Кошик</a>
                <a class="cartHistoryBtn" href="#/history">Історія замовлень</a>
            </div><div id="cartOrders" class="cartOrders"></div>
            `

            for (const [_id, goods] of Object.entries(store.getState().cart)) {
                const { count, good } = goods
                const { name, price, images } = good

                const container = document.createElement("div")
                container.className = "oneCartOrders"
                const priceHtml = document.createElement("div")
                priceHtml.innerHTML = "Ціна: " + price * count

                const countHtml = document.createElement("input")
                countHtml.type = "number"
                countHtml.value = count

                const countBtnDel = document.createElement("button")
                countBtnDel.style.border = "none"
                countBtnDel.style.cursor = "pointer"
                countBtnDel.innerHTML = "&#128465;"

                countBtnDel.addEventListener("click", () => {
                    container.remove()
                    store.dispatch(actionCartDel({ _id }))
                    window.onhashchange()
                })

                countHtml.addEventListener("input", () => {
                    let newVal = countHtml.value
                    if (newVal < 1) {
                        newVal = 1
                        countHtml.value = newVal
                    }
                    store.dispatch(actionCartSet(good, +countHtml.value))
                    //priceHtml.innerHTML = "Ціна: " + price * newVal
                    window.onhashchange()
                })

                const nameHtml = document.createElement("a")
                nameHtml.innerHTML = name
                nameHtml.href = `#/good/${_id}`
                container.appendChild(nameHtml)

                const img = document.createElement("img")
                img.style.maxWidth = "10vw"
                img.style.maxHeight = "10vw"
                img.src = images && images[0] && `http://shop-roles.node.ed.asmer.org.ua/${images[0].url}`
                container.appendChild(img)

                container.appendChild(priceHtml)
                container.appendChild(countHtml)
                container.appendChild(countBtnDel)

                cartOrders.appendChild(container)
            }


            if (cartOrders.children.length !== 0) {
                const containerBtn = document.createElement("div")
                containerBtn.className = "containerBtn"
                main.appendChild(containerBtn)

                const countByAll = document.createElement("button")
                countByAll.innerHTML = "Придбати"
                countByAll.className = "cartOrdersBtnBy"
                containerBtn.appendChild(countByAll)

                const countDelAll = document.createElement("button")
                countDelAll.innerHTML = "Очистити кошик"
                countDelAll.className = "cartOrdersBtnDel"
                containerBtn.appendChild(countDelAll)

                countDelAll.addEventListener("click", () => {
                    store.dispatch(actionCartClear())
                    window.onhashchange()
                })

                countByAll.addEventListener("click", () => {
                    for (const _id in store.getState().cart) {
                        const count = store.getState().cart[_id].count

                        store.dispatch(actionFullOrder(count, _id))
                    }
                    store.dispatch(actionCartClear())
                    cartOrders.innerHTML = `<div style="margin: 20px; font-weight: 600; font-size: 24px;">Замовлення успішно оформлене</div>`
                    cartOrders.style = "justify-content: center;"
                    containerBtn.innerHTML = ""
                })
            } else {
                cartOrders.innerHTML = `<div style="margin: 20px; font-weight: 600; font-size: 24px;">Додайте товар до кошика</div>`
                cartOrders.style = "justify-content: center;"
            }
        },
        history() {
            main.innerHTML = `
            <div class="cartHistoryBlockBtn">
                <a class="cartHistoryBtn" href="#/cart">Кошик</a>
                <a class="cartHistoryBtn" href="#/history">Історія замовлень</a>
            </div>
            <div id="historyOrders" class="historyOrders"></div>

            </div>
            `
            store.dispatch(actionOrderFind())
        }
    }

    if (route in routes) {
        routes[route]()
    }
}

window.onhashchange()