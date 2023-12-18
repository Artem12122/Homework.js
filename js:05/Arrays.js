// Confirms  


{
    const question = [ 
        confirm("У вас хорошая погода?"), 
        confirm("У вас есть собака?" ), 
        confirm("Вы любите котов?") 
    ];

    console.log(question);
}


// Prompts 


{
    const arr = [];
    let i = 0;
    arr[i++] = prompt("Напишите ваше имя.");
    arr[i++] = prompt("Напишите вашу фамилию.");
    arr[i++] = prompt("Напишите ваше отчество.");

    console.log(arr)
}


// Item access


{
    const arr = [ 10, 20, 30, 40, 50, 60, 70, 80, 90 ];
    let userNumb = +prompt("Введите индекс массива который вас интнрнсует")

    if (!isNaN(userNumb) && userNumb >= 0 && userNumb < arr.length ) {
        alert(`По индексу ${userNumb}: находится элемент \'${arr[userNumb]}\'. \nОбщая длина массива составляет ${arr.length}`)
    }
    else {
        alert("Введен некорректный индекс")
    }
}


// Item change


{
    const arr = [];
    let userNumb = prompt("Введите индекс массива и значение которое хотите присвоить этому индексу(разделив индекс и значение \",\")").split(",")

    arr[userNumb[0]] = userNumb[1].trim();
    console.log(arr)
    console.log(userNumb)
}


// Multiply table


{
    const arr = [
        [ 0, 0, 0, 0, 0 ],
        [ 0, 1, 2, 3, 4 ],
        [ 0, 2, 4, 6 , 8 ],
        [ 0, 3, 6, 9, 12 ],
        [ 0, 4, 8, 12, 16 ]
    ];

    // const arr = []
    // for (let i = 0; i <= 4; i++) {
    //     const arrMultiply = []
    //     for (let q = 0; q <= 4; q++) {
    //         arrMultiply.push( i * q )
    //     }
    //     arr.push(arrMultiply)
    // }

    console.log(arr)
    console.log(arr[2][3])
}


// Multiply table slice

{
    const arr = [
        [ 0, 0, 0, 0, 0 ],
        [ 0, 1, 2, 3, 4 ],
        [ 0, 2, 4, 6 , 8 ],
        [ 0, 3, 6, 9, 12 ],
        [ 0, 4, 8, 12, 16 ]
    ];


    const arrSlice = [
        arr[1].slice(1, ),
        arr[2].slice(1, ),
        arr[3].slice(1, ),
        arr[4].slice(1, )
    ]

    console.log(arrSlice)
}


// IndexOf Word


{
    let userText = prompt("Введите ваше Ф.И.О").split(" ");
    let userName = prompt("Введите ваше имя ");

    if (userText.indexOf(userName) !== -1 ) {
        alert(`Ваше имя является ${(userText.indexOf(userName)) + 1} словом из ${userText.length}`)
    }
    else {
        alert(`"Ваше имя не найдено"`)
    }

    console.log(userText);
}


// Reverse 


{
    const userText = prompt("Введите ваше Ф.И.О").split(" ");
    let userName = prompt("Введите ваше имя ").trim();
    const reverseUserText = []

    if (userText.indexOf(userName) !== -1 ) {
        alert(`Ваше имя является ${(userText.indexOf(userName)) + 1} словом из ${userText.length}`)
    }
    else {
        alert(`"Ваше имя не найдено"`)
    }

    for (let i = 0; i < 5; i++) {
        let relative = prompt("Введите имя вашего родственника")
        userText.push(relative)
    }

    for ( let i = userText.length; i > 0 ; i-- ) {
        let arr = userText.pop()
        reverseUserText.push(arr)
    }

    console.log(userText);
    console.log(reverseUserText);
}


// Reverse 2


