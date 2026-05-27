const mongoose=require("mongoose")
const couponSchema=mongoose.Schema({
    code:{
        type:String
    },
    brand:{
        type:String
    },
    discount:{
        type:Number
    },
   expiry:{
        type:Date
    },
},{timestamps:true}
)
const Coupon=mongoose.model("coupons",couponSchema)
module.exports=Coupon