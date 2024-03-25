import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import "./Questions.css"; 

const QuestionsPage = () => {
    const location = useLocation();
    const topic = location.state?.topic;
    const [questions, setQuestions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [currentSetIndex, setCurrentSetIndex] = useState(0);
    const [totalPoints, setTotalPoints] = useState(null); 
    const [userRating, setUserRating] = useState(""); 
    const [greeting, setGreeting] = useState(""); 

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get(`https://online-quiz-system-84sa.onrender.com/api/v1/quiz/topics/${topic._id}`);
                setQuestions(response.data); // 
                const initialSelectedOptions = {};
                response.data.forEach((question) => {
                    initialSelectedOptions[question._id] = null;
                });
                setSelectedOptions(initialSelectedOptions);
            } catch (error) {
                console.error("Error fetching questions:", error);
            }
        };

        if (topic) {
            fetchQuestions();
        }
    }, [topic]);

    const handleOptionSelect = (questionId, option) => {
        setSelectedOptions(prevState => ({
            ...prevState,
            [questionId]: option
        }));
    };

    const handleNextSet = () => {
        setCurrentSetIndex(prevIndex => prevIndex + 2);
    };

    const handlePrevSet = () => {
        setCurrentSetIndex(prevIndex => Math.max(prevIndex - 2, 0));
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post('https://online-quiz-system-84sa.onrender.com/api/v1/quiz/results', selectedOptions);
            const totalPoints = response.data.totalPoints;
            setTotalPoints(totalPoints);
            const rating = determineRating(totalPoints);
            setUserRating(rating);
            setGreeting(`Congratulations! You scored ${totalPoints} points. Your review  is that you ${rating}.`);
        } catch (error) {
            console.error("Error submitting quiz:", error);
        }
    };

    const determineRating = (totalPoints) => {
        if (totalPoints >= 8) {
            return "Excellent";
        } else if (totalPoints >= 5) {
            return "Good";
        } else {
            return "Needs Improvement";
        }
    };

    return (
        <div className="quiz-container">
            <h2 className="quiz-title">{`${topic.name}`}-QUIZ</h2>
            <div className="instructions">   
                <p>Choose the right option</p>
                <p>*Each question carries 1 point</p>
            </div>
            {topic && (
                <div>
                    <form className="questions-form">
                        {questions.slice(currentSetIndex, currentSetIndex + 2).map((question, index) => (
                            <div key={question._id} className="question-container">
                                <p className="question-text">{`Question ${currentSetIndex + index + 1}: ${question.questionText}`}</p>
                                <ul className="options-list">
                                    {question.options.map((option, optionIndex) => (
                                        <li key={optionIndex} className="option-item">
                                            <label>
                                                <input
                                                    type="radio"
                                                    value={option}
                                                    checked={selectedOptions[question._id] === option}
                                                    onChange={() => handleOptionSelect(question._id, option)}
                                                />
                                                {option}
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </form>
                </div>
            )}
            <div className="navigation-buttons">
                <button onClick={handlePrevSet} disabled={currentSetIndex === 0}>Previous</button>
                <button onClick={handleNextSet} disabled={currentSetIndex + 2 >= questions.length}>Next</button>
                {currentSetIndex + 2 >= questions.length && (
                    <button onClick={handleSubmit} className="submit-button">Submit</button>
                )}
            </div>
            <div className="greeting">
              {greeting && (
                <div>
                <p>{greeting}</p>
                <p>Want to Give another try ?<Link to="/">Home</Link></p>
                </div>
              )}
            </div>            
        </div>
    );
};

export default QuestionsPage;
