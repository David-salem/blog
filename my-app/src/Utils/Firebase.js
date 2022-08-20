import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, query, onSnapshot, doc, updateDoc, setDoc, getDocs, orderBy, limit, startAfter } from "firebase/firestore";
// import { ref, update } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider, updateProfile } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDu_3k_eKgzqko-wSL2aLXsh0uU4NO2Zxw",
  authDomain: "blog-itc.firebaseapp.com",
  projectId: "blog-itc",
  storageBucket: "blog-itc.appspot.com",
  messagingSenderId: "708763722761",
  appId: "1:708763722761:web:bc789ddec3ac2ada5904d8",
  measurementId: "G-PPD4MC7Q2Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const TWEETS_COLLECTION = collection(db, "tweets");
const provider = new GoogleAuthProvider();
const storage = getStorage(app);

export const auth = getAuth(app);

export const APIController = {
     addNewMessage: async (data, setMessage, setLoading, setTweet) => {
        setMessage("");
        setLoading(true);
        setTweet("");
            try {
            const docRef = await addDoc(TWEETS_COLLECTION, {
                content: data.content,
                userName: data.userName,
                date: data.date,
                id: data.id
            });
            setLoading(false);
            } catch (e) {
            setLoading(false);
            setMessage("Error adding document: ", e);
            }
    },
    getMessageFromDb: async(setObjectTweet, setLastVisible, setLoading) => {
        setLoading(true);
        const q = query(TWEETS_COLLECTION, orderBy("date", "desc"), limit(10))
        const documentSnapshots = await getDocs(q);

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const messages = [];
            querySnapshot.forEach((doc) => {
                messages.push(doc.data());
            });
            setObjectTweet(messages);
            setLoading(false);
            setLastVisible(documentSnapshots.docs[documentSnapshots.docs.length-1])
        })
        setLoading(false);
        return () => unsubscribe();
    },
    loadNextTweets: async (setObjectTweet, setLastVisible, lastVisible, setLoading, setMessage, setDisabled) => {
       try {
            setLoading(true);
           const q = query(TWEETS_COLLECTION, 
            orderBy("date", "desc"), 
            startAfter(lastVisible), 
            limit(10))
        const documentSnapshots = await getDocs(q);
        if (documentSnapshots.docs.length === 0) {
            setLoading(false);
            setMessage("There is no more tweets");
            setDisabled(true);
        }
        if (!documentSnapshots.empty){
            const newMessage = [];
            documentSnapshots.forEach((doc) => {
                newMessage.push(doc.data());
            });
            setObjectTweet((oldMessage) => [...oldMessage, ...newMessage])
            setMessage("");
            setDisabled(false);
            setLoading(false);
        }
          if (documentSnapshots?.docs[documentSnapshots.docs.length - 1]) {
            setLastVisible(documentSnapshots.docs[documentSnapshots.docs.length - 1]);
          }} catch (e) {
            setMessage(e);
            setLoading(false);
          }
    },
    registerUser: async ( registerEmail, registerPassword, setLoading, setError, navigate ) => {
        setLoading(true);
        setError("");
        try {
            const user = await createUserWithEmailAndPassword( auth, registerEmail, registerPassword );
            setLoading(false);
            navigate("/")
        } catch (err) {
            console.log(err.message);
            setLoading(false);
            setError("Fail to create an account");
        }
    },
    loginUser: async (loginEmail, loginPassword, setLoading, setError, navigate) => {
        setLoading(true);
        setError("");
        try {
            const user = await signInWithEmailAndPassword( auth, loginEmail, loginPassword);
            setLoading(false);
            navigate("/");
        } catch (err) {
            console.log(err.message);
            setLoading(false);
            setError("Fail to login");
        }
    },
    logout: async (navigate) => {
        await signOut(auth)
        .then(() => {
            navigate("/");
        }).catch((err) => {
            console.log(err);
        })
    },
    signWithGoogle: async (navigate) => {
        signInWithPopup(auth, provider)
        .then(() => {
            navigate("/");
        }).catch((err) => {
            console.log(err);
        })
    },
    updatePicture: async (file, userInfo, setLoading) => {
        const fileRef = ref(storage, userInfo.uid + ".png");
        console.log("working");
        
        setLoading(true);
    
        const snapshot = await uploadBytes(fileRef, file);
        const photoURL = await getDownloadURL(fileRef);
        console.log("still working");
    
    
        updateProfile(userInfo, {photoURL})
        setLoading(false);
        console.log("updated profile");
    },
    loginAndUpdate: async (userInfo, name) => {    
        await updateProfile(userInfo, {
            displayName: name
        })
    }
} 