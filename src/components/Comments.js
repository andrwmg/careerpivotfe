import { Reply } from "@mui/icons-material";
import { Grid, IconButton, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useState } from "react";
import commentService from "../services/comment.service";
import Comment from "./Comment";

export default function Comments({ comments, post, commentCount, setCommentCount, initial }) {

    return (
        <Stack>
            {comments.map((comment, index) => (
                <Grid container item>
                    {!initial &&
                <Box sx={{ height: '100%', width: '40px', position: 'relative' }}>
           
                {/* <Box sx={{ position: 'absolute', height: '20px', width: '20px', top: 0, left: '20px', right: 0, borderBottom: '.5px solid black', borderLeft: '.5px solid black', borderRadius: '0px 20px 0px 20px' }} />
                <Box sx={{ position: 'absolute', top: 0, bottom: 0, left: '50%', borderLeft: '1px solid black' }} /> */}
            </Box>
}
                <Comment comment={comment} commentCount={commentCount} setCommentCount={setCommentCount} post={post} lastComment={index === comments.length - 1} />
                </Grid>
            ))}
        </Stack>
    )
}