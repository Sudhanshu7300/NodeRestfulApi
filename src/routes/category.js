const express = require('express');
const {addCategory, getCategories} = require ('../controller/category');
const { requireSignin, adminMiddleware } = require('../CoomonMiddleware');
const router = express.Router();
const multer = require("multer");
const shortid = require('shortid');
const path = require('path')


const storage = multer.diskStorage({
    destination: function (req,file,cb) {
        cb(null ,path.join(path.dirname(__dirname),'uploads') ) // it is going to give the directory  of current directory & that's routes and current src
    },
    filename : function (req,file,cb){
        cb(null,shortid.generate() + '-' + file.originalname) //modify the filename  & save that same file in our mongodb  
    }
})
const upload = multer({ storage })


router.post('/category/create', requireSignin,adminMiddleware,upload.single('categoryImage') ,addCategory);   
router.get('/category/getcategory',getCategories);



module.exports =router;