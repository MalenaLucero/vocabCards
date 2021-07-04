const rawData = {
    expressions: {
        '120621': expressions120621,
        '260621': expressions260621
    }, kanjis: {
        '120621': kanjis120621,
        '260621': kanjis260621
    }
    
}

const filterData = (filter) => {
    const { date, type } = filter
    const dataByType = rawData[type];
    const data = date === '' ? dataByType : dataByType[date]
    if (type === 'kanjis') {
        const kanjisFlattenedData = Object.keys(data).map(key => data[key]).flat()
        const expressionsFlattenedData = Object.keys(rawData.expressions).map(key => rawData.expressions[key]).flat()
        return kanjisFlattenedData.map(kanjiObj => {
            let wordArray = []
            expressionsFlattenedData.forEach(expressionObj => {
                if (expressionObj.word.includes(kanjiObj.kanji)) {
                    wordArray.push(`${expressionObj.word} (${expressionObj.reading})`)
                }
            })
            return { ...kanjiObj, words: wordArray }
        })
    } else {
        return Object.keys(data).map(key => data[key]).flat()
    }
}

const sendData = (type) => {
    const filter = {
        date: document.getElementById('dateSelect').value,
        type: type
    }
    const filteredData = filterData(filter)
    window.localStorage.setItem('data', JSON.stringify(filteredData))
    window.localStorage.setItem('type', type)
    window.location.href = './card/card.html'
}

const sendListData = (type) => {
    const filter = {
        date: document.getElementById('dateSelect').value,
        type: type
    }
    const filteredData = filterData(filter)
    window.localStorage.setItem('data', JSON.stringify(filteredData))
    window.localStorage.setItem('type', type)
    window.location.href = './list/list.html'
}

const initializeDatesSelect = idSelect => {
    let dateSelectValues = []
    dates.forEach(date => {
        const array = date.split('')
        const dateText = `${array[0]}${array[1]}-${array[2]}${array[3]}-${array[4]}${array[5]}`
        const textAndValue = { text: dateText, value: date }
        dateSelectValues.push(textAndValue)
    })
    dateSelectValues.unshift({text: 'All', value: ''})
    populateSelect(idSelect, dateSelectValues)
}

const initialize = () => {
    initializeDatesSelect('dateSelect')
}

initialize()