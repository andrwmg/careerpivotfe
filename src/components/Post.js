import { Delete, Favorite, FavoriteBorder, ThumbDown, ThumbDownOutlined, ThumbsUpDown, ThumbUp, ThumbUpOutlined } from "@mui/icons-material";
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import { useAuthUser, useIsAuthenticated } from "react-auth-kit";
import { ToastContext } from "../contexts/ToastContext";
import { UserContext } from "../contexts/UserContext";
import commentService from "../services/comment.service";
import postService from "../services/post.service";
import Comment from "./Comment";
import Comments from "./Comments";

export default function Post({ posts, post, getPosts, deletePost }) {

    const [status, setStatus] = useState(null)
    const [likeCount, setLikeCount] = useState(0)
    const [dislikeCount, setDislikeCount] = useState(0)
    const [comments, setComments] = useState([])
    const [commentBody, setCommentBody] = useState('')
    const [commentCount, setCommentCount] = useState(0)

    const { setMessage, setSeverity } = useContext(ToastContext)

    const auth = useAuthUser()
    const isAuthenticated = useIsAuthenticated()

    const likePost = () => {
        if (isAuthenticated()) {
            const previous = { status, likeCount, dislikeCount }
            setStatus('liked')
            if (previous.status === 'disliked') {
                setDislikeCount(dislikeCount - 1)
            }
            setLikeCount(likeCount + 1)
            postService.like(post._id, auth().id)
                .then(({ data }) => {
                    setMessage(data.message)
                    setSeverity('success')
                    console.log("Post liked!", data)
                })
                .catch(({response}) => {
                    if (previous.status === 'disliked') {
                        setStatus('disliked')
                        setDislikeCount(status.dislikeCount)
                    }
                    setLikeCount(status.likeCount)
                    setMessage(response.data.message)
                    setSeverity('error')
                    console.log('oops!')
                })
        } else {
            setMessage("You must be logged in to like post")
            setSeverity('error')
        }
    }

    const dislikePost = () => {
        if (isAuthenticated()) {

            const previous = { status, likeCount, dislikeCount }
            setStatus('disliked')
            if (previous.status === 'liked') {
                setLikeCount(likeCount - 1)
            }
            setDislikeCount(dislikeCount + 1)
            postService.dislike(post._id, auth().id)
                .then(({ data }) => {
                    setMessage(data.message)
            setSeverity('success')
                })
                .catch(({response}) => {
                    if (previous.liked) {
                        setStatus('liked')
                        setLikeCount(previous.likeCount)
                    }
                    setDislikeCount(previous.dislikeCount)
                    setMessage(response.data.message)
                    setSeverity('error')
                    console.log('oops!')
                })
        } else {
            setMessage("You must be logged in to dislike posts")
            setSeverity('error')
        }
    }

    const handleDelete = () => {
        deletePost(post._id)
    }

    const submitComment = (event) => {
        event.preventDefault()
        if (isAuthenticated()) {

            const newValue = commentCount + 1
            setCommentCount(newValue)
            const obj = { postId: post._id, userId: auth().id, body: commentBody }
            commentService.create(obj)
                .then(({data}) => {
                    if (commentCount) {
                        showComments()
                    }
                    setCommentBody('')
                    setMessage(data.message)
                    setSeverity('success')
                })
                .catch(({response}) => {
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
                .catch(({response}) => {
                    setMessage(response.data.message)
                    setSeverity('error')
                })
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

    useEffect(() => {
        updateLikes()
        setCommentCount(post.commentCount)
    }, [])

    useEffect(() => {
        updateLikes()
    }, [posts])

    return (
        <Grid container item gap={2}>
            <Stack>
                <Typography key={post._id} variant='h4'>{post.title}</Typography>
                <Typography variant='body1'>{post.body}</Typography>
            </Stack>
            <Grid container item gap={2}>
                {status !== 'liked' ?
                    <IconButton onClick={likePost}>
                        <ThumbUpOutlined />
                    </IconButton>
                    :
                    <IconButton>
                        <ThumbUp />
                    </IconButton>}
                <Typography variant="body1">{likeCount}</Typography>
                {status !== 'disliked' ?
                    <IconButton onClick={dislikePost}>
                        <ThumbDownOutlined />
                    </IconButton>
                    :
                    <IconButton>
                        <ThumbDown />
                    </IconButton>}
                <Typography variant="body1">{dislikeCount}</Typography>
                {isAuthenticated() && auth().id === post.author._id ?
                    <IconButton onClick={handleDelete}>
                        <Delete />
                    </IconButton>
                    : null}
            </Grid>

            <Grid container item>
                <form onSubmit={submitComment}>
                    <TextField value={commentBody} required onChange={(e) => setCommentBody(e.target.value)} />
                    <Button type='submit'>Comment</Button>
                    <Button onClick={showComments}>{`Show Comments (${commentCount})`}</Button>
                </form>
            </Grid>
            <Comments comments={comments} commentCount={commentCount} setCommentCount={setCommentCount} post={post} initial={true} />
            {/* <Stack>
            {comments.map(comment => (
                <Comment comment={comment}/>
            ))}
        </Stack> */}

        </Grid>
    )
}