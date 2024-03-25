const express=require("express");
const quizRoute = require("./quizRoute");
const userRoute = require("./userRoute");
const rootRoute=express.Router();


rootRoute.use("/user",userRoute);
rootRoute.use("/quiz",quizRoute);

module.exports=rootRoute;