{
    const userText = prompt("Введите ваши фамилию имя отчество").toLowerCase().split(" ");
    let userName = prompt("Введите ваше имя ").toLowerCase().trim();
    const reverseUserText = []
    const reverse2UserText = []

    if (userText.indexOf(userName) !== -1 ) {
        alert(`Ваше имя является ${(userText.indexOf(userName)) + 1} словом из ${userText.length}`)
    }
    else {
        alert(`"Ваше имя не найдено"`)
    }

    for (let i = 0; i < 5; i++) {
        let relative = prompt("Введите имя вашего родственника").toLowerCase()
        userText.push(relative)
    }

    for ( let i = userText.length; i > 0 ; i-- ) {
        let arr = userText.pop()
        reverseUserText.push(arr)
    }

    for ( let i = reverseUserText.length; i > 0 ; i-- ) {
        let arr = reverseUserText.shift()
        reverse2UserText.unshift(arr)
    }

    console.log(userText);
    console.log(reverseUserText);
    console.log(reverse2UserText);
}


// Copy


{
    const arr = [
        [ 0, 0, 0, 0, 0 ],
        [ 0, 1, 2, 3, 4 ],
        [ 0, 2, 4, 6 , 8 ],
        [ 0, 3, 6, 9, 12 ],
        [ 0, 4, 8, 12, 16 ]
    ];

    const arrCopy = [...arr]


    console.log(arrCopy)
    console.log(arr)
}


// Deep Copy


{
    const arr = [
        [ 0, 0, 0, 0, 0 ],
        [ 0, 1, 2, 3, 4 ],
        [ 0, 2, 4, 6 , 8 ],
        [ 0, 3, 6, 9, 12 ],
        [ 0, 4, 8, 12, 16 ]
    ];

    let arrCopy = arr.slice();
    arrCopy = [
        arr[0].slice(),
        arr[1].slice(),
        arr[2].slice(),
        arr[3].slice(),
        arr[4].slice()
    ]

    console.log(arrCopy)
    console.log(arr)
}


// Array Equals


{
    const arr = [
        [ 0, 0, 0, 0, 0 ],
        [ 0, 1, 2, 3, 4 ],
        [ 0, 2, 4, 6 , 8 ],
        [ 0, 3, 6, 9, 12 ],
        [ 0, 4, 8, 12, 16 ]
    ];
    const arr2 = arr ;

    console.log( arr === arr2 )
}


// Flat


{
    const arr = [
        [ 0, 0, 0, 0, 0 ],
        [ 0, 1, 2, 3, 4 ],
        [ 0, 2, 4, 6 , 8 ],
        [ 0, 3, 6, 9, 12 ],
        [ 0, 4, 8, 12, 16 ]
    ];

    const flatArr = [ ...arr[0], ...arr[1], ...arr[2], ...arr[3], ...arr[4] ]

    console.log(flatArr)
}


//  Destruct


{
    const userText = [...prompt("Введите ваш текст")]

    const [ a,,,,b,,,,c ] = userText

    console.log( a, b, c )
}


// Destruct default


{
    const userText = [...prompt("Введите ваш текст")]

    const [,a="!",,b="!",c="!"] = userText

    console.log( a, b, c )
}


// Multiply table rest


{
    const arr = [
        [ 0, 0, 0, 0, 0 ],
        [ 0, 1, 2, 3, 4 ],
        [ 0, 2, 4, 6 , 8 ],
        [ 0, 3, 6, 9, 12 ],
        [ 0, 4, 8, 12, 16 ]
    ];

    const [
        [],
        [,...flatArr1],
        [,...flatArr2],
        [,...flatArr3],
        [,...flatArr4]
    ] = arr;

    const flatArr = [...flatArr1, ...flatArr2, ...flatArr3, ...flatArr4 ]

    console.log(flatArr)
}


// For Alert


{
    const names = ["John", "Paul", "George", "Ringo"];

    for (const name of names ) {
        alert(`Hi, ${name}`)
    }
}


// For Select Option


{
    const currencies = ["USD", "EUR", "GBP", "UAH"]
    let str = "<select>"

    for (const currency of currencies){
       str += "<option>" + currency + "</option>"
    }

    str += "</select>"

    document.write(str)
    // console.log(str)
}


// For Table Horizontal


{
    const names = ["John", "Paul", "George", "Ringo"]
    let str = "<table>"

    for (const name of names){
        str += "<td>" + name + "</td>"
    }

    str += "</table>"

    document.write(str)
    // console.log(str)

}


