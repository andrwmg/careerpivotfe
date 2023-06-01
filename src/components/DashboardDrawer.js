import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button, FormControl, Grid, InputAdornment, OutlinedInput, Tab } from '@mui/material';
import { AccountCircleOutlined, CloseOutlined, DashboardOutlined, DocumentScanner, Grading, MenuOutlined, MessageOutlined, NotificationsOutlined, Search, Settings, Speed } from '@mui/icons-material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import { useAuthUser, useIsAuthenticated } from 'react-auth-kit';
import logo from '../assets/logo.png'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { grey } from '@mui/material/colors';
import styled from '@emotion/styled';
import UserMenu from './UserMenu';
import { UserContext } from '../contexts/UserContext';
import { Stack } from '@mui/system';
import AvatarDefault from './AvatarDefault';
import groupService from '../services/group.service';
import jobTitles from '../GroupSeeds';
import { ToastContext } from '../contexts/ToastContext';


const drawerWidth = 256;

const TextButton = styled(Button)(({ theme }) => ({
    color: grey[800],
    fontSize: '16px',
    fontWeight: 500,
    letterSpacing: -.14,
    textTransform: 'inherit',
    padding: '10px',
    borderRadius: '8px',
    '& .MuiButtonBase-root ': {
        wrap: 'nowrap'
    }
}))

const MainButton = styled(TextButton)(({ theme }) => ({
    color: grey[50],
    boxShadow: 'none'
}))

