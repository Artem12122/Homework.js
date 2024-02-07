// fetch basic

{  // немного не понял здесь fetch должен быть внутри функции или так как сделал
    function forTableJson(json, paren) {
        function testHttps (str, tr) {
            if (str.slice(0, 5) === "https") {
                const td = document.createElement("td")
                tr.appendChild(td)
                const a = document.createElement("a")
                a.innerHTML = str
                a.href = str
                td.appendChild(a)

            } else {
                const td = document.createElement("td")
                td.innerHTML = str
                tr.appendChild(td)
            }
        }

        const arrJson = Object.entries(json)

        const table = document.createElement("table")
        paren.append(table)

        for (const arr of arrJson) {
            const tr = document.createElement("tr")
            table.appendChild(tr)
            for (const arrChild of arr) {
                if (typeof arrChild === "object") {
                    for (const arrChildChild of arrChild) {
                        testHttps(arrChildChild, tr)
                    }
                } else {
                    testHttps(arrChild, tr)
                }
            }
        }
    }

    fetch('https://swapi.dev/api/people/1/')
    .then(res => res.json())
    .then(luke => forTableJson(luke, document.body))
}


// fetch improved


{
    function forTableJson(json, paren) {
        function testHttps (str, tr) {
            if (typeof str === "string" && str.slice(0, 5) === "https") {
                const td = document.createElement("td")
                tr.appendChild(td)
                const a = document.createElement("a")
                a.innerHTML = str
                a.href = "#"
                a.onclick = () => {
                    forTableJson(a.innerHTML, paren)
                }
                td.appendChild(a)

            } else {
                const td = document.createElement("td")
                td.innerHTML = str
                tr.appendChild(td)
            }
        }

        fetch(json)
        .then(res => res.json())
        .then(el => {
            const arrJson = Object.entries(el)

            const table = document.createElement("table")
            table.style.padding = "16px"
            table.style.border = "2px solid black"
            paren.append(table)

            for (const arr of arrJson) {
                const tr = document.createElement("tr")
                table.appendChild(tr)
                for (const arrChild of arr) {
                    if (typeof arrChild === "object" && arrChild !== null) {
                        for (const arrChildChild of arrChild) {
                            testHttps(arrChildChild, tr)
                        }
                    } else {
                        testHttps(arrChild, tr)
                    }
                }
            }
        })
        
    }

    forTableJson('https://swapi.dev/api/people/1/', document.body)
    forTableJson('https://swapi.dev/api/species/2/', document.body)
}


// race


{
    function delay(ms){ //промисифицированная функция для создания промиса, который резолвится через определенное время
        //функция-исполнитель, принимает два параметра - функции для передачи промису результата работы
        function executor(fulfill, reject){  //reject объявлен для вида.
            setTimeout(() => fulfill(ms), ms) //setTimeout запустит функцию, которая запустит fulfill через ms миллисекунд. Результатом промиса будет время задержки
        }
        //возврщаем новый промис, передав в него executor. Промис тут же его запускает, передав в него колбэки для управления состоянием
        return new Promise(executor) 
    }

    Promise.race([fetch('https://swapi.dev/api/people/1/'), delay(150)]) // у меня в среднем загружалось то за 80мс то за 220мс поэтому 150мс примерно поровну выдает результат 
    .then(res => typeof res !== "number" ? res.json() : res)
    .then(result => console.log(`Первым оказался промис ${typeof result !== "number" ? "swapi.dev" : "delay"}:`, result))


    {
        const promiseSwapi = fetch('https://swapi.dev/api/people/1/')
        .then(res => res.json())
        .then(data => data)

        const promiseDelay = delay(150)

        Promise.race([promiseSwapi, promiseDelay])
        .then(result => console.log(`Первым оказался промис ${typeof result !== "number" ? "swapi.dev" : "delay"}:`, result))
    }
}


// Promisify: confirm


{
    function confirmPromise(text){
        const conf = confirm(text)
        return conf ? Promise.resolve() : Promise.reject()
   }
   
   confirmPromise('Проміси це складно?').then(() => console.log('не так вже й складно'),
                                               () => console.log('respect за посидючість і уважність'))
}


// Promisify: prompt


{
    function promptPromise(text){
        const prmpt = prompt(text)
        return prmpt ? Promise.resolve(prmpt) : Promise.reject()
   }
   promptPromise("Як тебе звуть?").then(name => console.log(`Тебе звуть ${name}`),
                                          () => console.log('Ну навіщо морозитися, нормально ж спілкувалися'))
}


// Promisify: LoginForm


{
    function Password(parent, open){
        const parP = document.createElement("p")
        parP.innerHTML = "Введите пароль:"
        parent.append(parP)
        const inpt = document.createElement("input")
        parent.append(inpt)
        const checkbox = document.createElement("input")
        parent.append(checkbox)
        checkbox.type = "checkbox"
    
        this.getOpen = function() {
            return checkbox.checked
        }
        this.setOpen = function(key) {
            if (key) {
                inpt.type = "text"
                checkbox.checked = true
            } else {
                inpt.type = "password"
                checkbox.checked = false
            }
        }
    
        this.getValue = function() {
            return inpt.value
        }
        this.setValue = function(valueInpt="") {
            inpt.value = valueInpt
        }
    
        inpt.oninput = () => {
            if (this.onChange) {
                this.onChange(inpt.value)
            }
        }
    
        checkbox.addEventListener("change", () => {
            this.setOpen(checkbox.checked)
            if (this.onOpenChange) {
                this.onOpenChange(checkbox.checked)
            }
        })
    
        this.setOpen(open)
    }

    function LoginForm(parent, password = new Password(parent, true)){
        const blockParent = document.createElement("div")
        const block = document.createElement("div")
        const parL = document.createElement("p")
        parL.innerHTML = "Введите логин:"
        block.append(parL)
        
        const inpt = document.createElement("input")
        const btn = document.createElement("button")
        btn.innerHTML = "log in"
        btn.style.marginTop = "16px"
        inpt.id = "login"
        block.append(inpt)

        const br = document.createElement("br")
        parent.insertBefore(block, parent.childNodes[parent.childNodes.length - 3])
        parent.append(br, btn)

        this.getOpen = function() {
            return btn.disabled
        }
        this.setOpen = function(key) {
            if (key) {
                btn.disabled = false
            } else {
                btn.disabled = true
            }
        }

        this.getValue = function() {
            return inpt.value
        }

        this.setValue = function(valueInpt="") {
            inpt.value = valueInpt
        }

        this.loginDisabled = (data = password.getValue()) => {
            if (password.getValue) {
                if (this.getValue() !== "" && data !== ""){
                    this.setOpen(true)
                } else {
                    this.setOpen(false)
                }
            }
        }

        inpt.oninput = () => {
            this.loginDisabled()
        }
        inpt.oninput()

        password.onChange = data => {
            this.loginDisabled(data)
        }

        let obj
        btn.onclick = (event) => {
            event.preventDefault()
            if (this.getValue && password.getValue) {
                const login = this.getValue()
                const p = password.getValue()
                obj = {
                    login: login,
                    password: p
                }
                if (this.getLoginAndPassword) {
                    this.getLoginAndPassword(obj)
                }
                //console.log(login, p)
            }
        }
        
    }
    //let login = new LoginForm(document.body)

    function loginPromise(parent){
        function executor(resolve, reject){
            const form = new LoginForm(parent)
            form.getLoginAndPassword = (obj) => {
                resolve(obj)
            }
        }
        
        return new Promise(executor)
    }
    
    loginPromise(document.body).then(({login, password}) => console.log(`Ви ввели ${login} та ${password}`))
}