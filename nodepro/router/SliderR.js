const express=require("express")
const { getslide, addslide } = require("../controller/Slider")
const S_route=express.Router()

S_route.post("/add",addslide)
S_route.get("/",getslide)

module.exports=S_route