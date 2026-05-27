const mongoose=require("mongoose")
const mongo=mongoose.Schema({
    title:{
        type:String
    },
    category:{
        type:String
    },
    price:{
        type:String
    },
    image:{
        type:String
    }
})
const productdata=mongoose.model("project",mongo)
module.exports=productdata