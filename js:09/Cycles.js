// while confirm


{
    let i = 0
    while (!confirm("Нажмите ОТМЕНА чтоб работал цикл?")) {
        alert("Цикл работает")
        i++
    }
    alert(`Цикл закончился, вам надоело за ${i} раз`)
}


// array fill


{
    const arr = []
    let userPush
    while ( userPush = prompt("Введите что желаете добавить") ) {
        arr.push(userPush)
        // alert(`${userPush} успешно добавленно`)
    }
    if (arr.length > 0 ) {
        alert(`Вот так выглядит все что вы добавили: ${arr}`)
    } else {
        alert("Вы ничего не ввели")
    }

    console.log(arr)
}


// array fill nopush


{
    const arr = []
    let i = 0
    let userPush
    while ( userPush = prompt("Введите что желаете добавить") ) {
        arr[i] = userPush
        i++
        alert(`${userPush} успешно добавленно`)
    }
    if (arr.length > 0 ) {
        alert(`Вот так выглядит все что вы добавили: ${arr}`)
    } else {
        alert("Вы ничего не ввели")
    }

    console.log(arr) 
}


// infinite probability


{
    let i = 0
    while (true) {
        i++
        if ( Math.random() > 0.9 ) {
            alert(`Цыкл сработал ${i} раз`)
            break
        }
    }
}


// empty loop


{
    while ( prompt() === null) {

    }
}


// progression sum


{
    const n = 10
    let sum = 0
    let progression = 1
    for ( let i = 0; i < n; i++) {
        sum += progression
        progression += 3
    }

    console.log(sum, progression)
}


// chess one line


{
    const chessOneLine = length => {
        const h = "#"
        const p = " "
        let chess= ""
    
        for (let i = 0; i < length; i++) {
            chess += i % 2 === 0 ? h : p

        }

        return chess
    }

    // const h = "#"
    // const p = " "
    // let chess= ""

    // const length = 10 // Задаем длину рядка

    // for (let i = 0; i < length; i++) {
    //     chess += i % 2 === 0 ? h : p
    // }

    // console.log(chess)


    console.log(chessOneLine(11))
}


// numbers


{
    let result = ""
    for (let j = 0; j < 10; j++ ) {
        
        for (let i = 0; i < 10; i++ ) {
            result += i
        }
        result += "\n"
    }

    console.log(result)
}


// chess


{
    const chess = (horizontal, vertical) => {
        let result = ""
        const h = "#"
        const p = "."

        for (let j = 0; j < vertical; j++ ) {
            
            for (let i = 0; i < horizontal; i++ ) {
                result += i % 2 === 0 ? p : h
            }
            result += "\n"
        }
        return result
    }

    // let result = ""
    // const h = "#"
    // const p = "."

    // for (let j = 0; j < 10; j++ ) {
            
    //     for (let i = 0; i < 12; i++ ) {
    //         result += i % 2 === 0 ? p : h
    //     }
    //     result += "\n"
    // }

    // console.log(result)

    console.log(chess(12,10))
}


// cubes


{
    const cubes = n => {
        const arr = []

        for (let i = 0; i < n; i++) {
            arr.push(Math.pow(i, 3))
        }

        return arr
    }

    // const arr = []

    // const N = +prompt("Введите длинну массива")

    // for (let i = 0; i < N; i++) {
    //     arr.push(Math.pow(i, 3))
    // }
    // console.log(arr)

    console.log(cubes(+prompt("Введите длинну массива")))
}


// multiply table


{
    const multiplyTable = (horizontal, vertical) => {
        const arr = []

        for (let i = 0; i <= vertical; i++) {
            const arrMultiply = []
    
            for (let q = 0; q <= horizontal; q++) {
                arrMultiply.push( i * q )
            }
    
            arr.push(arrMultiply)
        }

        return arr
    }


    // const arr = []

    // for (let i = 0; i <= 10; i++) {
    //     const arrMultiply = []

    //     for (let q = 0; q <= 10; q++) {
    //         arrMultiply.push( i * q )
    //     }

    //     arr.push(arrMultiply)
    // }

    // console.log(arr, arr[5][6])

    console.log(multiplyTable(10, 10), multiplyTable(6, 5)[5][6])
}


