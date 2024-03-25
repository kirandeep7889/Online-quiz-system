const express=require("express");
const authMiddleware = require("../middleware/authMiddleware");
const getTopics = require("../handlers/quizHandlers/topicsHandler");
const getQuestions = require("../handlers/quizHandlers/questionsHandler");
const resultHanlder = require("../handlers/quizHandlers/resultHandler");
const quizRoute=express.Router();


quizRoute.get("/topics", getTopics);
quizRoute.get("/topics/:topicId",  getQuestions);
quizRoute.post("/results", resultHanlder )

module.exports=quizRoute;