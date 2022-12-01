const jwt = require("jsonwebtoken");
const JWT_SECRET = "AKASH";

const fetchuser=(req,res,next)=>{
    const token=req.header('auth-token');
    if(!token){
        res.status(401).send({error:"please use a valid token"})
    }
    try {
        const data =jwt.verify(token,JWT_SECRET)
        //Here below the jwt will verify the token and using the data find that user  and that user will be sent as the requested user to the /getuser page
        req.user=data.user
        next()
    
        
    } catch (error) {
        res.status(401).send({error:"please use a valid token"})
    }

}


module.exports=fetchuser;