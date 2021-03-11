const fs = require("fs");
const path = require("path");
let extensions = require("./util");

let folderPath = "./Downloads";
let extFolderPath;

function checkFolder(extension, folderPath){
    //match ext with folders present
    //extfolderPath = folderPath; //.Downloads
    for(let key in extensions){
        //for every key we'll check if that ext exists in it
        if(extensions[key].includes(extension)){ //.gif
            
            extFolderPath =  `${folderPath}/${key}`; //.Downloads/Images
            break;
        }
    }
    //check if such a path exists
    return fs.existsSync(extFolderPath); 
    //return true if folder exists else false
}

function createFolder(){
    fs.mkdirSync(extFolderPath);
}

function moveFile(filename){
    //copy file
    let sourceFilePath = `${folderPath}/${filename}`;
    let destFilePath = `${extFolderPath}/${filename}`;
    fs.copyFileSync(sourceFilePath,destFilePath);

    //delete file
    fs.unlinkSync(sourceFilePath);
}

function sortFolder(folderPath){
    //get content of folder
    let content = fs.readdirSync(folderPath);
    
    //get extensions of each file
    for(let i = 0; i<content.length;i++){
        let extensionName = path.extname(content[i]);
        console.log(extensionName);
        //check if folder exists with this extension
        let extensionFolderExist = checkFolder(extensionName,folderPath);
        
        if(extensionFolderExist){
            //move file if folder exists
            moveFile(content[i]);
        }
        else{
            //create folder
            createFolder();
            //move file
            moveFile(content[i]);
        }
    }    
}

sortFolder(folderPath);