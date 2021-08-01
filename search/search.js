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

const searchRawData = (type, searchInput) => {
    const results = []
    Object.keys(rawData[type]).forEach(key => {
        rawData[type][key].forEach(obj => {
            const property = type === 'expressions' ? 'word' : 'kanji'
            if(obj[property].includes(searchInput)) {
                const data = { data: obj, date: key }
                results.push(data)
            }
        })
    })
    return results
}

const search = () => {
    cleanInnerHtml('searchResult')
    const searchInput = document.getElementById('searchInput').value
    insertTextAsElement('searchResult', 'h2', 'Results')
    insertTextAsElement('searchResult', 'h3', 'Expressions')
    const expressionResults = searchRawData('expressions', searchInput)
    if (expressionResults.length > 0) {
        expressionResults.forEach(result => {
           showExpressionData('searchResult', result) 
        })
    } else {
        insertTextAsElement('searchResult', 'p', 'Nothing found')
    }
    insertTextAsElement('searchResult', 'h3', 'Kanji')
    const kanjiResults = searchRawData('kanjis', searchInput)
    if (kanjiResults.length > 0) {
        kanjiResults.forEach(result => {
            showKanjiData('searchResult', result)
        })
    } else {
        insertTextAsElement('searchResult', 'p', 'Nothing found')
    }
}