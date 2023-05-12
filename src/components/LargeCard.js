import styled from "@emotion/styled";
import { Comment, CommentOutlined, Favorite, FavoriteBorder } from "@mui/icons-material";
import { Button, Card, CardContent, Grid, IconButton, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import moment from 'moment'
import { ToastContext } from "../contexts/ToastContext";
import { useAuthUser, useIsAuthenticated } from "react-auth-kit";
import postService from "../services/post.service";
import commentService from "../services/comment.service";
import { Stack } from "@mui/system";
import { useLocation, useNavigate } from "react-router-dom";

const EllipsisTypographyOne = styled(Typography)(({ theme }) => ({
    display: '-webkit-box',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': 1,
    WebkitLineClamp: 1,
    lineClamp: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
}));

const EllipsisTypographyThree = styled(Typography)(({ theme }) => ({
    display: '-webkit-box',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': 3,
    WebkitLineClamp: 3,
    lineClamp: 3,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
}));

export default function LargeCard({ post, posts }) {

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
    const location = useLocation()

    const { setMessage, setSeverity } = useContext(ToastContext)

    const likePost = () => {
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
            postService.like(post._id, auth().id)
                .then(({ data }) => {
                    setMessage(data.message)
                    setSeverity('success')
                    console.log("Post liked!", data)
                })
                .catch(({ response }) => {
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
                    setMessage(response.data.message)
                    setSeverity('error')
                    console.log('oops!')
                })
        } else {
            setMessage("You must be logged in to like post")
            setSeverity('error')
        }
    }

    const unlike = () => {
        const value = likeCount + 1
        setStatus('disliked')
        setLikeCount(value)
        postService.like(post._id, auth().id)
            .then(({ data }) => {
                setMessage(data.message)
                setSeverity('success')
                console.log("Post unliked!", data)
            })
            .catch(({ response }) => {
                setStatus('disliked')
                setLikeCount(value - 1)
                setMessage(response.data.message)
                setSeverity('error')
                console.log('oops!')
            })
    }

    const submitComment = () => {
        if (isAuthenticated()) {

            const newValue = commentCount + 1
            setCommentCount(newValue)
            const obj = { postId: post._id, userId: auth().id, body: commentBody }
            commentService.create(obj)
                .then(({ data }) => {
                    if (commentCount) {
                        showComments()
                    }
                    setCommentBody('')
                    setMessage(data.message)
                    setSeverity('success')
                })
                .catch(({ response }) => {
                    setCommentCount(newValue - 1)
                    setMessage(response.data.message)
                    setSeverity('error')
                })
        } else {
            setMessage("You must be logged in to comment")
            setSeverity('error')
        }
    }

    const showComments = () => {
        if (commentCount !== 0) {
            commentService.getAll(post._id)
                .then(({ data }) => {
                    console.log(data)
                    setComments(data.comments)
                })
                .catch(({ response }) => {
                    setMessage(response.data.message)
                    setSeverity('error')
                })
        }
    }

    const updateLikes = () => {
        if (post.likes.length !== 0) {
            setLikeCount(post.likes.length)
        }
        // if (post.dislikes.length !== 0) {
        //     setDislikeCount(post.dislikes.length)
        // }
        if (auth() && post.likes.map(l => l.user._id).includes(auth().id)) {
            setStatus('liked')
            // } else if (auth() && post.dislikes.map(d => d.userId).includes(auth().id)) {
            //     setStatus('disliked')
        } else {
            setStatus(null)
        }
    }

    const handleClick = () => {
        navigate(`/dashboard/posts/${post._id}`)
    }

    useEffect(() => {

        updateLikes()
        setCommentCount(post.commentCount)

        const diffInMillis = moment().diff(moment(post.createdAt))

        if (diffInMillis < 60000) {
            const diffInSeconds = Math.floor(moment.duration(diffInMillis).asSeconds())
            setDate(`${diffInSeconds} hour${diffInSeconds > 1 ? 's' : ''} ago`)
            return
        } else if (diffInMillis < 3600000) {
            const diffInMinutes = Math.floor(moment.duration(diffInMillis).asMinutes())
            setDate(`${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`)
            return
        } else if (diffInMillis < 86400000) {
            const diffInHours = Math.floor(moment.duration(diffInMillis).asHours())
            setDate(`${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`)
            return
        } else {
            const diffInDays = Math.floor(moment.duration(diffInMillis).asDays())
            if (diffInDays > 30) {
                setDate('30+ days ago')
            } else {
                setDate(`${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`)
            }
        }
    }, [])

    useEffect(() => {
        updateLikes()
    }, [posts])

    return (
        <Button onClick={handleClick} variant="contained" sx={{ width: '100%', bgcolor: 'rgba(232, 235, 255, 1)', color: 'black', p: 3, borderRadius: 2, '&:hover': { bgcolor: 'rgba(232, 235, 255, .6)', boxShadow: 'none' }, boxShadow: 'none', flexGrow: 1 }}>
            {post &&
                <Grid container item direction='column' alignItems='start' xs={12} rowGap={3} height='fit-content' maxWidth='100%'>
                    <Stack spacing={1} maxWidth='100%'>
                        <EllipsisTypographyOne variant="h3" fontWeight={700} noWrap lineHeight='35px' textAlign='start'>{post.title}</EllipsisTypographyOne>
                        <EllipsisTypographyOne variant='subtitle1' color='text.secondary' lineHeight='20px' textAlign='start'>
                            {`${date} by ${post.author.username} ${!location.pathname.includes('/community') && post.community ? 'in ' : ''}`}
                            <span style={{ fontWeight: 500 }}>
                                {`${!location.pathname.includes('/community') && post.community ? post.community.title : ""}`}
                            </span>
                        </EllipsisTypographyOne>
                        <EllipsisTypographyThree variant='body1' textAlign='start' lineHeight='30px' letterSpacing='-2%' minHeight='90px'>
                            {`${post.body}`}
                        </EllipsisTypographyThree>
                    </Stack>
                    <Grid container item justifyContent='start' alignItems='start' gap={4.5} color='primary'>
                        <Grid container item direction='column' xs='auto'>
                            <Grid container item alignItems='center' gap={1}>
                                <Favorite color='primary' sx={{ fontSize: '22px' }} />
                                <Typography variant='body1' color='primary' fontWeight={700}>{likeCount}</Typography>
                            </Grid>
                        </Grid>
                        <Grid container item direction='column' xs>
                            <Grid container item gap={1} xs='auto' alignItems='center'>
                                <Comment color="primary" sx={{ fontSize: '22px' }} />
                                <Typography variant='body1' color='primary' fontWeight={700} textAlign='start'>{commentCount}</Typography>
                            </Grid>
                        </Grid>

                    </Grid>

                </Grid>
            }
        </Button>
    )
}