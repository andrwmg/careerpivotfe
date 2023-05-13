import { Comment, CommentOutlined, Favorite, FavoriteBorder, FavoriteBorderOutlined, FavoriteOutlined, Visibility } from "@mui/icons-material";
import { Button, Grid, IconButton, TextField, Toolbar, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useAuthUser, useIsAuthenticated } from "react-auth-kit";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../contexts/GlobalContext";
import { ToastContext } from "../contexts/ToastContext";
import commentService from "../services/comment.service";
import postService from "../services/post.service";
import Comments from "./Comments";
import Post from "./Post";

export default function PostPage() {

    const [post, setPost] = useState(null)
    const [timestamp, setTimestamp] = useState(null)
    const [status, setStatus] = useState(null)
    const [likeCount, setLikeCount] = useState(0)
    const [comments, setComments] = useState([])
    const [commentCount, setCommentCount] = useState(0)
    const [newPost, setNewPost] = useState({ title: '', body: '', career: '' })
    const { setMessage, setSeverity } = useContext(ToastContext)
    const { likePost, convertTime } = useContext(GlobalContext)

    const { postId } = useParams()

    const auth = useAuthUser()
    const isAuthenticated = useIsAuthenticated()
    const navigate = useNavigate()

    const getPost = () => {
        postService.get(postId)
            .then(({ data }) => {
                console.log('Get posts data: ', data)
                setPost(data)
            })
            .catch(({ response }) => {
                setMessage(response.data.message)
                setSeverity('error')
            })
    }

    const deletePost = () => {
        const groupId = post.group && post.group._id
        postService.delete(postId)
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
        // if (post.dislikes.length !== 0) {
        //     setDislikeCount(post.dislikes.length)
        // }
        console.log(post)
        if (auth() && post.likes.map(l => l.user._id.toString()).includes(auth().id)) {
            setStatus('liked')
            // } else if (auth() && post.dislikes.map(d => d.userId).includes(auth().id)) {
            //     setStatus('disliked')
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

    const handleClick = () => {
        navigate(`/dashboard/posts/${post._id}`)
    }

    useEffect(() => {
        if (post) {
            console.log(post)
            updateLikes()
            setCommentCount(post.commentCount)
            const date = convertTime(post.createdAt)
            setTimestamp(date)
        }
    }, [post])

    useEffect(() => {
        getPost()
    }, [])

    return (
        <Grid container item mt={4} px={{ xs: 3, md: 6 }} flexGrow={1}>
            {post ?
                <Grid container item direction='column' xs={12} gap={2}>
                    <Typography variant='h3'>{post.title}</Typography>
                    <Typography variant='subtitle1' color='text.secondary' lineHeight='20px' textAlign='start'>
                        {`${timestamp} by ${post.author.username}`}
                        {/* {post.group ?
                        <Link to={`/dashboard/group/${post.group && post.group._id}`} style={{ fontWeight: 500, textDecoration: 'none', color: 'inherit' }}>                        
                        {`${post.group.title}`}
                        </Link> : null} */}
                    </Typography>
                    <Typography variant='body1'>{post.body}</Typography>

                    <Grid container item gap={4}>
                        <Grid container item gap={1} xs='auto'>

                            <IconButton sx={{ p: 0 }} onClick={like}>
                                {status !== 'liked' ?
                                    <FavoriteBorder color='primary' sx={{ fontSize: '22px' }} />
                                    :
                                    <Favorite color='primary' sx={{ fontSize: '22px' }} />
                                }
                            </IconButton>

                            <Typography variant='body1' color='primary' fontWeight={700}>{trimLikes()}</Typography>
                        </Grid>
                        <Grid container item gap={1} xs='auto'>
                            <IconButton sx={{ p: 0 }} color='primary' onClick={showComments}>
                                <Comment color="primary" sx={{ fontSize: '22px' }} />
                            </IconButton>
                            <Typography variant='body1' color='primary' fontWeight={700}>{commentCount}</Typography>
                        </Grid>
                        {/* <Grid container item gap={1} xs='auto'>
                            <IconButton sx={{ p: 0 }} color='primary' onClick={showComments}>
                                <Visibility color="primary" sx={{ fontSize: '22px' }} />
                            </IconButton>
                            <Typography variant='body1' color='primary' fontWeight={700}>{post.views.length}</Typography>
                        </Grid> */}
                    </Grid>
                    <Grid container item gap={2}>
                        <Comments comments={comments} commentCount={commentCount} setCommentCount={setCommentCount} post={post} initial={true} />
                    </Grid>
                </Grid> : null}
        </Grid>
    )
}