import { Grid } from "@mui/material";
import React, { useEffect, useLayoutEffect, useState } from "react";
import SmallCard from "./SmallCard";
import { motion } from 'framer-motion'

export default function SmallCardRow({ posts, groups }) {

    const [array, setArray] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if ((posts) || (groups)) {
            setLoading(false)
            console.log(array)
        }
    }, [array])

    useEffect(() => {
        if (posts) {setArray(posts)}
        if (groups) {setArray(groups)}
    }, [posts, groups])

    useLayoutEffect(() => {
        if ((!posts) && (!groups)) {
            const skeleton = new Array(6).fill(null) 
            setArray(skeleton)
        }
    }, [])

    return (
        <Grid container item gap={3} wrap='nowrap' py={1} maxWidth='100%' overflow='scroll' px={{ xs: 3, md: 6 }} pr={3}>
            {array.map((item, index) => (
                // <motion.div key={post ? post._id : index} initial={{ x: 1000, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: .2 * index, duration: 1 }} style={{ width: '100%' }}>
                    <SmallCard key={!loading ? item._id : `smallCard${index}`} post={item} loading={loading} />
                // </motion.div>
            ))}
        </Grid>
    )
}