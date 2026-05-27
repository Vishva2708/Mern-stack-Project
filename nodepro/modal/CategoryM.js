const mongoose = require("mongoose")

const Categoryschema = mongoose.Schema({
  title: String,
  price: Number,
  image: String,
  category: String,
  subcategory:String,
  brand:String,
})

const categoryM=mongoose.model("categories",Categoryschema)
module.exports=categoryM