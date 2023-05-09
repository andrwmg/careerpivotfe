import { Reply, ThumbUp, ThumbUpOutlined } from "@mui/icons-material";
import { Avatar, Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { ToastContext } from "../contexts/ToastContext";
import { GlobalContext } from "../contexts/GlobalContext";
import commentService from "../services/comment.service";
import AvatarDefault from "./AvatarDefault";
import Comments from "./Comments";

export default function Comment({ post, comment, comments, commentCount, setCommentCount, lastComment }) {

    const [replies, setReplies] = useState([])
    const [replyBody, setReplyBody] = useState('')
    const [replying, setReplying] = useState(false)
    const [replyCount, setReplyCount] = useState(0)
    const [timestamp, setTimestamp] = useState('')

    const { setMessage, setSeverity } = useContext(ToastContext)
    const { convertTime } = useContext(GlobalContext)

    const auth = useAuthUser()

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
            })
            .catch(() => {
                setReplyCount(newReplyCount - 1)
                setCommentCount(newCommentCount - 1)
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
                    setMessage(data.message)
                    setSeverity('success')
                })
                .catch(({ response }) => {
                    setMessage(response.data.message)
                    setSeverity('error')
                })
        }
    }

    const showForm = () => {
        setReplying(true)
    }

    const handleChange = (e) => {
        setReplyBody(e.target.value)
    }

    useEffect(() => {
        if (comment.replies.length !== 0) {
            setReplyCount(comment.replies.length)
        }
        const time = convertTime(comment.createdAt)
        setTimestamp(time)
    }, [])

    return (
        <Stack position='relative'>
            <Grid container item gap={2} alignItems='center'>
                {auth().image ?
                    <Avatar src={auth().image.url} />
                    : <AvatarDefault username={auth().username} />}
                <Typography variant='body2' fontWeight={500}>{`${comment.author.username}`}</Typography>
                <Typography variant='body2'>{timestamp}</Typography>
            </Grid>
            <Grid container item gap={2}>
                <Box sx={{ height: '100%', width: '40px', position: 'relative' }}>
                    {/* {!lastComment ? 
                    <Box sx={{ position: 'absolute', top: 0, bottom: 0, left: '50%', borderLeft: '1px solid black' }} />
                    : null} */}
                </Box>
                <Grid container item direction='column' xs>
                    <Grid container item bgcolor='rgba(62, 85, 205, .2)' width='fit-content' p={1} borderRadius={1}>
                        <Typography variant="body1">{comment.body}</Typography>
                    </Grid>
                    <Grid container item gap={2}>
                        {replying ?
                            <Stack direction='row' spacing={2}>
                                <TextField value={replyBody} onChange={handleChange} />
                                <Button onClick={reply}>Send</Button>
                            </Stack>
                            :
                            <IconButton onClick={showForm}>
                                <Reply />
                            </IconButton>
                        }
                        {replies.length ?
                            <Button onClick={showReplies}>{`Hide replies (${replyCount})`}</Button>
                            :
                            <Button onClick={showReplies}>{`Show replies (${replyCount})`}</Button>
                        }
                    </Grid>
                </Grid>
            </Grid>

            {replies.length ?
                <Grid container item>
                    {/* <Box sx={{ height: '100%', width: '40px', position: 'relative' }}>
                        <Box sx={{ position: 'absolute', top: 0, bottom: 0, left: '50%', borderLeft: '1px solid black' }} />
                        <Box sx={{ position: 'absolute', height: '20px', width: '20px', top: 0, left: '20px', right: 0, borderBottom: '.5px solid black', borderLeft: '.5px solid black', borderRadius: '0px 20px 0px 20px' }} />
                    </Box> */}
                    <Comments comments={replies} post={post} commentCount={commentCount} setCommentCount={setCommentCount} />
                </Grid>
                : null}
        </Stack>
    )
}