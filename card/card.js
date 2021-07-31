let dataType
let originalData
let filteredData
let counter = 0
let cardCounter = 1

const generateCardDetails = (text, message) => {
    const cardDetails = document.getElementById('card-details')
    const container = document.createElement('div')
    cardDetails.appendChild(container)
    let textContainer
    if (typeof text === 'string') {
        textContainer = document.createElement('p')
        textContainer.innerText = text
    } else if (typeof text === 'object') {
        textContainer = document.createElement('ul')
        text.forEach(e => {
            const li = document.createElement('li')
            li.innerText = e;
            textContainer.appendChild(li)
        })
    }
    textContainer.classList.add('not-visible')
    textContainer.id = counter++
    container.appendChild(textContainer)
    const button = document.createElement('button')
    button.onclick = () => toggleElementVisibility(textContainer.id)
    button.innerText = message
    container.appendChild(button)
}

const generateCard = () => {
    const data = filteredData[0]
    counter = 0;
    if (dataType === 'expressions') {
        insertText('mainExpression', data.word)
        generateCardDetails(data.reading, 'Show reading')
        const exampleSentencesArray = data.exampleSentences.map(e => {
            return `${e.sentence} (${e.source.name})`
        })
        generateCardDetails(exampleSentencesArray, 'Show example sentences')
        generateCardDetails(data.englishMeaning, 'Show English meaning')
        generateCardDetails(data.japaneseMeaning, 'Show Japanese meaning')
    } else if (dataType === 'kanjis') {
        insertText('mainExpression', data.kanji)
        generateCardDetails(data.words, 'Show words with this kanji')
        generateCardDetails(data.kun_readings, 'Show kun readings')
        generateCardDetails(data.on_readings, 'Show on readings')
        generateCardDetails(data.meanings, 'Show meanings')
    }
    manageCardNumbers()
}

const manageCardNumbers = () => {
    insertText('showedCards', cardCounter++)
    insertText('totalCards', originalData.length)
}

const startAgain = () => {
    cardCounter = 1;
    filteredData = [ ...originalData ]
    shuffleArray(filteredData)
    cleanInnerHtml('card-details')
    generateCard()
}

const inititalize = () => {
    dataType = window.localStorage.getItem('type')
    originalData = JSON.parse(window.localStorage.getItem('data'))
    window.localStorage.removeItem('data')
    window.localStorage.removeItem('type')
    startAgain();
}

inititalize()

const showAll = () => {
    for(let i = 0; i < counter; i++) {
        makeElementVisible(i);
    }
}

const showNextCard = () => {
    if (filteredData.length > 1) {
        filteredData.shift()
        cleanInnerHtml('card-details')
        generateCard()
    } else {
        console.log('no more cards')
    }
}