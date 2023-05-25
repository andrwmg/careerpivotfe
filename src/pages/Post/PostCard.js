import { CommentOutlined, Favorite, FavoriteBorderOutlined } from "@mui/icons-material";
import { Card, Grid, IconButton, Skeleton, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { ToastContext } from "../../contexts/ToastContext";
import { useAuthUser, useIsAuthenticated } from "react-auth-kit";
import postService from "../../services/post.service";
import { useLocation, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../contexts/GlobalContext";
import formatCount from "../../utils/formatCount";
import formatDate from "../../utils/formatDate";

export default function PostCard({ post, showComments, commentCount }) {

    const [date, setDate] = useState('')
    const [status, setStatus] = useState(null)
    const [likeCount, setLikeCount] = useState(0)

    const { setMessage, setSeverity } = useContext(ToastContext)
    const { likePost } = useContext(GlobalContext)

    const auth = useAuthUser()
    const isAuthenticated = useIsAuthenticated()
    const navigate = useNavigate()
    const location = useLocation()

    const deletePost = () => {
        const groupId = post.group && post.group._id
        postService.delete(post._id)
            .then(({ data }) => {
                setMessage(data.message)
                setSeverity('success')
                navigate(`/dashboard/groups/${groupId}`)
            })
            .catch(({ response }) => {
                console.log(response)
                setMessage(response.data.message)
                setSeverity('error')
            })
    }

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
        if (auth() && post.likes.map(l => l.user._id.toString()).includes(auth().id)) {
            setStatus('liked')
        } else {
            setStatus(null)
        }
    }

    useEffect(() => {
        if (post) {
            updateLikes()
        }
    }, [post])

    return (
        <Card sx={{ width: '100%', minHeight: '237px', bgcolor: 'rgba(232, 235, 255, 0)', color: 'black', p: 3, borderRadius: 2, border: '1px solid #E8EBFF', boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)', display: 'flex', flexDirection: 'column', alignItems: 'start', gap: 3, flexGrow: 1 }}>
            {/* <Grid container item direction='column' alignItems='start' xs={12} rowGap={3} height='fit-content' maxWidth='100%'> */}
            <Grid container item gap={1} width='100%'>
                <Grid container item direction='column' xs={12}>
                <Typography variant="h3" fontWeight={700} lineHeight='35px' textAlign='start'>
                    {post ? post.title : <Skeleton />}
                </Typography>
                </Grid>
                <Grid container item direction='column' xs={12}>

                <Typography variant='subtitle1' color='text.secondary' lineHeight='20px' textAlign='start'>
                    {post ?
                        <span>
                            {`${formatDate(post.createdAt)} by `}
                            <i>
                                {post.author.username}
                            </i>
                            {!location.pathname.includes('/group') && post.group ?
                            <>
                            {' in '}
                            <span style={{ fontWeight: 500 }}>
                                {`${!location.pathname.includes('/group') && post.group ? post.group.title : ""}`}
                            </span>
                            </> : null}
                        </span>
                        : <Skeleton />}
                </Typography>
                </Grid>
                <Grid container item direction='column' xs={12}>

                <Typography variant='body1' textAlign='start' lineHeight='30px' letterSpacing='-2%' minHeight='60px'>
                    {post ? post.body : <Skeleton />}
                </Typography>
                </Grid>
            </Grid>
            <Grid container item justifyContent='start' alignItems='center' gap={4} color='primary'>
                <Grid container item direction='column' xs='auto'>
                    <Grid container item alignItems='center'>
                        <IconButton onClick={like} size='small'>
                            {status === 'liked' ?
                                <Favorite color='primary' sx={{ fontSize: '22px' }} />
                                :
                                <FavoriteBorderOutlined color='primary' sx={{ fontSize: '22px' }} />
                            }
                        </IconButton>
                        <Typography variant='h4' color='black' minWidth='9px'>{post ? formatCount(likeCount) : <Skeleton />}</Typography>
                    </Grid>
                </Grid>
                <Grid container item direction='column' xs>
                    <Grid container item xs='auto' alignItems='center'>
                        <IconButton onClick={showComments} size='small'>
                            <CommentOutlined color="primary" sx={{ fontSize: '22px' }} />
                        </IconButton>
                        <Typography variant='h4' color='black' textAlign='start' minWidth='9px'>{post ? formatCount(commentCount) : <Skeleton />}</Typography>
                    </Grid>
                </Grid>

            </Grid>
        </Card>
    )
}