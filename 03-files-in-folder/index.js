const fs= require('fs');
const path = require('path');

fs.readdir(path.join(__dirname,'./secret-folder'),(err,data)=>{
    //console.log(data)
    data.forEach( function(file){
        fs.stat(path.join(__dirname,`./secret-folder/${file}`), (err,stats)=>{
            if(stats.isFile()) console.log(path.basename(file).replace(/\..+/,'') + ' - ' + path.extname(file) + ' - ' + stats.size + 'b');
        })
    })
    
    // data.forEach( function(file) {
    //     let weight;
    //     let isFile;

    //     async function takeWeight(path){
    //         weight = await fs.promises.stat(path, (err,stats)=>{
    //             if(err) throw err
    //             isFile = stats.isFile()
    //             return stats.size
    //         })
    //     }
    //     takeWeight(path.join(__dirname,`./secret-folder/${file}`))

    //     if(isFile) console.log(path.basename(file).replace(/\..+/,'') + ' - ' + path.extname(file) + ' - ' + weight + 'b');
        
    // });
});