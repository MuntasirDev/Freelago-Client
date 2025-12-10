// src/Provider/AuthProvider.jsx (পরিবর্তন করা অংশ)

import React, { createContext, useState, useEffect } from 'react';
import auth from '../Firebase/Firebase.init'; 
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    onAuthStateChanged, 
    signOut,
    GoogleAuthProvider, // <-- নতুন ইমপোর্ট
    signInWithPopup,    // <-- নতুন ইমপোর্ট
    updateProfile       // <-- নতুন ইমপোর্ট
} from 'firebase/auth';

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider(); // <-- Google Provider তৈরি

const AuthProvider = ({ children }) => {
    
    const [user, setUser] = useState(null); 
    const [loading, setLoading] = useState(true);

    // ১. ইউজার তৈরি (Create User)
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password); 
    };

    // ২. সাইন-ইন (Sign In)
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    // ৩. লগ-আউট (Log Out)
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };
    
    // ৪. Google সাইন-ইন (Google Sign In) <-- নতুন ফাংশন
    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    // ৫. প্রোফাইল আপডেট (Update Profile) <-- নতুন ফাংশন
    const updateUserProfile = (name, photoUrl) => {
        // Firebase Auth ফাংশনটি user অবজেক্ট ব্যবহার করে কাজ করে, তাই user চেক করে নিতে পারেন।
        // যদিও এখানে return করা হচ্ছে, কিন্তু এটি asynchronous, তাই .then() বা await ব্যবহার করতে হবে।
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
        googleSignIn, // <-- Google Sign-In যোগ করা
        updateUserProfile // <-- Update Profile যোগ করা
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;