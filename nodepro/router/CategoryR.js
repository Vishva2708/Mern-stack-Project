const express = require("express")

const router = express.Router()

const {upload,addCategory,getCategory,del,editPage,update} = require("../controller/CategoryC")

router.get("/categories",getCategory)


router.post("/categories/add",upload.single("image"),addCategory)

router.get("/categories/delete/:id",del)


router.get("/categories/edit/:id",editPage)


router.post(
    "/categories/update/:id",
    upload.single("image"),
    update
)

module.exports = router