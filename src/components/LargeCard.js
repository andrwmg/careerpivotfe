import styled from "@emotion/styled";
import { CommentOutlined, FavoriteBorder } from "@mui/icons-material";
import { Button, Card, CardContent, Grid, IconButton, Typography } from "@mui/material";
import React from "react";

const EllipsisTypography = styled(Typography)(({ theme }) => ({
    display: '-webkit-box',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': 3,
    WebkitLineClamp: 3,
    lineClamp: 3,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }));

export default function LargeCard() {

    return (
        <Button onClick={()=>console.log('Hey!')} variant="contained" sx={{  maxWidth: {xs: '100%', lg: 'calc(50% - 16px)'}, height: '292px', bgcolor: 'rgba(232, 235, 255, 1)', color: 'black', p: 3, flexGrow: .5 }}>
            <Grid container item direction='column' alignItems='start' xs={12} justifyContent='space-between' height='100%'>
                <Grid container item justifyContent='space-between' alignItems='center' rowGap={1}>
                    <Button variant="contained" sx={{height: '40px', borderRadius: '20px'}}>
                        Product Design for Dummies
                    </Button>
                    <Typography variant='subtitle1' color='text.secondary'>6 hours ago</Typography>
                    </Grid>
                    <Grid container item gap={1}>
                <Typography variant="body" fontWeight={700} noWrap>Title Text</Typography>
                <EllipsisTypography variant='body2' textAlign='start'>This is some sample body text. This is some sample body text. This is some sample body text. Up to three lines of total body text.</EllipsisTypography>
                </Grid>
                <Grid container item justifyContent='start' alignItems='start' gap={4} color='primary'>
                    <Grid container item direction='column' xs='auto'>
                    <Grid container item gap={1}>
                    <IconButton sx={{p: 0}} color='primary'>
                        <FavoriteBorder  sx={{fontSize: '18px'}}/>
                    </IconButton>
                    <Typography variant='body1' color='primary' fontWeight={700}>251</Typography>
                    </Grid>
                    </Grid>
                    <Grid container item direction='column' xs>

                    <Grid container item gap={1} xs='auto'>
                    <IconButton sx={{p: 0}} color='primary'>
                        <CommentOutlined  sx={{fontSize: '18px'}}/>
                    </IconButton>
                    <Typography variant='body1' color='primary' fontWeight={700}>35</Typography>
                    </Grid>
                    </Grid>

                </Grid>
                
            </Grid>
        </Button>
    )
}