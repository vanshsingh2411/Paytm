
import  express from 'express' ;
import cors from 'cors' ;
import { accountModel } from '../database/db.js';
import authMiddleware from '../middleware/middleware.js';
import mongoose from 'mongoose' ;
import type { _templateLiteral } from 'zod/v4/core';
const ObjectId = mongoose.Types.ObjectId;



 const accountRouter = express.Router();
 
 accountRouter.use(cors());

 accountRouter.use( express.json() );


    // get balance route 

 accountRouter.get('/balance' , authMiddleware , async (req:any , res:any ) => {

   
    const fromaccount = await accountModel.findOne({

         user : req.userId

    })


  if( fromaccount ) {

   const balance =  fromaccount.balance ;

   return  res.status(200).json({
        
        message :  `current balance is : ${balance}`,

        balance 
    
    })

   

}

   
   res.status(411).json ({

    message :  `account does not exist`  

 })
  
 })


// transfer route 

   accountRouter.post("/transfer", authMiddleware, async (req : any , res : any ) => {

      const session = await mongoose.startSession();

      session.startTransaction();

  try {
     
    // amount to be transfered (Number) and  id of receiver 
 
    let { amount , receiver } = req.body ;

    if ( !amount || typeof amount !== 'number' || amount <= 0) {

        await session.abortTransaction();

        return res.status(400).json({ message: "Invalid transfer amount" });

  }



    // @ts-ignore

    const userId = (req.userId);

    const toaccount = await accountModel.findOne({ user : receiver }).session(session);

   if( !toaccount ) {

        await session.abortTransaction();

        return res.status(400).json({     
              
            message : "receiver account does not exist" 

        })


 }

  const fromaccount = await accountModel.findOne({ user : userId}).session(session);
  
  
  if( !fromaccount ) {
    
       await session.abortTransaction()

  return  res.status(400).json({     

       message : "sender's account does not exist" 
     
    })

 }

        //@ts-ignore
    if( fromaccount.balance < amount ) {
     
        session.abortTransaction();
      
 
        return res.status(400).json({
         
          message: "Insufficient balance",
          sender : fromaccount.balance,
          receiver : toaccount.balance 
       
    });

  }

   
    // decrement amount from senders account

    await accountModel.updateOne({ _id : fromaccount._id } ,
         { $inc : {balance : -amount} } ,  
         { session } );

   // increment amount in receivers account

    await accountModel.updateOne( { _id : toaccount._id } , { $inc : { balance : amount } } , { session } );

    await session.commitTransaction()

    res.json({
 
        message : "transaction successful  ;)",
        sender : fromaccount.balance,
        receiver : toaccount.balance
 
    })

 }

catch( e : any ) {

   if( session.inTransaction() ) {

        await session.abortTransaction();

    }

 res.json({

      message : "transaction unsuccessful  :( " + e.message
    
  })

  }

 finally {

     session.endSession();

}

});

export default accountRouter;
