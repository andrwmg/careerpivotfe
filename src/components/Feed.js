import { SettingsOutlined } from "@mui/icons-material";
import { Grid, IconButton, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { ToastContext } from "../contexts/ToastContext";
import LargeCard from "./LargeCard";

export default function Feed({heading, posts, loading}) {

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
                    {!loading ? posts.map((post, index) => (
                        <LargeCard key={index} post={post} posts={posts} loading={loading} />
                    )) :
                    [0,0,0,0,0,0].map((post, index) => (
                        <LargeCard key={index} post={post} loading={loading} />
                    ))
                    }
                </Grid>
            </Grid>
    )
}