const fs= require('fs');
const path= require('path');
let allCss = []
const constants=0;

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
            // fs.truncate(path.join(__dirname,'project-dist','bundle.css'),err =>{
            //     if(err) return
            // })
            await fs.promises.rm(path.join(__dirname, 'project-dist', 'bundle.css'), {
                force: true,
              });

            allCss.forEach(async code => {

                await fs.promises.writeFile(path.join(__dirname,'project-dist','bundle.css'),code, {'flag': 'a+'})
            })
        }
         
        await filesRead()
        fileWrite()
    }
    rewriteBundle()
})