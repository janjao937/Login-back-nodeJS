const jwt = require("jsonwebtoken");
const prisma = require("../models/prisma");

module.exports = async(req,res,next)=>{
    try{
        const authorization = req.headers.authorization;//const {authorization} = req.header
        if(!authorization) return res.status(401).json({message:"Unauthorized"});
        if(!authorization.startsWith("Bearer"))return res.status(401).json({message:"Unauthorized"});
        const token = authorization.split(" ")[1];//Bearer asdasdasdasdasiijijnvoiwefw
    
        const payload = jwt.verify(token,process.env.JWT_SECRET_KEY || "very_secret");
        // req.payload = payload;

        //check user
        const user = await prisma.user.findUnique({
            where:{
                id:payload.id
            }
        });

        if(!user)return res.status(401).json({message:"user not found|Unauthorized"});
        req.user = user;//send user to other middleware

        next();

    }
    catch(err){
        next(err);
    }
   

}