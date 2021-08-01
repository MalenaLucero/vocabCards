const rawData = {
    expressions: {
        '210724': expressions240721,
        '210710': expressions100721,
        '210626': expressions260621,
        '210612': expressions120621
    }, kanjis: {
        '210710': kanjis100721,
        '210626': kanjis260621,
        '210612': kanjis120621
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
        const expressionsFlattenedData = Object.keys(data).map(key => data[key]).flat()
        const dataFilteredByTag = filter.tag !== ''
            ? expressionsFlattenedData.filter(e => e.tags.includes(filter.tag))
            : expressionsFlattenedData
        const dataFilteredBySource = filter.hasOwnProperty('source') && filter.source !== ''
            ? dataFilteredByTag.filter(e => e.exampleSentences[0].source.name === filter.source)
            : dataFilteredByTag
        return dataFilteredBySource 
    }
}

const generateFilter = () => {
    const filter = {
        date: document.getElementById('dateSelect').value,
        type: document.getElementById('typeSelect').value,
    }
    if (filter.type === 'expressions') {
        filter.tag = document.getElementById('tagSelect').value
    }
    if (filter.date !== '') {
        filter.source = document.getElementById('sourceSelect').value
    }
    return filter
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
    const select = document.getElementById('dateSelect')
    select.addEventListener('change', (event) => {
        const date = event.target.value
        if (date !== '') {
            const rawSources = rawData.expressions[date].map(e => e.exampleSentences[0].source.name)
            const filteredSources = Array.from(new Set(rawSources)).filter(e => e !== '')
            const sourcesSelectValues = filteredSources.map(source => ({ text: source, value: source }))
            sourcesSelectValues.unshift({ text: 'All', value: '' })
            populateSelect('sourceSelect', sourcesSelectValues)
        }
        manageSourceSelectDisplay()
    });
}

const initializeTypeSelect = () => {
    const types = Object.keys(rawData)
    const typeSelectValues = types.map(type => {
        const text = type.charAt(0).toUpperCase() + type.slice(1)
        const value = type
        return { text: text, value: value }
    })
    populateSelect('typeSelect', typeSelectValues)
    const select = document.getElementById('typeSelect')
    select.addEventListener('change', (event) => {
        const type = event.target.value
        initializeDateSelect(type)
        manageDynamicSelectsDisplay(type === 'expressions', 'tagSelectContainer')
        manageSourceSelectDisplay()
    });
}

const manageSourceSelectDisplay = () => {
    const type = document.getElementById('typeSelect').value
    const date = document.getElementById('dateSelect').value
    manageDynamicSelectsDisplay(type === 'expressions' && date !== '', 'sourceSelectContainer')
}

const initializeTagSelect = () => {
    const tagSelectValues = tags.map(tag => {
        return { text: tag, value: tag }
    })
    tagSelectValues.unshift({ text: 'All', value: '' })
    populateSelect('tagSelect', tagSelectValues)
}

const initialize = () => {
    initializeDateSelect('expressions')
    initializeTypeSelect()
    initializeTagSelect()
}

initialize()