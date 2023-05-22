import { SettingsOutlined } from "@mui/icons-material";
import { Grid, IconButton, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import LargeCard from "./LargeCard";
import { motion } from 'framer-motion'

export default function Feed({ heading, posts, loading }) {

    const array = !loading ? posts : new Array(6).fill(null)

    return (
        <Grid container item direction='column' xs={12}>
            {heading ?
                <Grid container item alignItems='center' gap={1} px={{ xs: 3, md: 6 }}>
                    <Typography variant='h2'>{heading}</Typography>
                    <IconButton variant='text' color='primary'>
                        <SettingsOutlined sx={{ fontSize: "24px" }} />
                    </IconButton>
                </Grid> : null}
            <Grid container item gap={3} maxWidth='100%' overflow='scroll' px={{ xs: 3, md: 6 }} pr={3} py={2}>
                {array.map((post, index) => (
                    <motion.div initial={{ x: 150, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{x: -50, opacity: 0}} transition={{ delay: .2 * index, duration: 1 }} style={{ width: '100%' }}>
                        <LargeCard key={!loading ? post._id : `largeCard${index}`} post={post} posts={posts} loading={loading} />
                    </motion.div>
                ))}
            </Grid>
        </Grid>
    )
}