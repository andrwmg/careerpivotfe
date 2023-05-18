import { Box, Stack } from "@mui/system";
import React from "react";
import Comment from "./Comment";

export default function Comments({ comments, post, commentCount, setCommentCount, initial }) {

    return (
        <Stack width='100%' spacing={2.5} borderLeft={!initial ? '2px solid #E9EBF0' : 'none'}>
            {comments.map((comment, index) => (
                <Stack direction='row' key={comment._id}>
                    {!initial ?
                    <Box minWidth='32px' /> : null}
                    <Comment comment={comment} commentCount={commentCount} setCommentCount={setCommentCount} post={post} lastComment={index === comments.length - 1} />
                    {!initial ?
                    <Box minWidth='8px' /> : null}
                </Stack>
            ))}
        </Stack>
    )
}