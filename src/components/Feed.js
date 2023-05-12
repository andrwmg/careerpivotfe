import { SettingsOutlined } from "@mui/icons-material";
import { Grid, IconButton, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ToastContext } from "../contexts/ToastContext";
import postService from "../services/post.service";
import LargeCard from "./LargeCard";

export default function Feed({heading, posts}) {

    const {setMessage, setSeverity } = useContext(ToastContext)

    return (
        <Grid container item direction='column' xs={12}>
            {heading ?
                <Grid container item alignItems='center' gap={1} px={{ xs: 3, md: 6 }}>
                    <Typography variant='h2'>{heading}</Typography>
                    <IconButton variant='text' color='primary'>
                        <SettingsOutlined sx={{ fontSize: "24px" }} />
                        {/* <Typography variant='h4'>Settings</Typography> */}
                    </IconButton>
                </Grid> : null}
                <Grid container item gap={3} maxWidth='100%' overflow='scroll' px={{ xs: 3, md: 6 }} pr={3} py={2}>
                    {posts && posts.map((post, index) => (
                        <LargeCard key={index} post={post} posts={posts} />
                    ))}
                </Grid>
            </Grid>
    )
}