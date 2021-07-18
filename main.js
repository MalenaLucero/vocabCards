const rawData = {
    expressions: {
        '120621': expressions120621,
        '260621': expressions260621,
        '100721': expressions100721
    }, kanjis: {
        '260621': kanjis260621,
        '100721': kanjis100721
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

const generateFilter = () => {
    return {
        date: document.getElementById('dateSelect').value,
        type: document.getElementById('typeSelect').value
    }
}

const sendCardData = () => {
    const filter = generateFilter()
    const filteredData = filterData(filter)
    window.localStorage.setItem('data', JSON.stringify(filteredData))
    window.localStorage.setItem('type', filter.type)
    window.location.href = './card/card.html'
}

const sendListData = () => {
    const filter = generateFilter()
    const filteredData = filterData(filter)
    window.localStorage.setItem('data', JSON.stringify(filteredData))
    window.localStorage.setItem('type', filter.type)
    window.location.href = './list/list.html'
}

const goToSearch = () => {
    window.localStorage.setItem('data', JSON.stringify(rawData))
    window.location.href = './search/search.html'
}

const initializeDateSelect = type => {
    let dateSelectValues = []
    const dates = Object.keys(rawData[type])
    dates.forEach(date => {
        const array = date.split('')
        const dateText = `${array[0]}${array[1]}-${array[2]}${array[3]}-${array[4]}${array[5]}`
        const textAndValue = { text: dateText, value: date }
        dateSelectValues.push(textAndValue)
    })
    dateSelectValues.unshift({text: 'All', value: ''})
    populateSelect('dateSelect', dateSelectValues)
}

const inititalizeTypeSelect = () => {
    const types = Object.keys(rawData)
    typeSelectValues = types.map(type => {
        const text = type.charAt(0).toUpperCase() + type.slice(1)
        const value = type
        return { text: text, value: value }
    })
    populateSelect('typeSelect', typeSelectValues)
    const select = document.getElementById('typeSelect')
    select.addEventListener('change', (event) => {
        const type = event.target.value
        initializeDateSelect(type)
    });
}

const initialize = () => {
    initializeDateSelect('expressions')
    inititalizeTypeSelect()
}

initialize()