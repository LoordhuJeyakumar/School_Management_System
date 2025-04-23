import { useState } from 'react';
import {
    CssBaseline,
    Box,
    Toolbar,
    List,
    Typography,
    Divider,
    IconButton,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import TeacherSideBar from './TeacherSideBar';
import { Navigate, Route, Routes } from 'react-router-dom';
import Logout from '../Logout'
import AccountMenu from '../../components/AccountMenu';
import { AppBar, Drawer } from '../../components/styles';
import StudentAttendance from '../admin/studentRelated/StudentAttendance';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

import TeacherClassDetails from './TeacherClassDetails';
import TeacherComplain from './TeacherComplain';
import TeacherHomePage from './TeacherHomePage';
import TeacherProfile from './TeacherProfile';
import TeacherViewStudent from './TeacherViewStudent';
import StudentExamMarks from '../admin/studentRelated/StudentExamMarks';

const TeacherDashboard = () => {
    const [open, setOpen] = useState(true);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    // Auto collapse sidebar on mobile
    useState(() => {
        if (isMobile) {
            setOpen(false);
        }
    }, [isMobile]);

    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <StyledWrapper>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <StyledAppBar position="absolute" open={open}>
                    <Toolbar sx={{ pr: '24px' }}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h5"
                            color="inherit"
                            noWrap
                            sx={{ 
                                flexGrow: 1,
                                fontWeight: 600,
                                background: 'linear-gradient(45deg, #4361ee, #3a0ca3)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}
                        >
                            Teacher Dashboard
                        </Typography>
                        <AccountMenu />
                    </Toolbar>
                </StyledAppBar>

                <StyledDrawer variant="permanent" open={open}>
                    <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', px: 1 }}>
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    <List component="nav" sx={{ px: 2, py: 1 }}>
                        <TeacherSideBar />
                    </List>
                </StyledDrawer>

                <MainContent>
                    <Toolbar />
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Routes>
                            <Route path="/" element={<TeacherHomePage />} />
                            <Route path='*' element={<Navigate to="/" />} />
                            <Route path="/Teacher/dashboard" element={<TeacherHomePage />} />
                            <Route path="/Teacher/profile" element={<TeacherProfile />} />
                            <Route path="/Teacher/complain" element={<TeacherComplain />} />
                            <Route path="/Teacher/class" element={<TeacherClassDetails />} />
                            <Route path="/Teacher/class/student/:id" element={<TeacherViewStudent />} />
                            <Route path="/Teacher/class/student/attendance/:studentID/:subjectID" element={<StudentAttendance situation="Subject" />} />
                            <Route path="/Teacher/class/student/marks/:studentID/:subjectID" element={<StudentExamMarks situation="Subject" />} />
                            <Route path="/logout" element={<Logout />} />
                        </Routes>
                    </motion.div>
                </MainContent>
            </Box>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
    min-height: 100vh;
    background: linear-gradient(135deg, rgba(67, 97, 238, 0.05), rgba(58, 12, 163, 0.05));
`;

const StyledAppBar = styled(AppBar)`
    backdrop-filter: blur(8px);
    background: rgba(255, 255, 255, 0.9);
    border-bottom: 1px solid rgba(241, 242, 244, 0.5);
`;

const StyledDrawer = styled(Drawer)`
    & .MuiDrawer-paper {
        background: rgba(255, 255, 255, 0.9);
        backdrop-filter: blur(8px);
        border-right: none;
        box-shadow: 2px 0 10px rgba(0, 0, 0, 0.05);
        transition: all 0.3s ease;
    }
`;

const MainContent = styled(Box)`
    flex-grow: 1;
    min-height: 100vh;
    padding: ${props => props.theme.spacing(3)};
    
    @media (max-width: 600px) {
        padding: ${props => props.theme.spacing(2)};
    }
`;

export default TeacherDashboard;