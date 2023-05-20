import { Grid, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useIsAuthenticated } from "react-auth-kit";
import { ToastContext } from "../contexts/ToastContext";
import postService from "../services/post.service";
import Feed from "./Feed";
import SmallCardRow from "./SmallCardRow";

export default function Dashboard() {

    const [trending, setTrending] = useState([])
    const [trendingLoad, setTrendingLoad] = useState(true)
    const [latest, setLatest] = useState([])
    const [feedLoading, setFeedLoading] = useState(true)
    const [popular, setPopular] = useState([])
    const [feed, setFeed] = useState([])

    const { setMessage, setSeverity } = useContext(ToastContext)
    const career = localStorage.getItem('career')
    const isAuthenticated = useIsAuthenticated()

    useEffect(() => {
        const result = window.localStorage.getItem('message')
        if (result) {
            setMessage(result)
            setSeverity('success')
        }
        window.localStorage.removeItem('message')

        postService.trending(career ? { career } : {})
            .then(({ data }) => {
                setTrending(data.data)
                setTrendingLoad(false)
            })
            .catch(({ response }) => {
                setMessage(response.data.message)
                setSeverity('error')
            })
        postService.latest(career ? { career } : {})
            .then(({ data }) => {
                setLatest(data.data)
                setFeedLoading(false)
            })
            .catch(({ response }) => {
                setMessage(response.data.message)
                setSeverity('error')
            })
    }, [])

    return (
        <Grid container item gap={1} maxWidth={{ xs: '100%', md: 'calc(100vw - 256px)' }} zIndex={0}>
            <Grid container item direction='column' xs={12} minHeight='195px' rowGap={1}>
                <Typography variant='h4' fontWeight={700} px={{ xs: 3, md: 6 }}>
                    {`Trending ${career ? `in ${career}` : 'now'}`}
                </Typography>
                <SmallCardRow posts={trending} loading={trendingLoad} />
            </Grid>
            <Feed posts={latest} loading={feedLoading} heading={isAuthenticated() ? 'Your Feed' : 'Feed'} />
        </Grid>
    )
}