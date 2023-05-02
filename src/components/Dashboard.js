import { SettingsOutlined } from "@mui/icons-material";
import { Button, Grid, IconButton, Typography } from "@mui/material";
import React from "react";
import LargeCard from "./LargeCard";
import SmallCard from "./SmallCard";

export default function Dashboard() {

    const trending = [0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5]

    return (
        <Grid container item gap={4} maxWidth='100%' zIndex={0}>
            <Grid container item direction='column' xs={12}>
                <Typography variant='h5' pl={{ xs: 3, md: '100px' }}>Trending in Product Design</Typography>
                <Grid container item gap={3} wrap='nowrap' maxWidth='100%' overflow='scroll' pl={{ xs: 3, md: '100px' }} pr={3} py={2}>
                    {trending.map(trend => (
                        <SmallCard />
                    ))}
                </Grid>
            </Grid>
            <Grid container item direction='column' xs={12}>
                <Typography variant='h5' pl={{ xs: 3, md: '100px' }}>Popular Product Design Communities</Typography>
                <Grid container item gap={3} wrap='nowrap' maxWidth='100%' overflow='scroll' pl={{ xs: 3, md: '100px' }} pr={3} py={2}>
                    {trending.map(trend => (
                        <SmallCard />
                    ))}
                </Grid>
            </Grid>
            <Grid container item direction='column' xs={12}>
                <Grid container item alignItems='center' gap={1}>
                    <Typography variant='h3' pl={{ xs: 3, md: '100px' }}>Feed</Typography>
                    <IconButton variant='text' color='primary'>
                        <SettingsOutlined sx={{ fontSize: "24px" }} />
                        {/* <Typography variant='h4'>Settings</Typography> */}
                    </IconButton>
                </Grid>
                <Grid container item gap={3} emaxWidth='100%' overflow='scroll' pl={{ xs: 3, md: '100px' }} pr={3} py={2}>
                    {trending.map(trend => (
                        <LargeCard />
                    ))}
                </Grid>
            </Grid>
        </Grid>
    )
}