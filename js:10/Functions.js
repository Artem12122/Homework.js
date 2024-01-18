// Arrow to Functions


// 1
function forTable(arraysArrays) {
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


// 2
{
    function filterLexics(userText, exceptions) {
        let = rightText = userText.split(" ").filter( x => !exceptions.includes(x) ).join(" ").trim();
        return rightText
    }
    
    const exceptions = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "блин", "оладь", "сука", " "];
    const userText = prompt("напишите ваш рассказ");
    
    console.log(filterLexics(userText, exceptions))
    console.log(userText)
}


// 3
{
    function form(obj) {
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


// 4
function sort(arr, key, boolean = true) { 
    return arr.slice().sort(function(a, b) {
        let valA = a[key] !== undefined ? a[key] : null
        let valB = b[key] !== undefined ? b[key] : null
        
        if (valA === null) return (boolean ? 1 : -1 )
        if (valB === null) return (boolean ? -1 : 1 )
        
        return (boolean ? valA > valB : valB > valA ) ? 1 : -1
    });
}

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


// 5 
{
    function table(arr, keys, boolean) {
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


// createPerson


{
    function createPerson(name, surname) {
        const obj = {
            name: name,
            surname: surname,
            getFullName: function() {
                return this.name + (this.fatherName ? ` ${this.fatherName} ` : " " ) + this.surname
            }

        }
        return obj
    }

    const a = createPerson("Вася", "Пупкін")
    const b = createPerson("Ганна", "Іванова")
    const c = createPerson("Єлизавета", "Петрова")

    console.log(a.getFullName()) //Вася Пупкін
    a.fatherName = 'Іванович'    
    console.log(a.getFullName()) //Вася Іванович Пупкін

    console.log(b.getFullName()) //Ганна Іванова
}


// createPersonClosure


{
    function oneBigCheck(text) {
        return text.slice(0, 1) === text.slice(0, 1).toUpperCase() && text.slice(1, ) === text.slice(1, ).toLowerCase()  
    }
    function checkAge(age) {
        return age >= 0 && age <= 100
    }


    function createPersonClosure(name, surname) {
        let age
        let fatherName

        function getName() {
            return name
        }
        function getSurname() {
            return surname
        }
        function getFatherName() {
            return fatherName
        }
        function getAge() {
            return age
        }
        function getFullName() {
            return `${surname} ${name} ${fatherName || ""}`
        }

        function setName(newName) {
            if (oneBigCheck(newName)) {
                name = newName
            }
            return name
        }
        function setSurname(newSurname) {
            if (oneBigCheck(newSurname)) {
                surname = newSurname
            }
            return surname
        }
        function setFatherName(newFatherName) {
            if (oneBigCheck(newFatherName)) {
                fatherName = newFatherName
            }
            return fatherName
        }
        function setAge(newAge) {
            if (checkAge(newAge)) {
                age = newAge
            }
            return age
        }
        function setFullName(newFullName) {
            const arrNewFullName = newFullName.split(" ")
            const [newSurname="", newName="", newFatherName=""] = arrNewFullName
            setSurname(newSurname)
            setName(newName)
            setFatherName(newFatherName)

            // setSurname(arrNewFullName[0])
            // setName(arrNewFullName[1])
            // if (arrNewFullName.length > 2 ){
            //     setFatherName(arrNewFullName[2])
            // }
        }

        return {
            getName,
            getSurname,
            getFatherName,
            getAge,
            getFullName,
            setName,
            setSurname,
            setFatherName,
            setAge,
            setFullName,
        }
    }


    const a = createPersonClosure("Вася", "Пупкін")
    const b = createPersonClosure("Ганна", "Іванова")
    console.log(a.getName())
    a.setName('Artem')
    a.setAge(15)
    a.setAge(150) // не працює

    b.setFullName("Петрова Ганна Миколаївна")
    console.log(b.getFatherName()) // Миколаївна
}


// createPersonClosureDestruct


{
    function createPersonClosureDestruct({name = "Anon", surname = "Anonov", age = 0, fatherName = "Anovich"}={}) {

        function getName() {
            return name
        }
        function getSurname() {
            return surname
        }
        function getFatherName() {
            return fatherName
        }
        function getAge() {
            return age
        }
        function getFullName() {
            return `${surname} ${name} ${fatherName}`
        }

        function setName(newName) {
            if (oneBigCheck(newName)) {
                name = newName
            }
            return name
        }
        function setSurname(newSurname) {
            if (oneBigCheck(newSurname)) {
                surname = newSurname
            }
            return surname
        }
        function setFatherName(newFatherName) {
            if (oneBigCheck(newFatherName)) {
                fatherName = newFatherName
            }
            return fatherName
        }
        function setAge(newAge) {
            if (checkAge(newAge)) {
                age = newAge
            }
            return age
        }
        function setFullName(newFullName) {
            const [newSurname, newName, newFatherName] = newFullName.split(" ")
            setSurname(newSurname || "Анонович")
            setName(newName || "Анон")
            setFatherName(newFatherName || "Анонов")
            
        }
        return {
            getName,
            getSurname,
            getFatherName,
            getAge,
            getFullName,
            setName,
            setSurname,
            setFatherName,
            setAge,
            setFullName,
        }
    }

    const a = createPersonClosureDestruct(createPerson("Вася", "Пупкін"))
    const b = createPersonClosureDestruct({name: 'Миколай', age: 75})
}


// isSorted


{
    function isSorted(...arr) {
        return arr.every(x => typeof x === "number") && arr.every( (el, ind, arr) => ind === 0 || el > arr[ind - 1])
    }

    console.log(isSorted(1, 2, 3, 4, 5))
    console.log(isSorted(1, 2, 6, 4, 5))
    console.log(isSorted(1, 2, "3", 4, 5))
}


// Test isSorted


{
    function isSorted(...arr) {
        return arr.every(x => typeof x === "number") && arr.every( (el, ind, arr) => ind === 0 || el > arr[ind - 1])
    }

    const arr = []
    let userPush
    while ( userPush = +prompt("Введите что желаете добавить") ) {
        arr.push(userPush)
    }

    if (arr.length > 0 ) {
        alert(`Вот так выглядит все что вы добавили: ${arr}`)
    } else {
        alert("Вы ничего не ввели")
    }

    console.log(isSorted(...arr))
    console.log(isSorted(1, 2, 3, 4, 5))
    console.log(isSorted(1, 2, 6, 4, 5))
    console.log(isSorted(1, 2, "3", 4, 5))
}


// personForm


{
    const user = createPersonClosureDestruct("Ганна", "Іванова")
    user.setAge(15)
    user.setFullName("Петрова Ганна Миколаївна")

    function personForm(parent, person){
        const nameInput = document.createElement("input")
        const surnameInput = document.createElement("input")
        const fatherNameInput = document.createElement("input")
        const ageInput = document.createElement("input")
        const fullNameInput = document.createElement("input")

        parent.append(nameInput, surnameInput, fatherNameInput, ageInput, fullNameInput)

        nameInput.style.margin = "10px"
        surnameInput.style.margin = "10px"
        fatherNameInput.style.margin = "10px"
        ageInput.style.margin = "10px"
        fullNameInput.style.margin = "10px"
        fullNameInput.style.width = "230px"


        function updateInpt() {
            nameInput.value = person.getName()
            surnameInput.value = person.getSurname()
            fatherNameInput.value = person.getFatherName()
            ageInput.value = person.getAge()
            fullNameInput.value = person.getFullName()
        }
        updateInpt()

        nameInput.oninput = function() {
            person.setName(nameInput.value)
            updateInpt()
        }

        surnameInput.oninput = function() {
            person.setSurname(surnameInput.value)
            updateInpt()
        }

        fatherNameInput.oninput = function() {
            person.setFatherName(fatherNameInput.value )
            updateInpt()
        }

        ageInput.oninput = function() {
            person.setAge(ageInput.value)
            updateInpt()
        }

        fullNameInput.oninput = function() {
            person.setFullName(fullNameInput.value)
            updateInpt()
        }

    }

    personForm(document.body, user)
}


// getSetForm


{
    let car;
    {
        let brand = 'BMW', model = 'X5', volume = 2.4
        car = {
            getBrand(){
                return brand
            },
            setBrand(newBrand){
                if (newBrand && typeof newBrand === 'string'){
                    brand = newBrand
                }
                return brand
            },
            
            getModel(){
                return model
            },
            setModel(newModel){
                if (newModel && typeof newModel === 'string'){
                    model = newModel
                }
                return model
            },
            
            getVolume(){
                return volume
            },
            setVolume(newVolume){
                newVolume = +newVolume
                if (newVolume && newVolume > 0 && newVolume < 20){
                    volume = newVolume
                }
                return volume
            },
            
            getTax(){
                return volume * 100
            }
        }
    }

    function getSetForm(parent, getSet){
        const inputs = {}
        
        const updateInputs = () => {
            for (const key in inputs) {
                const method = "get" + key
                if (method in getSet) {
                    inputs[key].value = getSet[method]() !== undefined ? getSet[method]() : ""
                }
            }
        }
    
        for (const getSetName in getSet){
            const getOrSet = getSetName.slice(0, 3)
            const fieldName = getSetName.slice(3, )
            const setKey = `set` + fieldName
            const getKey = `get` + fieldName
    
            let inpt
    
            if (getOrSet === "get" && !(fieldName in inputs)) {
                inpt = document.createElement("input")
                parent.append(inpt)
                inpt.style.margin = "10px"
                inpt.placeholder = fieldName
    
                inputs[fieldName] = inpt

                if (!(setKey in getSet)) {
                    inpt.disabled = true
                }

                const type = typeof getSet[getKey]()
                if (type === "number") {
                    inpt.type = "number"
                } else {
                    inpt.type = "text"
                }
    
                // inpt.oninput = function() {
                //     getSet[setKey](inpt.value)
                //     updateInputs()
                // }
    
                inpt.addEventListener("change", function() {
                    getSet[setKey](inpt.value)
                    updateInputs()
        
                })
            }
        }
    
        updateInputs()
    }

    getSetForm(document.body, car)
    getSetForm(document.body, createPersonClosure('Анон', "Анонов"))
}