import './App.css';
import React, { useState, useEffect } from "react";
import { CreateTweet } from './Components/CreateTweet/CreateTweet.jsx';
import { nanoid } from 'nanoid';
import { format } from 'fecha';
import { TweetList } from './Components/TweetList/TweetList';
import localforage from "localforage";

function App() {
  const [tweet, setTweet] = useState ([]);

  const addTweet = (message) => {
    const newTweet = {
        id: nanoid(),
        message: message,
        date: `${format(new Date(), 'YYYY-MM-DD[T]hh:mm:ss.SSS')}`,
    }
    const addAnotherTweet = [...tweet, newTweet];
    setTweet(addAnotherTweet);
  };

  useEffect(() => {
    localforage.setItem('Tweets', tweet).then((val) => {
    })
  }, [tweet])
  
  useEffect(() => {
    localforage.getItem('Tweets').then((val) => {
        if(val === null) {
            setTweet([]);
        } else {
          setTweet(val);
        }
    })
  }, []);

  tweet.sort((a, b) => (a.date > b.date) ? -1 : 1)

  return (
    <div align="center">
        <CreateTweet 
        handleAddTweet={ addTweet }/>
        <TweetList
        tweet={ tweet }
        />
    </div>
  );
}

export default App;
