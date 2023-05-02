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
import { Button, Collapse, Grid, Tab } from '@mui/material';
import { CarpenterOutlined, ExpandLess, ExpandMore, GroupOutlined, HelpOutlined, Message, MessageOutlined, Notifications, NotificationsOutlined, PatternSharp, SettingsOutlined, StarBorder } from '@mui/icons-material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

const drawerWidth = 256;

const menuItems = [
    {
        first: {
            icon: <NotificationsOutlined sx={{fontSize: '18px'}} />,
            text: 'Notifications',
            link: ''
        }
    },
    {
        first: {
            icon: <MessageOutlined sx={{fontSize: '18px'}} />,
            text: 'Messages',
            link: ''
        }
    },
    {
        first: {
            icon: <PatternSharp sx={{fontSize: '18px'}} />,
            text: 'My Pivot Path',
            link: '',
        },
        second: [
            {
                text: 'Product Designer',
                link: ''
            }
        ],
        third: [
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
    },
    {
        first: {
            icon: <GroupOutlined sx={{fontSize: '18px'}} />,
            text: 'My Groups',
            link: '',
        },
        second: [
            {
                text: 'Remote Workers',
                link: ''
            },
            {
                text: 'Freelancing',
                link: ''
            },
            {
                text: 'Financial Freedon',
                link: ''
            }
        ]
    }

]



function DashboardDrawer(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [open, setOpen] = React.useState(true)
    const [aboutOpen, setAboutOpen] = React.useState(false)
    const [helpOpen, setHelpOpen] = React.useState(false)
    const [settingsOpen, setSettingsOpen] = React.useState(false)
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
      };

    const handleAboutOpen = () => {
        setAboutOpen(!aboutOpen)
    }

    const handleHelpOpen = () => {
        setHelpOpen(!helpOpen)
    }

    const handleSettingsOpen = () => {
        setSettingsOpen(!settingsOpen)
    }

    const bottomMenu = [
        { icon: <CarpenterOutlined sx={{fontSize: '18px'}} />, text: 'About', setOpen: handleAboutOpen, open: aboutOpen },
        { icon: <HelpOutlined sx={{fontSize: '18px'}} />, text: 'Help', setOpen: handleHelpOpen, open: helpOpen },
        { icon: <SettingsOutlined sx={{fontSize: '18px'}} />, text: 'Settings', setOpen: handleSettingsOpen, open: settingsOpen }
    ]

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <Toolbar sx={{height: {xs: '114px', sm: '128px'}}} />
            <Grid container item bgcolor='rgba(62, 85, 205, 0.02)'>
                <Grid container item direction='column' px={3}>
                    <Grid container item width='100%' my={4} justifyContent='center'>
                        <Button variant='outlined' color='primary' fullWidth>Write a post</Button>
                    </Grid>
                    <List disablePadding>
                        {menuItems.map((item, index) => (
                            <>
                                                <Divider />

                                <ListItem key={item.first.text} disablePadding>
                                    <ListItemButton href={item.first.link}>
                                        <ListItemIcon sx={{ minWidth: '36px' }}>
                                            {item.first.icon}
                                        </ListItemIcon>
                                        <ListItemText primary={item.first.text} />
                                    </ListItemButton>
                                </ListItem>
                                {item.second && item.second.map(second => (
                                    <List component="div" disablePadding>
                                        <ListItemButton sx={{ pl: 6.5 }}>
                                            <ListItemText primary={second.text} />
                                        </ListItemButton>
                                        {item.third ? item.third.map(third => (
                                            <Collapse in={true} timeout="auto" unmountOnExit>
                                                <List component="div" disablePadding>
                                                    <ListItemButton sx={{ pl: 9 }}>
                                                        <ListItemText primary={third.text} />
                                                    </ListItemButton>
                                                </List>
                                            </Collapse>
                                        ))
                                            : null}
                                    </List>
                                ))
                                }
                                {/* <Divider /> */}
                            </>
                        ))}
                        <Divider />
                        <List>
                            {bottomMenu.map(item => (
                                <>
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
                                </>
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

        <Box sx={{ display: 'flex', flexGrow: 1 }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    top: '64px',
                    bgcolor: 'white', boxShadow: 'none', borderBottom: '1px solid #cbcbcb', 
                    zIndex: (theme) => theme.zIndex.drawer + 1
                }}
            >
                <Toolbar>
                    <IconButton
                        color="primary"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        size='large'
                        sx={{ mr: 2, display: { sm: 'none' }, zIndex: 10, }}
                    >
                        <MenuIcon fontSize='49px'/>
                    </IconButton>
                    <Grid container item alignItems='center' wrap='nowrap' overflow='scroll'>

                    {/* <Grid container item maxWidth='100%' wrap='nowrap' overflow='scroll'> */}
<Box sx={{flexGrow: .75}} />
<Grid container item width='fit-content'>

                    <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Home" value="1" sx={{width: '120px'}} />
            <Tab label="Resources" value="2" sx={{width: '120px'}} />
            <Tab label="Jobs" value="3" sx={{width: '120px'}} />
            <Tab label="Events" value="4" sx={{width: '120px'}} />
          </TabList>
          </Grid>

          <Box sx={{flexGrow: 1}} />

          {/* </Grid> */}
          </Grid>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
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
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, zIndex: 1, bgcolor: 'rgba(62, 85, 205, 0.02)' },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, py: 4, width: { sm: `calc(100% - ${drawerWidth}px)`, maxWidth: '100%' } }}
            >
                <Toolbar sx={{ height: '64px' }} />
                <TabPanel value="1" sx={{px: 0}}>
                    <Dashboard />
                </TabPanel>
        <TabPanel value="2"></TabPanel>
        <TabPanel value="3"></TabPanel>
        <TabPanel value="4"></TabPanel>

                {/* <Dashboard /> */}
            </Box>
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