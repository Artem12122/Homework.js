// Temperature


{
    const temperatureFahrenheit = c => ( c * 9 / 5 ) + 32 ; // Из цельсия в фаренгейты
    const temperatureCelsius = f => 5/9 * ( f - 32 ) ; // Из фаренгейта в цельсий
}


// RGB


{
    const rgbHex = (r, g, b) => "#" + r.toString(16).padStart(2, 0).slice(0, 2) + g.toString(16).padStart(2, 0).slice(0, 2) + b.toString(16).padStart(2, 0).slice(0, 2);

    // const rgbHex = (r, g, b) => ( "#" +
    //     (r < 16 ? "0" : "") + r.toString(16).slice(0, 2) +
    //     (g < 16 ? "0" : "") + g.toString(16).slice(0, 2) +
    //     (b < 16 ? "0" : "") + b.toString(16).slice(0, 2) 
    // );


    const hexColor = rgbHex(11, 6, 3);
    const hexColor1 = rgbHex(1000, 5, 24);
    const hexColor2 = rgbHex(2222, 55, 6);

    console.log(hexColor, hexColor1, hexColor2);
    console.log(hexColor);
}


// Flats


{
    // numberFloors: Это количество этажей в вашем доме;
    // floorApartments: Это количество квартир на этаже;
    // numberApartments: Это номер квартиры;


    const flats = (numberFloors, floorApartments, numberApartments) => {
        let entrance = Math.ceil(numberApartments / (numberFloors * floorApartments))
        let floor = Math.ceil((numberApartments - numberFloors * floorApartments * (entrance - 1)) / floorApartments)
    
        return{
            entrance: entrance,
            floor: floor
        }
    }

    const result = flats(12, 5, 444)
    const result1 = flats(10, 3, 234)
    const result2 = flats(5, 4, 56)


    console.log(result, result1, result2)
}


// Credentials


{
    const firstBig = text => text.slice(0, 1).toUpperCase() + text.slice(1, ).toLowerCase()

    const fullNameObj = () => {
        let name = firstBig(prompt("Напишите ваше имя."));
        let surname = firstBig(prompt("Напишите вашу фамилию."));
        let fatherName = firstBig(prompt("Напишите ваше отчество."));

        let fullName =  surname + " " + name + " " + fatherName;

        return {
            name: name,
            surname: surname,
            fatherName: fatherName,
            fullName: fullName
        }
   }
   console.log(fullNameObj())
}


// New line


{
    const newLine = str => str.split(" \\n ").join("\n");

    // let str = prompt("Напишите рассаз на тему как я провел лето.\nДля перехода на новый рядок используйте \"\\n\"");
    // let fixStr = newLine(str)
    
    let fixStr = newLine(prompt("Напишите рассаз на тему как я провел лето.\nДля перехода на новый рядок используйте \"\\n\""))
    console.log(fixStr)
}


// Prompt OR


// {
//     const promptOr = () => {

//     }


//     {
//         let years = prompt("Сколько вам лет?") || alert("Вы некоректно ввели возраст");
//         let birthYears = 2023 - years ;
    
//         birthYears < 2023 && !alert(`Ваш год родения  ${birthYears}`) || alert("Вы некоректно ввели возраст")
//     }
// }