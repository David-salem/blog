import './App.css';
import React, { useState } from "react";
import { Navbar } from "./Components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import { ProfilePage } from './Pages/ProfilePage/ProfilePage';
import { HomePage } from './Pages/HomePage/HomePage';
import { stateContext } from "./Utils/context";
import { nanoid } from 'nanoid';

export const Api = () => {
    const [tweet, setTweet] = useState("");
    const [name, setName] = useState("Yonatan");
    const [objectTweet, setObjectTweet] = useState([]);
  
    // Defining data of the tweet
        const data = {
          content: tweet,
          userName: name,
          date: new Date().toISOString(),
          id: nanoid()
        };

    return (
      <stateContext.Provider value={{ tweet, setTweet, name, setName, objectTweet, setObjectTweet, data }}>
        <div align="center">
            <Navbar />
              <div>
                <Routes>
                    <Route path="/" element={ <HomePage/> } />
                    <Route path="/profile" element={ <ProfilePage/> } />
                </Routes>
              </div>
        </div>
      </stateContext.Provider>
    )
};