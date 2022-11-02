const fs= require('fs');
const path = require('path');

fs.mkdir('04-copy-directory/files-copy', (err)=>{
    if(err) console.log(err.message)
    else {
        fs.readdir(path.join(__dirname,'./files'), (err,data) => {
            data.forEach(file => {
                let readStream =fs.createReadStream(path.join(__dirname,'./files',file))
                let writeStream= fs.createWriteStream(path.join(__dirname,'/files-copy/'+file))
        
                readStream.on('data',(chunk)=>{
                    writeStream.write(chunk)
                })
            })
        })
    }
})
