import React, { useContext, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, Grid, IconButton, InputAdornment, Paper, TextField } from '@mui/material';
import { UserContext } from '../contexts/UserContext';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export default React.memo(function VerifyCard() {
    const { resend } = useContext(UserContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        let obj = { email, password }
        resend(obj)
    }

    return (
        <Card sx={{ width: '100%', height: '100%', m: 'auto' }}>
            <CardContent>
                <Paper elevation={0} component='form' onSubmit={handleSubmit}>
                    <Grid container item direction='column' rowGap={4} justifyContent='center'>
                    
                        <Typography variant="h7" color="text.secondary" textAlign='center'>
                            Your verification code has already been sent.
                        </Typography>
                        <TextField
                            id="outlined-email-input"
                            label="Email"
                            type="text"
                            value={email}
                            onChange={handleEmailChange}
                            autoComplete="current-email"
                            size="small"
                            fullWidth
                            required
                        />
                        <TextField
                            id="outlined-password-input"
                            label="Password"
                            value={password}
                            onChange={handlePasswordChange}
                            type={showPassword ? 'text' : 'password'}
                            autoComplete="current-password"
                            size="small"
                            fullWidth
                            required
                            InputProps={{
                                endAdornment:
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                            }}
                        />
                        <Button type='submit' onClick={handleSubmit}>Resend</Button>
                    </Grid>
                </Paper>
            </CardContent>
        </Card>
    );
})