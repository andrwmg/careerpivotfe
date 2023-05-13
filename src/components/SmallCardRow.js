import { Grid } from "@mui/material";
import React from "react";
import SmallCard from "./SmallCard";

export default function SmallCardRow({posts, groups}) {

    return (
        <Grid container item gap={3} wrap='nowrap' maxWidth='100%' overflow='scroll'  px={{ xs: 3, md: 6 }} pr={3}>
            {(posts && posts.length !== 0) && posts.map(post => (
                <SmallCard key={post._id} post={post} />
            ))}
        </Grid>
    )
}