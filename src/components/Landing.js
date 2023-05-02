import styled from "@emotion/styled";
import { Button, Grid, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import hero from '../images/hero.png'
import userService from "../services/user.service";

const TextButton = styled(Button)(({ theme }) => ({
    color: 'rgba(89, 111, 255, 1)',
    fontWeight: 500,
    letterSpacing: -.14,
    textTransform: 'inherit',
    border: '2px solid rgba(89, 111, 255, 1)',
    borderRadius: '8px',
    paddingLeft: 10,
    paddingRight: 10
}))

const MainButton = styled(TextButton)(({ theme }) => ({
    color: grey[50],
    boxShadow: 'none'
}))

export default function Landing() {

    return (
        <Grid container item maxWidth='100vw' px='4vw' alignItems='center' pt='10vw' rowGap={8} flexWrap='wrap-reverse' overflow='scroll'>
            <Grid container item direction='column' xs={12} lg={5} gap={4}>
                <Typography variant='h1'>
                    Want to change your career? We’ll help you <span style={{ color: 'rgba(89, 111, 255, 1)' }}>pivot</span>.
                </Typography>
                <Typography variant='h4'>
                    Whether you don’t know where to pivot or you do know where but don’t know how to pivot- we got you.
                </Typography>
                <Grid container item justifyContent='start' gap={2}>
                    <MainButton variant="contained" size='large'>IDK where to pivot</MainButton>
                    <TextButton variant='outlined' size="large">IDK how to pivot</TextButton>
                </Grid>
            </Grid>
            <Grid container item direction='column' xs={12} lg={7} maxWidth='100%'>
                <img src={hero} style={{ objectFit: 'scale-down', maxWidth: '100vw' }} />
            </Grid>
        </Grid>
    )
}