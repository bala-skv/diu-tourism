
import { useState, useEffect } from "react";
import "./Feedback.css";

const Feedback = ({ placename }) => {
    const [feedbackData, setFeedbackData] = useState([]);
    const [newFeedback, setNewFeedback] = useState("");
    const [replies, setReplies] = useState({});
    const [replyText, setReplyText] = useState({});
    const [openFeedbacks, setOpenFeedbacks] = useState({});

    // Fetch feedback when component mounts or placename changes
    useEffect(() => {
        fetch(`http://localhost:5000/msg/${placename}/feedback`)
            .then((response) => response.json())
            .then((data) => setFeedbackData(data || [])) // Ensure it’s always an array
            .catch((error) => console.error("Error fetching feedback details:", error));
    }, [placename]);

    const handleSubmitFeedback = () => {
        if (!newFeedback.trim()) return;

        fetch(`http://localhost:5000/msg/${placename}/feedback`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ feedback: newFeedback }),
        })
            .then((response) => response.json())
            .then((data) => {
                setFeedbackData((prevData) => [...prevData, data]);
                setNewFeedback("");
            })
            .catch((error) => console.error("Error submitting feedback:", error));
    };

    const handleLike = (user_id) => {
        fetch(`http://localhost:5000/msg/${placename}/feedback/${user_id}/like`, { method: "POST" })
            .then(() => {
                setFeedbackData((prevData) =>
                    prevData.map((f) =>
                        f.user_id === user_id ? { ...f, likes: f.likes + 1 } : f
                    )
                );
            })
            .catch((error) => console.error("Error liking feedback:", error));
    };

    const handleDislike = (user_id) => {
        fetch(`http://localhost:5000/msg/${placename}/feedback/${user_id}/dislike`, { method: "POST" })
            .then(() => {
                setFeedbackData((prevData) =>
                    prevData.map((f) =>
                        f.user_id === user_id ? { ...f, dislikes: f.dislikes + 1 } : f
                    )
                );
            })
            .catch((error) => console.error("Error disliking feedback:", error));
    };

    const fetchReplies = (user_id) => {
        setOpenFeedbacks((prev) => ({ ...prev, [user_id]: !prev[user_id] }));

        if (replies[user_id]) return;

        fetch(`http://localhost:5000/msg/${placename}/feedback/${user_id}/replies`)
            .then((response) => (response.status === 404 ? [] : response.json()))
            .then((data) => {
                setReplies((prevReplies) => ({ ...prevReplies, [user_id]: data || [] }));
            })
            .catch((error) => {
                console.error("Error fetching replies:", error);
                setReplies((prevReplies) => ({ ...prevReplies, [user_id]: [] }));
            });
    };

    const handleReply = (user_id) => {
        const replyContent = replyText[user_id]?.trim();
        if (!replyContent) return;

        fetch(`http://localhost:5000/msg/${placename}/feedback/${user_id}/reply`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ reply: replyContent }),
        })
            .then(() => {
                fetchReplies(user_id);
                setReplyText((prev) => ({ ...prev, [user_id]: "" }));
            })
            .catch((error) => console.error("Error submitting reply:", error));
    };

    return (
        <div className="feedback-page-wrapper">
            <div className="feedback-container">
                <h2>Feedback for {placename}</h2>

                {/* Input for new feedback */}
                <div className="feedback-input">
                    <textarea
                        value={newFeedback}
                        onChange={(e) => setNewFeedback(e.target.value)}
                        placeholder="Write your feedback..."
                    />
                    <button onClick={handleSubmitFeedback}>Post</button>
                </div>

                {feedbackData.length > 0 ? (
                    <div className="feedback-list">
                        {feedbackData.map((feedback) => (
                            <div key={feedback.user_id} className="feedback-item">
                                <div className="feedback-header">
                                    <span className="username">@{feedback.user_id}</span>
                                    <span className="time">
                                        on: {feedback.d_ate ? new Date(feedback.d_ate).toLocaleDateString() : "Unknown"}
                                    </span>
                                </div>
                                <p className="comment">{feedback.user_comment}</p>

                                <div className="feedback-actions">
                                    <button onClick={() => handleLike(feedback.user_id)}>👍 {feedback.likes}</button>
                                    <button onClick={() => handleDislike(feedback.user_id)}>👎 {feedback.dislikes}</button>
                                    <button onClick={() => fetchReplies(feedback.user_id)}>Replies</button>
                                </div>

                                {/* Replies Section */}
                                {openFeedbacks[feedback.user_id] && (
                                    <div className="replies-container">
                                        {replies[feedback.user_id] ? (
                                            replies[feedback.user_id].length > 0 ? (
                                                <div className="replies">
                                                    {replies[feedback.user_id].map((reply, index) => (
                                                        <p key={index} className="reply">
                                                            <strong>@{reply.replier_user_id}:</strong> {reply.replier_comment}
                                                        </p>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p>No replies yet.</p>
                                            )
                                        ) : (
                                            <p>Loading...</p>
                                        )}

                                        {/* Reply Input */}
                                        <div className="reply-input">
                                            <input
                                                type="text"
                                                value={replyText[feedback.user_id] || ""}
                                                onChange={(e) =>
                                                    setReplyText((prev) => ({
                                                        ...prev,
                                                        [feedback.user_id]: e.target.value,
                                                    }))
                                                }
                                                placeholder="Write a reply..."
                                            />
                                            <button onClick={() => handleReply(feedback.user_id)}>Reply</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="no-data">No feedback available.</p>
                )}
            </div>
        </div>
    );
};

export default Feedback;
