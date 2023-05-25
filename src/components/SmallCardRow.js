import { Grid } from "@mui/material";
import React from "react";
import SmallCard from "./SmallCard";
import { motion } from 'framer-motion'

export default function SmallCardRow({ posts, loading }) {

    const array = !loading ? posts : new Array(6).fill(null)

    return (
        <Grid container item gap={3} wrap='nowrap' py={1} maxWidth='100%' overflow='scroll' px={{ xs: 3, md: 6 }} pr={3}>
            {array.map((post, index) => (
                // <motion.div key={post ? post._id : index} initial={{ x: 1000, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: .2 * index, duration: 1 }} style={{ width: '100%' }}>
                    <SmallCard key={!loading ? post._id : `smallCard${index}`} post={post} loading={loading} />
                // </motion.div>
            ))}
        </Grid>
    )
}