const fs= require('fs');
const path = require('path');


async function removeAndMade(){
    await fs.promises.rm(path.join(__dirname,'files-copy'),{force: true, recursive: true})  

    await fs.promises.mkdir('04-copy-directory/files-copy')
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
removeAndMade()