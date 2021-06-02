const mongoose = require('mongoose');
const cartSchema = new mongoose.Schema({
  
  user : { type: mongoose.Schema.Types.ObjectId, ref : 'User', required : true},                            //need userid 
  cartItems: [                                                       // create Cart & one user can multiple product its array so we can store multiple product
      {
       product : {type : mongoose.Schema.Types.ObjectId, ref : 'Product', required : true},   //obj store product id // linking by foriegn key
       quantity : { type : Number, default : 1},  
       price : { type : Number,required : true} //discount 
      }
  ]
  
}, {timestamps: true});
    
module.exports = mongoose.model('Cart',cartSchema)
