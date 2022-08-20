import "./Navbar.css";
import React, { useContext, useState, useEffect } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import { APIController } from '../../Utils/Firebase';
import { AuthContext } from "../../Utils/authContext";
import { auth } from "../../Utils/Firebase"
import { useInfo } from "../../Hooks/useInfo"

export const Navbar = () => {
    // const { auth } = useContext(AuthContext);
    const [photoURL, setPhotoURL] = useState("https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png");
    const userInfo = useInfo()
    const navigate = useNavigate();

    const logOutHandler = () => {
        APIController.logout(navigate);
    }

    useEffect(() => {
        if (userInfo?.photoURL) {
        setPhotoURL(userInfo.photoURL);
        }
      }, [userInfo])

    return (
        <div align="center" className="box-nav">
            <div className="navbar">
                <div>
                    <NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} to="/">Home</NavLink>
                    <NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} to="profile">Profile</NavLink>
                </div>
                <div className="user-info">
                    <p onClick={logOutHandler} className="button-logout">Log out</p>
                    <img src={photoURL} alt="avatar" className="avatar" />
                </div>
            </div>
        </div>
    )
}