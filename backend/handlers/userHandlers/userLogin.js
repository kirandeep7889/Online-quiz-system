const User = require("../../models/User");
const jwt_secret="kirandeep7889";
const jwt=require("jsonwebtoken");



async function userLogin(req,res) {
    try {
        const { email } = req.body;
    
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(401).json({ error: 'Invalid email or password' });
        }
        const token = jwt.sign({ userId: user._id }, jwt_secret );
    
        res.json({ token });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
    

module.exports=userLogin;