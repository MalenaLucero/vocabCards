const makeElementVisible = (elementId) => {
    const element = document.getElementById(elementId)
    element.classList.replace('not-visible', 'visible')
}

const makeElementNotVisible = (elementId) => {
    const element = document.getElementById(elementId)
    element.classList.replace('visible', 'not-visible')
}

const switchToDisplayBlock = (elementId) => {
    const element = document.getElementById(elementId)
    element.classList.replace('hide', 'show')
}

const switchToDisplayNone = (elementId) => {
    const element = document.getElementById(elementId)
    element.classList.replace('show', 'hide')
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

const insertTextAsElement = (elementId, tag, title) => {
    const element = document.getElementById(elementId)
    const createdElement = document.createElement(tag)
    createdElement.innerText = title
    element.appendChild(createdElement)
}

const showExpressionData = (elementId, data) => {
    const element = document.getElementById(elementId)
    const container = document.createElement('div')
    const p = document.createElement('p')
    p.innerText = data.word
    container.appendChild(p)
    element.appendChild(container)
}

const showKanjiData = (elementId, data) => {
    const element = document.getElementById(elementId)
    const container = document.createElement('div')
    const p = document.createElement('p')
    p.innerText = data.kanji
    container.appendChild(p)
    element.appendChild(container)
}

const cleanInnerHtml = (elementId) => {
    const element = document.getElementById(elementId)
    element.innerHTML = ''
}

const populateSelect = (elementId, textAndValue) => {
    const select = document.getElementById(elementId)
    cleanInnerHtml(elementId)
    textAndValue.forEach(obj => {
        const option = document.createElement('option')
        option.value = obj.value
        option.innerText = obj.text
        select.appendChild(option)
    })
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

const manageDynamicSelectsDisplay = (condition, selectId) => {
    if (condition) {
        switchToDisplayBlock(selectId)
    } else {
        switchToDisplayNone(selectId)
    }
}

const initializeDefaultSelect = (selectId, simpleValuesArray) => {
    const selectValues = simpleValuesArray.map(level => ({ text: level, value: level }))
    selectValues.unshift({ text: 'All', value: '' })
    populateSelect(selectId, selectValues)
}