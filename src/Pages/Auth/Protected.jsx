import React from 'react'
import { Navigate } from 'react-router-dom'
import { useContext } from 'react'
import  {Context}  from './AuthContext'


const Protected = ({children}) => {
    
    const {user} = useContext(Context);    
    
    if(!user){
        return <Navigate to="/LogIn" replace/>
    }
    else {
        return children
    }
}

export default Protected
