// SWAPI Links


{
    function swapiLinks(url) {
        return fetch(url)
        .then(res => res.json())
        .then(el => {
            const promises = []

            for (const [key, value] of Object.entries(el)) {
                if (typeof value === "string" && value.slice(0, 17) === "https://swapi.dev") {
                    promises.push(
                        fetch(value)
                        .then(res => res.json())
                        .then(data => {el[key] = data})
                    )
                } else if (Array.isArray(value)) {
                    for (let i = 0; i < value.length; i++) {
                        if (typeof value[i] === "string" && value[i].slice(0, 17) === "https://swapi.dev") {
                            promises.push(
                                fetch(value[i])
                                .then(res => res.json())
                                .then(data => {el[key][i] = data})
                            )
                        }
                    }
                }
            }

            return Promise.all(promises).then(() => el)
        })
    }

    swapiLinks("https://swapi.dev/api/people/20/")
    .then(yodaWithLinks => console.log(JSON.stringify(yodaWithLinks, null, 4)))
}


// domEventPromise


{
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
    
    domEventPromise(document.body, 'click').then( e => console.log('event click happens', e))

    const knopka = document.createElement("button")
    knopka.innerHTML = "НаЖмИ МеНя"
    document.body.append(knopka)

    domEventPromise(knopka, 'click').then( e => console.log('event click happens', e))
    getEventListeners(knopka)
}