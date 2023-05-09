import { Favorite, FavoriteBorder, FavoriteBorderOutlined, FavoriteOutlined } from "@mui/icons-material";
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { ToastContext } from "../contexts/ToastContext";
import postService from "../services/post.service";
import Post from "./Post";

export default function Posts() {

    const [posts, setPosts] = useState([])
    const [newPost, setNewPost] = useState({ title: '', body: '', career: '' })
    const { setMessage, setSeverity } = useContext(ToastContext)

    const auth = useAuthUser()

    const getPosts = () => {
        postService.getAll()
            .then(({ data }) => {
                console.log('Get posts data: ', data)
                setPosts(data)
            })
            .catch(({ response }) => {
                setMessage(response.data.message)
                setSeverity('error')
            })
    }

    const createPost = (e) => {
        e.preventDefault()
        const obj = { ...newPost, author: auth().id }
        postService.create(obj)
            .then(({ data }) => {
                const newPosts = [data.data, ...posts]
                setPosts(newPosts)
                setNewPost({ title: '', body: '', career: '' })
                setMessage(data.message)
                setSeverity('success')
            })
            .catch(({ response }) => {
                setMessage(response.data.message)
                setSeverity('error')
            })
    }

    const deletePost = (postId) => {
        postService.delete(postId)
            .then(({ data }) => {
                const newPosts = posts.filter(post => post._id !== postId)
                setPosts(newPosts)
                setMessage(data.message)
                setSeverity('success')
                console.log(data)
            })
            .catch(({ response }) => {
                console.log(response)
                setMessage(response.data.message)
                setSeverity('error')
            })
    }

    useEffect(() => {
        getPosts()
    }, [])

    return (
        <Grid container item>
            <Grid container item direction='column' xs={12} gap={4}>
                <Typography variant='h3'>Posts</Typography>
                <Grid container item gap={2}>
                    <form onSubmit={createPost}>
                        <TextField label='Title' required value={newPost.title} onChange={((e) => setNewPost({ ...newPost, title: e.target.value }))} />
                        <TextField label='Body' required value={newPost.body} onChange={((e) => setNewPost({ ...newPost, body: e.target.value }))} />
                        <TextField label='Career' required value={newPost.career} onChange={((e) => setNewPost({ ...newPost, career: e.target.value }))} />
                        <Button type='submit'>Create Post</Button>
                    </form>
                </Grid>
                {posts && posts.map(post => (
                    <Post post={post} posts={posts} getPosts={getPosts} deletePost={deletePost} />
                ))}
            </Grid>
        </Grid>
    )
}