const rawData = {
    '120621': data120621,
    '260621': data260621
}

const filterData = (filter) => {
    const data = filter.date === '' ? rawData : rawData[filter.date]
    return Object.keys(data).map(key => data[key]).flat()
}

const sendData = () => {
    const filter = {
        date: document.getElementById('dateSelect').value
    }
    const filteredData = filterData(filter)
    window.localStorage.setItem('data', JSON.stringify(filteredData))
    window.location.href = './card/card.html'
}

const initializeDatesSelect = () => {
    let dateSelectValues = []
    dates.forEach(date => {
        const array = date.split('')
        const dateText = `${array[0]}${array[1]}-${array[2]}${array[3]}-${array[4]}${array[5]}`
        const textAndValue = { text: dateText, value: date }
        dateSelectValues.push(textAndValue)
    })
    dateSelectValues.unshift({text: 'All', value: ''})
    populateSelect('dateSelect', dateSelectValues)
}

const initialize = () => {
    initializeDatesSelect()
}

initialize()



