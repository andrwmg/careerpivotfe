import { SettingsOutlined } from "@mui/icons-material";
import { Grid, IconButton, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { ToastContext } from "../contexts/ToastContext";
import postService from "../services/post.service";
import LargeCard from "./LargeCard";

export default function Feed() {

    const [posts, setPosts] = useState([])
    const {setMessage, setSeverity } = useContext(ToastContext)

    useEffect(() => {
        postService.getAll()
        .then(({data}) => {
            setPosts(data)
        })
        .catch(({response}) => {
            setMessage(response.data.message)
            setSeverity('error')
        })
    }, [])

    return (
        <Grid container item direction='column' xs={12}>
                <Grid container item alignItems='center' gap={1} px={{ xs: 3, md: '50px' }}>
                    <Typography variant='h6'>Your Feed</Typography>
                    <IconButton variant='text' color='primary'>
                        <SettingsOutlined sx={{ fontSize: "24px" }} />
                        {/* <Typography variant='h4'>Settings</Typography> */}
                    </IconButton>
                </Grid>
                <Grid container item gap={3} maxWidth='100%' overflow='scroll' px={{ xs: 3, md: '50px' }} pr={3} py={2}>
                    {posts.map((post, index) => (
                        <LargeCard key={index} post={post} posts={posts} />
                    ))}
                </Grid>
            </Grid>
    )
}