import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthUser, useIsAuthenticated, useSignOut, useSignIn } from 'react-auth-kit'
import axios from "axios";
import postService from "../services/post.service";
import { ToastContext } from "./ToastContext";
import moment from 'moment'
import commentService from "../services/comment.service";
import { UserContext } from "./UserContext";
import userService from "../services/user.service";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {

    const { setMessage, setSeverity } = useContext(ToastContext)
    const { setUserImage, setCareer} = useContext(UserContext)

    const navigate = useNavigate()
    const auth = useAuthUser()
    const isAuthenticated = useIsAuthenticated()
    const signIn = useSignIn()
    const signOut = useSignOut()

    const [posts, setPosts] = useState([])

    const convertTime = (createdAt) => {
        const diffInMillis = moment().diff(moment(createdAt))

        if (diffInMillis < 60000) {
            const diffInSeconds = Math.floor(moment.duration(diffInMillis).asSeconds())
            return `${diffInSeconds} second${diffInSeconds > 1 ? 's' : ''} ago`
        } else if (diffInMillis < 3600000) {
            const diffInMinutes = Math.floor(moment.duration(diffInMillis).asMinutes())
            return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`
        } else if (diffInMillis < 86400000) {
            const diffInHours = Math.floor(moment.duration(diffInMillis).asHours())
            return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`
        } else {
            const diffInDays = Math.floor(moment.duration(diffInMillis).asDays())
            if (diffInDays > 30) {
                return '30+ days ago'
            } else {
                return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`
            }
        }
    }

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
        commentService.like({ postId, commentId })
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

    const trimCount = (count) => {
        if (count < 1000) {
            return `${count}`
        } else if (count < 1000000) {
            return `${count / 1000}K`
        } else if (count < 1000000000) {
            return `${count / 1000000}M`
        }
    }

    return (
        <GlobalContext.Provider value={{
            likePost, convertTime, likeComment, trimCount
        }}>
            {children}
        </GlobalContext.Provider>
    )
}