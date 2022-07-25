import React, { useState, useEffect } from "react";
import axios from 'axios';
import { CreateTweet } from '../../Components/CreateTweet/CreateTweet';
import { TweetList } from '../../Components/TweetList/TweetList';
const url = "https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com";

export const HomePage = () => {
    const [tweet, setTweet] = useState ([]);

    // Create a new Tweet
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
    
    //Bring all the tweets
    useEffect(() => {
      axios.get(`${url}/tweet`)
      .then(res => {
        let data = res.data.tweets
        setTweet(data);
      })
    }, []);
  
    //Organizing them in decending order
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
    )
}