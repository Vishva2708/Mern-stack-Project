const mongoose=require("mongoose")
mongoose.connect("mongodb://localhost:27017/pro")
const db=mongoose.connection
db.on("connected",(data,err)=>{
    if(err){
        console.log(err)
    }else{
        console.log("database connected")
    }
})
