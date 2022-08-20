import { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../Utils/Firebase';


export function useInfo() {
    const [userInfo, setUserInfo] = useState();
    const [nameFirebase, setNameFirebase] = useState();

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, user => {
            setUserInfo(user)
            setNameFirebase(user.displayName)
        });
        return unsub;
    }, [])

    return {
        userInfo,
        setUserInfo,
        nameFirebase
    };
}