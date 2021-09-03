const request=require('request');
const cheerio=require('cheerio');
let url = `https://www.espncricinfo.com/series/ipl-2020-21-1210595/chennai-super-kings-vs-kings-xi-punjab-53rd-match-1216506/ball-by-ball-commentary`;
request(url, cb); 

function cb (error, response, html) {
    if(error){
    console.error('error:', error); // Print the error if one occurred
    }
    else {
        extractHTML(html);
    }
}

function extractHTML(html){
    let selectorTool=cheerio.load(html);
    let commentArr=selectorTool('.match-comment-wrapper .match-comment-long-text');
    let lastBallComment = selectorTool(commentArr[0]).text();
    console.log(lastBallComment);
}
