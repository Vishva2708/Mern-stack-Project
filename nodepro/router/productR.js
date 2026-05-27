const express=require("express")
const { getpro, prod, ImageUpload, productapi, del } = require("../controller/ProductsC")

const R_route=express.Router()
R_route.get("/",getpro)
R_route.post("/add-product",ImageUpload,prod)
 R_route.get("/delete/:id",del)
R_route.get("/api", productapi)


module.exports=R_route