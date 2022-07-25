import './CreateTweet.css';
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import { nanoid } from 'nanoid';
const url = "https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com"

export const CreateTweet = ({ handleAddTweet }) => {
    const [tweet, setTweet] = useState("")
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    // Defining data of the tweet
    const data = {
        content: tweet,
        userName: "yonatan",
        date: new Date().toISOString(),
        id: nanoid()
    }

    //Creating a new tweet onSubmit
    const handleSubmit = () => {
    if(tweet.trim().length > 0){
            setLoading(true);
        axios.post(`${url}/tweet`, data).then(res => {
            handleAddTweet(tweet, data.date, data.id);
            setLoading(false);
            setTweet("");
        }).catch(err => {
            setTweet("");
            setLoading(false);
            setMessage(err.message);
        })
    }};

    // Block the textarea if there is more than 140 characters
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
                { loading ?
                <CircularProgress />
                      :
                <Button 
                variant="contained" 
                disabled={isButtonDisabled}
                onClick={ () => {handleSubmit()}}
                >Tweet</Button>
            }
            </div>
        </div>
    )
};