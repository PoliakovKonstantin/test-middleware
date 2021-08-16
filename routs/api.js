const express=require('express')
const app=express()
const formData = require("express-form-data");
app.use(formData.parse());
const fs=require('fs')
const router=express.Router()
const upload=require('./multer-test')
let arr1=[]
class book{
    constructor(title,description,authors,favorite,fileCover,fileName){  
    this.id=arr.length+1
    this.title= title,
    this.description= description,
    this.authors= authors,
    this.favorite= favorite,
    this.fileCover=fileCover,
    this.fileName=fileName
  }}
let arr=[]
let book1=new book(1,2,3,4,5,6,7)
arr.push(book1)

router.use((req,res,next) => {
    console.log('Node js Middleware express.Router()');   
    next()
})
router.post('/user/login',(req,res)=>{
    res.send('{ id: 1, mail: "test@mail.ru" }').statusCode=201
}
)

router.get('/books',(req,res)=>{
    res.send(arr)
})

router.get('/books/:id', (req, res) => {

    let {id} = req.params;
    const idx=arr.findIndex(el=>el.id==id)
    if(idx==-1) {
        res.status(404)/*.render("404",{});*/.send('book|not found')   
    }
    
    else{
        res.send(arr[idx])
    }
})
router.post('/books',upload.single('fileBook'),(req,res)=> {
    const {title,description,authors,favorite,fileCover,fileName,fileBook} = req.body;
    console.log(req.body)
    const abc=new book(title,description,authors,favorite,fileCover,fileName,fileBook);
    console.log(abc)
    if(upload.single) {
        abc.fileBook='True';
    }
    else {
        abc.fileBook='False'
    }
    arr.push(abc)
    res.send(abc)   
})
router.put('/books/:id',upload.single('fileBook'),(req,res)=>{
    const {id}=req.params
    const idx = arr.findIndex(el => el.id == id);
    if (idx!=-1) {
        const {title,description,authors,favorite,fileCover,fileName/*,fileBook*/} = req.body
        
        arr.pop(idx)
        arr[idx]=new book(title,description,authors,favorite,fileCover,fileName/*,fileBook*/)
        res.send(arr[idx])
    }
    else {
        res.status(404).send('not found')
    } 
})
router.delete('/books/:id', (req, res) => {
    const {id} = req.params;                                                 
    if (typeof(arr[id-1])==undefined) {
        res.status(404).send('book|not found')
    }
    else{
        arr.splice(id-1,1,)
        res.send('ok')
       
    }
});
router.get('/books/:id/download',(req,res) =>{
    let {id}=req.params
    const idx = arr.findIndex(el => el.id == id);
    if (idx!=-1) {
        fs.writeFile('qwer.txt',Object.entries(arr[idx]).map(([k,v])=>`${k}: ${v}`).join(', '),(err)=>console.log(err))
        //fs.routerendFileSync('qwer.txt','Привет!')
        res.download(__dirname+'/qwer.txt','qwertyuiop1',(err)=>console.log(err))//.send('ok')
        console.log("ok!")
    }
    else{
        res.status(404).send('not found')
        console.log("ijrefijf")
    }
})
console.log(arr)
module.exports=router
const PORT = process.env.PORT || 3001;
