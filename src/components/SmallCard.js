import styled from "@emotion/styled";
import { FavoriteBorderOutlined } from "@mui/icons-material";
import { Button, Grid, Skeleton, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import formatCount from "../utils/formatCount";
import { motion } from 'framer-motion'

const Title = styled(Typography)(({ theme }) => ({
    display: 'block',
    maxWidth: '100%',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
}));

const EllipsisTypographyTwo = styled(Typography)(({ theme }) => ({
    display: '-webkit-box',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': 2,
    WebkitLineClamp: 2,
    lineClamp: 2,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
}));

const EllipsisTypographyThree = styled(Typography)(({ theme }) => ({
    height: '48px',
    display: '-webkit-box',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': 3,
    WebkitLineClamp: 3,
    lineClamp: 3,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    lineHeight: 'auto'
}));

export default function SmallCard({ post, group, loading }) {


    const [status, setStatus] = useState(null)

    const auth = useAuthUser()
    const navigate = useNavigate()

    const handleClick = () => {
        if (post) {
            navigate(`/dashboard/posts/${post._id}`)
        } else if (group) {
            navigate(`/dashboard/groups/${group._id}`)
        }
    }

    return (
        <Button onClick={handleClick} disabled={loading} sx={{ minWidth: '300px', maxWidth: '350px', height: 'fit-content', bgcolor: 'primary.main', p: 2, borderRadius: 2, '&:hover': { bgcolor: 'primary.hover' } }}>
            {!loading ?
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .5 }} style={{ width: '100%', height: 'fit-content' }}>
                    <Grid container item direction='column' gap={2}>
                        <Stack spacing={1} textAlign='start' width='100%'>
                            <Title variant="h4" fontWeight={600} color='white'>
                                {post.title && post.title}
                            </Title>
                            <EllipsisTypographyThree variant="p" color='white' letterSpacing='-2%' lineHeight='16px'>
                                {post.body && post.body}
                            </EllipsisTypographyThree>
                        </Stack>
                        <Grid container item alignItems='center' gap={1} width='100%'>
                            <FavoriteBorderOutlined sx={{ fontSize: '18px', color: 'white' }} />
                            <Typography variant='h6' color='white'>{post.likes && formatCount(post.likes.length)}</Typography>
                        </Grid>
                    </Grid>
                </motion.div>
                :
                <Grid container item direction='column' gap={2}>
                    <Stack textAlign='start' width='100%' spacing={1}>
                        <Title variant="h4" fontWeight={600}>
                            <Skeleton />
                        </Title>
                        <EllipsisTypographyThree variant="p" lineHeight='16px'>
                            <Skeleton />
                            <Skeleton />
                            <Skeleton />
                        </EllipsisTypographyThree>
                    </Stack>
                    <Typography variant='h6'>
                        <Skeleton width='50px' />
                    </Typography>
                </Grid>}
        </Button>
    )
}