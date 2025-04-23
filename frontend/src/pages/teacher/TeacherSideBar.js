import * as React from 'react';
import { 
    Divider, ListItemButton, ListItemIcon, ListItemText, 
    ListSubheader, Box, Typography, styled 
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import { useSelector } from 'react-redux';

const TeacherSideBar = () => {
    const { currentUser } = useSelector((state) => state.user);
    const sclassName = currentUser.teachSclass;
    const location = useLocation();

    const menuItems = [
        {
            path: "/",
            icon: <HomeIcon />,
            text: "Home",
            section: "main"
        },
        {
            path: "/Teacher/class",
            icon: <ClassOutlinedIcon />,
            text: `Class ${sclassName?.sclassName}`,
            section: "main"
        },
        {
            path: "/Teacher/complain",
            icon: <AnnouncementOutlinedIcon />,
            text: "Complain",
            section: "main"
        },
        {
            path: "/Teacher/profile",
            icon: <AccountCircleOutlinedIcon />,
            text: "Profile",
            section: "user"
        },
        {
            path: "/logout",
            icon: <ExitToAppIcon />,
            text: "Logout",
            section: "user"
        }
    ];

    const isActive = (path) => {
        if (path === "/") {
            return location.pathname === "/" || location.pathname === "/Teacher/dashboard";
        }
        return location.pathname.startsWith(path);
    };

    const renderMenuSection = (section) => (
        menuItems
            .filter(item => item.section === section)
            .map((item, index) => (
                <StyledListItemButton
                    key={item.text}
                    component={Link}
                    to={item.path}
                    selected={isActive(item.path)}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                >
                    <ListItemIcon sx={{
                        color: isActive(item.path) ? 'primary.main' : 'text.secondary',
                        transition: 'color 0.3s ease'
                    }}>
                        {item.icon}
                    </ListItemIcon>
                    <ListItemText 
                        primary={item.text}
                        primaryTypographyProps={{
                            sx: {
                                fontWeight: isActive(item.path) ? 600 : 400,
                                color: isActive(item.path) ? 'primary.main' : 'text.primary'
                            }
                        }}
                    />
                    {isActive(item.path) && (
                        <ActiveIndicator
                            layoutId="activeIndicator"
                            initial={false}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                    )}
                </StyledListItemButton>
            ))
    );

    return (
        <Box sx={{ position: 'relative' }}>
            <React.Fragment>
                {renderMenuSection("main")}
            </React.Fragment>
            
            <StyledDivider />
            
            <React.Fragment>
                <StyledSubheader component="div" inset>
                    User
                </StyledSubheader>
                {renderMenuSection("user")}
            </React.Fragment>
        </Box>
    );
};

const StyledListItemButton = styled(motion.create(ListItemButton))`
    margin: 4px 8px;
    border-radius: 8px;
    position: relative;
    transition: all 0.3s ease;

    &:hover {
        background-color: ${({ theme }) => theme.palette.action.hover};
    }

    &.Mui-selected {
        background-color: ${({ theme }) => theme.palette.primary.lighter};
    }
`;

const StyledDivider = styled(Divider)`
    margin: 16px 0;
`;

const StyledSubheader = styled(ListSubheader)`
    color: ${({ theme }) => theme.palette.text.secondary};
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    background: transparent;
`;

const ActiveIndicator = styled(motion.div)`
    position: absolute;
    right: 0;
    width: 3px;
    height: 100%;
    background: ${({ theme }) => theme.palette.primary.main};
    border-radius: 4px;
`;

export default TeacherSideBar;