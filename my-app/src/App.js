import './App.css';
import React, { useState, useEffect } from "react";
import { CreateTweet } from './Components/CreateTweet/CreateTweet.jsx';
import { TweetList } from './Components/TweetList/TweetList';
import axios from 'axios';
const url = "https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com"

function App() {
  const [tweet, setTweet] = useState ([]);

  // Adding a new tweet
  const addTweet = (content, date, id) => {
    const newTweet = {
      content: content,
      userName: "yonatan",
      date: date,
      id: id,
    }
    const addAnotherTweet = [...tweet, newTweet];
    setTweet(addAnotherTweet);
  };
  
  // Bring from the server the tweets
  useEffect(() => {
    axios.get(`${url}/tweet`)
    .then(res => {
      let data = res.data.tweets
      setTweet(data);
    })
  }, []);
 
  //Organizing them
  tweet.sort((a, b) => (a.date > b.date) ? -1 : 1)

  return (
    <div align="center">
        <CreateTweet 
        handleAddTweet={ addTweet }
        />
        <TweetList
        tweet={ tweet }
        />
    </div>
  );
}

export default App;