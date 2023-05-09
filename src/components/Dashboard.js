import { SettingsOutlined } from "@mui/icons-material";
import { Button, Grid, IconButton, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useIsAuthenticated } from "react-auth-kit";
import { ToastContext } from "../contexts/ToastContext";
import { UserContext } from "../contexts/UserContext";
import postService from "../services/post.service";
import Feed from "./Feed";
import LargeCard from "./LargeCard";
import SmallCard from "./SmallCard";
import SmallCardRow from "./SmallCardRow";

export default function Dashboard() {

    const [trending, setTrending] = useState([])
    const [communities, setCommunities] = useState([])
    const [posts, setPosts] = useState([])

    const {setMessage, setSeverity} = useContext(ToastContext)
    const {career} = useContext(UserContext)
    const isAuthenticated = useIsAuthenticated()

    useEffect(() => {
        postService.getAll()
        .then(({data}) => {
            setTrending(data)
            console.log('Trending: ', data)
        })
        .catch(({response}) => {
            setMessage(response.data.message)
            setSeverity('error')
        })
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
        <Grid container item gap={4} maxWidth={{xs: '100%', sm: 'calc(100vw - 256px)'}} zIndex={0}>
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
                <SmallCardRow posts={trending} />

            </Grid>
            <Feed />
        </Grid>
    )
}