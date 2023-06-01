import styled from "@emotion/styled";
import { CommentOutlined, FavoriteBorderOutlined } from "@mui/icons-material";
import { Button, Chip, Grid, Skeleton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAuthUser, useIsAuthenticated } from "react-auth-kit";
import { Stack } from "@mui/system";
import { useLocation, useNavigate } from "react-router-dom";
import formatDate from "../utils/formatDate";
import formatCount from "../utils/formatCount";
import { motion } from 'framer-motion'


const Title = styled(Typography)(({ theme }) => ({
    display: 'block',
    maxWidth: '100%',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
}));

const Body = styled(Typography)(({ theme }) => ({
    display: '-webkit-box',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': 2,
    WebkitLineClamp: 2,
    lineClamp: 2,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
}));

export default function LargeCard({ post, posts, loading, groups, group }) {

    const [status, setStatus] = useState(null)
    const [likeCount, setLikeCount] = useState(0)

    const auth = useAuthUser()
    const isAuthenticated = useIsAuthenticated()
    const navigate = useNavigate()
    const location = useLocation()

    const updateLikes = () => {
        if (post.likes.length !== 0) {
            setLikeCount(post.likes.length)
        }
        if (isAuthenticated() && post.likes.map(l => l.user._id).includes(auth().id)) {
            setStatus('liked')
        } else {
            setStatus(null)
        }
    }

    const handleClick = () => {
        navigate(`/dashboard/posts/${post._id}`)
    }

    useEffect(() => {
        if (post) {
            console.log(post)
            updateLikes()
        }
    }, [])

    useEffect(() => {
        if (post) {
            updateLikes()
        }
    }, [posts])

    return (
        <Button onClick={handleClick} variant="contained" sx={{ width: '100%', minHeight: '225px', bgcolor: 'rgba(232, 235, 255, 0)', color: 'black', p: 3, borderRadius: 2, border: '1px solid #E8EBFF', '&:hover': { bgcolor: 'rgba(232, 235, 255, .4)', boxShadow: 'none' }, boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)', flexGrow: 1, position: 'relative' }}>
            {/* <Chip variant='filled' label={post.group && post.group.title} size='small' sx={{ width: 'fit-content', ml: 'auto', position: 'absolute', top: -15, left: 'auto', right: 'auto', borderRadius: 1, bgcolor: 'white' }} /> */}

            {!loading ?
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .5 }} style={{ width: '100%' }}>
                    <Grid container item direction='column' alignItems='start' xs={12} rowGap={3} height='fit-content' maxWidth='100%'>
                        <Stack gap={1} width='100%'>
                            <Title variant="h3" fontWeight={700} noWrap lineHeight='35px' textAlign='start'>
                                {post ? post.title : null || group ? group.title : null}
                            </Title>
                            {post &&
                                <Title variant='subtitle1' color='text.secondary' lineHeight='20px' textAlign='start'>
                                    {`${formatDate(post.createdAt)} by `}
                                    <i>
                                        {post.author.username}
                                    </i>
                                    {!location.pathname.includes('/group') && post.group ? ' in ' : ''}
                                    <span style={{ fontWeight: 500 }}>
                                        {!location.pathname.includes('/group') && post.group ? `${post.group.title}` : ""}
                                    </span>
                                </Title>
                            }
                            {post &&
                                <Body variant='body1' textAlign='start' lineHeight='30px' letterSpacing='-2%' minHeight='60px' width='100%'>
                                    {post && post.body}
                                </Body>
                            }
                        </Stack>
                        <Grid container item justifyContent='start' alignItems='start' gap={4.5} color='primary'>
                            <Grid container item direction='column' xs='auto'>
                                <Grid container item alignItems='center' gap={1}>
                                    <FavoriteBorderOutlined color='primary' sx={{ fontSize: '22px' }} />
                                    <Typography variant='h4' color='black'>
                                        {post && formatCount(likeCount)}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container item direction='column' xs>
                                <Grid container item gap={1} xs='auto' alignItems='center'>
                                    <CommentOutlined color="primary" sx={{ fontSize: '22px' }} />
                                    <Typography variant='h4' color='black' textAlign='start'>
                                        {post && formatCount(post.commentCount)}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </motion.div> :
                <>
                    <Grid container item direction='column' alignItems='start' xs={12} rowGap={3} height='fit-content' maxWidth='100%'>
                        <Stack gap={1} width='100%'>
                            <Title variant="h3" lineHeight='30px'>
                                <Skeleton />
                            </Title>
                            <Title variant='subtitle1' lineHeight='20px'>
                                <Skeleton />
                            </Title>
                            <Body variant='body1'>
                                <Skeleton />
                                <Skeleton />
                            </Body>
                        </Stack>
                        <Grid container item width='100%'>
                            <Typography variant='h4' width='125px'>
                                <Skeleton />
                            </Typography>
                        </Grid>
                    </Grid>
                </>}
        </Button>
    )
}