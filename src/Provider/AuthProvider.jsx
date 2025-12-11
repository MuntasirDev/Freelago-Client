import React, { createContext, useState, useEffect, useContext } from 'react';
import auth from '../Firebase/Firebase.init'; 
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    onAuthStateChanged, 
    signOut,
    GoogleAuthProvider, 
    signInWithPopup,    
    updateProfile       
} from 'firebase/auth'; 

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider(); 

const AuthProvider = ({ children }) => {
    
    const [user, setUser] = useState(null); 
    const [loading, setLoading] = useState(true);

    
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password); 
    };

   
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };
    
    
    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    
    const updateUserProfile = (name, photoUrl) => {
        
        if (auth.currentUser) {
            return updateProfile(auth.currentUser, {
                displayName: name,
                photoURL: photoUrl
            });
        }
        return Promise.reject(new Error("No user is currently signed in."));
    }


    useEffect(() => {
        
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            console.log('Auth State Changed:', currentUser);
            setUser(currentUser);
            setLoading(false);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const authInfo = {
        user,
        loading,
        createUser, 
        signIn, 
        logOut, 
        googleSignIn, 
        updateUserProfile 
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
export const useAuth = () => {
    return useContext(AuthContext);
};