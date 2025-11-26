const Category = require("../Models/Category");

// create tag ka handler function
exports.CreateCategory = async(req , res)=>{
    try{

        // fetch data
        const{Name , Description} = req.body;
        console.log("Name" , Name , "Descripton" , Description)
        // validation
        if(!Name || !Description){
            return res.status(400).json({
                success:false,
                message:`All field are required`
            })
        }

        // create entry in DB 
        const CategoryDetails = await Category.create({
            Name:Name,
            Description : Description ,
        });
        console.log(CategoryDetails);

        // return Response 
        return res.status(200).json({
            success:true,
            message:`Category Created successfully`,
        })
    }catch(error){
        return res.status(200).json({
            success:false,
            message:`Failed in creating the Category , please try again later!!`
        })
    }

}


// getall tags handler function 

exports.ShowAllCategories = async(req , res)=>{
    try{
        const AllCategories = await Category.find( {} , {Name:true, Description:true});
        return res.status(200).json({
            success:true,
            AllCategories,
            message:`All Catergory returned Successfully`
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}


// categorypage details

exports.CategoryPageDetails = async(req , res) =>{
    try{
        // get categoryid
        const CategoryID = req.body.CategoryID;

        // get course for the specified CategoryID
        const SelectedCategory = await Category.findById(CategoryID)
                                                      .populate("Courses")
                                                      .exec();
                                                       
        // validation
        if(!SelectedCategory){
            return res.status(401).json({
                success:false,
                message:`catergory not found`
            })
        }

        if(SelectedCategory.Courses.length === 0){
            return res.status(401).json({
                success:false,
                message:`No Course found for this category`
            })
        }

        // get courses for different categories
         const DifferentCategory = await Category.findById({
                                                       _id : {$ne : CategoryID},
                                                      })
                                                      .populate("Courses")
                                                      .exec();
    }catch(error){
        return res.status(500).json({
            success:false,
            message:`Failed in Fetching the data of particular Category`,
            error:error.message,
        })
    }
}

