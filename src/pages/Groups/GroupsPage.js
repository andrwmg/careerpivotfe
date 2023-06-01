import { Grid, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useAuthUser, useIsAuthenticated } from "react-auth-kit";
import Feed from "../../components/Feed";
import SmallCardRow from "../../components/SmallCardRow";
import { ToastContext } from "../../contexts/ToastContext";
import groupService from "../../services/group.service";

export default function GroupsPage() {

    const [trending, setTrending] = useState(null)
    const [trendingLoad, setTrendingLoad] = useState(true)
    const [latest, setLatest] = useState([])
    const [feedLoading, setFeedLoading] = useState(true)
    const [popular, setPopular] = useState([])
    const [feed, setFeed] = useState([])

    const { setMessage, setSeverity } = useContext(ToastContext)

    const isAuthenticated = useIsAuthenticated()
    const auth = useAuthUser()

    useEffect(() => {
        const result = window.localStorage.getItem('message')
        if (result) {
            setMessage(result)
            setSeverity('success')
        }
        window.localStorage.removeItem('message')

        groupService.trending(
            // isAuthenticated() && auth().career ? { group: auth().career._id } : 
            {})
            .then(({ data }) => {
                setTrending(data.data)
                setTrendingLoad(false)
            })
            .catch(({ response }) => {
                setMessage(response.data.message)
                setSeverity('error')
            })
        groupService.latest(
            // isAuthenticated() && auth().career ? { group: auth().career._id } : 
            {})
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
        <Grid container item gap={1} maxWidth={{ xs: '100%', md: 'calc(100vw - 256px)' }} zIndex={0} mt={4}>
            <Grid container item direction='column' xs={12} minHeight='195px' rowGap={1}>
                <Typography variant='h4' fontWeight={700} px={{ xs: 3, md: 6 }}>
                    {`Trending ${isAuthenticated() && auth().career ? `in ${auth().career.title}` : 'now'}`}
                </Typography>
                <SmallCardRow groups={trending} />
            </Grid>
            {/* <Feed posts={latest} loading={feedLoading} heading={isAuthenticated() ? 'Your Feed' : 'Feed'} /> */}
        </Grid>
    )
}