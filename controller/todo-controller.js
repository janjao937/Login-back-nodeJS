const prisma = require("../models/prisma");

exports.createTodo = async(req,res,next)=>{
    try{
        const {title,completed,dueDate} = req.body;
        // const user = req.user;
        //Validate 
        await prisma.todo.create({
            data:{
                title,
                completed,
                dueDate,
                // userId:user.id
                user:{
                    connect:req.user
                }
            }
        });
        
        res.status(201).json({message:"Created"});
    }
    catch(err){
        next(err)//throw error to err middleware
    }

}

//Validate
//-manual
//-validation node js library |libraryname| joi,yup,sod