const User = require('../../models/user');
const jwt = require('jsonwebtoken')

exports.signup = (req,res)=>{
    User.findOne({email :req.body.email })
    .exec((error,user)=>{
    if(user)return res.status(400).json({
       message:" Admin already registered "
     });
   const {
      firstName,
      lastName,
      email,
      password }= req.body;
   const _user = new User({
      firstName,
      lastName,
      email,
      password,
      username: Math.random().toString(),
      role: 'admin'
   });
     _user.save((error,data)=>{
       if(error){ return res.status(400).json({ message:'Something want wrong'
        });
           }
       if(data){  return res.status(201).json({message:'admin  created Succesfully..!' })
       }
      })   
     })
     }



      exports.signin = (req,res)=>{
        User.findOne({email: req.body.email})
          .exec((error,user)=>{                                   //exexute the request going to error & user 
            if(error) return res.status(400).json({error})
              if(user){  
                                                        //save and if a user if user exists // and verify the pass
                if(user.authenticate(req.body.password)&& user.role === 'admin' ){ 
        const token = jwt.sign({_id: user._id, role: user.role}, process.env.JWT_SECRET,{expiresIn: '1h' });  // token Genrate  & user._id means user data      & second token Genrate for role 
        const { _id, firstName, lastName, email, role, fullName } = user;        //send the responce
           res.status(200).json({
              token,  // save 
                 user:{_id, firstName,lastName,email,role,fullName}                   // So if this password match 
                });
            }else{
                return res.status(400).json({message : 'Invalid Password' })           //fails to get match so will return
            }
            }else{ 
              return res.status(400).json({message: 'Something want wrong'})              // for  eamil 
           }
         });
       }
 

    