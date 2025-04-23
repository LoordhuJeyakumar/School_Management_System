import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Box, Button, Typography, Paper, useTheme, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import Students from "../assets/students.svg";
import { LightPurpleButton } from '../components/buttonStyles';

// Add framer-motion for animations
// You'll need to run: npm install framer-motion

const Homepage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <StyledContainer maxWidth="lg">
            <Grid container spacing={4} alignItems="center" justifyContent="center">
                <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Box component="img" src={Students} alt="students" sx={{ 
                            width: '100%',
                            maxWidth: '550px',
                            display: 'block',
                            margin: '0 auto'
                        }} />
                    </motion.div>
                </Grid>
                <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <StyledPaper elevation={isMobile ? 0 : 3}>
                            <Typography variant="h2" component="h1" sx={{ 
                                fontWeight: 700,
                                fontSize: { xs: '2.5rem', md: '3rem' },
                                backgroundImage: 'linear-gradient(90deg, #4361ee, #3a0ca3)',
                                backgroundClip: 'text',
                                color: 'transparent',
                                WebkitBackgroundClip: 'text',
                                mb: 3,
                                lineHeight: 1.2
                            }}>
                                School Management System
                            </Typography>
                            
                            <Typography variant="body1" sx={{ 
                                color: 'text.secondary',
                                fontSize: '1.1rem',
                                mb: 4,
                                lineHeight: 1.6
                            }}>
                                Streamline school management, class organization, and student administration.
                                Track attendance, assess performance, and provide instant feedback.
                                A complete solution for educational institutions of all sizes.
                            </Typography>
                            
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: '400px' }}>
                                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                                    <StyledLink to="/choose">
                                        <LightPurpleButton 
                                            variant="contained" 
                                            fullWidth
                                            size="large"
                                            sx={{ py: 1.5 }}
                                        >
                                            Get Started
                                        </LightPurpleButton>
                                    </StyledLink>
                                </motion.div>
                                
                                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                                    <StyledLink to="/chooseasguest">
                                        <Button 
                                            variant="outlined" 
                                            fullWidth
                                            size="large"
                                            sx={{ 
                                                color: "primary.main", 
                                                borderColor: "primary.main",
                                                py: 1.5
                                            }}
                                        >
                                            Explore as Guest
                                        </Button>
                                    </StyledLink>
                                </motion.div>
                                
                                <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
                                    Don't have an account?{' '}
                                    <Link to="/Adminregister" style={{ color: theme.palette.primary.main, fontWeight: 600 }}>
                                        Sign up
                                    </Link>
                                </Typography>
                            </Box>
                            
                            <Box sx={{ mt: 6, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
                                <StyledFeature>
                                    <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                                        For Administrators
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Manage classes, teachers, and school operations.
                                    </Typography>
                                </StyledFeature>
                                
                                <StyledFeature>
                                    <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                                        For Teachers
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Track attendance and manage student performance.
                                    </Typography>
                                </StyledFeature>
                                
                                <StyledFeature>
                                    <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                                        For Students
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Access schedules, grades, and learning materials.
                                    </Typography>
                                </StyledFeature>
                            </Box>
                        </StyledPaper>
                    </motion.div>
                </Grid>
            </Grid>
        </StyledContainer>
    );
};

export default Homepage;

const StyledContainer = styled(Container)`
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding-top: 2rem;
  padding-bottom: 2rem;
`;

const StyledPaper = styled(Paper)`
  padding: 2.5rem;
  border-radius: 16px;
  height: auto;
  
  @media (max-width: 600px) {
    padding: 1.5rem;
    box-shadow: none;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  width: 100%;
`;

const StyledFeature = styled(Box)`
  flex: 1;
  min-width: 180px;
  padding: 1rem;
  border-radius: 8px;
  background-color: rgba(67, 97, 238, 0.05);
  transition: all 0.3s ease;
  
  &:hover {
    background-color: rgba(67, 97, 238, 0.1);
  }
`;