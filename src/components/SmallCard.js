import styled from "@emotion/styled";
import { FavoriteBorderOutlined } from "@mui/icons-material";
import { Button, Grid, Skeleton, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import formatCount from "../utils/formatCount";

const EllipsisTypographyOne = styled(Typography)(({ theme }) => ({
    display: '-webkit-box',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': 1,
    WebkitLineClamp: 1,
    lineClamp: 1,
    overflow: 'hidden',
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
        <Button onClick={handleClick} sx={{ minWidth: '300px', maxWidth: '350px', minHeight: '144px', bgcolor: 'primary.main', p: 2, borderRadius: 2, '&:hover': { bgcolor: 'primary.hover' } }}>
                <Grid container item direction='column' justifyContent='space-between' height='100%' gap={2}>
                    <Stack spacing={1} textAlign='start'>
                        <EllipsisTypographyTwo variant="h4" fontWeight={600} color='white'>
                            {!loading ? post.title : <Skeleton />}
                        </EllipsisTypographyTwo>
                        <EllipsisTypographyThree variant="p" color='white' letterSpacing='-2%' lineHeight='16px'>
                            {!loading ? post.body : <Stack><Skeleton /><Skeleton /><Skeleton /></Stack>}
                        </EllipsisTypographyThree>
                    </Stack>

                    <Grid container item alignItems='center' gap={1} width='100%'>
                        <FavoriteBorderOutlined sx={{ fontSize: '18px', color: 'white' }} />
                        <Typography variant='h6' color='white' minWidth='9.25px'>{!loading ? formatCount(post.likes.length) : <Skeleton />}</Typography>
                    </Grid>
                </Grid>
        </Button>
    )
}