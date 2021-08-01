const filterData = (filter) => {
    const { date, type } = filter
    const dataByType = rawData[type];
    const data = date === '' ? dataByType : dataByType[date]
    if (type === 'kanjis') {
        const kanjisFlattenedData = Object.keys(data).map(key => data[key]).flat()
        const dataFilteredByJlpt = filter.jlpt !== ''
            ? kanjisFlattenedData.filter(e => e.jlpt === filter.jlpt)
            : kanjisFlattenedData
        const dataFilteredByGrade = filter.grade !== ''
            ? dataFilteredByJlpt.filter(e => e.grade === filter.grade)
            : dataFilteredByJlpt
        const expressionsFlattenedData = Object.keys(rawData.expressions).map(key => rawData.expressions[key]).flat()
        return dataFilteredByGrade.map(kanjiObj => {
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
    if (filter.type === 'kanjis') {
        filter.jlpt =  parseInt(document.getElementById('jlptSelect').value, 10) || ''
        filter.grade = parseInt(document.getElementById('gradeSelect').value, 10) || ''
    }
    return filter
}