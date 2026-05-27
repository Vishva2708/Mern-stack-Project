const multer = require("multer")
const collection = require("../modal/CollectionsM")

const adding=async(req,res)=>{
    const {title,category,price,brand,description,status}=req.body

    let image=""
    if(req.file){
        image=req.file.filename
    }
    await collection.create({
        title,category,price,image,brand,description,status
    })
   res.json({
   message:"Product Added"
})
}
const getdata=async(req,res)=>{
    const data=await collection.find({})
    res.render("collections",{data})
}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "upload/");  
  },
  filename: function (req, file, cb) {
    cb(null,file.originalname);
  }
});
const collectapi=async(req,res)=>{
   const {category}=req.query

   let data 
   if(category && category!=="all"){
    data=await collection.find({category})
   }else{
     data = await collection.find({})
   }
   res.json(data)
}
const singleapi=async(req,res)=>{
  const {id}=req.params
  const data=await collection.findById(id)
  res.json(data)
}
const del = async (req, res) => {
  const { id } = req.params;

  await collection.findByIdAndDelete(id);

  res.json({
    message: "Product Deleted"
  });

};
const update = async (req, res) => {

  const { id } = req.params;

  const {
    title,
    category,
    price,
    brand,
    description,status
  } = req.body;

  let updateData = {
    title,
    category,
    price,
    brand,
    description,
    status
  };

  if (req.file) {
    updateData.image = req.file.filename;
  }

  await collection.findByIdAndUpdate(
    id,
    updateData
  );

  res.json({
    message: "Product Updated"
  });
};


const ImageUpload=multer({storage}).single("image")

module.exports={adding,getdata,collectapi,singleapi,ImageUpload,del,update}