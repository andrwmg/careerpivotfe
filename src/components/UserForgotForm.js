import React, { useContext, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ListingContext } from '../contexts/ListingContext';
import userService from '../services/user.service';

export default function ForgotForm() {
    const { setMessage, setMessageStatus } = useContext(ListingContext)

    const [email, setEmail] = useState('')

    let navigate = useNavigate()

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        await userService.forgot({ email })
            .then(({ data }) => {
                setMessage(data.message)
                setMessageStatus(data.messageStatus)
                if (data.messageStatus === 'success') {
                    navigate('/login')
                }
            })
    }

    // const selectFile = (event) => {
    //     const file = event.target.files
    //     const image = [{ data: file[0], tempUrl: URL.createObjectURL(file[0]) }]
    //     setProfilePic(image)
    // }

    return (
        <Card sx={{ width: '100%', mx: 'auto' }}>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <Grid container item rowGap={4}>
                        <Typography variant="h4" color="text.secondary">
                            Forgot Password
                        </Typography>
                        <TextField
                            id="outlined-email-input"
                            label="Email"
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                            autoComplete="current-email"
                            size="small"
                            fullWidth
                            required
                        />
                        <Button type='submit' variant='contained' sx={{ width: '100%', mx: 'auto' }}>Submit</Button>
                        <Button onClick={() => navigate('/login')} variant='text' sx={{ width: '100%', mx: 'auto' }}>Back to log in</Button>
                    </Grid>
                </form>
            </CardContent>
        </Card>
    );
}