// read array of objects


{
    const readArrayOfObjects = () => {
        const arr = []
    
        do {
            const obj = {}
            let userPushKey
            while ( userPushKey = prompt("Введите ключ") ) {
    
                const value =  prompt("Введите значение")
                obj[userPushKey] = value

            }
            arr.push(obj)
        } while (confirm("Добавить еще один объект"))

        return arr
    }


    console.log(readArrayOfObjects())
}


// Ромбік


{
    const userSize = prompt("Введите размер ромба")
    const size = Math.round(userSize / 2)
    const h = "#"
    const p = "."
    let result = ""

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size - i - 1; j++) {
            result += p
        }

        for (let j = 0; j < 2 * i + 1; j++) {
            result += h
        }

        for (let j = 0; j < size - i - 1; j++) {
            result += p
        }
        result += "\n"
    }

    for (let i = size - 2; i >= 0; i--) {
        for (let j = 0; j < size - i - 1; j++) {
            result += p
        }

        for (let j = 0; j < 2 * i + 1; j++) {
            result += h
        }

        for (let j = 0; j < size - i - 1; j++) {
            result += p
        }  
        result += "\n"
    }

    console.log(result)
}


// DOM: multiply table


{
    const d = document.createElement("div")
    document.body.append(d)

    const table = document.createElement("table")
    d.append(table)

    for (let i = 0; i <= 10; i++) {
        const tr = document.createElement("tr")
        table.append(tr)
        for (let q = 0; q <= 10; q++) {
            const td = i === 0 || q === 0 ? document.createElement("th") : document.createElement("td")
            tr.append(td)
            //td.innerHTML = i === 0 ? q : i * (q === 0 ? i / i : q)

            if (q === 0) {
                td.innerHTML = i
            } else {
                td.innerHTML = i === 0 ? q : i * q
            }
        }
    }
}


//  DOM: highlight cell


{
    const d = document.createElement("div")
    document.body.append(d)

    const table = document.createElement("table")
    d.append(table)

    for (let i = 0; i <= 10; i++) {
        const tr = document.createElement("tr")
        table.append(tr)
        for (let q = 0; q <= 10; q++) {
            const td = i === 0 || q === 0 ? document.createElement("th") : document.createElement("td")
            tr.append(td)

            if (q === 0) {
                td.innerHTML = i
            } else {
                td.innerHTML = i === 0 ? q : i * q
            }
            
            td.addEventListener("mouseover",
            (event) => { if( td.style.background !== "red" ) {
                td.style.background = "green"
                } })

            td.addEventListener("mouseout",
            (event) => { if( td.style.background !== "red" ) {
                td.style.background = "none"
                } })

            td.addEventListener("click",
            (event )=> td.style.background = "red" )

            td.addEventListener("dblclick",
            (event )=> td.style.background = "none" )
        }
    }
}


// DOM: Highlight cross


{
    const d = document.createElement("div")
    document.body.append(d)

    const table = document.createElement("table")
    d.append(table)

    for (let i = 0; i <= 10; i++) {
        const tr = document.createElement("tr")
        table.append(tr)

        for (let q = 0; q <= 10; q++) {
            const td = i === 0 || q === 0 ? document.createElement("th") : document.createElement("td")
            tr.append(td)

            if (q === 0) {
                td.innerHTML = i
            } else {
                td.innerHTML = i === 0 ? q : i * q
            }

            td.addEventListener("mouseover", (event) => {
                for (const row of table.children) {
                    for (const cell of row.children) {
                        if (cell.parentNode === tr || cell.cellIndex === q) {
                            cell.style.background = "green";
                        }
                    }
                }
            });

            td.addEventListener("mouseout", (event) => {
                for (const row of table.children) {
                    for (const cell of row.children) {
                        cell.style.background = "none";
                    }
                }
            });

        }
    }
}