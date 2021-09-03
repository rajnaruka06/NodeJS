#!/usr/bin/env node

// # Wcat
// It is used to display or make a copy content of one or more files in the terminal 

// ## Commands:
// 1- wcat filepath => displays content of the file in the terminal
// 2- wcat filepath1 filepath2 filepath3... => displays content of all files in the terminal(contactinated form) in the given order.
// 3- wcat -s filepath => convert big line breaks into a singular line 
// 4- wcat -n filepath => give numbering to all the lines  
// 5- wcat -b filepath => give numbering to non-empty lines  
// 6- wcat filepath > filename2path => (Apne Aap-> windows functionality) put all the content of filename into filename2 by overriding and also creates filename2 if it doesn't exist
// 7- wcat filename2path >> filename2path => (Apne aap-> windows functionality) append all the content of filename into filename2
// 8- node wcat -s filename > filename2 =>get the file content of filename remove large spaces and save the output in filename2
// We can mix and match the options.

// ## Edge cases:

// 1- If file entered is not found then it gives file does not exist error.
// 2- -n and -b are 2 options available together then command should give you an error


const fs = require('fs');

let inputArr = process.argv.slice(2);
let optionsArr = [];
let filesArr = [];
for(let i=0; i<inputArr.length; i++){
    let name = inputArr[i];
    if(name[0] == '-'){
        optionsArr.push(name);
    }
    else{
        filesArr.push(name);
    }
}

// read all content
let content = "";
for(let i=0; i<filesArr.length; i++){
    if(!fs.existsSync(filesArr[i])){
        console.log(`File ${filesArr[i]} not available`);
        return;
    }
    let bufferContent = fs.readFileSync(filesArr[i], "utf-8");
    content += bufferContent + "\r\n";
}
let contentArr = content.split('\r\n');

// read options
let isSPresent = optionsArr.includes("-s");
let isNPresent = optionsArr.includes("-n");
let isBresent = optionsArr.includes("-b");

if(isNPresent && isBresent){
    console.log("Either use -n or -b option");
    return;
}

// -s
if(isSPresent){
    for(let i=1; i<contentArr.length; i++){
        if(contentArr[i] == "" && (contentArr[i-1] == "" || contentArr[i-1] == null)){
            contentArr[i] = null;
        }
    }
    let tempArr = [];
    for(let i=0; i<contentArr.length; i++){
        if(contentArr[i] != null){
            tempArr.push(contentArr[i]);
        }
    }
    contentArr = tempArr;
}

// -n
if(isNPresent){
    for(let i=0; i<contentArr.length; i++){
        contentArr[i] = `${i+1} ${contentArr[i]}`;
    }
}

// -b
if(isBresent){
    let count = 1;
    for(let i=0; i<contentArr.length; i++){
        if(contentArr[i] != ''){
            contentArr[i] = `${count} ${contentArr[i]}`;
            count+=1;
        }
    }
}




console.log(contentArr.join("\n"));