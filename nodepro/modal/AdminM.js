const mongoose=require("mongoose")

const adminside=mongoose.Schema({
    email:{
        type:String
    },
    password:{
        type:String
    }
})
const admintask=mongoose.model("admin",adminside)
module.exports=admintask