import { Grid } from "@mui/material";
import React from "react";
import SmallCard from "./SmallCard";

export default function SmallCardRow({posts, loading}) {

    return (
        <Grid container item gap={3} wrap='nowrap' py={1} maxWidth='100%' overflow='scroll'  px={{ xs: 3, md: 6 }} pr={3}>
            {
            !loading ? 
            posts.map(post => (
                <SmallCard key={post._id} post={post} loading={loading} />
            )) :
            [0,0,0,0,0,0].map(post => (
                <SmallCard key={post._id} post={post} loading={loading} />
            ))
            }
        </Grid>
    )
}