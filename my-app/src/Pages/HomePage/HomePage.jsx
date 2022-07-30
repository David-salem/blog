import React, { useEffect, useContext } from "react";
import axios from 'axios';
import { CreateTweet } from '../../Components/CreateTweet/CreateTweet';
import { TweetList } from '../../Components/TweetList/TweetList';
import { stateContext } from "../../context";
const url = "https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com";

export const HomePage = () => {
  const { objectTweet, setObjectTweet } = useContext(stateContext);
    
    //Bring all the tweets and refresh every 5 seconds
    useEffect(() => {
      let timer = setTimeout(() => {
        axios.get(`${url}/tweet`)
        .then(res => {
          let data = res.data.tweets
          setObjectTweet(data);
        })
      }, 5000);
    
      return () => {
          clearTimeout(timer);
      }
    });
  
    //Organizing them in decending order
    objectTweet.sort((a, b) => (a.date > b.date) ? -1 : 1);

    return (
        <div align="center">
        <CreateTweet />
        <TweetList /> 
    </div>
    )
}