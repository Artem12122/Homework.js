// String: greeting


{
    let firstName = prompt("Напишите ваше имя.");
    let lastName = prompt("Напишите вашу фамилию.");
    
    alert(`Поздравляем ${firstName} ${lastName} ваш приз автомобиль!!!`);
    // alert(`Поздравляем ${firstName.slice(0, 1).toUpperCase() + firstName.slice(1, ).toLowerCase()} ${lastName.slice(0, 1).toUpperCase() + lastName.slice(1, ).toLowerCase()} ваш приз автомобиль!!!`);
}


// String: gopni4ek


{
    let composition = prompt("Напишите краткий рассказ как вы провели лето.");
    let result = (composition.split(",")).join(" блін, ");
    
    alert(result);
    console.log(result);
}


// String: capitalize


{
    let str = "cANBerRa";
    let result = str.slice(0, 1).toUpperCase() + str.slice(1, ).toLowerCase();
    
    console.log(result) //Canberra
}


// String: word count


{
    let composition = prompt("Напишите краткий рассказ как вы провели лето.");
    let result = (composition.split(" ")).length;

    console.log(++result); // добавляем бинарный + для корректного подсчета, за крайним словом нет пробелла.
}


// String: credentials


{
    let firstName = prompt("Напишите ваше имя.");
    let lastName = prompt("Напишите вашу фамилию.");
    let surname = prompt("Напишите ваше отчество.");
    let fullName =  lastName.slice(0, 1).toUpperCase() + lastName.slice(1, ).toLowerCase() + (" ") + firstName.slice(0, 1).toUpperCase() + firstName.slice(1, ).toLowerCase() + (" ") + surname.slice(0, 1).toUpperCase() + surname.slice(1, ).toLowerCase();
    
    alert(`Поздравляем ${fullName} ваш приз автомобиль!!!`);
}


// String: beer


{
    let str = "Було жарко. Василь пив пиво вприкуску з креветками";
    let result = str.split("пиво").join("чай");

    console.log(result) //"Було жарко. Василь пив чай уприкуску з креветками"
}


// String: no tag


{
    let str = "якийсь текст, в якому є один тег <br /> і всяке інше";
    let indxStart = str.indexOf("<");
    let indxEnd = str.indexOf(">"); 
    let result = str.slice(0, --indxStart) + str.slice(++indxEnd);

    console.log(result) //якийсь текст, в якому є один тег і всяке інше
}


// String: big tag


{
    let str = "якийсь текст в якому є один тег <br /> і всяке інше"
    let indxStart = str.indexOf("<");
    let indxEnd = str.indexOf(">"); 
    let result = str.slice(0, --indxStart) + str.slice(indxStart, ++indxEnd).toUpperCase() + str.slice(indxEnd);

    console.log(result) //якийсь текст, в якому є один тег <BR /> і всяке інше
}


// String: new line


{
    let str = prompt("Напишите рассаз на тему как я провел лето.\nДля перехода на новый рядок используйте \"\\n\"");
    let result = (str.split("\\")).join("\n");
    alert(result);
    console.log(result)
}


// String: youtube


{
    const link = prompt("Вставте ссылку на ваше видео из youtube")
    const youtubeLInk = /(?:https?:\/\/)?(?:www\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w\-_]+)\&?/;
    const youtubeIndetif =link.match(youtubeLInk);

    console.log(youtubeIndetif);

    document.write(`
       <div class="video">
            <iframe 
                id="ytplayer" type="text/html"
                width="720" height="405"
                src="https://www.youtube.com/embed/${youtubeIndetif[1]}?autoplay=1"
                frameborder="0" allowfullscreen>
        </div>
    `);
}