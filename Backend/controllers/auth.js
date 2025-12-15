const studentSchema = require("../models/studentSchema");
const trainerSchema = require("../models/trainerSchema")
const jwt = require('jsonwebtoken')


const auth = async (req,res)=>{




    const {email,password} = req.body;
   
   

    try{      
            let user = await studentSchema.findOne({email})

           

            if(user)
            {
                 if(password === user.password)
                {
             
                
                let token = jwt.sign({email:user.email},process.env.SECRET_KEY,{expiresIn:'1d'});
              
             
                res.cookie("token",token)
                const userData = user.toObject();
                delete userData.password;
                res.status(200).send(userData);
            }

            }
            else{
                let user = await trainerSchema.findOne({email})
              

            if(password === user.password)
            {
                let token = jwt.sign({email},process.env.SECRET_KEY);
                res.cookie("token",token)
                const userData = user.toObject();
                delete userData.password;
                res.status(200).send(userData);
            }


            }
        
           


         
       

    }catch(err)
    {
        res.status(500).send("Something Went Wrong...");
    }
}


const logOut = async(req,res)=>{

    try{


        console.log("hello")
        

        res.cookie('token',"")
        res.status(200).send("Token Deleted...")

    }catch(err){

        res.status(500).send("Something Went Wrong...")

    }
    
}
module.exports = {
    auth,logOut
}
