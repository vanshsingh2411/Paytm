import  express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const rootRouter = express.Router();
 rootRouter.use(cors())  ;
 rootRouter.use(express.json()) ;

 import router from './routes/index.js';

  const app = express();
  app.use(express.json());
  
  app.use( "/api/v1" , router );

    const port = 3001 ;

    async function main() {

    app.listen( port );

      console.log( "listening on port " + port );

      await mongoose.connect( 'mongodb+srv://paytmUser:fyKI4wCN8OboKNku@cluster0.conjftu.mongodb.net/?appName=Cluster0');
   
      console.log( "connected to db");


}


main() ;

// fyKI4wCN8OboKNku

// paytmUser

// mongodb+srv://paytmUser:fyKI4wCN8OboKNku@cluster0.conjftu.mongodb.net/?appName=Cluster0