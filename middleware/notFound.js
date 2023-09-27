module.exports=(req,res,next)=>{
    // throw new Error("Test Error middleware");
    res.status(404).json({message:"not found this path"});
}