const request = require('request');
const cheerio = require('cheerio');
const { table } = require('console');
let url = `https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard`;
request(url, cb);

function cb(error, response, html) {
    if (error) {
        console.error('error:', error); // Print the error if one occurred
    }
    else {
        extractHTML(html);
    }
}

// function extractHTML(html) {
//     let selectorTool = cheerio.load(html);
//     let wicketsSelector = `.table.bowler > tbody > tr:nth-child(1) > td:nth-child(5) > span`;
//     let wickets = selectorTool(wicketsSelector).text();
//     let playerSelector = ".text-nowrap";
//     let playerArr = selectorTool(playerSelector);
//     let player = selectorTool(playerArr[0]).text();
//     console.log(`Player ${player} has taken ${wickets} wickets!`);
// }

function extractHTML(html){
    let selectorTool = cheerio.load(html);
    let tablesArr = selectorTool('.table.bowler');
    let bestPlayerName = null;
    let maxWickets = 0;

    for(let i=0; i<tablesArr.length; i++){
        // used this line to see the html and saving it to temp.html file and find further what we need.
        // let tableHTML = selectorTool(tablesArr[i]).html(); 
        let bowlerArr = selectorTool(tablesArr[i]).find('tbody>tr');
        
        for(let j=0; j<bowlerArr.length; j++){
            let columnArr = selectorTool(bowlerArr[j]).find('td');
            let playerName = selectorTool(columnArr[0]).text();
            let numOfWickets = selectorTool(columnArr[4]).text();

            if(numOfWickets!=null && numOfWickets>maxWickets){
                maxWickets = numOfWickets;
                bestPlayerName = playerName;
            }
        }

    }
    console.log(`Best Bowler is ${bestPlayerName} with ${maxWickets} wickets!`);


}