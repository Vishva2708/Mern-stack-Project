const express=require("express")
const { getdata, ImageUpload, adding, collectapi, del, update, singleapi } = require("../controller/CollectionC")

const C_route=express.Router()
C_route.get("/",getdata)
C_route.post("/collect",ImageUpload,adding)
C_route.get("/api",collectapi)
C_route.get("/api/:id",singleapi)
C_route.delete("/delete/:id", del);

C_route.put(
  "/update/:id",
  ImageUpload,
  update
);


module.exports=C_route  