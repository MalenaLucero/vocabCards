let rawData

const inititalize = () => {
    rawData = JSON.parse(window.localStorage.getItem('data'))
    window.localStorage.removeItem('data')
}

inititalize()

const clean = () => {
    const searchInput = document.getElementById('searchInput')
    searchInput.value = ''
}

const searchInRawData = (type, property, searchInput) => {
    const results = []
    Object.keys(rawData[type]).forEach(key => {
        rawData[type][key].forEach(obj => {
            if (typeof obj[property] === 'string') {
                if(obj[property].includes(searchInput)) {
                    const data = { data: obj, date: key }
                    results.push(data)
                }
            } else if (Array.isArray(obj[property])) {
                const isPresent = obj[property].find(meaning => meaning.includes(searchInput))
                if (isPresent) {
                    const data = { data: obj, date: key }
                    results.push(data)
                }
            }
        })
    })
    return results
}

const showExpressionResults = results => {
    insertTextAsElement('searchResult', 'h3', 'Expressions')
    if (results.length > 0) {
        results.forEach(result => {
           showExpressionData('searchResult', result) 
        })
    } else {
        insertTextAsElement('searchResult', 'p', 'Nothing found')
    }
}

const showKanjiResults = results => {
    insertTextAsElement('searchResult', 'h3', 'Kanji')
    if (results.length > 0) {
        results.forEach(result => {
            showKanjiData('searchResult', result)
        })
    } else {
        insertTextAsElement('searchResult', 'p', 'Nothing found')
    }
}

const cleanAndGetInputValue = () => {
    cleanInnerHtml('searchResult')
    insertTextAsElement('searchResult', 'h2', 'Results')
    return document.getElementById('searchInput').value.toLowerCase()
}

const search = () => {
    const searchInput = cleanAndGetInputValue()
    const expressionResults = searchInRawData('expressions', 'word', searchInput)
    showExpressionResults(expressionResults)
    const kanjiResults = searchInRawData('kanjis', 'kanji', searchInput)
    showKanjiResults(kanjiResults)
}

const searchByExpressionReading = () => {
    const searchInput = cleanAndGetInputValue()
    const expressionResults = searchInRawData('expressions', 'reading', searchInput)
    showExpressionResults(expressionResults)
}

const searchByEnglishMeaning = () => {
    const searchInput = cleanAndGetInputValue()
    const expressionResults = searchInRawData('expressions', 'englishMeaning', searchInput)
    showExpressionResults(expressionResults)
}