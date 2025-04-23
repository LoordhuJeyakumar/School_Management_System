import * as React from 'react';
import { 
    Divider, 
    ListItemButton, 
    ListItemIcon, 
    ListItemText, 
    ListSubheader,
    Tooltip,
    alpha
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';

// Icons
import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { colors } from '../../components/styles';

// Styled components
const StyledListItemButton = styled(ListItemButton)(({ theme, active }) => ({
    margin: theme.spacing(0.5, 1),
    borderRadius: '8px',
    backgroundColor: active ? alpha(colors.primary, 0.1) : 'transparent',
    '&:hover': {
        backgroundColor: alpha(colors.primary, 0.05),
    },
    transition: 'all 0.2s ease',
}));

const StyledListItemText = styled(ListItemText)(({ theme, active }) => ({
    '& .MuiTypography-root': {
        fontWeight: active ? 600 : 400,
        fontSize: '0.95rem',
        color: active ? colors.primary : colors.dark,
    },
}));

const StyledListSubheader = styled(ListSubheader)(({ theme }) => ({
    backgroundColor: 'transparent',
    fontSize: '0.75rem',
    color: colors.gray,
    lineHeight: '2.5rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '1px',
}));

const IconWrapper = styled(motion.div)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});

const StudentSideBar = () => {
    const location = useLocation();
    
    // Animation variants for icons
    const iconVariants = {
        hover: { scale: 1.2, rotate: 5 },
        tap: { scale: 0.95 },
    };
    
    // Check if the current path matches the link
    const isActive = (path) => {
        if (path === '/' && (location.pathname === '/' || location.pathname === '/Student/dashboard')) {
            return true;
        }
        return location.pathname.startsWith(path);
    };

    return (
        <>
            <React.Fragment>
                <StyledListItemButton 
                    component={Link} 
                    to="/"
                    active={isActive('/') ? 1 : 0}
                >
                    <ListItemIcon>
                        <IconWrapper 
                            whileHover="hover" 
                            whileTap="tap"
                            variants={iconVariants}
                        >
                            <HomeIcon 
                                sx={{ 
                                    color: isActive('/') ? colors.primary : colors.dark,
                                    fontSize: '1.3rem'
                                }} 
                            />
                        </IconWrapper>
                    </ListItemIcon>
                    <StyledListItemText 
                        primary="Home" 
                        active={isActive('/') ? 1 : 0}
                    />
                </StyledListItemButton>
                
                <StyledListItemButton 
                    component={Link} 
                    to="/Student/subjects"
                    active={isActive('/Student/subjects') ? 1 : 0}
                >
                    <ListItemIcon>
                        <IconWrapper 
                            whileHover="hover" 
                            whileTap="tap"
                            variants={iconVariants}
                        >
                            <AssignmentIcon 
                                sx={{ 
                                    color: isActive('/Student/subjects') ? colors.primary : colors.dark,
                                    fontSize: '1.3rem'
                                }} 
                            />
                        </IconWrapper>
                    </ListItemIcon>
                    <StyledListItemText 
                        primary="Subjects" 
                        active={isActive('/Student/subjects') ? 1 : 0}
                    />
                </StyledListItemButton>
                
                <StyledListItemButton 
                    component={Link} 
                    to="/Student/attendance"
                    active={isActive('/Student/attendance') ? 1 : 0}
                >
                    <ListItemIcon>
                        <IconWrapper 
                            whileHover="hover" 
                            whileTap="tap"
                            variants={iconVariants}
                        >
                            <ClassOutlinedIcon 
                                sx={{ 
                                    color: isActive('/Student/attendance') ? colors.primary : colors.dark,
                                    fontSize: '1.3rem'
                                }} 
                            />
                        </IconWrapper>
                    </ListItemIcon>
                    <StyledListItemText 
                        primary="Attendance" 
                        active={isActive('/Student/attendance') ? 1 : 0}
                    />
                </StyledListItemButton>
                
                <StyledListItemButton 
                    component={Link} 
                    to="/Student/complain"
                    active={isActive('/Student/complain') ? 1 : 0}
                >
                    <ListItemIcon>
                        <IconWrapper 
                            whileHover="hover" 
                            whileTap="tap"
                            variants={iconVariants}
                        >
                            <AnnouncementOutlinedIcon 
                                sx={{ 
                                    color: isActive('/Student/complain') ? colors.primary : colors.dark,
                                    fontSize: '1.3rem'
                                }} 
                            />
                        </IconWrapper>
                    </ListItemIcon>
                    <StyledListItemText 
                        primary="Complain" 
                        active={isActive('/Student/complain') ? 1 : 0}
                    />
                </StyledListItemButton>
            </React.Fragment>
            
            <Divider sx={{ my: 2, mx: 2, opacity: 0.6 }} />
            
            <React.Fragment>
                <StyledListSubheader component="div" inset>
                    User Settings
                </StyledListSubheader>
                
                <StyledListItemButton 
                    component={Link} 
                    to="/Student/profile"
                    active={isActive('/Student/profile') ? 1 : 0}
                >
                    <ListItemIcon>
                        <IconWrapper 
                            whileHover="hover" 
                            whileTap="tap"
                            variants={iconVariants}
                        >
                            <AccountCircleOutlinedIcon 
                                sx={{ 
                                    color: isActive('/Student/profile') ? colors.primary : colors.dark,
                                    fontSize: '1.3rem'
                                }} 
                            />
                        </IconWrapper>
                    </ListItemIcon>
                    <StyledListItemText 
                        primary="Profile" 
                        active={isActive('/Student/profile') ? 1 : 0}
                    />
                </StyledListItemButton>
                
                <StyledListItemButton 
                    component={Link} 
                    to="/logout"
                    active={isActive('/logout') ? 1 : 0}
                    sx={{ color: colors.danger }}
                >
                    <ListItemIcon>
                        <IconWrapper 
                            whileHover="hover" 
                            whileTap="tap"
                            variants={iconVariants}
                        >
                            <ExitToAppIcon 
                                sx={{ 
                                    color: isActive('/logout') ? colors.danger : colors.danger,
                                    opacity: isActive('/logout') ? 1 : 0.7,
                                    fontSize: '1.3rem'
                                }} 
                            />
                        </IconWrapper>
                    </ListItemIcon>
                    <StyledListItemText 
                        primary="Logout" 
                        active={isActive('/logout') ? 1 : 0}
                        sx={{ 
                            '& .MuiTypography-root': { 
                                color: colors.danger, 
                                opacity: isActive('/logout') ? 1 : 0.7,
                                fontWeight: isActive('/logout') ? 600 : 400,
                            } 
                        }}
                    />
                </StyledListItemButton>
            </React.Fragment>
        </>
    );
};

export default StudentSideBar;