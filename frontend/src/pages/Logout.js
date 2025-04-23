import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authLogout } from '../redux/userRelated/userSlice';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Paper, Typography, Box, Avatar, Divider, useTheme, useMediaQuery } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import CancelIcon from '@mui/icons-material/Cancel';

const Logout = () => {
    const currentUser = useSelector(state => state.user.currentUser);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(authLogout());
        navigate('/');
    };

    const handleCancel = () => {
        navigate(-1);
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { 
            opacity: 1, 
            scale: 1,
            transition: { 
                duration: 0.4,
                ease: "easeOut"
            }
        },
        exit: {
            opacity: 0,
            scale: 0.95,
            transition: { 
                duration: 0.2,
                ease: "easeIn"
            }
        }
    };

    // Get first letter of name for Avatar
    const getInitials = (name) => {
        if (!name) return '?';
        return name.split(' ').map(word => word[0]).join('').toUpperCase();
    };

    // Function to determine a consistent avatar color based on name
    const getAvatarColor = (name) => {
        if (!name) return '#4361ee';
        
        const colors = [
            '#4361ee', '#3a0ca3', '#7209b7', '#f72585', 
            '#4cc9f0', '#4895ef', '#560bad', '#480ca8'
        ];
        
        // Simple hash function to generate consistent color for a name
        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }
        
        return colors[Math.abs(hash) % colors.length];
    };

    return (
        <LogoutWrapper>
            <LogoutContainer
                as={motion.div}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                <Box sx={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%'
                }}>
                    <Avatar 
                        sx={{ 
                            width: 80, 
                            height: 80, 
                            bgcolor: getAvatarColor(currentUser?.name),
                            fontSize: '2rem',
                            mb: 2,
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                        }}
                    >
                        {getInitials(currentUser?.name)}
                    </Avatar>
                    
                    <Typography 
                        variant="h5" 
                        component="h1" 
                        sx={{ 
                            fontWeight: 600,
                            mb: 1,
                            background: 'linear-gradient(90deg, #4361ee, #3a0ca3)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            color: 'transparent',
                            textAlign: 'center'
                        }}
                    >
                        {currentUser?.name || 'User'}
                    </Typography>

                    <Typography 
                        variant="body2" 
                        sx={{ 
                            color: 'text.secondary',
                            mb: 1,
                            textAlign: 'center'
                        }}
                    >
                        {currentUser?.email || ''}
                    </Typography>
                </Box>

                <Divider sx={{ width: '80%', my: 3 }} />

                <LogoutMessage>
                    Are you sure you want to log out?
                </LogoutMessage>

                <ButtonContainer>
                    <LogoutButtonLogout 
                        as={motion.button} 
                        whileHover={{ scale: 1.05 }} 
                        whileTap={{ scale: 0.95 }}
                        onClick={handleLogout}
                    >
                        <LogoutIcon sx={{ mr: 1 }} /> Log Out
                    </LogoutButtonLogout>
                    
                    <LogoutButtonCancel 
                        as={motion.button} 
                        whileHover={{ scale: 1.05 }} 
                        whileTap={{ scale: 0.95 }}
                        onClick={handleCancel}
                    >
                        <CancelIcon sx={{ mr: 1 }} /> Cancel
                    </LogoutButtonCancel>
                </ButtonContainer>
            </LogoutContainer>
        </LogoutWrapper>
    );
};

export default Logout;

const LogoutWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
  background: linear-gradient(135deg, #f5f7ff 0%, #f0f0f0 100%);
`;

const LogoutContainer = styled(Paper)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3rem 2rem;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  max-width: 450px;
  width: 100%;
  
  @media (max-width: 600px) {
    padding: 2rem 1.5rem;
    border-radius: 16px;
  }
`;

const LogoutMessage = styled(Typography).attrs({
  variant: "body1"
})`
  margin: 1rem 0 2rem;
  font-size: 1.1rem;
  text-align: center;
  color: ${props => props.theme.palette?.text?.primary || '#333'};
`;

const ButtonContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  width: 100%;
  justify-content: center;
  
  @media (max-width: 480px) {
    flex-direction: column;
    width: 100%;
  }
`;

const LogoutButton = styled.button`
  padding: 0.8rem 1.5rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  
  @media (max-width: 480px) {
    width: 100%;
  }
`;

const LogoutButtonLogout = styled(LogoutButton)`
  background: linear-gradient(90deg, #f72585 0%, #e5383b 100%);
  color: white;
  box-shadow: 0 8px 15px rgba(247, 37, 133, 0.2);
  
  &:hover {
    box-shadow: 0 10px 20px rgba(247, 37, 133, 0.3);
  }
`;

const LogoutButtonCancel = styled(LogoutButton)`
  background: transparent;
  color: #4361ee;
  border: 2px solid #4361ee;
  
  &:hover {
    background: rgba(67, 97, 238, 0.05);
  }
`;