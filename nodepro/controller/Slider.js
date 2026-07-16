const Slider = require("../modal/Slider")

const addslide=async(req,res)=>{
    const slider=await Slider.create(req.body)
    res.json({message:"slider Added",success:true},slider)
}
const getslide=async(req,res)=>{
    const sliders=await Slider.find()
    res.json({success:true,sliders})
}
const deleteslide=async(req,res)=>{
    const {id}=req.params
    await Slider.findByIdAndDelete(id)
    res.json({message:"slider deleted",success:true})
}
module.exports={addslide,getslide,deleteslide}
