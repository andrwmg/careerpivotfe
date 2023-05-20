import { Button, Card, Grid, OutlinedInput } from "@mui/material";
import React, { useState } from "react";
import { useIsAuthenticated } from "react-auth-kit";
import { Stack } from "@mui/system";
import { useNavigate } from "react-router-dom";
import AvatarDefault from "../../components/AvatarDefault";
import styled from "@emotion/styled";

const CommentInput = styled(OutlinedInput)(({ theme }) => ({
    borderRadius: '9.5px',
    color: '#596FFF',
    // width: '280px',
    fontSize: '16px',
    fontWeight: 600,
    paddingLeft: 3,
    "& input::placeholder": {
        color: '#596FFF',
        fontWeight: 500
    },
    "& .MuiOutlinedInput-notchedOutline, :hover .MuiOutlinedInput-notchedOutline": {
        borderColor: '#596FFF',
    },
    "& :hover .Mui-focused, .Mui-focused": {
        border: '2px solid #596FFF'
    },
}))


export default function CommentNew({ submitComment }) {

    const [commentBody, setCommentBody] = useState('')

    const isAuthenticated = useIsAuthenticated()
    const navigate = useNavigate()

    const handleChange = (e) => {
        setCommentBody(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const response = commentBody && submitComment(commentBody)
        if (!response) {
            setCommentBody('')
        }
    }

    return (
        <Card sx={{ width: '100%', bgcolor: 'rgba(232, 235, 255, 0)', color: 'black', px: 3, py: 2, borderRadius: 2, border: '1px solid #E8EBFF', boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)' }}>
            <Grid container item justifyContent='center' alignItems='center' xs={12} maxHeight='51px' maxWidth='100%'>
                {isAuthenticated() ?
                    <form onSubmit={handleSubmit} style={{ width: '100%' }}>

                        <Stack direction='row' alignItems='center' gap={2} width='100%' maxHeight='100%'>
                            <AvatarDefault size='51px' />
                            <CommentInput value={commentBody} onChange={handleChange} placeholder='What do you think?' required sx={{ flexGrow: 1, maxHeight: '100%' }} />

                            <Button variant="contained" type='submit' sx={{ px: 3, height: '51px' }}>Comment</Button>
                        </Stack>
                    </form>

                    :
                    <Button onClick={() => navigate('/login')}>Log in to leave a comment</Button>
                }
            </Grid>
        </Card>
    )
}