// For Table Vertical


{
    const names = ["John", "Paul", "George", "Ringo"]
    let str = "<table>"

    for (const name of names){
        str += "<tr>" + "<td>" + name + "</td>" + "</tr>"
    }

    str += "</table>"

    document.write(str)
    console.log(str)
}


// For Table Letters


{
    const currencies = ["USD", "EUR", "GBP", "UAH"]
    let str = "<table>"

    for (const currency of currencies){
        str += "<tr>"
        console.log(currency)
        for (const letter of currency){
            str += "<td>" + letter + "</td>"
            console.log(letter)
        }
        str += "</tr>"
    }

    str += "</table>"

    document.write(str)
}


// For Multiply Table


{
    const arr = [
        [ 0, 0, 0, 0, 0 ],
        [ 0, 1, 2, 3, 4 ],
        [ 0, 2, 4, 6 , 8 ],
        [ 0, 3, 6, 9, 12 ],
        [ 0, 4, 8, 12, 16 ]
    ];
    let i = 1
    let str = "<table>"

    for (const arrChild of arr){
        if ( i % 2 ){
            str += "<tr style= \"color: blue\">";
        }
        else {
        str += "<tr style= \"color: green\">";
        }
        i++
        // console.log(arrChild)
        for (const arrOne of arrChild){
            str += "<td>" + arrOne + "</td>"
            // console.log(arrOne)
        }
        str += "</tr>"
    }

    str += "</table>"

    document.write(str)
    console.log(str)

}


// Function Capitalize


{
    const capitalize = str => {
        let result = str.slice(0, 1).toUpperCase() + str.slice(1, ).toLowerCase();
        //console.log(str)
        return result
   }


   console.log(capitalize("cANBerRa")) //Canberra
}


// Map Capitalize


{
    const userName = prompt("Введите ваши Ф.И.О").trim().split(" ")

    const capitalize = str => {
        let result = str.slice(0, 1).toUpperCase() + str.slice(1, ).toLowerCase();
        //console.log(str)
        return result
   }

   const userNameRight= userName.map(capitalize).join(" ")

   console.log(userNameRight)
   //console.log(userName)
}


// Filter Lexics


{
    const exceptions = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "блин", "оладь", "сука", " "];
    const userText = prompt("напишите ваш рассказ").split(" ");
    const rightText = userText.filter( x => !exceptions.includes(x) ).join(" ")

    console.log(rightText)
    // console.log(userText)
}


// Beep Lexics


{
    const exceptions = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "блин", "оладь", "сука"];
    const userText = prompt("напишите ваш рассказ").split(" ");
    const rightText = userText.map( x => (exceptions.includes(x) ) ? "BEEP" : x ).join(" ").trim()

    console.log(rightText)
    // console.log(userText)
}


// Reduce HTML


{
    const currencies = ["USD", "EUR", "GBP", "UAH"]
    let str = "<select>"
    str += currencies.reduce( (a, b) => a + "<option>" + b + "</option>", "" )
    str += "</select>"

    document.write(str)
    // console.log(str)
}


// For Brackets Hell Check 


{
    const line = prompt("Вставьте ваш код для проверки на правильность введения скобок")
    console.log(line)
    const bracketsStack = []
    let i = 0
    
    for (const character of line){
        ( character === "{" || character === "(" || character === "[" ) && bracketsStack.push(character);
        if (((character === "}" && bracketsStack.pop() !== "{") ||
            (character === ")" && bracketsStack.pop() !== "(") ||
            (character === "]" && bracketsStack.pop() !== "[")) &&
            (character === "}" && bracketsStack.push(character) ||
            character === ")" && bracketsStack.push(character) ||
            character === "]" && bracketsStack.push(character) )) {
            break;
        }
        i++
    }

    (bracketsStack.length !== 0 || alert("Все ковычки введены верно")) && (bracketsStack.length < 0 || alert(`Вы ввели не верную ( не ввели ) закрывающую скобку на позиции ${ i + 1 } `))
    console.log(bracketsStack)
}