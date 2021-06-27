const rawData = {
    '120621': data120621,
    '260621': data260621
}
let filteredData = []
const htmlContainers = ['reading', 'exampleSentences', 'englishMeaning', 'japaneseMeaning']

const filterData = () => {
    return Object.keys(rawData).map(key => rawData[key]).flat()
}

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
    filteredData = filterData()
    generateCard();
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

