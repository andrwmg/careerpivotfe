import { Box, Stack } from "@mui/system";
import React from "react";
import Comment from "./Comment";
import { motion, AnimatePresence } from 'framer-motion'

export default function Comments ({ comments, post, commentCount, setCommentCount, initial }) {

    return (
        <Stack width='100%' spacing={2.5} borderLeft={!initial ? '2px solid #E9EBF0' : 'none'}>
            <AnimatePresence>
                {comments.map((comment, index) => (
                    <motion.div key={comment._id} initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }} transition={{ type: 'tween', delay: .2 * (index % 10), duration: 1 }} style={{ width: '100%' }}>
                        <Stack direction='row' key={comment._id}>
                            {!initial ?
                                <Box minWidth='32px' /> : null}
                            <Comment comment={comment} commentCount={commentCount} setCommentCount={setCommentCount} post={post} lastComment={index === comments.length - 1} />
                            {!initial ?
                                <Box minWidth='8px' /> : null}
                        </Stack>
                    </motion.div>
                ))}
            </AnimatePresence>
        </Stack>
    )
}