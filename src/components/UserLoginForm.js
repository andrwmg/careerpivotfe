import React, { useContext, useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid, IconButton, Paper, TextField } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { UserContext } from '../contexts/UserContext';
import userService from '../services/user.service';

export default function LoginForm() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [tokenLoaded, setTokenLoaded] = useState(false)

    const { login } = useContext(UserContext)

    const navigate = useNavigate()
    const params = useParams()

    // useEffect(() => {
    //     if (params.token) {
    //         setTokenLoaded(true)
    //     }
    // }, [])
    
    // useEffect(()=>{
    //     tokenLoaded && verify(params.token)
    // }, [tokenLoaded])


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

    const handleSubmit = async (event) => {
        event.preventDefault();
        let obj = { email, password }
        login(obj)
    }

    return (
        <Card sx={{ width: '100%', height: '100%', m: 'auto' }}>
            <CardContent>
                <Paper elevation={0} component='form' onSubmit={handleSubmit}>
                    <Grid container item direction='column' rowGap={4}>
                        <Typography variant="h4" color="text.secondary">
                            Log In
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
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                            }}
                        />
                        <Grid container item gap={2} wrap='wrap-reverse'>
                            <Grid container item direction='column' xs={12} md>
                                <Button onClick={() => navigate('/register')} variant='outlined' sx={{ width: '100%', mx: 'auto' }}>Sign Up</Button>
                            </Grid>
                            <Grid container item direction='column' xs={12} md>
                                <Button
                                    type="submit"
                                    variant='contained'
                                    sx={{ width: '100%', mx: 'auto' }}>
                                    Log In
                                </Button>
                            </Grid>
                        </Grid>
                        <Button onClick={() => navigate('/forgot')} variant='text' sx={{ width: '100%', mx: 'auto' }}>Forgot password?</Button>
                    </Grid>
                </Paper>
            </CardContent>
        </Card>
    );
}

