import React, { useContext, useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Avatar, Grid, IconButton, TextField } from '@mui/material';
import UploadFilesService from '../services/upload-files.service'
import { useAuthHeader, useAuthUser, useSignIn } from 'react-auth-kit';
import { DefaultAvatar } from './index'
import { UserContext } from '../contexts/UserContext';
import userService from '../services/user.service';
import { ToastContext } from '../contexts/ToastContext';
import AvatarDefault from './AvatarDefault';
import { Edit } from '@mui/icons-material';
import useUpdateReactAuthKitUserState from '../hooks/useUpdateReactAuthKitUserState';
import { Stack } from '@mui/system';


export default function ProfileForm() {
  const { career, setCareer, userImage, setUserImage } = useContext(UserContext)
  const { setMessage, setSeverity } = useContext(ToastContext)

  const [username, setUsername] = useState('')
  const [newCareer, setNewCareer] = useState(career)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [tempImage, setTempImage] = useState(null)
  const [loading, setLoading] = useState(false)

  const auth = useAuthUser()
  const authHeader = useAuthHeader()
  const updateAuth = useUpdateReactAuthKitUserState()

  // const [userImage, setUserImage] = useState((profile !== undefined) ? [JSON.parse(profile)] : null)

  const handleCareerChange = (event) => {
    setNewCareer(event.target.value)
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleConfirmChange = (event) => {
    setConfirm(event.target.value)
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    let obj = {career: newCareer, username, email, password, confirm}
    if (tempImage) {
      const image = await UploadFilesService.upload([tempImage])
      obj['image'] = image[0]
    }
    if (password === confirm || !password) {
      await userService.updateUser(auth().id, obj)
        .then(({ data }) => {
          const obj = {career: data.data.career, username: data.data.username, email: data.data.email, image: data.data.image, id: data.data._id}
          updateAuth(obj)
          localStorage.setItem('userImage', data.data.image.url)
          localStorage.setItem('career', data.data.career)
          setUserImage(data.data.image.url)
          setCareer(data.data.career)
          setMessage(data.message)
          setSeverity('success')
        })
        .catch(({ response }) => {
          setMessage(response.data.message)
          setSeverity('error')
        })
    }
    setTempImage(null)
  }

  const selectFile = (event) => {
    const file = event.target.files
    const image = { data: file[0], url: URL.createObjectURL(file[0]) }
    setTempImage(image)
  }

  useEffect(() => {
    setNewCareer(auth().career)
    setUsername(auth().username)
    setEmail(auth().email)
  }, [])

  return (
    <Card elevation={0} sx={{ width: '100%', px: {xs: 3, md: 6} }}>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Grid container item rowGap={4}>
            <Grid container item justifyContent='start' gap={2} alignItems='center'>
              <Typography variant="h3" color="text.secondary">
                Profile
              </Typography>
              <IconButton onClick={() => setIsEditing(!isEditing)} size='large'>
                <Edit color='primary' sx={{fontSize: '24px'}} />
              </IconButton>
            </Grid>
            <Grid container item justifyContent='start'>
              <Grid container item direction='column' gap={2} alignItems='center' width='auto'>
                <Grid container item width='150px' height='150px' position='relative'>
                  <label htmlFor="images">
                    <div className="form-group">
                      <input
                        id="images"
                        name="images"
                        style={{ display: 'none' }}
                        type="file"
                        accept=".jpg,.jpeg,.png,.bmp"
                        onChange={selectFile}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="form-group" style={{ height: '150px', width: '150px', borderRadius: '50%', position: 'relative' }}>
                      <Button
                        className="btn-choose"
                        variant="outlined"
                        component="div"
                        disableRipple={!isEditing}
                        sx={{ borderRadius: '50%', p: 0, height: '150px', width: '150px', position: 'absolute', zIndex: 101251 }}>
                        {(tempImage || userImage) ?
                          <Avatar
                            alt={auth().username}
                            src={tempImage ? tempImage.url : userImage}
                            style={{ height: '100%', width: '100%', objectFit: 'cover', p: 'none', borderRadius: '50%' }} />
                          :
                          <AvatarDefault size='100%' username={auth().username} />
                        }
                      </Button>
                    </div>
                  </label>
                </Grid>
                {/* <Typography variant='h4' fontWeight={700}>Change profile picture</Typography> */}
              </Grid>
            </Grid>
            <Stack gap={2} width='360px'>

            <TextField

              id="outlined-pivotpath-input"
              label="PivotPath"
              type="text"
              value={newCareer}
              onChange={handleCareerChange}
              autoComplete="new-pivotpath"
              size="small"
              disabled={!isEditing}
            />
            <TextField

              id="outlined-email-input"
              label="Email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              autoComplete="new-email"
              size="small"
              disabled={!isEditing}
            />
            <TextField
              id="outlined-username-input"
              label="Username"
              type="text"
              value={username}
              onChange={handleUsernameChange}
              autoComplete="new-username"
              size="small"
              disabled={!isEditing}
            />
            {isEditing ?
              <>
                <TextField
                  id="outlined-password-input"
                  label="New Password"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  autoComplete="new-password"
                  size="small"
                disabled={!isEditing}
                />
                <TextField
                  id="outlined-confirm-input"
                  label="Confirm New Password"
                  type="password"
                  value={confirm}
                  onChange={handleConfirmChange}
                  autoComplete="new-confirm"
                  size="small"
                disabled={!isEditing}
                />

                <Button type='submit' disabled={!tempImage && username === auth().username && email === auth().email && (!password || !confirm) && newCareer === career} variant='contained' sx={{ width: '100%', mx: 'auto' }}>
                  Save
                </Button>
              </>
              : null}
                          </Stack>

          </Grid>
        </form>

      </CardContent>
    </Card>
  );
}