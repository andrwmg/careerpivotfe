import styled from "@emotion/styled";
import { Button, Grid, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
    fontSize: '20px',
    padding: '18px 48px',
    boxShadow: 'none',
    lineHeight: '20px'
}))

export default function Landing() {

    const navigate = useNavigate()

    const handleRegistrationLink = () => {
        navigate('/register')
    }
    return (
        <Grid container item width='100vw' px='4vw' alignItems='center' rowGap={8} flexWrap='wrap-reverse' overflow='scroll' minHeight='calc(100vh - 60px)' boxSizing='border-box' bgcolor='#E8EBFF' zIndex={1}>
            <Grid container item direction='column' xs={12} lg={5} gap={4} pb={4}>
                <Typography variant='h1'>
                    Want to change your career? We’ll help you <span style={{ color: 'rgba(89, 111, 255, 1)' }}>pivot</span>.
                </Typography>
                <Typography variant='h4'>
                Curated content and advice from peers across all industries to help you achieve your career goals. All for free.
                </Typography>
                <Grid container item justifyContent='start' gap={2}>
                    <MainButton onClick={handleRegistrationLink} variant="contained" size='large'>Get started</MainButton>
                    {/* <TextButton variant='outlined' size="large">IDK how to pivot</TextButton> */}
                </Grid>
            </Grid>
            <Grid container item direction='column' xs={12} lg={7} maxWidth='100%'>
                <img src={hero} style={{ objectFit: 'scale-down', maxWidth: '100%' }} />
            </Grid>
        </Grid>
    )
}