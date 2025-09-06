const mongoose = require("mongoose")

const CategorySchema = new mongoose.Schema({
    Name : {
        type:String, 
        require:true,
    },
    Description:{
        type:String,
        require:true,
    },
    Courses:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
    },
});

module.exports = mongoose.model("Category" , CategorySchema)