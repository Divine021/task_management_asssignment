const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.Signup = async(req,res) => {
    try{
      
        const{name,email,password,role} = req.body;

        // check if User is already exists
        const existingUser = await User.findOne({email});
        
        if(existingUser){
            return res.status(400).json({
              success:false,
              message:"User already exists"  
            })
        }

        // hashing password
        let hashedPassword;
        try{
            hashedPassword =  await bcrypt.hash(password,10)
        }
        catch(error){
            return res.status(500).json({ 
                success:false,
                message:"Error in hashing password",
            })
        }

        // create entry for the User
        const newUser = await new User({
            name,
            email,
            password:hashedPassword,
            role 
        })

        return res.status(200).json({
            success:true,
            message:"User entry created Successfully"
        })

    }
    catch(err){
       console.log(err);
       return res.status(500).json({
        success:false,
        message:"User can not be registerd Please try again"
       })


    }
}

exports.login = async (req,res) => {

    const{email,password} = req.body;
     
    if(!email || !password){
        return res.status(400).json({
            success:false,
            message:"Please fill all the entries carefully",
        })
    }

    // validation for registerd User
    const user = await User.findOne({email});
    if(!user){
        return res.status(401).json({
            success:false,
            message:"User is not registerd."
        })
    }

    const payload = {
        email:user.email,
        id:user.id,
        role:user.role
    }

    // compare the password
    if(await  bcrypt.compare(password,user.password)){
        // password match create jwt token
        let token = jwt.sign(payload,process.env.JWT_SECRET,{
                                expiresIn: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
        })

        user.token = token;
        user.password = undefined;
        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),    
            httpOnly:true
        }

        res.cookie("cooks1",token,options).status(200).json({
            success:true,
            token,
            user,
            message:"User logged in successfully  "
        })

    }
    else{
        // password do not match
        return res.status(403).json({
            success:false,
            message:"Password is incorrect"
        })
    }

    



    

}