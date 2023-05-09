import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthUser, useIsAuthenticated, useSignOut, useSignIn } from 'react-auth-kit'
import axios from "axios";
import postService from "../services/post.service";

export const ToastContext = createContext();

export const ToastProvider = ({ children }) => {

    const [message, setMessage] = useState('')
    const [severity, setSeverity] = useState('')

    return (
        <ToastContext.Provider value={{
            message, setMessage, severity, setSeverity
        }}>
            {children}
        </ToastContext.Provider>
    )
}