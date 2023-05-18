import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthUser, useSignOut, useSignIn } from 'react-auth-kit'
import userService from "../services/user.service";
import { ToastContext } from "./ToastContext";
import Cookies from 'js-cookie'


export const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const [userImage, setUserImage] = useState(null)
    const [career, setCareer] = useState(null)
    const [groups, setGroups] = useState([])
    const [token, setToken] = useState(null)

    const { setMessage, setSeverity } = useContext(ToastContext)

    const navigate = useNavigate()
    const auth = useAuthUser()
    const signIn = useSignIn()
    const signOut = useSignOut()

    const register = (obj) => {
        userService.register(obj)
            .then(({ data }) => {
                setMessage(data.message)
                setSeverity('success')
                navigate('/login')
            })
            .catch(({ response }) => {
                setMessage(response.data.message)
                setSeverity('error')
            })
    }


    const verify = token => {
        userService.verify(token)
            .then(({ data }) => {
                setMessage(data.message)
                setSeverity('success')
            })
            .catch(({ response }) => {
                setMessage(response.data.message)
                setSeverity('error')
            })
    }

    const resend = obj => {
        userService.resend(obj)
            .then(({ data }) => {
                setMessage(data.message)
                setSeverity('success')
                navigate('/login')
            })
            .catch(({ response }) => {
                setMessage(response.data.message)
                setSeverity('error')
            })
    }


    const login = obj => {
        userService.login(obj)
            .then(({ data }) => {
                const token = Cookies.get('token')
                if (token) {
                    if (signIn(
                        {
                            token,
                            expiresIn: 1000 * 60 * 60 * 24 * 7,
                            tokenType: "Bearer",
                            authState: { email: data.user.email, username: data.user.username, id: data.user._id, image: data.user.image, career: data.user.career }
                        }
                    )) {
                        localStorage.setItem('token', token)
                        if (data.user.image) {
                            setUserImage(data.user.image.url)
                            window.localStorage.setItem('userImage', data.user.image.url)
                        }
                        if (data.user.career) {
                            setCareer(data.user.career)
                            window.localStorage.setItem('career', data.user.career)
                        }
                        if (data.user.groups) {
                            setGroups(data.user.groups)
                            window.localStorage.setItem('groups', JSON.stringify(data.user.groups))
                        }
                        
                        window.localStorage.setItem('message', data.message)
                        window.location.reload()
                    }
                }
            })
            .catch(({ response }) => {
                setMessage(response.data.message)
                setSeverity('error')
                if (response.data.message === 'Account not verified') {
                    navigate('/verify')
                }
            })
    }

    const logout = () => {
        userService.logout()
            .then(({ data }) => {
                signOut();
                window.localStorage.clear()
                setUserImage(null)
                setCareer(null)
                setMessage(data.message)
                setSeverity('success')
            })
            .catch(({ response }) => {
                setMessage(response.data.message)
                setSeverity('error')
            })
    }

    const updateUser = async (body) => {
        const id = auth().id
        userService.updateUser(id, body)
            .then(({ data }) => {
                const obj = data.image.url
                window.localStorage.setItem('userImage', obj)
                setUserImage(obj)
                setMessage(data.message)
                setSeverity('success')
            })
            .catch(({ response }) => {
                setMessage(response.data.message)
                setSeverity('error')
            })
    }

    return (
        <UserContext.Provider value={{
            login, register, resend, verify, logout, token, setToken, userImage, setUserImage, career, setCareer, groups, setGroups, updateUser
        }}>
            {children}
        </UserContext.Provider>
    )
}