import { Grid } from '@mui/material'
import React from 'react'

export default function UserWrapper ({form}) {
    return (
        <Grid container direction='row' justifyContent='center' alignItems='center' pt={12} sx={{width: '100vw', height: '100%'}}>
      <Grid item container xs={10} sm={6} lg={4} sx={{height: 'auto'}}>
            {form}
            </Grid>
        </Grid>
    )
}