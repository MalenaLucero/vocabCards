const rawData = {
    expressions: {
        '210724': expressions240721,
        '210710': expressions100721,
        '210626': expressions260621,
        '210612': expressions120621
    }, kanjis: {
        '210724': kanjis240721,
        '210710': kanjis100721,
        '210626': kanjis260621,
        '210612': kanjis120621
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
        manageDynamicSelectsDisplay(type === 'kanjis', 'jlptSelectContainer')
        manageDynamicSelectsDisplay(type === 'kanjis', 'gradeSelectContainer')
        manageSourceSelectDisplay()
    });
}

const manageSourceSelectDisplay = () => {
    const type = document.getElementById('typeSelect').value
    const date = document.getElementById('dateSelect').value
    manageDynamicSelectsDisplay(type === 'expressions' && date !== '', 'sourceSelectContainer')
}

const initialize = () => {
    initializeDateSelect('expressions')
    initializeTypeSelect()
    initializeDefaultSelect('tagSelect', tags)
    initializeDefaultSelect('jlptSelect', [1, 2, 3])
    initializeDefaultSelect('gradeSelect', [1, 2, 3, 4, 5, 6, 7, 8])
}

initialize()