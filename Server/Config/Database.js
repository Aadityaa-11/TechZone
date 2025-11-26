const mongoose = require("mongoose")
require("dotenv").config()

exports.dbconnect = ()=>{

    mongoose.connect(process.env.MONGODB_URL , {
        useNewUrlParser:true,
        useUnifiedTopology : true,
    })
    .then( ()=> console.log("Database connection successfully") )

    .catch( (error)=>{
        console.log(`Issue in Db connection`);
        console.error(error);
        process.exit(1);
    })    
}

