const express=require("express")
const { getslide, addslide, deleteslide } = require("../controller/Slider")
const S_route=express.Router()

S_route.post("/add",addslide)
S_route.get("/",getslide)
S_route.delete("/delete/:id",deleteslide)

module.exports=S_route
