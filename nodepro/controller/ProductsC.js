const multer = require("multer")
const productdata = require("../modal/productsM")

const prod=async(req,res)=>{
    const {title,category,price}=req.body

    let image=""
    if(req.file){
       image= req.file.path
    }
    await productdata.create({
        title,category,price,image
    })
    res.redirect("/products")
}
const getpro = async (req, res) => {
  const data = await productdata.find({});
  res.render("products", { data });  
};
const del=async(req,res)=>{
  const {id}= req.params
  const data=await productdata.findByIdAndDelete(id)
  res.redirect("/products")
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "upload/")
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const productapi=async(req,res)=>{
    const data=await productdata.find({})
    res.json({msg:"product added"})
}
const ImageUpload = multer({ storage }).single("image")

module.exports={prod,getpro,ImageUpload,productapi,del}
