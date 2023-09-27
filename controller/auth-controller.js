const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

const prisma = require("../models/prisma");

exports.register = async (req,res,next) =>{
    try{
        const {username,email,password,confirmPassword} = req.body;
        const hashPassword = await bcrypt.hash(password,12);

        const result = await prisma.user.create({
            data:{
                username,
                email,
                password:hashPassword
            }
        });
        res.status(201).json({mesage:"Regiter success"});
    }
    catch(err){
        next(err)
    }
}

exports.login = async(req,res,next)=>{
    try{
        const {username,password} = req.body;
        const userTarget = await prisma.user.findUnique({
            where:{
                username
            }
        });
        // console.log(userTarget);
        if(!userTarget)return res.status(400).json({message:"not found"}); 
      
        const isMatch = await bcrypt.compare(password,userTarget.password); //check password
        if(!isMatch) return res.status(400).json({message:"worng password"});

        const payload = {
            id:userTarget.id
        }
        const accessToken = jwt.sign(payload,process.env.JWT_SECRET_KEY||"secret",{
            expiresIn:process.env.JWT_EXPIRE||"1"
        });
        res.status(200).json({accessToken});
    }
    catch(err){
        next(err); 
    }
}