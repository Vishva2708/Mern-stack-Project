const mongoose=require("mongoose")
const pro=mongoose.Schema({
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
    },
    brand:{
        type:String
    },
    description:{
        type:String
    },
    status:{
        type:String
    }
})
const collection=mongoose.model("collection",pro)
module.exports=collection