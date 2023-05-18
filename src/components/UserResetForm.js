import React, { useContext, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid, IconButton, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import userService from '../services/user.service';

export default function ResetForm() {

    const { setMessage, setSeverity } = useContext(UserContext)

    const [confirm, setConfirm] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)

    let navigate = useNavigate()

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const handleConfirmChange = (event) => {
        setConfirm(event.target.value)
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleClickShowConfirm = () => {
        setShowConfirm(!showConfirm);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (password === confirm) {
            let obj = { password, confirm }
            await userService.reset(obj)
                .then(({ data }) => {
                    setMessage(data.message)
                    setSeverity('success')
                        navigate('/login')
                })
                .catch(({response}) => {
                    setMessage(response.data.message)
                    setSeverity('error')
                })
        } else {
            setMessage('Passwords do not match. Try again.')
            setSeverity('error')
        }
    }

    // const selectFile = (event) => {
    //     const file = event.target.files
    //     const image = [{ data: file[0], tempUrl: URL.createObjectURL(file[0]) }]
    //     setProfilePic(image)
    // }

    return (
        <Card sx={{ width: '100%', mx: 'auto' }}>
            {/* <CardMedia
                component="img"
                height="100"
                image="https://res.cloudinary.com/deuft4auk/image/upload/v1661794349/Tesla/0x0-0x0-Service_10_lgqvd1.jpg"
                alt="Tesla Mart Registration"
            /> */}
            <CardContent>

                <form onSubmit={handleSubmit}>
                    <Grid container item rowGap={4}>
                        <Typography variant="h4" color="text.secondary">
                            Reset Password
                        </Typography>
                        <TextField
                            id="outlined-password-input"
                            label="Password"
                            value={password}
                            onChange={handlePasswordChange}
                            type={showPassword ? 'text' : 'password'}
                            autoComplete="new-password"
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
                        <TextField
                            id="outlined-confirm-input"
                            label="Confirm Password"
                            value={confirm}
                            onChange={handleConfirmChange}
                            type={showConfirm ? 'text' : 'password'}
                            autoComplete="new-confirm"
                            size="small"
                            fullWidth
                            required
                            InputProps={{
                                endAdornment:
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle confirm visibility"
                                            onClick={handleClickShowConfirm}
                                            onMouseDown={handleClickShowConfirm}
                                            edge="end"
                                        >
                                            {showConfirm ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                            }}
                        />
                        <Button type='submit' variant='contained' sx={{ width: '100%', mx: 'auto' }}>Submit</Button>
                        <Button onClick={() => navigate('/login')} variant='text' sx={{ width: '100%', mx: 'auto' }}>Back to log in</Button>
                    </Grid>
                </form>

            </CardContent>
        </Card>
    );
}