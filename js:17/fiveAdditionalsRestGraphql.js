// Светофор


{
    const delay = ms => new Promise(ok => setTimeout(() => ok(ms), ms))

    async function trafficLight(element, greenTime, yellowTime, redTime){
        let green, yellow, red
        if (typeof element === "object" && element.green && element.yellow && element. red) {
            green = element.green
            yellow = element.yellow
            red = element.red
        } else {
            green = yellow = red = element
        }

        while (true){
            green.style.backgroundColor = "green"
            await delay(greenTime)
            yellow.style.backgroundColor = "yellow"
            await delay(yellowTime)
            red.style.backgroundColor = "red"
            await delay(redTime)
        }
    }

    const a = {
        green: document.body,
        yellow: document.body,
        red: document.body
    }

    trafficLight(a, 3500, 700, 3000)
}


// PedestrianTrafficLight


{
    const delay = ms => new Promise(ok => setTimeout(() => ok(ms), ms))

    function domEventPromise(element, eventName){
        function executor(resolve){
            element.addEventListener (eventName ,
                function eventPromiseOne(event) {
                    element.removeEventListener(eventName, eventPromiseOne)
                    resolve(event)
                }
            )
        }
        return new Promise(executor)
    }

    const btn = document.createElement("button")
    btn.innerHTML = "&#9995"
    btn.style.minHeight = "50px"
    btn.style.minWidth = "50px"
    document.body.append(btn)

    async function trafficLight(element, button, greenTime, redTime, buttonDisabledTime){
        let green, red
        if (typeof element === "object" && element.green && element. red) {
            green = element.green
            red = element.red
        } else {
            green = red = element
        }

        while (true){
            element.style.backgroundColor = "green"
            await delay(greenTime)
            element.style.backgroundColor = "red"
            const event = await Promise.race([delay(redTime), domEventPromise(button, 'click')])
            if (event.type) {
                button.disabled = true
                ;(async () => {
                    await delay(buttonDisabledTime)
                    button.disabled = false
                })()
            }
        }
    }

    trafficLight(document.body, btn, 3000, 7000, 20000)
}


// speedtest


{
    const delay = ms => new Promise(ok => setTimeout(() => ok(ms), ms))

    async function speedtest(getPromise, count, parallel=1){
        let duration = performance.now()

        for (let i = 0; i < count; i++) {
            const promises = []
            for (let j = 0; j < parallel; j++) {
                promises.push(getPromise())
            }
            await Promise.all(promises)
        }

        duration = performance.now() - duration

        const parallelDuration = duration / (count * parallel)
        const parallelSpeed = (count * parallel) / duration
        const queryDuration = duration / parallel
        const querySpeed = count / duration

        return {
            duration,
            querySpeed,
            queryDuration,
            parallelSpeed,
            parallelDuration
        }
        }
        
        speedtest(() => delay(1000), 10, 10 ).then(result => console.log(result))
        // {duration: 10000, 
        // querySpeed: 0.001, //1 тысячная запроса за миллисекунду
        // queryDuration: 1000, //1000 миллисекунд на один реальный запрос в среднем 
        // parallelSpeed: 0.01  // 100 запросов за 10000 миллисекунд
        // parallelDuration: 100 // 100 запросов за 10000 миллисекунд
        speedtest(() => fetch('http://swapi.dev/api/people/1').then(res => res.json()), 10, 5)
}


// gql


{
    function gql(url, query, variables={}) {
        return fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({query, variables}) 
        })
        .then(res => res.json())
        .then(r => {
            if (r.data) {
                const result = Object.values(r)[0]
                console.log(result)
                return result
            }
            throw new Error(r.data.errors[0].message)
        })
    }
}


// jwtDecode


{
    function jwtDecode(token) {
        try {
            if (token && token.split(".").length === 3) {
                const tokenArr = token.split(".")
                const decodedToken = atob(tokenArr[1])
                const payload = JSON.parse(decodedToken)
                return payload
            }
            return undefined
        } catch(error) {
            return undefined
        }
    }
}