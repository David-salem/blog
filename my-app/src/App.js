import './App.css';
import React from 'react';
import { Textarea } from './Components/Textarea'

function App() {
  const [tweet, setTweet] = useState([]);

  return (
    <div align="center">
      <Textarea />
    </div>
  );
}

export default App;
