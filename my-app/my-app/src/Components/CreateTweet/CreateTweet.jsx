import './CreateTweet.css';
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";

export const CreateTweet = ({ handleAddTweet }) => {
    const [tweet, setTweet] = useState("")
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (tweet.length >= 140) {
            setIsButtonDisabled(true);
            setMessage("The tweet can't contain more than 140 characters.");
        }
        else {
            setIsButtonDisabled(false);
            setMessage("");
        }
     }, [tweet]);

    const addTweet = () => {
        if(tweet.trim().length > 0){
            handleAddTweet(tweet);
            setTweet("");
        }
    };

    return (
        <div className="box">
            <textarea 
            maxLength="140" 
            placeholder="What you have in mind..." 
            value={tweet} 
            onChange={e => setTweet(e.target.value)}
            />
            <div className="bottom">
                <div className="pharagraph">
                    <p>{ message }</p>
                </div>
                <Button 
                variant="contained" 
                disabled={isButtonDisabled}
                onClick={  addTweet }
                >Tweet</Button>
            </div>
        </div>
    )
};