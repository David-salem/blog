import './App.css';
import { Navbar } from "./Components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import { ProfilePage } from './Pages/ProfilePage/ProfilePage';
import { HomePage } from './Pages/HomePage/HomePage';

function App() {
  return (
    <div align="center">
        <Navbar />
          <div>
            <Routes>
                <Route path="/" element={ <HomePage/> } />
                <Route path="/profile" element={ <ProfilePage/> } />
            </Routes>
          </div>
    </div>
  )
};

export default App;