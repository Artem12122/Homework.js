// function jsonPost(url, data) {
//     return new Promise((resolve, reject) => {
//         var x = new XMLHttpRequest();
//         x.onerror = () => reject(new Error('jsonPost failed'))
//         //x.setRequestHeader('Content-Type', 'application/json');
//         x.open("POST", url, true);
//         x.send(JSON.stringify(data))

//         x.onreadystatechange = () => {
//             if (x.readyState == XMLHttpRequest.DONE && x.status == 200) {
//                 resolve(JSON.parse(x.responseText))
//             }
//             else if (x.status != 200) {
//                 reject(new Error('status is not 200'))
//             }
//         }
//     })
// }

function jsonPost(url, data) {
    return fetch(url, {
        method: "POST",
        body: JSON.stringify(data)
    })
    .then(response => {
        if(response.status === 200) {
            return response.json() 
        } else if(response.status !== 200) {
            new Error('status is not 200')
        } else {
            new Error('error')
        }
    })
}

let massId = 0

async function sendMessage(nick, message) {
    try {
        await jsonPost("http://students.a-level.com.ua:10012", { func: 'addMessage', nick: nick, message: message })
    }
    catch (e) {
        console.log("Ошибка: ", e)
    }
}

async function getMessages() {
    try {
        const res = await jsonPost("http://students.a-level.com.ua:10012", { func: "getMessages", messageId: massId })
        massId = res.nextMessageId

        for (const mass of res.data) {
            const divMass = document.createElement("div")
            chat.insertBefore(divMass, chat.firstChild)

            const pMass = document.createElement("p")
            const sMass = document.createElement("strong")
            sMass.innerHTML = mass.nick + ": "
            pMass.innerHTML = mass.message
            divMass.appendChild(pMass)
            pMass.insertBefore(sMass, pMass.firstChild)
        }
    }
    catch (e) {
        console.log("Ошибка: ", e)
    }

}

async function sendAndCheck() {
    const nickVal = nick.value
    const messageVal = message.value

    await sendMessage(nickVal, messageVal)
    await getMessages()
}

function delay(ms){
    function executor(fulfill, reject){
        setTimeout(() => fulfill(ms), ms)
    }
    return new Promise(executor) 
}

async function checkLoop() {
    while (true) {
        await getMessages()
        await delay(2000)
    }
}
checkLoop()

send.onclick = (event) => {
    event.preventDefault()
    sendAndCheck()
}