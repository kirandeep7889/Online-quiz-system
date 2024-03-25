const jwt = require("jsonwebtoken");
const jwtSecret="kirandeep7889"


const authMiddleware=(req,res,next)=>{
    const authHeader=req.headers.authorization;
    if(!authHeader | !authHeader.startsWith('Bearer ')){
        return res.status(403).json({
            message: "header authorizatin is wrong"
        });
    }
    const token=authHeader.split(' ')[1];

    try{
        const decoded=jwt.verify(token,jwtSecret);
        req.userId=decoded.userId;
        next();
        
    } catch (err) {
         return res.status(403).json({
               message: err  
         });
    }
}
module.exports=authMiddleware;