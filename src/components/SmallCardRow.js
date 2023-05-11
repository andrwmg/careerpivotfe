import { Grid } from "@mui/material";
import React from "react";
import SmallCard from "./SmallCard";

export default function SmallCardRow({posts, communities}) {

    return (
        <Grid container item gap={3} wrap='nowrap' maxWidth='100%' overflow='scroll'  px={{ xs: 3, md: '50px' }} pr={3} py={2}>
            {(posts && posts.length !== 0) && posts.map(post => (
                <SmallCard key={post._id} post={post} />
            ))}
            {(communities && communities.length !== 0) && communities.map(community => (
                <SmallCard key={community._id} community={community} />
            ))}
        </Grid>
    )
}