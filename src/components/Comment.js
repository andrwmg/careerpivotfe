import { CommentOutlined, Delete, Edit, Favorite, FavoriteBorderOutlined, Reply } from "@mui/icons-material";
import { Button, Card, Chip, Grid, IconButton, OutlinedInput, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import { useAuthUser, useIsAuthenticated } from "react-auth-kit";
import { ToastContext } from "../contexts/ToastContext";
import { GlobalContext } from "../contexts/GlobalContext";
import commentService from "../services/comment.service";
import AvatarDefault from "./AvatarDefault";
import Comments from "./Comments";
import styled from "@emotion/styled";

const ReplyInput = styled(OutlinedInput)(({ theme }) => ({
    borderRadius: '9.5px',
    color: '#596FFF',
    fontSize: '16px',
    fontWeight: 600,
    paddingLeft: 3,
    "& input::placeholder": {
        color: '#596FFF',
        fontWeight: 500
    },
    "& .MuiOutlinedInput-notchedOutline, :hover .MuiOutlinedInput-notchedOutline": {
        borderColor: '#596FFF',
    },
    "& :hover .Mui-focused, .Mui-focused": {
        border: '2px solid #596FFF'
    },
}))

export default function Comment({ post, comment, commentCount, setCommentCount }) {

    const { setMessage, setSeverity } = useContext(ToastContext)
    const { convertTime, likeComment } = useContext(GlobalContext)

    const [editing, setEditing] = useState(false)
    const [body, setBody] = useState(comment.body)
    const [newBody, setNewBody] = useState(null)
    const [status, setStatus] = useState(null)
    const [likeCount, setLikeCount] = useState(0)
    const [replies, setReplies] = useState([])
    const [replyBody, setReplyBody] = useState('')
    const [replying, setReplying] = useState(false)
    const [replyCount, setReplyCount] = useState(0)
    const [timestamp, setTimestamp] = useState('')
    const [deleting, setDeleting] = useState(false)

    const auth = useAuthUser()
    const isAuthenticated = useIsAuthenticated()

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
            const response = likeComment(post._id, comment._id)
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
            setMessage("You must be logged in to like comment")
            setSeverity('error')
        }
    }


    const reply = (event) => {
        event.preventDefault()

        const newCommentCount = commentCount + 1
        const newReplyCount = replyCount + 1
        setReplyCount(newReplyCount)
        setCommentCount(newCommentCount)
        const obj = { commentId: comment._id, postId: post._id, body: replyBody }
        commentService.reply(obj)
            .then(({ data }) => {
                setMessage(data.message)
                setSeverity('success')
                console.log(data)
                const newReplies = [data.data, ...replies]
                setReplies(newReplies)
            })
            .catch(() => {
                setReplyCount(newReplyCount - 1)
                setCommentCount(newCommentCount - 1)
            })
    }

    const updateComment = () => {
        console.log("Update comment")
        commentService.update(post._id, comment._id, { body })
            .then(({ data }) => {
                setMessage(data.message)
                setSeverity('success')
                setNewBody(data.data.body)
                setBody(data.data.body)
                setEditing(false)
            })
            .catch(({ response }) => {
                setMessage(response.data.message)
                setSeverity('error')
            })
    }

    const showReplies = () => {
        if (replies.length) {
            setReplies([])
        } else if (replyCount !== 0) {
            commentService.get({ commentId: comment._id, postId: post._id })
                .then(({ data }) => {
                    console.log(data)
                    setReplies(data.replies)
                    // setMessage(data.message)
                    // setSeverity('success')
                })
                .catch(({ response }) => {
                    setMessage(response.data.message)
                    setSeverity('error')
                })
        }
    }

    const deleteComment = () => {
        commentService.update(post._id, comment._id, {body: 'This comment was deleted by author'})
        .then(({data}) => {
            setMessage(data.message)
            setSeverity('success')
            setNewBody(data.data.body)
            setDeleting(false)
        })
        .catch(({ response }) => {
            setMessage(response.data.message)
            setSeverity('error')
        })
    }

    const toggleReplying = () => {
        if (isAuthenticated()) {
            setReplying(!replying)
        } else {
            setMessage('Must be signed in to reply')
            setSeverity('error')
        }
    }

    const toggleEditing = () => {
        setEditing(!editing)
    }

    const handleDeleteClick = () => {
        setDeleting(true)
    }

    const handleDelete = () => {
        console.log('Delete confirmation')
    }

    const handleBody = (e) => {
        setBody(e.target.value)
    }

    const handleChange = (e) => {
        setReplyBody(e.target.value)
    }

    const updateLikes = () => {
        if (comment.likes.length !== 0) {
            setLikeCount(comment.likes.length)
        }
        if (auth() && comment.likes.map(c => c.user).includes(auth().id)) {
            setStatus('liked')
        } else {
            setStatus(null)
        }
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

    useEffect(() => {
        setReplyCount(comment.replyCount)
        updateLikes()
        const time = convertTime(comment.createdAt)
        setTimestamp(time)
    }, [])

    return (
        <Grid container item gap={2.5} width='100%'>
            <Card sx={{ width: '100%', flexGrow: 1, bgcolor: 'rgba(232, 235, 255, 0)', color: 'black', p: 3, borderRadius: 2, border: '1px solid #E8EBFF', boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)', flexDirection: 'row', display: 'flex', gap: 3 }}>
                <Grid container item direction='column' xs='auto' alignItems='center'>
                    <IconButton onClick={like}>
                        {status !== 'liked' ?
                            <FavoriteBorderOutlined color='primary' sx={{ fontSize: '22px' }} />
                            :
                            <Favorite color='primary' sx={{ fontSize: '22px' }} />
                        }
                    </IconButton>
                    <Typography variant='h5'>
                        {trimCount(likeCount)}
                    </Typography>
                    <IconButton onClick={showReplies}>
                        <CommentOutlined color='primary' sx={{ fontSize: '22px' }} />
                    </IconButton>
                    <Typography variant='h5'>
                        {trimCount(replyCount)}
                    </Typography>
                </Grid>
                <Grid container item direction='column' xs gap={2}>
                    <Grid container item gap={2} alignItems='center' justifyContent='space-between' width='100%'>
                        <Stack direction='row' alignItems='center' spacing={2}>
                            <AvatarDefault username={comment.author.username} size='32px' />
                            <Typography variant='h4' fontWeight={500}>
                                {`${comment.author.username}`}
                            </Typography>
                            {isAuthenticated() && auth().id === comment.author._id ?
                                <Chip variant='filled' label='you' color='primary' sx={{ borderRadius: 1, fontSize: '13px', maxHeight: '19px', px: 0, fontWeight: 600 }} /> : null}
                            <Typography variant='subtitle1'>{timestamp}</Typography>
                        </Stack>
                        <Stack direction='row' alignItems='center' spacing={2}>
                            {auth() && auth().id === comment.author._id ?
                                <>
                                    <Button onClick={deleteComment}>
                                        <Stack direction='row' spacing={1} alignItems='center'>
                                            <Delete color='error' sx={{ fontSize: '16px' }} />
                                            <Typography variant='body2' fontWeight={600} color='error'>
                                                Delete
                                            </Typography>
                                        </Stack>
                                    </Button>
                                    <Button onClick={toggleEditing}>
                                        <Stack direction='row' spacing={1} alignItems='center'>
                                            <Edit color='primary' sx={{ fontSize: '16px' }} />
                                            <Typography variant='body2' fontWeight={600} color='primary'>
                                                Edit
                                            </Typography>
                                        </Stack>
                                    </Button>
                                </> : null}
                            <Button onClick={toggleReplying}>
                                <Stack direction='row' spacing={1} alignItems='center'>
                                    <Reply color='primary' sx={{ fontSize: '16px' }} />
                                    <Typography variant='body2' fontWeight={600} color='primary'>
                                        Reply
                                    </Typography>
                                </Stack>
                            </Button>
                        </Stack>
                    </Grid>
                    <Grid container item gap={2}>
                        {editing ?
                            <Grid container item gap={2}>
                                <Grid item container xs direction='column'>
                                    <OutlinedInput value={body} onChange={handleBody} multiline sx={{ fontSize: '14px' }} />
                                </Grid>
                                <Grid item container xs='auto' direction='column'>
                                    <Button onClick={updateComment}>Update</Button>
                                </Grid>
                            </Grid>
                            :
                            <Typography variant="body2">{newBody || comment.body}</Typography>
                        }
                        {replying ?
                            <Grid container item justifyContent='center' alignItems='center' xs={12} maxHeight='51px' maxWidth='100%'>
                                <Stack direction='row' alignItems='center' gap={2} width='100%' maxHeight='51px'>
                                    {/* <AvatarDefault size='51px' username={auth().username} /> */}
                                    <ReplyInput value={replyBody} onChange={handleChange} placeholder='What do you think?' sx={{ flexGrow: 1, maxHeight: '51px' }} />

                                    <Button variant="contained" onClick={reply} sx={{ px: 3, height: '51px' }}>Reply</Button>
                                </Stack>
                            </Grid>
                            : null}
                    </Grid>
                </Grid>
            </Card>
            {replies.length ?
                <Comments comments={replies} post={post} commentCount={commentCount} setCommentCount={setCommentCount} />
                : null}
        </Grid>
    )
}