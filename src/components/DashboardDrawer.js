import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Dashboard from './Dashboard';
import { Button, Collapse, FormControl, Grid, InputAdornment, OutlinedInput, Tab } from '@mui/material';
import { CarpenterOutlined, ExpandLess, ExpandMore, GroupOutlined, HelpOutlined, MenuOutlined, Message, MessageOutlined, Notifications, NotificationsOutlined, PatternSharp, Search, Settings, SettingsOutlined, StarBorder } from '@mui/icons-material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Posts from './Posts';
import communityService from '../services/community.service';
import { useAuthUser, useIsAuthenticated } from 'react-auth-kit';
import { ToastContext } from '../contexts/ToastContext';
import logo from '../images/logo.png'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { grey } from '@mui/material/colors';
import styled from '@emotion/styled';
import UserMenu from './UserMenu';
import DashboardNav from './DashboardNav';
import { UserContext } from '../contexts/UserContext';


const drawerWidth = 256;

const pivotItems = [
    {
        text: 'Overview',
        link: ''
    },
    {
        text: 'Getting started',
        link: ''
    },
    {
        text: 'Education',
        link: ''
    },
    {
        text: 'Experience',
        link: ''
    },
    {
        text: 'Getting the job',
        link: ''
    },
    {
        text: 'Leveling up',
        link: ''
    }
]

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
        borderColor: '#596FFF'
    },
    "& :hover .Mui-focused, .Mui-focused": {
        border: '2px solid #596FFF'
    },
}))

