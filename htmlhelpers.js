const makeElementVisible = (elementId) => {
    const element = document.getElementById(elementId)
    element.classList.replace('not-visible', 'visible')
}

const makeElementNotVisible = (elementId) => {
    const element = document.getElementById(elementId)
    element.classList.replace('visible', 'not-visible')
}

const toggleElementVisibility = (elementId) => {
    const element = document.getElementById(elementId)
    if (element.classList[0] === 'not-visible') {
        makeElementVisible(elementId)
    } else {
        makeElementNotVisible(elementId)
    }
}

const insertText = (elementId, text) => {
    const element = document.getElementById(elementId)
    element.innerText = text
}

const insertTextInList = (elementId, stringArray) => {
    const list = document.getElementById(elementId)
    stringArray.forEach(e => {
        const li = document.createElement('li')
        li.innerText = e;
        list.appendChild(li)
    })
}

const cleanInnerHtml = (elementId) => {
    const element = document.getElementById(elementId)
    element.innerHTML = ''
}