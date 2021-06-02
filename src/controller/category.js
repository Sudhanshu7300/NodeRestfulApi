const Category = require('../models/category');
const slugify = require('slugify');
             

function createCategories(categories, parentId = null){        
    const categoryList = [];    //empty Array
    let category;
    if(parentId == null){
          category =   categories.filter(cat => cat.parentId == undefined)   //so parent category there is no parentId == undefined
    }else{
        category = categories.filter(cat => cat.parentId == parentId);  //not parent  will have some id will fecth some based on dataId 
    }
    for (let cate of category){   
        categoryList.push({
            _id: cate._id,
            name: cate.name,
            slug:cate.slug,
            children:createCategories(categories,cate._id) // again  Recusive call for  categories & cate.Id
        })
    }
    return categoryList;    

}
     
exports.addCategory = (req,res)=>{




 //For  category
    const categoryObj={
        name: req.body.name,
        slug: slugify(req.body.name)  //slug check
    }

//    for Image category
    if(req.file){
        categoryObj.categoryImage = process.env.API  + '/public/' + req.file.filename;

    }



  if(req.body.parentId){
      categoryObj.parentId = req.body.parentId;  //third is parentId check
  }

    const cat = new Category(categoryObj);
    cat.save((error,category)=>{
        if(error) return res.status(400).json({error});  //its mongoDb error 
        if(category){
              return res.status(201).json({category});
        }
    })
}     

      //for Get the Categories
exports.getCategories = (req,res)=>{
      
    Category.find({})             //check
    .exec((error,categories)=>{
        if(error) return res.status(400).json({error}); 

       if(categories){

        const categoryList = createCategories(categories);      // for recursive function create Sub-category

           res.status(200).json({categoryList})
       }

    }) 
                                                           
}