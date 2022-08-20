import './UserPage.css';
import React, { useContext } from "react";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { APIController } from '../../Utils/Firebase';
import { AuthContext } from "../../Utils/authContext";
import { FcGoogle } from 'react-icons/fc';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';

export const UserPage = () => {
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { loginGoogleHandler, navigate } = useContext(AuthContext);

    const saveNewUser = (e) => {
        e.preventDefault();
        APIController.registerUser(registerEmail, registerPassword, setLoading, setError, navigate);
    };

    return (
        <div className="wrapper-user">
            <div className="box-user" align="center">
                <h3>Sign up for free</h3>
                <button onClick={loginGoogleHandler} className="button-google"><FcGoogle size={25}/>Sign up with Google</button>
                <div className="option-user">
                    <hr />
                    <p>Or sign up with email</p>
                    <hr />
                </div>
                <div style={{margin: "0 80px"}}>
                    {error && <Alert severity="error">{error}</Alert>}
                </div>
                <form>
                        <label htmlFor="email">Email</label>
                        <input 
                        type="text" 
                        name="email"
                        placeholder="your@email.com"
                        onChange={(e) => setRegisterEmail(e.target.value)}
                        ></input>
                        <label htmlFor="password">Password</label>
                        <input 
                        type="password" 
                        name="password"
                        placeholder="Password"
                        onChange={(e) => setRegisterPassword(e.target.value)}
                        ></input>
                </form>
                {
                    loading ?
                    <button className="btn" onClick={saveNewUser}><CircularProgress /></button>
                    :
                    <button className="btn" onClick={saveNewUser}>Register</button>
                }
                <div className="switcher">
                    <p>Already have an account? <Link to="/login">Log in</Link></p>
                </div>
            </div>
        </div>
    )
}