function DashboardDrawer(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [open, setOpen] = React.useState(true)
    const [pivotOpen, setPivotOpen] = React.useState(false)
    const [groupsOpen, setGroupsOpen] = React.useState(false)
    const [aboutOpen, setAboutOpen] = React.useState(false)
    const [helpOpen, setHelpOpen] = React.useState(false)
    const [settingsOpen, setSettingsOpen] = React.useState(false)
    const [value, setValue] = React.useState('1');
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const [indicatorPosition, setIndicatorPosition] = React.useState(0)
    const [drawerAnimation, setDrawerAnimation] = React.useState(false)

    const { setMessage, setSeverity } = React.useContext(ToastContext)
    const { career, communities, setCommunities } = React.useContext(UserContext)

    const auth = useAuthUser()
    const isAuthenticated = useIsAuthenticated()
    const navigate = useNavigate()
    const location = useLocation()

    const mobileMenuId = 'primary-search-account-menu-mobile';

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleAboutOpen = () => {
        setAboutOpen(!aboutOpen)
    }

    const handleHelpOpen = () => {
        setHelpOpen(!helpOpen)
    }

    const handleRegistrationLink = () => {
        navigate('/register')
    }

    const handleSettingsOpen = () => {
        setSettingsOpen(!settingsOpen)
    }

    const handleGroupClick = (id) => {
        navigate(`/dashboard/community/${id}`)
    }

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    React.useEffect(() => {
        setDrawerAnimation(true)
        const result = localStorage.getItem('communities')
        setCommunities(result ? JSON.parse(result) : [])
    }, [])

    const drawer = (
        <div>
            <Toolbar sx={{ height: { xs: !location.pathname.includes('/dashboard') ? '60px' : '122px', sm: !location.pathname.includes('/dashboard') ? '60px' : '122px' } }} />
            <Grid container item bgcolor='rgba(62, 85, 205, 0.02)'>
                <Grid container item direction='column' px={3}>
                    <Grid container item width='100%' my={4} justifyContent='center'>
                        <Button onClick={() => navigate('/dashboard/posts/new')} variant='outlined' color='primary' sx={{bgcolor: 'white'}} fullWidth>{isAuthenticated() ? 'Write a post' : 'Log in to write a post'}</Button>
                    </Grid>

                    <List disablePadding>
                        {isAuthenticated() ?
                            <div>
                                <Divider />
                                <ListItemButton href=''>
                                    <ListItemIcon sx={{ minWidth: '36px' }}>
                                        <NotificationsOutlined sx={{ fontSize: '20px' }} />
                                    </ListItemIcon>
                                    <ListItemText primary={
                                        <Typography variant='h4' fontWeight={500} py={.75}>
                                            Notifications
                                        </Typography>} />
                                </ListItemButton>
                                <Divider />
                                <ListItemButton href=''>
                                    <ListItemIcon sx={{ minWidth: '36px' }}>
                                        <MessageOutlined sx={{ fontSize: '20px' }} />
                                    </ListItemIcon>
                                    <ListItemText primary={
                                        <Typography variant='h4' fontWeight={500} py={.75}>
                                            Messages
                                        </Typography>} />
                                </ListItemButton>
                            </div>
                            : null}
                        <Divider />
                        <ListItemButton href=''>
                            <ListItemIcon sx={{ minWidth: '36px' }}>
                                <Settings sx={{ fontSize: '20px' }} />
                            </ListItemIcon>
                            <ListItemText primary={
                                        <Typography variant='h4' fontWeight={500} py={.75}>
                                            Settings
                                        </Typography>} />
                        </ListItemButton>
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
                        height: location.pathname.includes('/dashboard') ? '122px' : '60px',
                        bgcolor: 'white', boxShadow: 'none', borderBottom: '1px solid #cbcbcb',
                        transition: '.3s ease-in-out',
                        overflow: 'hidden',
                        zIndex: (theme) => theme.zIndex.drawer + 1
                    }}
                >
                    <Grid container item direction='column' width='100vw' justifyContent='space-between'>
                        <Grid container item position='relative' justifyContent='space-between' alignItems='center' height='40px'
                            mt={location.pathname.includes('/dashboard') ? 3 : '10px'}
                            px={location.pathname.includes('/dashboard') ? '4vw' : 3}
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
                            <Box sx={{ position: 'absolute', left: 'calc(256px + 50px)', display: { xs: 'none', md: 'flex' } }}>
                                <FormControl sx={{ m: 1, maxWidth: '300px', maxHeight: '38px' }} variant="outlined">
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
                                <TextButton sx={{display: {xs: 'none', lg: 'block'}}}>Career Test</TextButton>
                                {/* <TextButton>Career Paths</TextButton> */}

                                {auth() ?
                                    <UserMenu />

                                    :
                                    <MainButton variant='contained' onClick={handleRegistrationLink}>Get started</MainButton>
                                }
                            </Box>
                            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
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
                        <Grid container item position='relative' justifyContent='space-between' alignItems='center' height='64px'
                            px={!location.pathname.includes('/dashboard') ? '4vw' : 3}
                            wrap='nowrap' sx={{ transition: '.3s ease-in-out' }}>
                            <Grid container item alignItems='center' wrap='nowrap' overflow='scroll'>
                                <Box sx={{ width: {xs: '0px', md: `calc(${drawerWidth}px + 30px)`}, transition: '.3s ease-in-out' }} />
                                <Grid container item width='fit-content' position='relative' >

                                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                                        <Tab label="Home" value="1" sx={{ width: '120px' }} onClick={() => navigate('/dashboard?career=Product%20Design')} />
                                        {/* <Tab label="Resources" value="2" sx={{ width: '120px' }} /> */}
                                        <Tab label="Jobs" value="2" sx={{ width: '120px', mx: 3 }} />
                                        <Tab label="Events" value="3" sx={{ width: '120px' }} />
                                    </TabList>
                                    <Box height='5px' width='120px' position='absolute' bottom={0} left={indicatorPosition} />
                                </Grid>
                                <Box sx={{ flexGrow: 1 }} />
                            </Grid>
                        </Grid>
                    </Grid>
                </AppBar>
                <Box
                    component="nav"
                    sx={{
                        width: location.pathname.includes('/dashboard') ? { md: drawerWidth } : { md: '0px' }, flexShrink: { md: 0 }, transition: '.3s ease-in-out'
                    }}
                    aria-label="mailbox folders"
                >
                    <Drawer
                        container={container}
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                        sx={{
                            position: 'relative',
                            display: { xs: 'block', md: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, zIndex: 1, bgcolor: 'white' },
                        }}
                    >
                        <Box id='back' position='absolute' flexGrow={1} top={0} bottom={0} right={0} left={0} bgcolor='rgba(62, 85, 205, 0.02)' zIndex={0} />

                        {drawer}

                    </Drawer>
                    <Drawer
                        variant='permanent'
                        sx={{
                            position: 'relative',
                            display: { xs: 'none', md: 'block' },
                            '& .MuiDrawer-paper': {
                                boxSizing: 'border-box',
                                left: (!drawerAnimation || location.pathname.includes('/dashboard')) ? 0 : '-256px',
                                width: drawerWidth, transition: '.3s ease-in', zIndex: 1, bgcolor: 'rgba(62, 85, 205, 0.02)'
                            },
                        }}
                        open
                    >
                        {drawer}
                        <Box position='absolute' flexGrow={1} bgcolor='white' />
                    </Drawer>
                </Box>
                <Box flexGrow={1} maxWidth='100%' mt={location.pathname.includes('/dashboard') ? '122px' : '60px'}>
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