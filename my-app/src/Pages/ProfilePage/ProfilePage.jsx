import './ProfilePage.css';
import React, { useState } from "react";
import Button from '@mui/material/Button';

export const ProfilePage = () => {
    const [name, setName] = useState("Yonatan");

    const getName = () => {
        console.log(name);
    }
    return (
        <div className="box-profile" align="left">
            <h2>Profile</h2>
            <div className="box-form">
                <form>
                    <label for="userName" >User Name</label>
                    <input 
                    type="text" 
                    name="userName" 
                    placeholder="Yonatan"
                    value={name} 
                    onChange={e => setName(e.target.value)}
                    ></input>
                    <Button variant="contained" onClick={ getName() }>Save</Button>
                </form>
            </div>
        </div>
    )
}