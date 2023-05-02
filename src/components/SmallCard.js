import { FavoriteBorder } from "@mui/icons-material";
import { Button, Card, CardContent, Grid, IconButton, Typography } from "@mui/material";
import React from "react";

export default function SmallCard() {

    return (
        <Button onClick={()=>console.log('Hey!')} variant="contained" sx={{ minWidth: '131px', height: '93px', bgcolor: 'primary.main', color: 'primary', p: 1.5 }}>
            <Grid container item direction='column' justifyContent='space-between' height='100%'>
                <Grid container item>
                <Typography variant="p" noWrap>Layoffs, anyone?</Typography>
                </Grid>
                <Grid container item alignItems='center' gap={1} width='100%'>
                    <IconButton sx={{p: 0}}>
                        <FavoriteBorder  sx={{fontSize: '18px', color: 'white'}}/>
                    </IconButton>
                    <Typography variant='body1'>251</Typography>
                </Grid>
            </Grid>
        </Button>
    )
}