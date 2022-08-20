import './ProfilePage.css';
import React, { useState, useContext } from "react";
import Button from '@mui/material/Button';
import localforage from "localforage";
import { useInfo } from "../../Hooks/useInfo"
import { APIController } from '../../Utils/Firebase';
import { stateContext } from "../../Utils/context";

export const ProfilePage = () => {
    const [name, setName] = useState("");
    const [photo, setPhoto] = useState(null)
    const [loading, setLoading] = useState(false);
    const {userInfo, setUserInfo, nameFirebase} = useInfo()

    // Save the new name locally
    const handleChangeName = () => {
        APIController.loginAndUpdate(userInfo, name)
        localforage.setItem('Name', name).then(() => {
        })
        setName("")
    }

    const handleChangePic = (e) => {
        if (e.target.files[0]) {
            setPhoto(e.target.files[0])
          }
    }

    const handleUploadPic = () => {
        APIController.updatePicture(photo, userInfo, setLoading);
    }

    return (
        <div className="box-profile" align="left">
            <h2>Profile</h2>
            <div className="box-form">
                <form>
                    <div className="form-group">
                        <label>
                            User Name
                            <input 
                            type="text" 
                            name="userName" 
                            placeholder={name}
                            value={name} 
                            onChange={e => setName(e.target.value)}
                            ></input>
                        </label>
                        <div align="right">
                            <Button 
                            variant="contained" 
                            onClick={handleChangeName}
                            className="btn-save"
                            >Save</Button>
                        </div>
                    </div>
                    <div className="form-group-pic">
                        <label className="custom-file-upload">
                            <div sx={{ display: 'block' }}>
                                Profile Picture
                            </div>
                            <div align="right" className="input-design">
                                <input type="file" 
                                onChange={handleChangePic}
                                className="btn-upload" 
                                />
                            </div>
                            <Button 
                            className="btn-load"
                            variant="contained"
                            disabled={loading || !photo} onClick={ handleUploadPic }
                            >update</Button>
                        </label>
                    </div>
                </form>
            </div>
        </div>
    )
}