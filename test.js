const checkRepeatedStringsInArray = (stringsArray) => {
    const singleStrings = new Set(stringsArray)
    const numberOfRepeatedStrings = stringsArray.length - singleStrings.size
    if (numberOfRepeatedStrings === 0) {
        console.log('No repetitions')
    } else {
        let repeatedStrings = []
        for(element of singleStrings) {
            const appearances = stringsArray.filter(e => e === element).length
            if (appearances > 1) {
                repeatedStrings.push(element)
            }
        }
        console.warn('Repeated elements: ', repeatedStrings)
    }
}

const noRepeatedExpressions = () => {
    console.log('Test: noRepeatedExpressions')
    const expressions = Object.keys(rawData.expressions).map(key => rawData.expressions[key]).flat()
    checkRepeatedStringsInArray(expressions.map(e => e.word))
}

const noRepeatedKanji = () => {
    console.log('Test: noRepeatedKanji')
    const kanjiArray = Object.keys(rawData.kanjis).map(key => rawData.kanjis[key]).flat()
    checkRepeatedStringsInArray(kanjiArray.map(e => e.kanji))
}

const runTests = () => {
    noRepeatedExpressions()
    noRepeatedKanji()
}