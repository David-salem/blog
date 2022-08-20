import React, { useEffect, useContext, useState } from "react";
import { CreateTweet } from '../../Components/CreateTweet/CreateTweet';
import { TweetList } from '../../Components/TweetList/TweetList';
import { stateContext } from "../../Utils/context";
import { APIController } from '../../Utils/Firebase';
import Button from "@mui/material/Button";
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';


export const HomePage = () => {
  const { setObjectTweet } = useContext(stateContext);
  const [lastVisible, setLastVisible] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
                    
    const handleScrollDown = (e) => {
        APIController.loadNextTweets(setObjectTweet, 
                        setLastVisible, 
                        lastVisible, 
                        setLoading,
                        setMessage,
                        setIsButtonDisabled
                        );
        }

    useEffect(() => {
        APIController.getMessageFromDb(setObjectTweet, setLastVisible, setLoading);
    }, []);

    return (
    <div align="center">
        <CreateTweet />
        <TweetList /> 
        {message && <Alert severity="error" style={{width: 570}}>{message}</Alert>}
        { loading ?
                <CircularProgress />
                      :
                <Button 
                variant="contained" 
                color="success" 
                onClick={ handleScrollDown }
                disabled={ isButtonDisabled }
                >load more</Button>
            }
    </div>
    )
}