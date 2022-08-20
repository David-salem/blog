import './LogInPage.css';
import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { APIController } from '../../Utils/Firebase';
import { AuthContext } from "../../Utils/authContext";
import Alert from '@mui/material/Alert';
import { FcGoogle } from 'react-icons/fc';
import CircularProgress from '@mui/material/CircularProgress';



export const LogInPage = () => {
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { loginGoogleHandler, navigate } = useContext(AuthContext);

    const loginHandler = (e) => {
        e.preventDefault();
        APIController.loginUser(loginEmail, loginPassword, setLoading, setError, navigate)
    }

    return (
        <div className="wrapper-user">
            <div className="box-user" align="center">
                <h3>Welcome back</h3>
                <button onClick={loginGoogleHandler} className="button-google"><FcGoogle size={25}/>Log in with Google</button>
                <div className="option-user">
                    <hr />
                    <p>Or log in with email</p>
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
                        onChange={(e) => setLoginEmail(e.target.value)}
                        ></input>
                        <label htmlFor="password">Password</label>
                        <input 
                        type="password" 
                        name="password"
                        placeholder="Password"
                        onChange={(e) => setLoginPassword(e.target.value)}
                        ></input>
                </form>
                {
                    loading ?
                    <button className="btn" onClick={loginHandler}><CircularProgress /></button>                    
                    :
                <button className="btn" onClick={loginHandler}>Log in</button>
                }
                <div className="switcher">
                    <Link to="/">Register a new account</Link>
                </div>
            </div>
        </div>
    )
}