import React, { useContext, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Avatar, Grid, IconButton, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import { ListingContext } from '../contexts/ListingContext';
import UploadFilesService from '../services/upload-files.service'

export default function RegistrationForm() {

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [userImage, setUserImage] = useState(null)

  const { register, setMessage, setMessageStatus } = useContext(ListingContext)

  let navigate = useNavigate()

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (event) => {
    event.preventDefault()
    const image = userImage ? 
    await UploadFilesService.upload(userImage) : 
    { filename: 'defaultUserImage', url: "/broken-image.jpg" }
    // register(obj)
    const obj = { username, email, password, image }
    // axios.post('https://localhost:7070/register', obj)
    // .then(({data})=> {
    //   setMessage(data.message)
    //   setMessageStatus(data.status)
    // })
    register(obj)
  }

  const selectFile = (event) => {
    const file = event.target.files
    const image = [{ data: file[0], tempUrl: URL.createObjectURL(file[0]) }]
    setUserImage(image)
  }

  return (
    <Card sx={{ width: '100%', mx: 'auto' }}>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Grid container item rowGap={4}>
            <Typography variant="h4" color="text.secondary">
              Register
            </Typography>
            <Grid container item direction='column' xs={12} justifyContent='center' alignItems='center' gap={2}>
              <label htmlFor="images">
                <div className="form-group">
                  <input
                    id="images"
                    name="images"
                    style={{ display: 'none' }}
                    type="file"
                    accept="image/*"
                    onChange={selectFile}
                  />
                </div>
                <div className="form-group">
                  <Button
                    className="btn-choose"
                    variant="outlined"
                    component="div"
                    sx={{ borderRadius: '50%', p: 0 }}>
                    <Avatar alt='' src={userImage ? userImage[0].tempUrl : "/broken-image.jpg"} style={{ height: '100px', width: '100px', objectFit: 'cover', p: 'none', borderRadius: '50%' }} />
                  </Button>
                </div>
              </label>
              <Typography variant='p' textAlign='center'>Upload profile picture</Typography>
            </Grid>
            <TextField
              id="outlined-email-input"
              label="Email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              autoComplete="new-email"
              size="small"
              fullWidth
              required
            />
            <TextField
              id="outlined-username-input"
              label="Username"
              type="text"
              value={username}
              onChange={handleUsernameChange}
              autoComplete="new-username"
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
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
              }}
            />
            <Grid container item gap={2} wrap='wrap-reverse'>
              <Grid container item direction='column' xs={12} lg>
                <Button onClick={() => navigate('/login')} variant='text' sx={{ width: '100%', mx: 'auto' }}>Have an account? Log in.</Button>
              </Grid>
              <Grid container item direction='column' xs={12} lg>
                <Button type='submit' variant='contained' sx={{ width: '100%', mx: 'auto' }}>Submit</Button>
              </Grid>
            </Grid>
          </Grid>
        </form>

      </CardContent>
    </Card>
  );
}