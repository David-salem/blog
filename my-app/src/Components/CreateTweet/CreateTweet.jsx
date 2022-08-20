import './CreateTweet.css';
import React, { useState, useEffect, useContext } from "react";
import Button from "@mui/material/Button";
import CircularProgress from '@mui/material/CircularProgress';
import localforage from "localforage";
import { stateContext } from "../../Utils/context";
import { APIController } from '../../Utils/Firebase';

export const CreateTweet = () => {
    const { tweet, setTweet, setName, data, addTweet } = useContext(stateContext);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    // Bring the userName
    useEffect(() => {
        localforage.getItem('Name').then((val) => {
                setName(val);
        })
      }, []);

    //Creating a new tweet onSubmit
    const handleSubmit = () => {
    if(tweet.trim().length > 0){
        APIController.addNewMessage( data, setMessage, setLoading, setTweet, addTweet);
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