import * as React from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { useAuthUser } from 'react-auth-kit';
import AvatarDefault from './AvatarDefault';
import { UserContext } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { AccountCircle, AccountCircleOutlined, Dashboard, KeyboardArrowDown, KeyboardArrowUp, VerifiedUser } from '@mui/icons-material';

export default function UserMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const {userImage, logout} = React.useContext(UserContext)

  const auth = useAuthUser()
  const navigate = useNavigate()
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDashboard = () => {
    //   const career = window.localStorage.getItem('career')
      navigate('/dashboard')
  }

  const handleProfile = () => {
      navigate(`/dashboard/profile/${auth().id}`)
  }

  const handleLogout = () => {
    setAnchorEl(null)
    logout()
    navigate('/')
}

React.useEffect(() => {
    console.log(userImage)
}, [userImage])

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip>
          <IconButton
            onClick={handleClick}
            size="small"
            disableRipple
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
              <AvatarDefault username={auth().username} size='37px' />

              <Typography variant='h4' fontWeight={700} mx={1} color='primary' sx={{display: {xs: 'none', md: 'flex'}}}>{auth().username}</Typography>
              {open ? <KeyboardArrowUp color='primary' sx={{fontSize: '16px'}} /> : <KeyboardArrowDown color='primary' sx={{fontSize: '16px'}} />}
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 20,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
            '& .MuiMenuItem-root': {
                fontSize: '16px'
            }
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
          <MenuItem onClick={handleDashboard}>
          <ListItemIcon>
            <Dashboard fontSize="14px" />
          </ListItemIcon>
          Dashboard
        </MenuItem>
        <MenuItem onClick={handleProfile}>
        <ListItemIcon>
            <AccountCircle fontSize="14px" />
          </ListItemIcon>
          Profile
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="14px" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="14px" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}