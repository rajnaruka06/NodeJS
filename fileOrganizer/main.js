const fs = require('fs');
const path = require('path');

function helpFunction() {
    console.log(`List of all commands:
    1. node main.js tree <pathname>
    2. node main.js organize <pathname>
    3. node main.js help`);
}

function treeFunction(rootDirPath, rootDepth = "") {
    let rootDirName = path.basename(rootDirPath);
    console.log(rootDepth + "|-->" + rootDirName);
    let curDepth = rootDepth + "\t";
    let allSubNames = fs.readdirSync(rootDirPath);
    for (let subName of allSubNames) {
        let subPath = path.join(rootDirPath, subName);
        let subDetails = fs.lstatSync(subPath);
        if (subDetails.isFile()) {
            console.log(curDepth + "|-->" + subName);
        }
        else {
            treeFunction(subPath, curDepth);
        }
    }
}


function returnCategory(extName, types){
    for (let type in types) {
        if (types[type].includes(extName)) {
            return type;
        }
    }
    return 'others';
}

function organizeFunction(rootDirPath) {
    let organizeFilePath = path.join(rootDirPath, "organizedFiles");
    let types = {
        media: ["mp4", "mkv", "mp3"],
        archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
        documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
        app: ['exe', 'dmg', 'pkg', "deb"],
        pictures: ['png', 'jpg', 'jpeg'],
        others : []
    };
    if (!fs.existsSync(organizeFilePath)) {
        fs.mkdirSync(organizeFilePath);
    }
    for (let type in types) {
        let typePath = path.join(organizeFilePath, type);
        if (!fs.existsSync(typePath)) {
            fs.mkdirSync(typePath);
        }
    }

    let allSubNames = fs.readdirSync(rootDirPath);
    for (let subName of allSubNames) {
        let subPath = path.join(rootDirPath, subName);
        let subDetails = fs.lstatSync(subPath);
        if (subDetails.isFile()) {
            let extName = path.extname(subPath).slice(1);
            let category = returnCategory(extName, types);
            let destFilepath = path.join(organizeFilePath, category, subName);
            fs.copyFileSync(subPath, destFilepath);
        }
    }
    console.log("All Files are Organized Now!");
}

function runCommand(command, dirPath) {
    switch (command) {
        case "help":
            helpFunction();
            break;
        case "tree":
            treeFunction(dirPath);
            break;
        case "organize":
            organizeFunction(dirPath);
            break;
        default:
            console.log("O bhai! sahi command daal yr!");
            break;
    }
}

//  --> main function agar hota to yahi hai!!!
if (true) {
    let inputArr = process.argv.slice(2);
    let command = inputArr[0];
    let dirPath = inputArr[1];
    runCommand(command, dirPath);
}

module.exports = {
    help: helpFunction,
    tree: treeFunction,
    organize: organizeFunction
};

// first project I used with git.