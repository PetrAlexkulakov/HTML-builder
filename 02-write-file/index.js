const fs= require('fs');
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

const writeStream = fs.createWriteStream('02-write-file/new-text.txt')

console.log('Enter string')

question()
function question(){
    rl.question("", function (answer) {

        if(answer=='exit') rl.close()
        else {
            writeStream.write(answer+'\n');
            question();
        }
        
    });
}

process.on('exit', ()=>console.log('God be with you!'))