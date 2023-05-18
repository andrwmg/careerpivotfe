import {Grid } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useAuthUser, useIsAuthenticated } from "react-auth-kit";
import { useParams } from "react-router-dom";
import { ToastContext } from "../contexts/ToastContext";
import { UserContext } from "../contexts/UserContext";
import commentService from "../services/comment.service";
import postService from "../services/post.service";
import CommentNew from "./CommentNew";
import Comments from "./Comments";
import PostCard from "./PostCard";
import PostSidebar from "./PostSidebar";

export default function PostPage() {

    const [post, setPost] = useState(null)
    const [comments, setComments] = useState([])
    const [commentCount, setCommentCount] = useState(0)
    const { setMessage, setSeverity } = useContext(ToastContext)
    const { expiredLogout } = useContext(UserContext)

    const { postId } = useParams()

    const auth = useAuthUser()
    const isAuthenticated = useIsAuthenticated()

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

    const showComments = () => {
        if (commentCount !== 0 && comments.length === 0) {
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

    const submitComment = (commentBody) => {
        if (isAuthenticated()) {

            const newValue = commentCount + 1
            setCommentCount(newValue)
            const obj = { postId: post._id, userId: auth().id, body: commentBody }
            commentService.create(obj)
                .then(({ data }) => {
                    if (commentCount) {
                        showComments()
                    }
                    setMessage(data.message)
                    setSeverity('success')
                })
                .catch(({ response }) => {
                    setCommentCount(newValue - 1)
                    setMessage(response.data.message)
                    setSeverity('error')
                    expiredLogout(response)
                    return response
                })
        } else {
            setMessage("You must be logged in to comment")
            setSeverity('error')
        }
    }

    useEffect(() => {
        setCommentCount(post && post.commentCount)
    }, [post])

    useEffect(() => {
        getPost()
    }, [])

    return (
        <Grid container item height='calc(100vh - 122px)'>
                <Grid container item direction='column' py={4} xs gap={2.5} pl={{ xs: 3, md: 6 }} pr={1.25} overflow='scroll' wrap='nowrap' maxHeight='100%'>
                    <Grid item>
                        <PostCard post={post} showComments={showComments} commentCount={commentCount} />
                    </Grid>
                    <Grid item>
                        <CommentNew post={post} submitComment={submitComment} />
                    </Grid>
                    <Grid item>
                        <Comments comments={comments} commentCount={commentCount} setCommentCount={setCommentCount} post={post} initial={true} />
                    </Grid>
                </Grid>
            <Grid container item height='100%' xs={4} py={4} pr={{ xs: 3, lg: 6 }} pl={1.25} display={{xs: 'none', lg: 'flex'}}>
                <PostSidebar post={post} />
            </Grid>
        </Grid>
    )
}