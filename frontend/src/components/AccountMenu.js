import React, { useState } from 'react';
import { 
    Box, 
    Avatar, 
    Menu, 
    MenuItem, 
    ListItemIcon, 
    Divider, 
    IconButton, 
    Tooltip, 
    Typography,
    alpha
} from '@mui/material';
import { 
    Settings, 
    Logout, 
    Person, 
    Notifications, 
    Help, 
    Brightness4
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import { colors } from './styles';

// Styled components
const StyledAvatar = styled(Avatar)(({ theme }) => ({
    width: 40,
    height: 40,
    border: `2px solid ${alpha(colors.primary, 0.2)}`,
    backgroundColor: alpha(colors.primary, 0.1),
    color: colors.primary,
    fontWeight: 600,
    transition: 'all 0.3s ease',
    '&:hover': {
        borderColor: alpha(colors.primary, 0.5),
        transform: 'scale(1.05)',
    },
}));

const StyledMenu = styled(Menu)(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 12,
        minWidth: 220,
        boxShadow: '0 10px 40px -10px rgba(0,0,0,0.2)',
        '& .MuiMenu-list': {
            padding: '8px',
        },
    },
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
    borderRadius: 8,
    margin: '4px 0',
    padding: '10px 12px',
    transition: 'all 0.2s ease',
    '&:hover': {
        backgroundColor: alpha(colors.primary, 0.05),
    },
}));

const UserInfoSection = styled(Box)(({ theme }) => ({
    padding: '16px 16px 8px 16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
}));

const UserName = styled(Typography)(({ theme }) => ({
    fontWeight: 600,
    fontSize: '1rem',
    marginTop: 8,
    color: colors.dark,
}));

const UserRole = styled(Typography)(({ theme }) => ({
    fontSize: '0.8rem',
    color: colors.gray,
    marginBottom: 8,
}));

const AccountMenu = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const { currentRole, currentUser } = useSelector(state => state.user);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };
    
    // Animation variants
    const avatarVariants = {
        hover: { scale: 1.1, rotate: 5 },
        tap: { scale: 0.95 },
    };
    
    const menuItemVariants = {
        hover: { x: 5 },
        tap: { scale: 0.98 },
    };

    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        component={motion.button}
                        whileHover="hover"
                        whileTap="tap"
                        variants={avatarVariants}
                    >
                        <StyledAvatar>
                            {currentUser && currentUser.name ? String(currentUser.name).charAt(0).toUpperCase() : 'U'}
                        </StyledAvatar>
                    </IconButton>
                </Tooltip>
            </Box>
            
            <StyledMenu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.15))',
                        mt: 1.5,
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
            >
                <UserInfoSection>
                    <StyledAvatar sx={{ width: 60, height: 60 }}>
                        {currentUser && currentUser.name ? String(currentUser.name).charAt(0).toUpperCase() : 'U'}
                    </StyledAvatar>
                    <UserName>{currentUser && currentUser.name ? currentUser.name : 'User'}</UserName>
                    <UserRole>{currentRole ? currentRole.toUpperCase() : 'User'}</UserRole>
                </UserInfoSection>
                
                <Divider sx={{ my: 1, mx: 1 }} />
                
                <motion.div whileHover="hover" whileTap="tap" variants={menuItemVariants}>
                    <StyledMenuItem component={Link} to={`/${currentRole}/profile`}>
                        <ListItemIcon>
                            <Person fontSize="small" sx={{ color: colors.primary }} />
                        </ListItemIcon>
                        <Typography variant="body2">My Profile</Typography>
                    </StyledMenuItem>
                </motion.div>
                
                <motion.div whileHover="hover" whileTap="tap" variants={menuItemVariants}>
                    <StyledMenuItem>
                        <ListItemIcon>
                            <Notifications fontSize="small" sx={{ color: colors.warning }} />
                        </ListItemIcon>
                        <Typography variant="body2">Notifications</Typography>
                    </StyledMenuItem>
                </motion.div>
                
                <motion.div whileHover="hover" whileTap="tap" variants={menuItemVariants}>
                    <StyledMenuItem>
                        <ListItemIcon>
                            <Settings fontSize="small" sx={{ color: colors.info }} />
                        </ListItemIcon>
                        <Typography variant="body2">Settings</Typography>
                    </StyledMenuItem>
                </motion.div>
                
                <motion.div whileHover="hover" whileTap="tap" variants={menuItemVariants}>
                    <StyledMenuItem>
                        <ListItemIcon>
                            <Brightness4 fontSize="small" sx={{ color: colors.secondary }} />
                        </ListItemIcon>
                        <Typography variant="body2">Dark Mode</Typography>
                    </StyledMenuItem>
                </motion.div>
                
                <motion.div whileHover="hover" whileTap="tap" variants={menuItemVariants}>
                    <StyledMenuItem>
                        <ListItemIcon>
                            <Help fontSize="small" sx={{ color: colors.info }} />
                        </ListItemIcon>
                        <Typography variant="body2">Help & Support</Typography>
                    </StyledMenuItem>
                </motion.div>
                
                <Divider sx={{ my: 1, mx: 1 }} />
                
                <motion.div whileHover="hover" whileTap="tap" variants={menuItemVariants}>
                    <StyledMenuItem component={Link} to="/logout" sx={{ color: colors.danger }}>
                        <ListItemIcon>
                            <Logout fontSize="small" sx={{ color: colors.danger }} />
                        </ListItemIcon>
                        <Typography variant="body2" sx={{ color: colors.danger }}>Logout</Typography>
                    </StyledMenuItem>
                </motion.div>
            </StyledMenu>
        </>
    );
};

export default AccountMenu;