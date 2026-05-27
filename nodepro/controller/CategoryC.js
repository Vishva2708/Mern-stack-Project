const multer = require("multer")
const categoryM = require("../modal/CategoryM")

const storage = multer.diskStorage({
    
    destination:(req,file,cb)=>{
        cb(null,"upload")
    },

    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }

})

const upload = multer({
    storage:storage
})


const addCategory = async(req,res)=>{

    const {title,category,price,brand,subcategory} = req.body

    let image = ""

    if(req.file){
        image = req.file.filename
    }

    await categoryM.create({
        title,
        category,
        price,
        brand,
        subcategory,
        image
    })

    res.redirect("/categories")
}


const getCategory = async(req,res)=>{

    const data = await categoryM.find()

    res.render("category",{data})
}
const del = async(req,res)=>{

    const {id} = req.params

    await categoryM.findByIdAndDelete(id)

    res.redirect("/categories")
}


const editPage = async(req,res)=>{

    const {id} = req.params

    const data = await categoryM.findById(id)

    res.render("edit",{data})
}


const update = async(req,res)=>{

    const {id} = req.params

    const {title,category,price,brand} = req.body

    let updateData = {
        title,
        category,
        price,
        brand,
        subcategory
    }

    if(req.file){
        updateData.image = req.file.filename
    }

    await categoryM.findByIdAndUpdate(id,updateData)

    res.redirect("/categories")
}

module.exports = {
    upload,
    addCategory,
    getCategory,
    del,
    editPage,
    update
}