const SearchBar = styled(OutlinedInput)(({ theme }) => ({
    borderRadius: '9.5px',
    color: '#596FFF',
    width: '280px',
    fontSize: '13px',
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

function DashboardDrawer(props) {

    const { setMessage, setSeverity } = React.useContext(ToastContext)

    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [value, setValue] = React.useState('1');

    const { setCareer, setUserImage, logout } = React.useContext(UserContext)

    const auth = useAuthUser()
    const isAuthenticated = useIsAuthenticated()
    const navigate = useNavigate()
    const location = useLocation()

    const dashboard = location.pathname.includes('/dashboard')

    const mobileMenuId = 'primary-search-account-menu-mobile';

    const handleChange = (event, newValue) => {
        console.log(newValue)
        setValue(newValue);
    };

    const handleRegistrationLink = () => {
        navigate('/register')
    }

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleProfileClick = () => {
        if (location.pathname.includes('profile')) {
            setMobileOpen(false)
        } else {
            setMobileOpen(false)
            navigate(`/dashboard/profile/${auth().id}`)
        }
    }

    const handleDashboardClick = () => {
        if (location.pathname === '/dashboard') {
            setMobileOpen(false)
        } else {
            setMobileOpen(false)
            navigate('/dashboard')
        }
    }

    const handleStart = () => {
        setMobileOpen(false)
        navigate('/login')
    }

    const handleNewPost = () => {
        setMobileOpen(false)
        navigate('/dashboard/posts/new')
    }

    const handleNewGroup = () => {
        setMobileOpen(false)
        navigate('/dashboard/groups/new')
    }

    const handleLogout = () => {
        logout()
        setMobileOpen(false)
        navigate('/dashboard')
    }

    const handleSeed = () => {
        console.log(jobTitles)
        groupService.seed({careers: jobTitles})
        .then(({data}) => {
            console.log(data)
        })
    }

    React.useLayoutEffect(() => {
        switch (location.pathname) {
            case ('/dashboard'):
                console.log('1')
                setValue('1')
                break
            case ('/dashboard/groups'):
                console.log('2')
                setValue('2')
                break
            default: console.log(location.pathname, 'default')
        }
        // if (location.pathname === '/dashboard/groups') {
        //     setValue('2')
        // }
    }, [location.pathname])

    React.useEffect(() => {
        setCareer(isAuthenticated() ? auth().career : '')
        const image = localStorage.getItem('userImage')
        setUserImage(image)

        const result = sessionStorage.getItem('message')
        if (result) {
            setMessage(result)
            setSeverity('success')
        }
        sessionStorage.removeItem('message')
    }, [])

    const drawer = (
        <div>
            <Toolbar
                sx={{
                    height: dashboard ? { md: '122px' } : '60px',
                    alignItems: 'start',
                    '& .MuiListItemButton-root .MuiListItemIcon-root': {
                        pl: 2,
                        fontSize: '20px'
                    },
                    '& .MuiListItemButton-root .MuiTypogragphy-root': {
                        fontWeight: 500, py: .75
                    }
                }}>
                <Grid container item direction='column' xs={12} px={1} pt={3} gap={4} alignItems='end' display={{ xs: 'flex', md: 'none' }}>
                    <IconButton onClick={handleDrawerToggle}>
                        <CloseOutlined color='primary' sx={{ fontSize: '26px' }} />
                    </IconButton>
                    {isAuthenticated() &&
                        <Grid container item justifyContent='center' rowGap={3} sx={{ '& .MuiListItemIcon-root': { pl: 2, fontSize: '20px' }, '& .MuiListItemButton-root .MuiTypography-root': { fontWeight: 500, py: .75, fontSize: '16px' } }}>
                            <Stack spacing={2} alignItems='center'>
                                <AvatarDefault size='72px' />
                                <Typography variant='h4' fontWeight={700} color='primary'>{isAuthenticated() && auth().username}</Typography>
                            </Stack>
                            <div style={{ width: '100%' }}>
                                <Divider />
                                <ListItemButton onClick={handleProfileClick}>
                                    <ListItemIcon>
                                        <AccountCircleOutlined />
                                    </ListItemIcon>
                                    <ListItemText primary={
                                        <Typography variant='h4'>
                                            Profile
                                        </Typography>} />
                                </ListItemButton>
                                <Divider />
                            </div>
                        </Grid>}
                </Grid>
            </Toolbar>
            <Grid container item bgcolor='rgba(62, 85, 205, 0.02)'>
                <Grid container item direction='column' px={3}>
                    <Stack width='100%' spacing={2} my={4} justifyContent='center'>
                        {!isAuthenticated() &&
                            <Button variant='contained' onClick={handleStart} sx={{ boxShadow: 'none', '& :hover': { boxShadow: 'none' } }}>Get started</Button>
                        }
                        <Button onClick={handleNewPost} variant='outlined' color='primary' sx={{ bgcolor: 'white' }} fullWidth>
                            {isAuthenticated() ? 'Write a post' : 'Log in to write a post'}
                        </Button>
                        {/* <Button onClick={handleNewGroup} variant='outlined' color='primary' sx={{ bgcolor: 'white' }} fullWidth>
                            Create a group
                        </Button> */}
                    </Stack>
                    <List disablePadding sx={{ '& .MuiListItemIcon-root': { pl: 2, fontSize: '20px' }, '& .MuiListItemButton-root .MuiTypography-root': { fontWeight: 500, py: .75, fontSize: '16px' } }}>
                        {!isAuthenticated() &&
                            <div>
                                <Divider />
                                <ListItemButton onClick={handleDashboardClick}>
                                    <ListItemIcon>
                                        <DashboardOutlined />
                                    </ListItemIcon>
                                    <ListItemText primary={
                                        <Typography variant='h4'>
                                            Dashboard
                                        </Typography>} />
                                </ListItemButton>
                            </div>
                        }
                        {isAuthenticated() ?
                            <div>
                                <Divider />
                                <ListItemButton href=''>
                                    <ListItemIcon>
                                        <Grading />
                                    </ListItemIcon>
                                    <ListItemText primary={
                                        <Typography variant='h4'>
                                            Career Test
                                        </Typography>
                                    } />
                                </ListItemButton>
                                {/* <Box sx={{ display: { xs: 'flex', md: 'none' }, flexDirection: 'column' }}>

                                    <Divider />
                                    <ListItemButton href={!location.pathname.includes('profile') ? `/dashboard/profile/${auth().id}` : ''}>
                                        <ListItemIcon>
                                            <AccountCircleOutlined username={auth().username} size='20px' sx={{ fontSize: '20px' }} />
                                        </ListItemIcon>
                                        <ListItemText primary={
                                            <Typography variant='h4'>
                                                Profile
                                            </Typography>} />
                                    </ListItemButton>
                                </Box> */}
                                <Divider />
                                <ListItemButton href=''>
                                    <ListItemIcon>
                                        <NotificationsOutlined />
                                    </ListItemIcon>
                                    <ListItemText primary={
                                        <Typography variant='h4'>
                                            Notifications
                                        </Typography>} />
                                </ListItemButton>
                                <Divider />
                                <ListItemButton href=''>
                                    <ListItemIcon>
                                        <MessageOutlined />
                                    </ListItemIcon>
                                    <ListItemText primary={
                                        <Typography variant='h4'>
                                            Messages
                                        </Typography>} />
                                </ListItemButton>
                                {/* {auth().username === 'andrwmg' &&   
                                <div>
                                                             <Divider />
                            <ListItemButton onClick={handleSeed}>
                                <ListItemIcon>
                                    <Speed />
                                </ListItemIcon>
                                <ListItemText primary={
                                    <Typography variant='h4'>
                                        Seed Groups
                                    </Typography>} />
                            </ListItemButton>
                            </div>} */}
                            </div>
                            : null}
                        <Divider />
                        <ListItemButton href=''>
                            <ListItemIcon>
                                <Settings />
                            </ListItemIcon>
                            <ListItemText primary={
                                <Typography variant='h4'>
                                    Settings
                                </Typography>} />
                        </ListItemButton>
                        {isAuthenticated() &&
                            <Box sx={{ display: { xs: 'flex', md: 'none' }, flexDirection: 'column' }}>
                                <Divider />
                                <ListItemButton onClick={handleLogout}>
                                    <ListItemIcon>
                                        <DashboardOutlined />
                                    </ListItemIcon>
                                    <ListItemText primary={
                                        <Typography variant='h4'>
                                            Logout
                                        </Typography>} />
                                </ListItemButton>
                            </Box>
                        }
                    </List>
                </Grid>
            </Grid>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <TabContext value={value}>

            <Box sx={{ display: 'flex', flexGrow: 1, width: '100vw' }}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    sx={{
                        height: dashboard ? '122px' : '60px',
                        bgcolor: 'white', boxShadow: 'none', borderBottom: '1px solid #cbcbcb',
                        transition: '.3s ease-in-out',
                        overflow: 'visible',
                        zIndex: 2
                    }}
                >
                    <Grid container item direction='column' width='100vw' justifyContent='space-between'>
                        <Grid container item position='relative' justifyContent='space-between' alignItems='center' height='40px'
                            mt={dashboard ? 3 : '10px'}
                            px={3}
                            wrap='nowrap' sx={{ transition: '.3s ease-in-out' }}>
                            <Link to={isAuthenticated ? '/dashboard' : '/'} style={{ display: 'flex', flexDirection: 'row', textDecoration: 'none', alignItems: 'center' }}>

                                <Box mr={{ xs: 1, p: 0, maxHeight: '25px' }}>
                                    <img src={logo} />
                                </Box>
                                <Typography
                                    color='black'
                                    variant="h2"
                                    noWrap
                                    component="div"
                                    minWidth='27px'
                                    letterSpacing='-.75px'
                                >
                                    Career<span style={{ color: 'rgba(89, 111, 255, 1)' }}>Pivot</span>
                                </Typography>
                            </Link>
                            <Box sx={{ position: 'absolute', left: 'calc(256px + 50px)', alignItems: 'center', display: { xs: 'none', md: 'flex' } }}>
                                <FormControl sx={{ maxWidth: '300px', maxHeight: '38px' }} variant="outlined">
                                    <SearchBar
                                        id="outlined-adornment-weight"
                                        placeholder='Search'
                                        endAdornment={<InputAdornment position="end"
                                        >
                                            <IconButton color='primary' sx={{ fontSize: '20px' }}>
                                                <Search />
                                            </IconButton>
                                        </InputAdornment>}
                                        aria-describedby="outlined-weight-helper-text"
                                        inputProps={{
                                            'aria-label': 'weight',
                                        }}
                                        sx={{ maxHeight: '38px' }}
                                    />
                                </FormControl>
                            </Box>
                            <Box sx={{ display: { xs: 'none', md: 'flex' }, minWidth: '474px', gap: 2, justifyContent: 'end' }}>
                                {/* <TextButton sx={{ display: { xs: 'none', lg: 'block' } }}>Career Test</TextButton> */}
                                {/* <TextButton>Career Paths</TextButton> */}

                                {auth() ?
                                    <UserMenu />

                                    :
                                    <MainButton variant='contained' onClick={handleRegistrationLink}>Get started</MainButton>
                                }
                            </Box>
                            <Box sx={{ display: { xs: 'flex', md: 'none' }, columnGap: 3 }}>
                                <IconButton
                                    aria-label="show more"
                                    aria-controls={mobileMenuId}
                                    aria-haspopup="true"
                                    size='small'
                                >
                                    <Search color='primary' sx={{ fontSize: '26px' }} />
                                </IconButton>
                                <IconButton
                                    aria-label="show more"
                                    aria-controls={mobileMenuId}
                                    aria-haspopup="true"
                                    onClick={handleDrawerToggle}
                                    size='small'
                                >
                                    <MenuOutlined color='primary' sx={{ fontSize: '26px' }} />
                                </IconButton>
                            </Box>
                        </Grid>
                        <Grid container item position='relative' justifyContent='space-between' alignItems='end' height='58px'
                            px={dashboard ? 3 : '4vw'}
                            display={dashboard ? 'flex' : 'none'}
                            wrap='nowrap' sx={{ transition: '.3s ease-in-out' }}>
                            <Grid container item alignItems='center' wrap='nowrap' overflow='scroll'>
                                <Box sx={{ width: { xs: '0px', md: `calc(${drawerWidth}px + 30px)` }, transition: '.3s ease-in-out' }} />
                                <Grid container item width='fit-content' position='relative' >

                                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                                        <Tab label="Home" value="1" sx={{ width: '120px' }} onClick={() => navigate('/dashboard')} />
                                        <Tab label="Groups" value="2" sx={{ width: '120px', pl: 3 }} onClick={() => navigate('/dashboard/groups')} />
                                        {/* <Tab label="Jobs" value="3" sx={{ width: '120px', px: 3 }} />
                                        <Tab label="Events" value="4" sx={{ width: '120px' }} /> */}
                                    </TabList>
                                    {/* <Box height='5px' width='120px' position='absolute' bottom={0} left={indicatorPosition} /> */}
                                </Grid>
                                <Box sx={{ flexGrow: 1 }} />
                            </Grid>
                        </Grid>
                    </Grid>
                </AppBar>
                <Box
                    component="nav"
                    sx={{
                        width: dashboard ? { md: drawerWidth } : { md: '0px' }, flexShrink: { md: 0 }
                    }}
                    aria-label="mailbox folders"
                >
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor='right'
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                        sx={{
                            position: 'relative',
                            display: { xs: 'block', md: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, zIndex: 3, bgcolor: 'white' },
                            // '& .MuiBackdrop-root': {bgcolor: 'green'}
                        }}
                    >
                        <Box id='back' position='absolute' flexGrow={1} top={0} bottom={0} right={0} left={0} bgcolor='white' zIndex={0} />
                        <Box id='front' position='absolute' flexGrow={1} top={0} bottom={0} right={0} left={0} bgcolor='rgba(62, 85, 205, 0.02)' zIndex={0} />

                        {drawer}

                    </Drawer>
                    <Drawer
                        variant='permanent'
                        sx={{
                            position: 'relative',
                            display: { xs: 'none', md: 'block' },
                            '& .MuiDrawer-paper': {
                                boxSizing: 'border-box',
                                left: (dashboard) ? 0 : '-256px',
                                width: drawerWidth, transition: '.3s ease-in', zIndex: 1, bgcolor: 'rgba(62, 85, 205, 0.02)'
                            },
                        }}
                        open
                    >
                        <Box id='back' position='absolute' flexGrow={1} top={0} bottom={0} right={0} left={0} bgcolor='white' zIndex={0} />
                        <Box id='front' position='absolute' flexGrow={1} top={0} bottom={0} right={0} left={0} bgcolor='rgba(62, 85, 205, 0.02)' zIndex={0} />
                        {drawer}
                    </Drawer>
                </Box>
                <Box flexGrow={1} maxWidth={'100%'} mt={dashboard ? '122px' : '60px'}>
                    {props.children}
                </Box>
                {/* <Box
                    component="main"
                    sx={{ flexGrow: 1, py: 4, mt: 4, width: { sm: `calc(100% - ${drawerWidth}px)`, maxWidth: '100%' } }}
                >
                    <Toolbar sx={{ height: '64px' }} />
                    <TabPanel value="1" sx={{ px: 0 }}>
                        <Dashboard />
                    </TabPanel>
                    <TabPanel value="2">
                        <Posts />
                    </TabPanel>
                    <TabPanel value="3"></TabPanel>
                    <TabPanel value="4"></TabPanel>

                    {/* <Dashboard /> */}
                {/* </Box> */}
            </Box>
        </TabContext>

    );
}

DashboardDrawer.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default DashboardDrawer;