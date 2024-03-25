import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa"; // Import close icon
import "./Home.css";

const Home = () => {
    const [topics, setTopics] = useState([]);
    const [showLoginMessage, setShowLoginMessage] = useState(false);
    const [selectedTopic, setSelectedTopic] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("https://online-quiz-system-84sa.onrender.com/api/v1/quiz/topics")
            .then(response => {
                setTopics(response.data);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, []);

    const handleTopicSelect = (topic) => {
        if (isLoggedIn()) {
            navigate(`/quiz/${topic._id}`, { state: { topic } });
        } else {
            setSelectedTopic(topic);
            setShowLoginMessage(true);
        }
    };

    const isLoggedIn = () => {
        return localStorage.getItem("token") !== null;
    };

    const handleLogin = () => {
        navigate("/login");
    };

    const handleSignup = () => {
        navigate("/signup");
    };

    const handleCloseMessage = () => {
        setShowLoginMessage(false);
        setSelectedTopic(null);
    };

    return (
        <div className="home-container">
            <div className="header">
                <h1 className="main-heading">Welcome to the Quiz</h1>
                <h3 className="sub-heading">Click on the topic to start Quiz ..</h3>
            </div>
            <div className="topics-container">
                {topics.map(topic => (
                    <div key={topic._id} className="topic-card" onClick={() => handleTopicSelect(topic)}>
                        <img src={topic.logo} alt={topic.name} className="topic-logo" />
                        <h3 className="topic-name">{topic.name}</h3>
                        <p className="topic-description">{topic.description}</p>
                    </div>
                ))}
            </div>
            {showLoginMessage && (
                <div className="login-message-box">
                    <div className="message">
                        <p>OOPS !!! You are not logged in.</p>
                        <p>Would you like to:</p>
                        <button className="login-button" onClick={handleLogin}>Go to Login</button>
                        <button className="signup-button" onClick={handleSignup}>Go to Signup</button>
                    </div>
                    <button className="close-icon" onClick={handleCloseMessage}>
                        <FaTimes />
                    </button>
                </div>
            )}
        </div>
    );
}

export default Home;
