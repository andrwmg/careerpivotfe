import React, { useContext, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import userService from '../services/user.service';
import { ToastContext } from '../contexts/ToastContext';

export default function ForgotForm() {
    const { setMessage, setSeverity } = useContext(ToastContext)

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
                setSeverity('success')
                    navigate('/login')
            })
            .catch(({response}) => {
                setMessage(response.data.message)
                setSeverity('error')
            })
    }

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