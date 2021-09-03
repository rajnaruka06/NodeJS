#!/usr/bin/env node
/*jshint esversion: 6 */

// package.json me jaake scripts me jaake change kar sakte hain.
// wahan script name -> wCat. uske aage kya run karna hai
// ab node index.js ki jagah npm run wCat, likhna hai
// bin -> globally accesible. 
// toh ab bin me daalne ke baad, kahi se bhi wCat kar sakte hain.
// wCat globally accesible ho jaega
// #!/usr/bin/env envName -> wCat command ab is environment me run hogi


const fs = require('fs');

let args = process.argv.slice(2);

let flags = [];
let filenames = [];
let secondaryArgs = [];
console.log(arguments);
// All our flags will start with "-".
for (let arg of args) {
    if (arg[0] == "-") {
        flags.push(arg);
    }
    else if(arg[0] == "%"){
        secondaryArgs.push(arg.slice(1));
    }
    else {
        filenames.push(arg);
    }
}

// No flag is given. read all files and output it.
// -rs -> remove spaces.
// -rn -> remove newlines. ("\r\n" -> newline)
// -rsc -> remove given charachter/substring. (%...)
if (flags.length == 0) {
    for (let file of filenames) {
        console.log(fs.readFileSync(file, "utf-8"));
    }
}
// Approach 1
// else {
//     for (let flag of flags) {
//         if (flag == "-rs") {
//             for (let file of filenames) {
//                 let fileData = fs.readFileSync(file, "utf-8");
//                 // let op = "";
//                 // for(let ch of fileData){
//                 //     if(ch != " "){
//                 //         op += ch;
//                 //     }
//                 // }
//                 let op = fileData.split(" ").join("");
//                 console.log(op);
//             }
//         }
//     }
// }
// Approach 2
// else {
//     for(let file of filenames){
//         let fileData = fs.readFileSync(file, "utf-8");
//         for(let flag of flags){
//             if(flag == "-rs"){
//                 fileData = fileData.split(" ").join("");
//             }
//             else if(flag == "-rn"){
//                 fileData = fileData.split("\r\n").join("");
//             }
//         }
//         console.log(fileData);
//     }
// }
// Approach 3
else {
    for(let file of filenames){
        let fileData = fs.readFileSync(file, "utf-8");
        for(let flag of flags){
            if(flag == "-rs"){
                fileData = removeAll(fileData, " ");
            }
            else if(flag == "-rn"){
                fileData = removeAll(fileData, "\r\n");
            }
            else if(flag == "-rsc"){
                for(let sarg of secondaryArgs){
                    fileData = removeAll(fileData, sarg);
                }
            }
            else if(flag == "-w"){
                
            }
        }
        console.log(fileData);
    }
}

function removeAll(string, text){
    return string.split(text).join("");
}