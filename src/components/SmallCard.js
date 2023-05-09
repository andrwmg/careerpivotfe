import styled from "@emotion/styled";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Button, Card, CardContent, Grid, IconButton, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useAuthUser, useIsAuthenticated } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../contexts/GlobalContext";
import { ToastContext } from "../contexts/ToastContext";

const EllipsisTypographyTwo = styled(Typography)(({ theme }) => ({
    display: '-webkit-box',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': 2,
    WebkitLineClamp: 2,
    lineClamp: 2,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
}));

export default function SmallCard({post}) {


    const [date, setDate] = useState('')
    const [status, setStatus] = useState(null)
    const [likeCount, setLikeCount] = useState(0)
    const [dislikeCount, setDislikeCount] = useState(0)
    const [comments, setComments] = useState([])
    const [commentBody, setCommentBody] = useState('')
    const [commentCount, setCommentCount] = useState(0)

    const auth = useAuthUser()
    const isAuthenticated = useIsAuthenticated()
    const navigate = useNavigate()
    const { likePost } = useContext(GlobalContext)
    const { setMessage, setSeverity } = useContext(ToastContext)

    const like = () => {
        if (isAuthenticated()) {
            let newValue = likeCount
            let newStatus
            if (status === 'liked') {
                newValue--
                newStatus = 'disliked'
            } else {
                newValue++
                newStatus = 'liked'
            }
            setStatus(newStatus)
            setLikeCount(newValue)
            const response = likePost(post._id)
            if (response === 'error') {
            if (newStatus === 'liked') {
                setStatus('disliked')
                console.log(newValue)
                newValue--
                setLikeCount(newValue)
            } else {
                setStatus('liked')
                console.log(newValue)
                newValue++
                setLikeCount(newValue)
            }
        }
        } else {
            setMessage("You must be logged in to like post")
            setSeverity('error')
        }
    }

    const updateLikes = () => {
        if (post.likes.length !== 0) {
            setLikeCount(post.likes.length)
        }
        if (post.dislikes.length !== 0) {
            setDislikeCount(post.dislikes.length)
        }
        if (auth() && post.likes.map(l => l.userId).includes(auth().id)) {
            setStatus('liked')
        } else if (auth() && post.dislikes.map(d => d.userId).includes(auth().id)) {
            setStatus('disliked')
        } else {
            setStatus(null)
        }
    }

    const trimLikes = () => {
        if (likeCount < 1000) {
            return `${likeCount}`
        } else if (likeCount < 1000000) {
            return `${likeCount / 1000}K`
        } else if (likeCount < 1000000000) {
            return `${likeCount / 1000000}M`
        }
    }

    const handleClick = () => {
        navigate(`/dashboard/posts/${post._id}`)
    }

    useEffect(() => {
        updateLikes()
    }, [])

    return (
        <Button onClick={handleClick} sx={{ minWidth: '131px', height: '93px', bgcolor: 'primary.main', color: 'primary', p: 1.5, borderRadius: 2, '&:hover': {bgcolor: 'primary.hover'} }}>
            <Grid container item direction='column' justifyContent='space-between' height='100%' >
                <Grid container item>
                <EllipsisTypographyTwo variant="p" noWrap color='white'>
                    {post.title}
                    </EllipsisTypographyTwo>
                </Grid>
                <Grid container item alignItems='center' gap={1} width='100%'>
                    {/* <IconButton sx={{p: 0}} onClick={like}>
                        {status !== 'liked' ?
                        <FavoriteBorder  sx={{fontSize: '18px', color: 'white'}}/>
                        : */}
                        <Favorite sx={{fontSize: '18px', color: 'white'}}/>
                        {/* }
                    </IconButton> */}
                    <Typography variant='body1' color='white' fontWeight={500}>{trimLikes()}</Typography>
                </Grid>
            </Grid>
            </Button>
    )
}