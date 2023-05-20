import React, { createContext, useContext } from "react";
import { useAuthUser } from 'react-auth-kit'
import postService from "../services/post.service";
import { ToastContext } from "./ToastContext";
import commentService from "../services/comment.service";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {

    const { setMessage, setSeverity } = useContext(ToastContext)

    const auth = useAuthUser()

    const likePost = (postId) => {
        postService.like(postId, auth().id)
            .then(({ data }) => {
                setMessage(data.message)
                setSeverity('success')
                console.log("Post liked!", data)
            })
            .catch(({ response }) => {
                setMessage(response.data.message)
                setSeverity('error')
                return 'error'
                console.log('oops!')
            })
    }

    const likeComment = (postId, commentId) => {
        commentService.like(postId, commentId )
            .then(({ data }) => {
                setMessage(data.message)
                setSeverity('success')
            })
            .catch(({ response }) => {
                setMessage(response.data.message)
                setSeverity('error')
                return 'error'
            })
    }

    return (
        <GlobalContext.Provider value={{
            likePost, likeComment
        }}>
            {children}
        </GlobalContext.Provider>
    )
}