import { SettingsOutlined } from "@mui/icons-material";
import { Button, Grid, IconButton, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useIsAuthenticated } from "react-auth-kit";
import { useLocation } from "react-router-dom";
import { ToastContext } from "../contexts/ToastContext";
import { UserContext } from "../contexts/UserContext";
import communityService from "../services/community.service";
import postService from "../services/post.service";
import Feed from "./Feed";
import LargeCard from "./LargeCard";
import SmallCard from "./SmallCard";
import SmallCardRow from "./SmallCardRow";

export default function Dashboard() {

    const [trending, setTrending] = useState([])
    const [community, setCommunity] = useState([])
    const [popular, setPopular] = useState([])
    const [posts, setPosts] = useState([])

    const { setMessage, setSeverity } = useContext(ToastContext)
    const career = localStorage.getItem('career')
    const isAuthenticated = useIsAuthenticated()

    const location = useLocation()

    useEffect(() => {
        postService.trending()
            .then(({ data }) => {
                console.log(data)
                setTrending(data.data)
                setMessage(data.message)
                console.log('Trending: ', data)
            })
            .catch(({ response }) => {
                setMessage(response.data.message)
                setSeverity('error')
            })
        const searchParams = new URLSearchParams(location.search);
            setCommunity(searchParams.get('community'))

            postService.getAll()
        .then(({data}) => {
            setPosts(data)
        })
        .catch(({response}) => {
            setMessage(response.data.message)
            setSeverity('error')
        })

    }, [])

    useEffect(() => {
        communityService.getPopular(career)
            .then(({ data }) => {
                console.log(data)
                setPopular(data.data)
                // setMessage(data.message)
                // setSeverity('success')
            })
            .catch(({ response }) => {
                setMessage(response.data.message)
                setSeverity('error')
            })
    }, [career])

    return (
        <Grid container item gap={4} maxWidth={{ xs: '100%', md: 'calc(100vw - 256px)' }} zIndex={0}>
                <Grid container item direction='column' xs={12} height='149px'>
                    <Typography variant='body1' fontWeight={700} px={{ xs: 3, md: 6 }}>
                        {`Trending ${career ? `in ${career}` : 'now'}`}
                    </Typography>
                    <SmallCardRow posts={trending} />
                    {/* <Grid container item gap={3} wrap='nowrap' maxWidth='100%' overflow='scroll' pl={{ xs: 3, md: '100px' }} pr={3} py={2}>
                    {trending.length !== 0 && trending.map(trend => (
                        <SmallCard key={`row1${trend}`} post={trend} />
                    ))}
                </Grid> */}
                </Grid>
                <Grid container item direction='column' xs={12} height='149px'>
                    <Typography variant='body1' fontWeight={700} px={{ xs: 3, md: '50px' }}>
                        {`Popular ${career ? `${career}` : ''} Communities`}

                        {/* Popular Product Design Communities */}
                    </Typography>
                    <SmallCardRow communities={popular} />
                </Grid>
            <Feed posts={posts} heading='Your Feed' />
        </Grid>
    )
}