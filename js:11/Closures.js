// Предыдущие ДЗ


{
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
    // Замыкания в этой функции видны мне так: при вызове функций которые мы возвращаем уже после работы самой createPersonClosure
    // можно обращатся к переменным изменять их или читать хотя код уже закончил свою работу и они должны бы уйти в небытие
    // Еще замыкания были в функциях с расчетом валют в DOM так как мы считали курс уже после создания формы на странице и окончания работы кода,
    // то же самое и со списками городов в странах 
}


// makeProfileTimer


{
    function makeProfileTimer() {
        const startTime = performance.now()
        return function() {
            return performance.now() - startTime
        }
    }

    let timer = makeProfileTimer()
    alert('Замеряем время работы этого alert')
    alert("Время работы первого alert составило: " + timer())
}


// makeSaver


{
    function makeSaver(value) {
        let result
        let flag = false
        return function() {
            if (!flag) {
                result = value()
                flag = true
            }
            return result
        }
    }

    var saver = makeSaver(Math.random)

    var value1 = saver()
    var value2 = saver()

    value1 === value2

    var saver2 = makeSaver(() => console.log('saved function called') || [null, undefined, false, '', 0, Math.random()][Math.ceil(Math.random()*6)])
    var value3 = saver2()
    var value4 = saver2()

    value3 === value4

    let namePrompt = prompt.bind(window, 'Как тебя зовут?')
    let nameSaver = makeSaver(namePrompt)
    alert(`Привет! Prompt еще не было!`)
    alert(`Привет ${nameSaver()}. Только что запустился prompt, первый и последний раз`)
    alert(`Слушай, ${nameSaver()}, го пить пиво. Ведь prompt был только один раз`)
}


// myBind


{
    function myBind(f, zis, arr) {
        return function(...x) {
            const arr2 = [...arr]
            let j = 0
            for (let i = 0; i < arr2.length; i++) {
                if (arr2[i] === undefined) {
                    arr2[i] = x[j++]
                }
            }
            const xLast = x.slice(j, )
            if (xLast.length > 0) {
                xLast.map(y => arr2.push(y))
            }
           return f.apply(zis, arr2)
        }
    }

    var pow5 = myBind(Math.pow, Math, [, 5])
    var cube = myBind(Math.pow, Math, [, 3])

    pow5(2)
    cube(3)

    var chessMin = myBind(Math.min, Math, [, 4, , 5,, 8,, 9])
    chessMin(-1,-5,3,15)

    var zeroPrompt = myBind(prompt, window, [undefined, "0"])
    var someNumber = zeroPrompt("Введите число")

    const bindedJoiner = myBind((...params) => params.join(''), null, [, 'b', , , 'e', 'f'])
    bindedJoiner('a','c','d') === 'abcdef'
    bindedJoiner('1','2','3') === '1b23ef'
}


// checkResult


{
    function checkResult(original, validator){
        function wrapper(...params){
            let paramsCopy = [...params]
            let value
            do {
                value = original.apply(this, paramsCopy)
                console.log(value)
            } while (!(validator(value)))

            return value
        }
        
        return wrapper
    }
    
    const numberPrompt = checkResult(prompt, x => !isNaN(+x)) 
    let   number       = +numberPrompt("Введите число", "0")
    
    const gamePrompt   = checkResult(prompt, x => ['камень', 'ножницы', 'бумага'].includes(x.toLowerCase())) 
    const turn         = gamePrompt("Введите что то из списка: 'камень', 'ножницы', 'бумага'")

    const randomHigh = checkResult(Math.random, x => +x >= 0.5)
    const numb = randomHigh()
    console.log(numb)


    const alwaysSayYes = checkResult(confirm, x => x === true )
    const sayYes = alwaysSayYes()
    console.log(sayYes)

    const firstBig = text => text ? text.slice(0, 1).toUpperCase() + text.slice(1, ).toLowerCase() : undefined

    // const fullNameObj = () => {
    //     let name = firstBig(prompt("Напишите ваше имя."))
    //     let surname = firstBig(prompt("Напишите вашу фамилию."));
    //     let fatherName = firstBig(prompt("Напишите ваше отчество."));

    //     let fullName =  surname + " " + name + " " + fatherName;

    //     return {
    //         name: name,
    //         surname: surname,
    //         fatherName: fatherName,
    //         fullName: fullName
    //     }
    // }
    {
        let name
        let surname
        let fatherName
        function fullNameObj(){
            if (name === undefined ) {
                name = firstBig(prompt("Напишите ваше имя."))
            }
            if (surname === undefined ) {
                surname = firstBig(prompt("Напишите вашу фамилию."))
            }
            if (fatherName === undefined ) {
                fatherName = firstBig(prompt("Напишите ваше отчество."))
            }
            let fullName =  surname + " " + name + " " + fatherName;

            const obj = {
                name: name,
                surname: surname,
                fatherName: fatherName,
                fullName: fullName
            }
            return obj
        }
    }
    const respectMe = checkResult(fullNameObj, obj => Object.values(obj).every( x => x !== undefined))
    const me = respectMe()
    console.log(me)
}