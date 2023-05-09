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
import { CarpenterOutlined, ExpandLess, ExpandMore, GroupOutlined, HelpOutlined, MenuOutlined, Message, MessageOutlined, Notifications, NotificationsOutlined, PatternSharp, Search, SettingsOutlined, StarBorder } from '@mui/icons-material';
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


const drawerWidth = 256;

const menuItems = [
    {
        first: {
            icon: <NotificationsOutlined sx={{ fontSize: '18px' }} />,
            text: 'Notifications',
            link: ''
        }
    },
    {
        first: {
            icon: <MessageOutlined sx={{ fontSize: '18px' }} />,
            text: 'Messages',
            link: ''
        }
    }]

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

const SearchBar = styled(OutlinedInput)(({ theme }) => ({
    "& input::placeholder": {
        color: '#596FFF',
        fontWeight: 500
    },
    "& .MuiOutlinedInput-notchedOutline, &:hover .MuiOutlinedInput-notchedOutline": {
        border: '1px solid #596FFF'
    },
    color: '#596FFF',
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
    const [communities, setCommunities] = React.useState([])
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const [indicatorPosition, setIndicatorPosition] = React.useState(0)
    const [drawerAnimation, setDrawerAnimation] = React.useState(false)

    const { setMessage, setSeverity } = React.useContext(ToastContext)

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

    const bottomMenu = [
        { icon: <CarpenterOutlined sx={{ fontSize: '18px' }} />, text: 'About', setOpen: handleAboutOpen, open: aboutOpen },
        { icon: <HelpOutlined sx={{ fontSize: '18px' }} />, text: 'Help', setOpen: handleHelpOpen, open: helpOpen },
        { icon: <SettingsOutlined sx={{ fontSize: '18px' }} />, text: 'Settings', setOpen: handleSettingsOpen, open: settingsOpen }
    ]

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
        if (isAuthenticated()) {
            communityService.getMy(auth().id)
                .then(({ data }) => {
                    setCommunities(data)
                })
                .catch(({ response }) => {
                    setMessage(response.data.message)
                    setSeverity('error')
                })
        }
    }, [])

    const drawer = (
        <div>
            <Toolbar sx={{ height: { xs: !location.pathname.includes('/dashboard') ? '60px' : '122px', sm: !location.pathname.includes('/dashboard') ? '60px' : '122px' } }} />
            <Grid container item bgcolor='rgba(62, 85, 205, 0.02)'>
                <Grid container item direction='column' px={3}>
                    <Grid container item width='100%' my={4} justifyContent='center'>
                        <Button variant='outlined' color='primary' fullWidth>{isAuthenticated() ? 'Write a post' : 'Log in to write a post'}</Button>
                    </Grid>

                    <List disablePadding>
                        {isAuthenticated() ?
                            <>
                                <div>
                                <Divider />
                                    <ListItemButton href=''>
                                        <ListItemIcon sx={{ minWidth: '36px' }}>
                                            <NotificationsOutlined sx={{ fontSize: '18px' }} />
                                        </ListItemIcon>
                                        <ListItemText primary='Notifications' />
                                    </ListItemButton>
                                <Divider />
                                    <ListItemButton href=''>
                                        <ListItemIcon sx={{ minWidth: '36px' }}>
                                            <MessageOutlined sx={{ fontSize: '18px' }} />
                                        </ListItemIcon>
                                        <ListItemText primary='Messages' />
                                    </ListItemButton>
                                    <Divider />
                                    <ListItemButton href='' onClick={() => setPivotOpen(!pivotOpen)}>
                                        <ListItemIcon sx={{ minWidth: '36px' }}>
                                        <PatternSharp sx={{ fontSize: '18px' }} />
                                        </ListItemIcon>
                                        <ListItemText primary='Pivot Path' secondary='Product Design' />
                                        {pivotOpen ? <ExpandLess /> : <ExpandMore />}
                                    </ListItemButton>
                                    <Collapse in={pivotOpen} timeout="auto" unmountOnExit>
                                        {pivotItems.length !== 0 ? pivotItems.map(item => (
                                            <List key={item.text} component="div" disablePadding>
                                                <ListItemButton sx={{ pl: 6.5 }} href={item.link}>
                                                    <ListItemText primary={item.text} />
                                                </ListItemButton>
                                            </List>
                                        )) : null}
                                    </Collapse>
                                    {/* <Divider /> */}
                                </div>
                                <Divider />
                                <ListItemButton href='' onClick={() => setGroupsOpen(!groupsOpen)}>
                                    <ListItemIcon sx={{ minWidth: '36px' }}>
                                        <GroupOutlined sx={{ fontSize: '18px' }} />
                                    </ListItemIcon>
                                    <ListItemText primary='My Groups' />
                                    {groupsOpen ? <ExpandLess /> : <ExpandMore />}
                                </ListItemButton>
                                <Collapse in={groupsOpen} timeout="auto" unmountOnExit>
                                    {communities.length !== 0 ? communities.map(item => (
                                        <List key={item._id} component="div" disablePadding>
                                            <ListItemButton sx={{ pl: 6.5 }}>
                                                <ListItemText primary={item.title} />
                                            </ListItemButton>
                                        </List>))
                                        : [
                                            {
                                                text: 'Remote Workers',
                                                link: ''
                                            },
                                            {
                                                text: 'Freelancing',
                                                link: ''
                                            },
                                            {
                                                text: 'Financial Freedom',
                                                link: ''
                                            }
                                        ].map(item => (
                                            <List key={item._id} component="div" disablePadding>
                                                <ListItemButton sx={{ pl: 6.5 }}>
                                                    <ListItemText primary={item.title} />
                                                </ListItemButton>
                                            </List>
                                        ))}
                                </Collapse>
                            </> : null}
                            <Divider />
                        <List>
                            {bottomMenu.map(item => (
                                <div key={item.text}>
                                    <ListItemButton onClick={item.setOpen}>
                                        <ListItemIcon>
                                            {item.icon}
                                        </ListItemIcon>
                                        <ListItemText primary={item.text} />
                                        {item.open ? <ExpandLess /> : <ExpandMore />}
                                    </ListItemButton>
                                    <Collapse in={item.open} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding>
                                            <ListItemButton sx={{ pl: 4 }}>
                                                <ListItemIcon>
                                                    <StarBorder />
                                                </ListItemIcon>
                                                <ListItemText primary="Starred" />
                                            </ListItemButton>
                                        </List>
                                    </Collapse>
                                </div>
                            ))}

                        </List>
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
                            <Link to='/' style={{ display: 'flex', flexDirection: 'row', textDecoration: 'none', alignItems: 'center' }}>

                                <Box mr={{ xs: 1, p: 0, maxHeight: '25px' }}>
                                    <img src={logo} />
                                </Box>
                                <Typography
                                    color='black'
                                    variant="h6"
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
                                <TextButton>Career Test</TextButton>
                                <TextButton>Career Paths</TextButton>

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
                                <Box sx={{ width: `calc(${drawerWidth}px + 30px)` }} />
                                <Grid container item width='fit-content' position='relative'>

                                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                                        <Tab label="Home" value="1" sx={{ width: '120px' }} onClick={() => navigate('/dashboard?career=Product%20Design')} />
                                        <Tab label="Resources" value="2" sx={{ width: '120px' }} />
                                        <Tab label="Jobs" value="3" sx={{ width: '120px' }} />
                                        <Tab label="Events" value="4" sx={{ width: '120px' }} />
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
                        width: location.pathname.includes('/dashboard') && { sm: drawerWidth }, flexShrink: { sm: 0 },
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
                            display: { xs: 'block', sm: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, zIndex: 1 },
                        }}
                    >
                        {drawer}
                    </Drawer>
                    <Drawer
                        variant='permanent'
                        sx={{
                            display: { xs: 'none', sm: 'block' },
                            '& .MuiDrawer-paper': {
                                boxSizing: 'border-box',
                                left: (!drawerAnimation || location.pathname.includes('/dashboard')) ? 0 : '-256px',
                                width: drawerWidth, transition: '.3s ease-in', zIndex: 1, bgcolor: 'rgba(62, 85, 205, 0.02)'
                            },
                        }}
                        open
                    >
                        {drawer}
                    </Drawer>
                </Box>
                <Box maxWidth='100%' mt='60px'>
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