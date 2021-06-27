const htmlContainers = ['reading', 'exampleSentences', 'englishMeaning', 'japaneseMeaning']
let filteredData

const generateCard = () => {
    const data = filteredData[0]
    insertText('mainExpression', data.word)
    insertText('reading', data.reading)
    const exampleSentencesArray = data.exampleSentences.map(e => {
        return `${e.sentence} (${e.source.name})`
    })
    insertTextInList('exampleSentences', exampleSentencesArray)
    insertTextInList('englishMeaning', data.englishMeaning)
    insertTextInList('japaneseMeaning', data.japaneseMeaning)
}

const inititalize = () => {
    filteredData = JSON.parse(window.localStorage.getItem('data'))
    window.localStorage.removeItem('data')
    shuffleArray(filteredData)
    generateCard()
}

inititalize()

const showAll = () => {
    htmlContainers.forEach(e => makeElementVisible(e))
}

const showNextCard = () => {
    if (filteredData.length > 1) {
        filteredData.shift()
        htmlContainers.forEach(e => {
           cleanInnerHtml(e) 
           makeElementNotVisible(e)
        })
        generateCard()
    } else {
        console.log('no more cards')
    }
}