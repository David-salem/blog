import './ProfilePage.css';
import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import localforage from "localforage";

export const ProfilePage = () => {
    const [name, setName] = useState("");
    const [newName, setNewName] = useState("");

    useEffect(() => {
        localforage.setItem('Name', newName).then(() => {
        })
      }, [newName]);

      const getName = () => {
        setNewName(name);
        setName("");
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
                    placeholder="Change User Name"
                    value={name} 
                    onChange={e => setName(e.target.value)}
                    ></input>
                    <Button variant="contained" onClick={ getName }>Save</Button>
                </form>
            </div>
        </div>
    )
}