// auth,manager,User,amin
const jwt = require("jsonwebtoken");
require("dotenv").config();

// This fuction is Basically checking the authencity of the User by verifying the token
exports.auth = async(req,res) => {
  
    try{
        // extract jwt token
        // pending: othger ways to fetch token

        const token = req.body.token;

        if(!token){
            return res.status(400).json({
                success:false,
                message:"Token is missing"
            });
        }

        // verify token
        try{
            const decodedToken = jwt.verify(token,process.env.JWT_SECRET);
            console.log(decodedToken);

            req.user = decodedToken;

        }

            catch(err){
               return res.status(401).json({
                success:false,
                message:'token is invalid'
               })
            }

            next();

        }

         
        catch(err){
            return res.status(401).json({
                success:false,
                message:"Something went wrong",
            })

        }
    }

    // this middleware is valid for the authorized Manager
    exports.IsManager = async(req,res) => {
        try{
            if(req.user.role  !== "Manager"){
                return res.status(401).json({
                    success:false,
                    message:"This is a protected route for Manager"
                })
            } 
            next();
        }

        catch(err){
            return res.status(500).json({
                success:false,
                message: "User is not authorized User"
            })
        }
    }

    // this middleware is valid for the authorized admin Amin 
    exports.Isadmin = async(req,res) => {
        try{
            if(req.user.role  !== "Admin"){
                return res.status(401).json({
                    success:false,
                    message:"This is a protected route for Admin"
                })
            } 
            next();
        }

        catch(err){
            return res.status(500).json({
                success:false,
                message: "User is not authorized User"
            })
        }
    }
    

    // this middleware is valid for the authorized  User 
    exports.IsUser = async(req,res) => {
        try{
            if(req.user.role  !== "User"){
                return res.status(401).json({
                    success:false,
                    message:"This is a protected route for Admin"
                })
            } 
            next();
        }

        catch(err){
            return res.status(500).json({
                success:false,
                message: "User is not authorized User"
            })
        }
    }

