const express = require('express');
const {createProduct} = require ('../controller/product');
const { requireSignin, adminMiddleware } = require('../CoomonMiddleware');
const multer = require("multer");
const shortid = require('shortid');
const router = express.Router();
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




router.post('/product/create',requireSignin,adminMiddleware, upload.array('productPicture'),createProduct);

  
// router.get('/category/getcategory',getCategories);



module.exports =router;