
import  jwt  from 'jsonwebtoken' ;

const authMiddleware = (req :any  , res:any , next : any) => { 

  const token = req.get('Authorization');


  
  if(!token ) {
    
    return res.status(403).json({

      message : 'authHeader not provided'
     
    })

  }


  try { 

    const decoded = jwt.verify(token , process.env.JWT_SECRET || "secret" );

     // @ts-ignore
     req.userId = decoded.id;

    next();
  }

catch(err) {

   res.status(403).json({
         
       error : err
      
    }) 
  
  }

}

export default  authMiddleware ;