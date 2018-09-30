const fs = require('fs')
const diff2html = require('diff2html')

let result = fs.readFileSync('saved.patch',
    'utf-8')


    
var cfg = {
    wordByWord: true,
    outputFormat: "side-by-side",
    matching: "lines",
    matchWordsThreshold: 0.25,
    matchingMaxComparisons: 2500,
    maxLineLengthHighlight: 10000,
    inputFormat: "diff",
    showFiles: true
}

let jsd = diff2html.Diff2Html.getJsonFromDiff(result, cfg)

console.log(jsd)