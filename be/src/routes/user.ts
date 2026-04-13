import  express from 'express' ;
import cors from 'cors' ;
import jwt from 'jsonwebtoken' ;
import bcrypt from 'bcrypt' ;
import z from 'zod' ;

import authMiddleware from '../middleware/middleware.js'

import { accountModel, userModel } from '../database/db.js' 

const userRouter = express.Router();

userRouter.use( cors() );

userRouter.use( express.json() );
 
userRouter.post( "/signup" , async(req,res) => {

 const requireBody = z.object({

     username  :   z.string().min(2).max(30),
     firstname :   z.string().min(2).max(15),
     lastname  :   z.string().min(2).max(30),
     password  :   z.string().min(2)  

 })

  const parsedData = requireBody.safeParse( req.body );
 
  if( !parsedData.success ) {

  return  res.json({

        message : "Incorrect data format",
        error : parsedData.error 
 
  })

 }

 try { 

   const existingUser = await userModel.findOne({

      username : req.body.username 
 
 })
  
  if( existingUser ) {

  return res.status(411).json({
      message : "Email Already Exists" ,
  })

  }


  const { username , firstname , lastname , password }  =  parsedData.data;  

  const hashedPassword = await  bcrypt.hash(password , 10);
  

  
   const user  = await userModel.create({

    username : username  ,
    firstname : firstname,
    lastname :  lastname , 
    password :  hashedPassword   
    
  })
  
  const userId = user.id;
  
  await accountModel.create({

      user : userId,
  
      balance : 1 + Math.random()*10000

  })


}

  
catch(error) {

  console.log("signup error  : ",error);
  

  return res.json ({

    message : "user Already Exists",
  
  }) 

}
 
  
 res.json ({

      message : "Signed up"         
 
  })

}) 
 

//signin 


userRouter.post("/signin", async(req: any , res : any ) => {

  const { username , password } = req.body;  

  try {

  const signeduser =  await userModel.findOne({      
        username : username 
  })

  if( !signeduser ) {

  return res.json({

       message : "incorrect credentials"
   })

 }

 const PasswordMatch = await  bcrypt.compare(password , signeduser.password? signeduser.password : "" );
 
 if( PasswordMatch ) {

    const token = jwt.sign({
    
     id : signeduser._id

  }, process.env.JWT_SECRET || "secret" )

  res.json({
      
    token 

  })

  }

}

 catch(error) {
  
  return res.json({
    
    message : "unable to signin",

  })

}

})

userRouter.put('/',authMiddleware , async (req,res) => {
 
  const requireBody = z.object ({
     
     username  :   z.string().min(3).max(30).toLowerCase().trim(),
     firstname :  z.string().min(3).max(15).toLowerCase(),
     lastname  :   z.string().min(3).max(30).toLowerCase(),
     password  :   z.string().min(1)

   })



  const parsedData =  requireBody.safeParse(req.body) ;
  
    // @ts-ignore
  const userId = req.userId

  if(!parsedData.success) {

      res.status(403).json({
     
         message : "error while updating information"
     
      })  
  }

  
  const userdb =  await  userModel.findOne({ 
         _id : userId  
   })

    if( !userdb ) {

      return ;
  
    }

    userdb.updateOne({

        username :  parsedData.data?.username,
        firstname : parsedData.data?.firstname,
        lastname : parsedData.data?.lastname,
        password : parsedData.data?.password

    })

      
      

    res.json ({
      message : "updated successfully"  
    })

})


userRouter.get('/userInfo', authMiddleware , async (req , res) => {



  try {
  
         // @ts-ignore
          
           const userId = req.userId ;

        const user = await userModel.findOne({

              _id : userId 

        })

        res.json({          

          user   
      
        })

               
           }

           catch(e : any){
               
               res.json({
                   
                    message : 'error whie fetching userinfo : ' +  e

               })
           }



})

userRouter.get('/bulk' , authMiddleware ,  async (req , res)=>{
       

  try { 

         // @ts-ignore

      const currentUserId = req.userId;

    const users = await userModel.find({
       
        _id : { $ne : currentUserId },
      
      
    }).select({_id : 1 , username : 1 , firstname : 1 , lastname : 1 });
    
      res.json({ 

           users
      
       })

  }

catch(e){
      
    
  res.json({
       
      message : 'error fetching users : ' + e

    })

  }
       

})






// get list of users 
/*
userRouter.get("/bulk", async (req, res) => {
  // 1. Get the filter query parameter
  const filter = req.query.filter || '';

  try {
    // 2. Query the database using Prisma
    const users = await prismaClient.user.findMany({
      where: {
        // 3. Use 'OR' to search in multiple fields
        OR: [
          {
            firstName: {
              contains: filter,
              mode: 'insensitive', 
            },
          },
          {
            lastName: {
              contains: filter,
              mode: 'insensitive',
            },
          },
        ],
      },

      select: {
        username: true,
        firstName: true,
        lastName: true,
        id: true, 
      },
    });
    
    res.json({
      user: users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "An error occurred while fetching users." });
  }
});
*/


export default userRouter ;