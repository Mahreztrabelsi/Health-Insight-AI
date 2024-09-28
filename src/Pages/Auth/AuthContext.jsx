import React from 'react'
import  {createContext, useState, useEffect} from 'react';
import  { getAuth, onAuthStateChanged } from 'firebase/auth';
import { ImSpinner9 } from "react-icons/im";

export const  Context = createContext();

const AuthContext = ({children}) => {


    const auth = getAuth();
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);

    // Traking user when loading
    useEffect(() => {
        let unsubscribe = onAuthStateChanged(auth, (currentUser) =>{
            setLoading(false)
            if(currentUser){
                setUser(currentUser)
            }else{
                setUser(null)
            }
        });
        
        // Unsubscribe when component unmounts
        return () => {
        if(unsubscribe) unsubscribe();
        }
    },[])

    const values = {
        user: user,
        setUser: setUser
    };

    return (
        <Context.Provider value={values}>

            {loading && <div className="flex justify-center items-center h-screen bg-gray-200">
                <ImSpinner9  className="animate-spin text-5xl" />
            </div>}
            {!loading && children}

        </Context.Provider>
    )
}



export default AuthContext
