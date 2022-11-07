const fs= require('fs');
const path = require('path');
let allStyles = {}
let allCss = []
let template

async function makeIndex(){
    
    async function removeFolder(){
        await fs.promises.rm(path.join(__dirname,'project-dist'),{force: true, recursive: true})  
    }
    await removeFolder()

    async function createFolder(){
        
        await fs.promises.mkdir('06-build-page/project-dist');
        
        async function readTemplate(){
            template = await fs.promises.readFile(path.join(__dirname,'template.html'), { encoding: 'utf8' })
        }
        await readTemplate()

           
        fs.readdir(path.join(__dirname,'./components'),async (err,data) => {
            async function filesReadAndWrite(){ 
                if(err) throw err

                for(let i=0; i<data.length; i++){
                    let file = data[i]
        
                    if( path.extname(file) == '.html'){
                        let filePath = path.join(__dirname,'/components',file)
                        const dat =  await fs.promises.readFile(filePath,{ encoding: 'utf8' })
        
                        allStyles[path.basename(file)] = dat
                        
                    }
                    
                }
                
                for (let codeWorld of Object.keys(allStyles)){
                    template = template.replace(`{{${codeWorld.slice(0,-5)}}}`,allStyles[codeWorld])
                }
                
                await fs.promises.writeFile(path.join(__dirname,'./project-dist', 'index.html'),template)
            }
            await filesReadAndWrite()
        })
        
    }
    await createFolder()
    
    fs.readdir(path.join(__dirname,'./styles'),(err,data) => {
        async function rewriteBundle(){
            async function filesRead(){
           
                for(let i=0; i<data.length; i++){
                    let file= data[i]
    
                    if( path.extname(file) == '.css'){
                        let filePath = path.join(__dirname,'/styles',file)
                        const dat =  await fs.promises.readFile(filePath,{ encoding: 'utf8' })
    
                        allCss.push(dat)
                
                    }
    
                }
            }
    
            async function fileWrite(){
                await fs.promises.rm(path.join(__dirname, 'project-dist', 'style.css'), {
                    force: true,
                });
                allCss.forEach(async code => {
        
                    await fs.promises.writeFile(path.join(__dirname,'project-dist','style.css'),code, {'flag': 'a'})
                })
            }
             
            await filesRead()
            fileWrite()
        }
        rewriteBundle()
    })
    
    async function createAssets(){
        
        await fs.promises.mkdir('06-build-page/project-dist/assets');
        
    
        fs.readdir(path.join(__dirname,'./assets'), (err,data) => {
            data.forEach(async dir => {
                await fs.promises.mkdir(path.join(__dirname,'/project-dist/assets',dir))
                fs.readdir(path.join(__dirname,'./assets',dir), (err,files) => {
                    files.forEach(async file =>{
                        let readStream =fs.createReadStream(path.join(__dirname,'./assets',dir,file))
                        let writeStream= fs.createWriteStream(path.join(__dirname,'/project-dist/assets',dir,file))
            
                        readStream.on('data',(chunk)=>{
                            writeStream.write(chunk)
                        })
                    })
                })
            })
        })
    }
    await createAssets()
}
makeIndex()
