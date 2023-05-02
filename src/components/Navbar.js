import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Button, FormControl, Grid, InputAdornment, OutlinedInput } from '@mui/material';
import { grey } from '@mui/material/colors';
import logo from '../images/logo.png'
import { Link, useNavigate } from 'react-router-dom';
import { ListingContext } from '../contexts/ListingContext';
import MessageSnackbar from './MessageSnackbar';
import { useAuthUser } from 'react-auth-kit';
import AvatarDefault from './AvatarDefault';
import UserMenu from './UserMenu';

const TextButton = styled(Button)(({ theme }) => ({
    color: grey[800],
    fontWeight: 500,
    letterSpacing: -.14,
    textTransform: 'inherit',
    borderRadius: '8px',
    '& .MuiButtonBase-root ': {
        wrap: 'nowrap'
    }
}))

const MainButton = styled(TextButton)(({ theme }) => ({
    color: grey[50],
    boxShadow: 'none'
}))

export default function Navbar(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const { message, logout, setUserImage } = React.useContext(ListingContext)
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const navigate = useNavigate()
    const auth = useAuthUser()

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleRegistrationLink = () => {
        handleMenuClose()
        navigate('/register')
    }

    const handleLoginLink = () => {
        handleMenuClose()
        navigate('/login')
    }

    const handleLogout = () => {
        handleMenuClose()
        logout()
        navigate('/')
    }

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    React.useEffect(() => {
        const image = window.localStorage.getItem('userImage')
        if (image) {
            setUserImage(image)
        }
    }, [])

    const menuId = 'primary-search-account-menu';
//     const renderMenu = (
//         <Menu
//             anchorEl={anchorEl}
//             anchorOrigin={{
//                 vertical: 'top',
//                 horizontal: 'right',
//             }}
//             id={menuId}
//             keepMounted
//             transformOrigin={{
//                 vertical: 'top',
//                 horizontal: 'right',
//             }}
//             open={isMenuOpen}
//             onClose={handleMenuClose}
//         >
//             {/* <MenuItem onClick={handleMenuClose}>About</MenuItem> */}
//             <MenuItem onClick={handleMenuClose}>Career Paths</MenuItem>
//             <MenuItem onClick={handleMenuClose}>Career Tests</MenuItem>
//             {/* <MenuItem onClick={handleMenuClose}>Jobs</MenuItem> */}
//             {!auth() ?
//             <MenuItem onClick={handleRegistrationLink}>Register</MenuItem>
// :null}
//         </Menu>
//     );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            {/* <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="error">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <p>About</p>
            </MenuItem>
            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={17} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Career Tests</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem> */}
            {/* <MenuItem onClick={handleMenuClose}>About</MenuItem> */}
            <MenuItem onClick={handleMenuClose}>Career Paths</MenuItem>
            <MenuItem onClick={handleMenuClose}>Career Tests</MenuItem>
            {/* <MenuItem onClick={handleMenuClose}>Jobs</MenuItem> */}
            {!auth() ? 
            <MenuItem onClick={handleRegistrationLink}>Sign In/Up</MenuItem>
            : null
            }
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed"
                sx={{
                    bgcolor: 'white', boxShadow: 'none', borderBottom: '1px solid #cbcbcb', zIndex: (theme) => theme.zIndex.drawer + 1
                }}
            >
                <Grid container item justifyContent='space-between' alignItems='center' height='64px' px='4vw' wrap='nowrap'>
                    <Link to='/' style={{ display: 'flex', flexDirection: 'row', textDecoration: 'none', alignItems: 'center' }}>

                        <Box mr={{ xs: 1 }}>
                            <img src={logo} />
                        </Box>
                        <Typography
                            color='black'
                            variant="h6"
                            noWrap
                            component="div"
                            minWidth='27px'
                            letterSpacing='-.75px'
                            sx={{ display: { xs: 'none', sm: 'block' } }}
                        >
                            Career<span style={{ color: 'rgba(89, 111, 255, 1)' }}>Pivot</span>
                        </Typography>
                    </Link>
                    {/* <Box sx={{ flexGrow: 1 }} /> */}
                    <FormControl sx={{ m: 1, maxWidth: '300px', maxHeight: '38px' }} variant="outlined">
                        <OutlinedInput
                            id="outlined-adornment-weight"
                            placeholder='Search'
                            endAdornment={<InputAdornment position="end">
                                <IconButton color='primary'>
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>}
                            aria-describedby="outlined-weight-helper-text"
                            inputProps={{
                                'aria-label': 'weight',
                            }}
                            sx={{ maxHeight: '38px' }}
                        />
                    </FormControl>
                    {/* <Box sx={{ flexGrow: 1 }} /> */}
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, minWidth: '474px', gap: 2, justifyContent: 'end' }}>
                        {/* <TextButton>About</TextButton> */}
                        <TextButton>Career Test</TextButton>
                        <TextButton>Career Paths</TextButton>
                        {/* <TextButton >Jobs</TextButton> */}

                        {auth() ?
                            <UserMenu />

                            :
                            <MainButton variant='contained' onClick={handleRegistrationLink}>Sign Up/In</MainButton>
                        }
                        {/* <Button onClick={logout}>Log Out</Button> */}
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="black"
                            size='large'
                            sx={{width: '37px'}}
                        >
                            <MoreIcon />
                        </IconButton>
                        {auth() ?
                            <UserMenu />

                            :
                            null
                        }
                    </Box>
                </Grid>
            </AppBar>
            {renderMobileMenu}
            {/* {renderMenu} */}
            <Box py={8}>
                {props.children}
                {message && <MessageSnackbar />}
            </Box>
        </Box>
    );
}