import { Grid } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useAuthUser, useIsAuthenticated } from "react-auth-kit";
import { useParams } from "react-router-dom";
import { ToastContext } from "../../contexts/ToastContext";
import { UserContext } from "../../contexts/UserContext";
import commentService from "../../services/comment.service";
import postService from "../../services/post.service";
import CommentNew from "./CommentNew";
import Comments from "./Comments";
import PostCard from "./PostCard";
import PostSidebar from "./PostSidebar";
// import io from 'socket.io-client'

// const socket = io('http://localhost:7070')

export default function PostPage() {

    const [post, setPost] = useState(null)
    const [comments, setComments] = useState([])
    const [commentCount, setCommentCount] = useState(0)
    const { setMessage, setSeverity } = useContext(ToastContext)
    const { expiredLogout } = useContext(UserContext)


    const containerRef = useRef(null)
    const commentCountRef = useRef(0)

    const { postId } = useParams()
    let currentCount = 0

    const auth = useAuthUser()
    const isAuthenticated = useIsAuthenticated()

    const containerElement = containerRef.current

    const getPost = () => {
        postService.get(postId)
            .then(({ data }) => {
                setPost(data)
                setComments(data.comments)
            })
            .catch(({ response }) => {
                setMessage(response.data.message)
                setSeverity('error')
            })
    }

    const showComments = () => {
        if (commentCount !== 0 && comments.length === 0) {
            commentService.getComments(post._id)
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

    const getMoreComments = (current, count) => {
        if (current < count) {
        commentService.getComments(postId, {skip: comments.length, limit: 10})
        .then(({data}) => {
            console.log(data)
            const newComments = [...comments, ...data]
            setComments(newComments)
            commentCountRef.current += data.length
        })
    }
    }

    const submitComment = (commentBody) => {
        if (isAuthenticated()) {

            const newValue = commentCount + 1
            setCommentCount(newValue)
            const data = { body: commentBody }
            commentService.create(post._id, data)
                .then(({ data }) => {
                    console.log(data.data)
                    const newComments = [data.data, ...comments]
                    setComments(newComments)
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
        const containerElement = containerRef.current
        currentCount = comments.length
        commentCountRef.current = comments.length

        const handleScroll = () => {
            const { scrollTop, clientHeight, scrollHeight } = containerElement;

            // Check if the user has scrolled to the bottom
            if (scrollTop + clientHeight >= scrollHeight) {
                // console.log("Woo!")
                getMoreComments(currentCount, post.commentCount)
            }
        };

        // Add event listener for the 'scroll' event
        containerElement.addEventListener('scroll', handleScroll);

        // Clean up the event listener when the component unmounts
        return () => {
            containerElement.removeEventListener('scroll', handleScroll);
        };
    }, [comments])

    useEffect(() => {
        setCommentCount(post && post.commentCount)

    }, [post])

    useEffect(() => {
        getPost()

        // socket.on('new comment', (comment) => {
        //     console.log(comment, comment.parentPost, comment.author._id)
        //     if (comment.parentPost === post._id && comment.author._id !== auth().id) {
        //         console.log("Got it!")
        //         setComments([comment, ...comments])
        //         const newValue = commentCount + 1
        //         setCommentCount(newValue)
        //     // setMessage(comment.body)
        //     // setSeverity('info')
        //     }
        //   });
    }, [])

    return (
        <Grid container item height='calc(100vh - 122px)'>
            <Grid container item direction='column' py={4} xs gap={2.5} pl={{ xs: 3, md: 6 }} pr={{ xs: 3, md: 1.25 }} overflow='scroll' wrap='nowrap' maxHeight='100%' ref={containerRef}>
                <Grid item>
                    <PostCard post={post} showComments={getMoreComments} commentCount={commentCount} />
                </Grid>
                <Grid item>
                    <CommentNew post={post} submitComment={submitComment} />
                </Grid>
                <Grid item>
                    <Comments ref={commentCountRef} comments={comments} commentCount={commentCount} setCommentCount={setCommentCount} post={post} initial={true} />
                </Grid>
            </Grid>
            <Grid container item height='100%' xs={4} py={4} pr={{ xs: 3, lg: 6 }} pl={1.25} display={{ xs: 'none', lg: 'flex' }}>
                <PostSidebar post={post} />
            </Grid>
        </Grid>
    )
}