import { LocalConvenienceStoreOutlined, SettingsOutlined } from "@mui/icons-material";
import { Button, Grid, IconButton, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useIsAuthenticated } from "react-auth-kit";
import { useLocation } from "react-router-dom";
import { ToastContext } from "../contexts/ToastContext";
import { UserContext } from "../contexts/UserContext";
import groupService from "../services/group.service";
import postService from "../services/post.service";
import Feed from "./Feed";
import LargeCard from "./LargeCard";
import SmallCard from "./SmallCard";
import SmallCardRow from "./SmallCardRow";

export default function Dashboard() {

    const [trending, setTrending] = useState([])
    const [group, setGroup] = useState([])
    const [popular, setPopular] = useState([])
    const [posts, setPosts] = useState([])

    const { setMessage, setSeverity } = useContext(ToastContext)
    const career = localStorage.getItem('career')
    const isAuthenticated = useIsAuthenticated()

    const location = useLocation()

    useEffect(() => {
        postService.trending(career)
            .then(({ data }) => {
                console.table(data.data)
                setTrending(data.data)
            })
            .catch(({ response }) => {
                setMessage(response.data.message)
                setSeverity('error')
            })
        postService.getSome(career)
            .then(({ data }) => {
                setPosts(data)
            })
            .catch(({ response }) => {
                setMessage(response.data.message)
                setSeverity('error')
            })

    }, [])

    // useEffect(() => {
    //     if (career) {
    //     groupService.getPopular(career)
    //         .then(({ data }) => {
    //             console.log(data)
    //             setPopular(data.data)
    //         })
    //         .catch(({ response }) => {
    //             setMessage(response.data.message)
    //             setSeverity('error')
    //         })
    //     }
    // }, [career])

    return (
        <Grid container item gap={2} maxWidth={{ xs: '100%', md: 'calc(100vw - 256px)' }} zIndex={0}>
            <Grid container item direction='column' xs={12} minHeight='195px' rowGap={2}>
                <Typography variant='h4' fontWeight={700} px={{ xs: 3, md: 6 }}>
                    {`Trending ${career ? `in ${career}` : 'now'}`}
                </Typography>
                <SmallCardRow posts={trending} />
            </Grid>
            <Feed posts={posts} heading='Your Feed' />
        </Grid>
    )
}