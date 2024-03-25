const Question = require("../../models/Questions");

const resultHandler = async (req, res) => {
    const selectedOptions = req.body;

    let totalPoints = 0;
    for (const questionId in selectedOptions) {
        const selectedOption = selectedOptions[questionId];
        try {
            const questionData = await Question.findById(questionId);
            const index=questionData.correctOption;

            if (selectedOption === (questionData.options[index])) {
                totalPoints++;
            }
            
        } catch (error) {
            console.error("Error fetching question data:", error);
        }
    }

    // Send total points in response
    res.json({ totalPoints });
};

module.exports = resultHandler;
