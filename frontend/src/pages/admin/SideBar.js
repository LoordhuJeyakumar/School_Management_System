import * as React from 'react';
import { Divider, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import HomeIcon from "@mui/icons-material/Home";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import ReportIcon from '@mui/icons-material/Report';
import AssignmentIcon from '@mui/icons-material/Assignment';

const SideBar = () => {
    const location = useLocation();
    
    const menuItems = [
        { icon: <HomeIcon />, text: "Home", path: "/" },
        { icon: <ClassOutlinedIcon />, text: "Classes", path: "/Admin/classes" },
        { icon: <AssignmentIcon />, text: "Subjects", path: "/Admin/subjects" },
        { icon: <SupervisorAccountOutlinedIcon />, text: "Teachers", path: "/Admin/teachers" },
        { icon: <PersonOutlineIcon />, text: "Students", path: "/Admin/students" },
        { icon: <AnnouncementOutlinedIcon />, text: "Notices", path: "/Admin/notices" },
        { icon: <ReportIcon />, text: "Complains", path: "/Admin/complains" },
    ];

    const userItems = [
        { icon: <AccountCircleOutlinedIcon />, text: "Profile", path: "/Admin/profile" },
        { icon: <ExitToAppIcon />, text: "Logout", path: "/logout" },
    ];

    const isActive = (path) => {
        if (path === "/") {
            return location.pathname === "/" || location.pathname === "/Admin/dashboard";
        }
        return location.pathname.startsWith(path);
    };

    return (
        <StyledNav>
            <Box sx={{ mb: 3 }}>
                {menuItems.map((item, index) => (
                    <motion.div
                        key={item.text}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                        <StyledListItem
                            component={Link}
                            to={item.path}
                            $isActive={isActive(item.path)}
                        >
                            <ListItemIcon>
                                {React.cloneElement(item.icon, {
                                    sx: { 
                                        color: isActive(item.path) ? '#4361ee' : 'inherit',
                                        transition: 'all 0.3s ease'
                                    }
                                })}
                            </ListItemIcon>
                            <StyledListItemText 
                                primary={item.text}
                                $isActive={isActive(item.path)}
                            />
                        </StyledListItem>
                    </motion.div>
                ))}
            </Box>

            <Divider sx={{ 
                my: 2,
                backgroundColor: 'rgba(67, 97, 238, 0.1)',
            }} />

            <Box>
                <StyledSubheader component="div" inset>
                    User
                </StyledSubheader>
                {userItems.map((item, index) => (
                    <motion.div
                        key={item.text}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: (menuItems.length + index) * 0.1 }}
                    >
                        <StyledListItem
                            component={Link}
                            to={item.path}
                            $isActive={isActive(item.path)}
                        >
                            <ListItemIcon>
                                {React.cloneElement(item.icon, {
                                    sx: { 
                                        color: isActive(item.path) ? '#4361ee' : 'inherit',
                                        transition: 'all 0.3s ease'
                                    }
                                })}
                            </ListItemIcon>
                            <StyledListItemText 
                                primary={item.text}
                                $isActive={isActive(item.path)}
                            />
                        </StyledListItem>
                    </motion.div>
                ))}
            </Box>
        </StyledNav>
    );
};

export default SideBar;

const StyledNav = styled.nav`
    padding: 0.5rem;
`;

const StyledListItem = styled(ListItemButton)`
    border-radius: 10px;
    margin-bottom: 0.5rem;
    transition: all 0.3s ease;
    background: ${props => props.$isActive ? 'rgba(67, 97, 238, 0.1)' : 'transparent'};
    
    &:hover {
        background: rgba(67, 97, 238, 0.1);
        transform: translateX(5px);
    }
`;

const StyledListItemText = styled(ListItemText)`
    & .MuiListItemText-primary {
        font-weight: ${props => props.$isActive ? '600' : '400'};
        color: ${props => props.$isActive ? '#4361ee' : 'inherit'};
        transition: all 0.3s ease;
    }
`;

const StyledSubheader = styled(ListSubheader)`
    background: transparent;
    color: #64748b;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 0.5rem;
`;
