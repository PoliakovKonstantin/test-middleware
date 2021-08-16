const multer = require('multer');
const fs=require('fs')
const storage = multer.diskStorage({
    destination(req, file, cb) {
       cb(null, __dirname);  
     },
     filename(req, file, cb) {
       cb(null, `fileBook`);  
     }});
module.exports = multer({ storage });