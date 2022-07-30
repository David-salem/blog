import './App.css';
import React, { useState } from "react";
import { Navbar } from "./Components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import { ProfilePage } from './Pages/ProfilePage/ProfilePage';
import { HomePage } from './Pages/HomePage/HomePage';
import { stateContext } from "./context";
import { nanoid } from 'nanoid';

function App() {
  const [tweet, setTweet] = useState("");
  const [name, setName] = useState("");
  const [objectTweet, setObjectTweet] = useState([]);

  // Defining data of the tweet
      const data = {
        content: tweet,
        userName: name,
        date: new Date().toISOString(),
        id: nanoid()
  };

      // Create a new Tweet
      const addTweet = () => {
        const addAnotherTweet = [...objectTweet, data];
        setObjectTweet(addAnotherTweet);
      };

  return (
    <stateContext.Provider value={{ tweet, setTweet, name, setName, objectTweet, setObjectTweet, data, addTweet }}>
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

export default App;