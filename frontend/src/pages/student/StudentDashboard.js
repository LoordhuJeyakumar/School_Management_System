import { useState, useEffect } from 'react';
import {
    CssBaseline,
    Box,
    Toolbar,
    List,
    Typography,
    Divider,
    IconButton,
    useTheme,
    useMediaQuery,
    Badge,
    Tooltip,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import StudentSideBar from './StudentSideBar';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import StudentHomePage from './StudentHomePage';
import StudentProfile from './StudentProfile';
import StudentSubjects from './StudentSubjects';
import ViewStdAttendance from './ViewStdAttendance';
import StudentComplain from './StudentComplain';
import Logout from '../Logout';
import AccountMenu from '../../components/AccountMenu';
import { AppBar, Drawer, colors } from '../../components/styles';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { alpha } from '@mui/material/styles';

// Styled components with Emotion
const StyledAppBar = styled(AppBar)(({ theme, open }) => ({
    boxShadow: '0 4px 20px 0 rgba(0,0,0,0.05)',
    backdropFilter: 'blur(8px)',
    backgroundColor: alpha(colors.white, 0.9),
    borderBottom: `1px solid ${colors.grayLight}`,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: 260,
        width: `calc(100% - 260px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const StyledDrawer = styled(Drawer)(({ theme, open }) => ({
    '& .MuiDrawer-paper': {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: 260,
        boxShadow: '2px 0 20px rgba(0, 0, 0, 0.05)',
        backgroundColor: colors.white,
        borderRight: `1px solid ${colors.grayLight}`,
        color: colors.dark,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: 'border-box',
        ...(!open && {
            overflowX: 'hidden',
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            width: theme.spacing(7),
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing(9),
            },
        }),
    },
}));

const MainContent = styled(Box)(({ theme }) => ({
    backgroundColor: alpha(colors.light, 0.8),
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
    transition: theme.transitions.create('all', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    padding: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
        padding: theme.spacing(3),
    },
}));

const PageContainer = styled(motion.div)({
    height: '100%',
});

const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
}));

const AppBarIconButton = styled(IconButton)(({ theme }) => ({
    margin: theme.spacing(0, 0.5),
    transition: 'transform 0.2s ease-in-out',
    '&:hover': {
        transform: 'scale(1.1)',
    },
}));

const DashboardTitle = styled(Typography)(({ theme }) => ({
    flexGrow: 1,
    fontWeight: 600,
    background: `linear-gradient(45deg, ${colors.primary} 30%, ${colors.secondary} 90%)`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    letterSpacing: '0.5px',
}));

const StudentDashboard = () => {
    const [open, setOpen] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    const theme = useTheme();
    const location = useLocation();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    
    // Close drawer on mobile by default
    useEffect(() => {
        if (isMobile) {
            setOpen(false);
        } else {
            setOpen(true);
        }
    }, [isMobile]);

    const toggleDrawer = () => {
        setOpen(!open);
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        // In a real app, you would implement theme switching logic here
    };

    // Page transition variants for Framer Motion
    const pageVariants = {
        initial: {
            opacity: 0,
            y: 20,
        },
        in: {
            opacity: 1,
            y: 0,
        },
        out: {
            opacity: 0,
            y: -20,
        },
    };

    const pageTransition = {
        type: 'tween',
        ease: 'anticipate',
        duration: 0.5,
    };

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <StyledAppBar open={open} position='fixed'>
                    <Toolbar sx={{ pr: '24px' }}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' }),
                                color: colors.dark,
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <DashboardTitle
                            component="h1"
                            variant="h5"
                            noWrap
                        >
                            Student Dashboard
                        </DashboardTitle>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Tooltip title="Toggle dark mode">
                                <AppBarIconButton 
                                    color="inherit" 
                                    onClick={toggleDarkMode}
                                    component={motion.button}
                                    whileHover={{ rotate: 180 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
                                </AppBarIconButton>
                            </Tooltip>
                            
                            <Tooltip title="Notifications">
                                <AppBarIconButton 
                                    color="inherit"
                                    component={motion.button}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <Badge badgeContent={4} color="error">
                                        <NotificationsIcon />
                                    </Badge>
                                </AppBarIconButton>
                            </Tooltip>
                            
                            <AccountMenu />
                        </Box>
                    </Toolbar>
                </StyledAppBar>
                
                <StyledDrawer 
                    variant={isMobile ? "temporary" : "permanent"} 
                    open={open} 
                    onClose={isMobile ? toggleDrawer : undefined}
                >
                    <ToolbarStyled>
                        <IconButton 
                            onClick={toggleDrawer}
                            component={motion.button}
                            whileHover={{ x: 5 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <ChevronLeftIcon />
                        </IconButton>
                    </ToolbarStyled>
                    <Divider />
                    <List component="nav">
                        <StudentSideBar />
                    </List>
                </StyledDrawer>
                
                <MainContent component="main">
                    <Toolbar />
                    <AnimatePresence mode="wait">
                        <PageContainer
                            key={location.pathname}
                            initial="initial"
                            animate="in"
                            exit="out"
                            variants={pageVariants}
                            transition={pageTransition}
                        >
                            <Routes>
                                <Route path="/" element={<StudentHomePage />} />
                                <Route path='*' element={<Navigate to="/" />} />
                                <Route path="/Student/dashboard" element={<StudentHomePage />} />
                                <Route path="/Student/profile" element={<StudentProfile />} />
                                <Route path="/Student/subjects" element={<StudentSubjects />} />
                                <Route path="/Student/attendance" element={<ViewStdAttendance />} />
                                <Route path="/Student/complain" element={<StudentComplain />} />
                                <Route path="/logout" element={<Logout />} />
                            </Routes>
                        </PageContainer>
                    </AnimatePresence>
                </MainContent>
            </Box>
        </>
    );
}

export default StudentDashboard;