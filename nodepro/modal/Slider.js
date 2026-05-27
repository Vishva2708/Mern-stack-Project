const mongoose=require("mongoose")
const sliderschema=mongoose.Schema({
    image:{
        type:String
    },
    title:{
        type:String
    },
    subtitle:{
        type:String
    }
})
const Slider=mongoose.model("slider",sliderschema)
module.exports=Slider