// Рекурсія: HTML tree


{
    const body = {
        tagName: "body",
        children: [
            {
                tagName: "div",
                children: [
                    {   tagName: "span",
                        children: [
                            "Enter a data please:"
                        ]
                    },
                    {
                        tagName: "br",
                    },
                    {
                        tagName: "input",
                        attrs: {
                            type: "text",
                            id: "name"
                        },
                    },
                    {
                        tagName: "input",
                        attrs: {
                            type: "text",
                            id: "surname"
                        }
                    }
                ],
            },
            {
                tagName: "div",
                children: [
                    {   tagName: "button",
                        attrs: {
                            id: "ok"
                        },
                        children: [
                            "OK"
                        ],
                    },
                    {
                        tagName: "button",
                        attrs: {
                            id: "cancel"
                        },
                        children: [
                            "Cancel"
                        ]
                    }
                ]
            }
        ]
    }

    function htmlTree(obj) {
        let result = ''
    
        if (obj.tagName) {
            result += `<${obj.tagName}`
    
            if (obj.attrs) {
                for (const attr in obj.attrs) {
                    result += ` ${attr}="${obj.attrs[attr]}"`
                }
            }
            result += '>'
        }
    
        if (obj.children) {
            if (obj.children.length === 1) {
                result += obj.children[0]
            } else {
                for (const child of obj.children) {
                    result += htmlTree(child)
                }
            }
        }
    
        if (obj.tagName && obj.tagName !== "br") { // так как br не парный и при парности меняется отображение. Можно сделать массив не праных тегов и проверку для лучшей работы функции с друггими обьектами структуры данных
            result += `</${obj.tagName}>`
        }

        return result
    }

    // console.log(htmlTree(body))
    document.write(htmlTree(body))
}


// Рекурсія: DOM tree


{
    function domTree(parent, obj) {
        if (obj.tagName) {
            const e = document.createElement(obj.tagName)
            parent.append(e)
    
            if (obj.attrs) {
                for (const attr in obj.attrs) {
                    e[attr] = obj.attrs[attr]

                }
            }

            if (obj.children && obj.children.length > 1) {
                for (const child of obj.children) {
                    domTree(e, child)
                }
            }

            if (obj.children && obj.children.length === 1) {
                e.innerHTML = obj.children[0]
            }
        }
    }

    domTree(document.body, body)
}


// Рекурсія: Deep Copy


{
    function deepCopy(obj) {
        let objCopy
        if (Array.isArray(obj)) {
            objCopy = []
            for (let i = 0; i < obj.length; i++) {
                if (obj[i] !== null && typeof obj[i] === "object") {
                    objCopy.push(deepCopy(obj[i]))
                } else {
                    objCopy.push(obj[i])
                }
            }
        } else if (typeof obj === "object") {
            objCopy = {}
            for (let key in obj) {
                if (obj[key] !== null && typeof obj[key] === "object") {
                    objCopy[key] = deepCopy(obj[key])
                } else {
                    objCopy[key] = obj[key]
                }
            }
        } else {
            objCopy = obj
        }
        return objCopy
    }

    const arr  = [1,"string", null, undefined, {a: 15, b: 10, c: [1,2,3,4],d: undefined, e: true }, true, false]
    console.log(arr)
    const arr2 = deepCopy(arr) //arr2 та всі його вкладені масиви та об'єкти - інші об'єкти, які можна змінювати без ризику поміняти щось у arr
    const table2 = deepCopy(table)
}


// Рекурсия: My Stringify


{
    function stringify(value) {
        if (typeof value !== "object" || value === null) {
            if (typeof value === "string") {
                return `"${value}"`
            } else {
                return String(value)
            }
        }
        
        if (Array.isArray(value)) {
            const valueCopy = value.map(x => (x === undefined ? null : x))
            let result = "["
            for (let i = 0; i < valueCopy.length; i++) {
                result += (i > 0 ? "," : "") + stringify(valueCopy[i])
            }
            result += "]"
            return result
        }
        
        if (typeof value === "object") {
            for (const key in value) {
                if (value[key] === undefined) {
                    delete value[key]
                }
            }
            let result = "{"
            let keys = Object.keys(value)
            for (let i = 0; i < keys.length; i++) {
                const key = keys[i]
                result += (i > 0 ? "," : "") + `"${key}":${stringify(value[key])}`
            }
           result += "}"
           return result
        }
    }
    
    const arr  = [1,"string", null, undefined, {a: 15, b: 10, c: [1,2,3,4],d: undefined, e: true }, true, false]

    const jsonString = stringify(arr)
    console.log(JSON.parse(jsonString))

    const bodyJsonString = stringify(body)
    console.log(JSON.parse(bodyJsonString))
} 


// Рекурсія: getElementById throw


{
    function getElementById(idToFind){
        let result
        function walker(parent=document.body){
            for (const child of parent.children){
                if (child.id === idToFind) {
                    result = child
                    return result
                } else {
                    walker(child)
                }
            }
        }
        walker()
        return result
    }
    
    const idSurname = getElementById("surname")
    console.log(idSurname)
}