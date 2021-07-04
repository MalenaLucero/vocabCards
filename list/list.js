let dataType
let originalData

const insertTitle = () => {
    const title = dataType === 'expressions'
        ? 'List of expressions' : 'List of kanji'
    insertText('title', title)
}

const insertListContent = () => {
    const ul = document.createElement('ul')
    const property = dataType === 'expressions' ? 'word' : 'kanji'
    originalData.forEach(e => {
        const li = document.createElement('li')
        li.innerText = e[property]
        ul.appendChild(li)
    })
    const container = document.getElementById('content')
    container.appendChild(ul)
}

const inititalize = () => {
    dataType = window.localStorage.getItem('type')
    originalData = JSON.parse(window.localStorage.getItem('data'))
    window.localStorage.removeItem('data')
    window.localStorage.removeItem('type')
    insertTitle()
    insertListContent()
}

inititalize()