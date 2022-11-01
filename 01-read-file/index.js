const fs= require('fs');

const readStream = fs.createReadStream('01-read-file/text.txt');

readStream.on('data', (chunk)=>{
    console.log(chunk.toString())
})

// let fs= require('fs');

// fs.readFile('01-read-file/text.txt','utf8', function(err, data){
//     console.log(data)
// })
// import {open} from 'node:fs/promises';

// const fd = await open('text');
// // Create a stream from some character device.
// const stream = fd.createReadStream();

// console.log(stream.read(0))