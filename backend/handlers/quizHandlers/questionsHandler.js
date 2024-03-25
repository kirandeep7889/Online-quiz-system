const Question = require("../../models/Questions");

async function getQuestions(req, res) {
    try {
        const topicId = req.params.topicId;

        const questions = await Question.aggregate([
            {
                $match: { topic: topicId }
            }
        ]);

        if (questions.length === 0) {
            return res.status(404).json({ message: "No questions found for the given topicId" });
        }

        res.json(questions);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = getQuestions;
