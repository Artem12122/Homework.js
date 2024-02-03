// Person Constructor


{
    function Person(name, surname) {
        this.name = name
        this.surname = surname
        
        this.getFullName = () => this.name + (this.fatherName ? ` ${this.fatherName} ` : " " ) + this.surname
    }

    // function Person(name, surname) {
    //     this.name = () => name
    //     this.surname = () => surname
        
    //     this.getFullName = () => this.name() + (this.fatherName ? ` ${this.fatherName} ` : " " ) + this.surname()
    // }


    const a = new Person("Вася", "Пупкин")
    const b = new Person("Анна", "Иванова")
    const c = new Person("Елизавета", "Петрова")

    console.log(a.getFullName()) //Вася Пупкин
    a.fatherName = 'Иванович'    //Вася Иванович Пупкин

    console.log(b.getFullName())
}


// Person Prototype


{
    function Person(name, surname) {
        this.name = name
        this.surname = surname
    }

    // Person.prototype.name = function () {
    //     return this.name
    // }
    // Person.prototype.surname = function () {
    //     return this.surname
    // }
    Person.prototype.getFullName = function () {
        return this.name + (this.fatherName ? ` ${this.fatherName} ` : " " ) + this.surname
    }


    const a = new Person("Вася", "Пупкин")
    const b = new Person("Анна", "Иванова")
    const c = new Person("Елизавета", "Петрова")

    console.log(a.getFullName()) //Вася Пупкин
    a.fatherName = 'Иванович'    //Вася Иванович Пупкин

    console.log(b.getFullName())
}


// Store 


{
    function Store(reducer){
        let state       = reducer(undefined, {})
        let cbs         = []
    
        this.getState = () => state
        this.subscribe = cb => (cbs.push(cb),   //запам'ятовуємо пiдписника у масиві
        () => cbs = cbs.filter(c => c !== cb))
    
        this.dispatch  = action => { 
            const newState = reducer(state, action) //пробуємо запустити редьюсер
            if (newState !== state){ //перевіряємо, чи зміг ред'юсер обробити action
                state = newState //якщо зміг, то оновлюємо state 
                for (let cb of cbs)  cb() //та запускаємо пiдписникiв
            }
        }
    }

    const store = new Store(reducer)
}


// Password


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
{    
    let p = new Password(document.body, true)
    
    p.onChange = data => console.log(data)
    p.onOpenChange = open => console.log(open)
    
    p.setValue('qwerty')
    console.log(p.getValue())
    
    p.setOpen(false)
    console.log(p.getOpen())
}


// LoginForm


{
    const parL = document.createElement("p")
    parL.innerHTML = "Введите логин:"
    document.body.append(parL)

    const login = document.createElement("input")
    login.id = "login"
    document.body.append(login)

    let p = new Password(document.body, true)

    document.body.append(document.createElement("br"))

    const btn = document.createElement("button")
    btn.innerHTML = "log in"
    btn.style.marginTop = "16px"
    document.body.append(btn)

    login.oninput = () => {
        if (p.getValue) {
            if (login.value !== "" && p.getValue() !== ""){
                btn.disabled = false
            } else {
                btn.disabled = true
            }
        }
    }
    login.oninput()
    
    p.onChange = data =>{
        // console.log(data)
        login.oninput()
    }
}


// LoginForm Constructor


{
    function Login(parent, password = new Password(parent, true)){
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
    }

    let p = new Password(document.body, true)
    let login = new Login(document.body, p)
}


// Password Verify


{
    let p = new Password(document.body, true)

    const par2 = document.createElement("p")
    par2.innerHTML = "Повторите пароль:"
    document.body.append(par2)

    const p2 = document.createElement("input")
    p2.style.marginTop = "8px"
    p2.type = "password"
    document.body.append(p2)
    
    p.onChange = data => {
        p2.oninput = () => {
            if (p2.value !== data) {
                p2.style.borderColor = "red"
                par2.innerHTML = "Пароли не совпадают"
            } else {
                p2.style.borderColor = ""
                par2.innerHTML = "Пароли совпадают"
            }
        }
        p2.oninput()
    }

    p.onOpenChange = open => {
        if (open) {
            p2.style.visibility = "hidden"
            par2.innerHTML = "Повтор пароля доступен только в скрытом режиме первого поля ввода"
        } else {
            p2.style.visibility = "visible"
            par2.innerHTML = "Повторите пароль:"
        }
    }
    p.onOpenChange(true)
}