import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Container, 
  Grid, 
  Box, 
  Button, 
  Typography, 
  Paper, 
  useTheme, 
  useMediaQuery, 
  Divider,
  Stack,
  Chip
} from '@mui/material';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import Students from "../assets/students.svg";
import { LightPurpleButton } from '../components/buttonStyles';
import SchoolIcon from '@mui/icons-material/School';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PersonIcon from '@mui/icons-material/Person';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CountUp from 'react-countup';

const Homepage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { 
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };
    
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { 
            y: 0, 
            opacity: 1,
            transition: { duration: 0.8 }
        }
    };

    return (
        <StyledContainer maxWidth="xl">
            {/* Hero Section */}
            <Grid container spacing={4} alignItems="center" justifyContent="center" sx={{ minHeight: '85vh' }}>
                <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Box sx={{ position: 'relative' }}>
                            {/* Background decorative elements */}
                            <Box 
                                sx={{ 
                                    position: 'absolute', 
                                    width: '150px', 
                                    height: '150px', 
                                    borderRadius: '50%', 
                                    background: 'linear-gradient(45deg, rgba(67, 97, 238, 0.3), rgba(58, 12, 163, 0.3))',
                                    filter: 'blur(25px)',
                                    top: '-20px',
                                    left: '20%',
                                    zIndex: -1
                                }} 
                            />
                            <Box 
                                sx={{ 
                                    position: 'absolute', 
                                    width: '200px', 
                                    height: '200px', 
                                    borderRadius: '50%', 
                                    background: 'linear-gradient(45deg, rgba(58, 12, 163, 0.2), rgba(114, 9, 183, 0.2))',
                                    filter: 'blur(25px)',
                                    bottom: '0',
                                    right: '10%',
                                    zIndex: -1
                                }} 
                            />
                            
                            <Box 
                                component={motion.img} 
                                src={Students} 
                                alt="students" 
                                sx={{ 
                                    width: '100%',
                                    maxWidth: '600px',
                                    display: 'block',
                                    margin: '0 auto',
                                    filter: 'drop-shadow(0 10px 15px rgba(67, 97, 238, 0.2))'
                                }}
                                whileHover={{ y: -10 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            />
                            
                            {/* Stats chips */}
                            <Stack 
                                direction="row" 
                                spacing={2} 
                                justifyContent="center" 
                                sx={{ mt: 4 }}
                            >
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 1, duration: 0.5 }}
                                >
                                    <StyledChip 
                                        icon={<SchoolIcon />} 
                                        label={
                                            <Typography variant="body2">
                                                <CountUp end={50} suffix="+ Schools" duration={2.5} />
                                            </Typography>
                                        }
                                    />
                                </motion.div>
                                
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 1.2, duration: 0.5 }}
                                >
                                    <StyledChip 
                                        icon={<PersonIcon />} 
                                        label={
                                            <Typography variant="body2">
                                                <CountUp end={10000} suffix="+ Students" duration={2.5} />
                                            </Typography>
                                        }
                                    />
                                </motion.div>
                                
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 1.4, duration: 0.5 }}
                                >
                                    <StyledChip 
                                        icon={<MenuBookIcon />} 
                                        label={
                                            <Typography variant="body2">
                                                <CountUp end={500} suffix="+ Classes" duration={2.5} />
                                            </Typography>
                                        }
                                    />
                                </motion.div>
                            </Stack>
                        </Box>
                    </motion.div>
                </Grid>
                
                <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <StyledHeroPaper elevation={isMobile ? 2 : 6}>
                            <Box sx={{ mb: 4 }}>
                                <Typography 
                                    component="span" 
                                    sx={{ 
                                        color: 'primary.main',
                                        fontWeight: 700,
                                        fontSize: '1.1rem',
                                        background: 'linear-gradient(90deg, #4361ee, #3a0ca3)',
                                        padding: '0.5rem 1rem',
                                        borderRadius: '20px',
                                        color: 'white',
                                        display: 'inline-block',
                                        mb: 2
                                    }}
                                >
                                    All-in-one Solution
                                </Typography>
                                
                                <Typography variant="h2" component="h1" sx={{ 
                                    fontWeight: 800,
                                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                                    backgroundImage: 'linear-gradient(90deg, #4361ee, #3a0ca3)',
                                    backgroundClip: 'text',
                                    color: 'transparent',
                                    WebkitBackgroundClip: 'text',
                                    mb: 3,
                                    lineHeight: 1.1
                                }}>
                                    School Management System
                                </Typography>
                                
                                <Typography variant="body1" sx={{ 
                                    color: 'text.secondary',
                                    fontSize: '1.1rem',
                                    mb: 4,
                                    lineHeight: 1.8,
                                    maxWidth: '90%'
                                }}>
                                    Revolutionize your educational institution with our comprehensive platform.
                                    Seamlessly manage administration, enhance communication, and elevate
                                    the learning experience for students, teachers, and administrators alike.
                                </Typography>
                            </Box>
                            
                            <Box sx={{ 
                                display: 'flex', 
                                flexDirection: { xs: 'column', sm: 'row' }, 
                                gap: 2, 
                                maxWidth: '500px',
                                mb: 6 
                            }}>
                                <motion.div 
                                    whileHover={{ scale: 1.03 }} 
                                    whileTap={{ scale: 0.98 }}
                                    style={{ flex: 1 }}
                                >
                                    <StyledLink to="/choose">
                                        <LightPurpleButton 
                                            variant="contained" 
                                            fullWidth
                                            size="large"
                                            sx={{ 
                                                py: 1.8,
                                                borderRadius: '12px',
                                                boxShadow: '0 8px 20px rgba(67, 97, 238, 0.3)'
                                            }}
                                        >
                                            Get Started
                                        </LightPurpleButton>
                                    </StyledLink>
                                </motion.div>
                                
                                <motion.div 
                                    whileHover={{ scale: 1.03 }} 
                                    whileTap={{ scale: 0.98 }}
                                    style={{ flex: 1 }}
                                >
                                    <StyledLink to="/chooseasguest">
                                        <Button 
                                            variant="outlined" 
                                            fullWidth
                                            size="large"
                                            sx={{ 
                                                color: "primary.main", 
                                                borderColor: "primary.main",
                                                py: 1.8,
                                                borderRadius: '12px',
                                                borderWidth: '2px',
                                                '&:hover': {
                                                    borderWidth: '2px',
                                                    background: 'rgba(67, 97, 238, 0.04)'
                                                }
                                            }}
                                        >
                                            Explore as Guest
                                        </Button>
                                    </StyledLink>
                                </motion.div>
                            </Box>
                            
                            <Divider sx={{ my: 3, opacity: 0.6 }} />
                            
                            <Box sx={{ mt: 3 }}>
                                <Typography variant="h6" sx={{ 
                                    mb: 3, 
                                    fontWeight: 600,
                                    color: 'text.primary',
                                    fontSize: '1.2rem'
                                }}>
                                    Designed for Everyone
                                </Typography>
                                
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={4}>
                                        <StyledFeature>
                                            <AdminPanelSettingsIcon 
                                                sx={{ 
                                                    fontSize: 40, 
                                                    color: 'primary.main',
                                                    mb: 2
                                                }} 
                                            />
                                            <Typography variant="h6" sx={{ 
                                                mb: 1, 
                                                fontWeight: 600,
                                                fontSize: '1.1rem'
                                            }}>
                                                Administrators
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                                                Streamline operations, manage resources, and make data-driven decisions.
                                            </Typography>
                                        </StyledFeature>
                                    </Grid>
                                    
                                    <Grid item xs={12} sm={4}>
                                        <StyledFeature>
                                            <PersonIcon 
                                                sx={{ 
                                                    fontSize: 40, 
                                                    color: 'primary.main',
                                                    mb: 2
                                                }} 
                                            />
                                            <Typography variant="h6" sx={{ 
                                                mb: 1, 
                                                fontWeight: 600,
                                                fontSize: '1.1rem'
                                            }}>
                                                Teachers
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                                                Track attendance, manage grades, and communicate with students efficiently.
                                            </Typography>
                                        </StyledFeature>
                                    </Grid>
                                    
                                    <Grid item xs={12} sm={4}>
                                        <StyledFeature>
                                            <SchoolIcon 
                                                sx={{ 
                                                    fontSize: 40, 
                                                    color: 'primary.main',
                                                    mb: 2
                                                }} 
                                            />
                                            <Typography variant="h6" sx={{ 
                                                mb: 1, 
                                                fontWeight: 600,
                                                fontSize: '1.1rem'
                                            }}>
                                                Students
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                                                Access schedules, grades, and learning materials all in one place.
                                            </Typography>
                                        </StyledFeature>
                                    </Grid>
                                </Grid>
                            </Box>
                            
                            <Box sx={{ mt: 4, textAlign: 'center' }}>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    Don't have an account yet?{' '}
                                    <Link to="/Adminregister" style={{ 
                                        color: theme.palette.primary.main, 
                                        fontWeight: 600,
                                        textDecoration: 'none',
                                        position: 'relative',
                                        '&:after': {
                                            content: '""',
                                            position: 'absolute',
                                            width: '100%',
                                            height: '2px',
                                            bottom: '-2px',
                                            left: 0,
                                            backgroundColor: theme.palette.primary.main,
                                            transition: 'all 0.3s ease'
                                        },
                                        '&:hover:after': {
                                            width: '0%'
                                        }
                                    }}>
                                        Sign up now
                                    </Link>
                                </Typography>
                            </Box>
                        </StyledHeroPaper>
                    </motion.div>
                </Grid>
            </Grid>
            
            {/* Features Section */}
            <Box sx={{ py: 8 }}>
                <Container>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <Box sx={{ textAlign: 'center', mb: 6 }}>
                            <motion.div variants={itemVariants}>
                                <Typography 
                                    component="span" 
                                    sx={{ 
                                        color: 'primary.main',
                                        fontWeight: 600,
                                        fontSize: '1rem',
                                        mb: 2,
                                        display: 'block'
                                    }}
                                >
                                    POWERFUL FEATURES
                                </Typography>
                            </motion.div>
                            
                            <motion.div variants={itemVariants}>
                                <Typography 
                                    variant="h3" 
                                    component="h2" 
                                    sx={{ 
                                        fontWeight: 700, 
                                        mb: 2,
                                        backgroundImage: 'linear-gradient(90deg, #4361ee, #3a0ca3)',
                                        backgroundClip: 'text',
                                        color: 'transparent',
                                        WebkitBackgroundClip: 'text',
                                    }}
                                >
                                    Everything You Need
                                </Typography>
                            </motion.div>
                            
                            <motion.div variants={itemVariants}>
                                <Typography 
                                    variant="body1" 
                                    sx={{ 
                                        color: 'text.secondary',
                                        maxWidth: '700px',
                                        mx: 'auto',
                                        lineHeight: 1.8,
                                        fontSize: '1.1rem'
                                    }}
                                >
                                    Our comprehensive school management system provides all the tools needed
                                    to run educational institutions efficiently and effectively.
                                </Typography>
                            </motion.div>
                        </Box>
                        
                        <Grid container spacing={4}>
                            {[
                                {
                                    title: "Class Management",
                                    description: "Create and organize classes, assign teachers, and manage subjects efficiently.",
                                    icon: "📚"
                                },
                                {
                                    title: "Student Information",
                                    description: "Maintain complete student records including academic history and contact details.",
                                    icon: "👥"
                                },
                                {
                                    title: "Attendance Tracking",
                                    description: "Record and monitor student attendance with detailed reporting options.",
                                    icon: "📊"
                                },
                                {
                                    title: "Performance Analytics",
                                    description: "Visualize academic performance with intuitive charts and metrics.",
                                    icon: "📈"
                                },
                                {
                                    title: "Notice Board",
                                    description: "Share announcements and important information with the entire school.",
                                    icon: "📝"
                                },
                                {
                                    title: "Exam Management",
                                    description: "Schedule exams, record results, and generate comprehensive reports.",
                                    icon: "📋"
                                }
                            ].map((feature, index) => (
                                <Grid item xs={12} sm={6} md={4} key={index}>
                                    <motion.div variants={itemVariants}>
                                        <FeatureCard>
                                            <Typography 
                                                variant="h1" 
                                                sx={{ 
                                                    fontSize: '3rem',
                                                    mb: 2 
                                                }}
                                            >
                                                {feature.icon}
                                            </Typography>
                                            <Typography 
                                                variant="h6" 
                                                sx={{ 
                                                    fontWeight: 600,
                                                    mb: 2
                                                }}
                                            >
                                                {feature.title}
                                            </Typography>
                                            <Typography 
                                                variant="body2" 
                                                sx={{ 
                                                    color: 'text.secondary',
                                                    lineHeight: 1.7
                                                }}
                                            >
                                                {feature.description}
                                            </Typography>
                                        </FeatureCard>
                                    </motion.div>
                                </Grid>
                            ))}
                        </Grid>
                    </motion.div>
                </Container>
            </Box>
            
            {/* CTA Section */}
            <Box sx={{ py: 10, bgcolor: 'rgba(67, 97, 238, 0.05)' }}>
                <Container maxWidth="md">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <StyledCtaPaper elevation={6}>
                            <Grid container spacing={3} alignItems="center">
                                <Grid item xs={12} md={8}>
                                    <Typography 
                                        variant="h3" 
                                        sx={{ 
                                            fontWeight: 700,
                                            fontSize: { xs: '1.8rem', md: '2.5rem' },
                                            mb: 2
                                        }}
                                    >
                                        Ready to Transform Your School?
                                    </Typography>
                                    <Typography 
                                        variant="body1" 
                                        sx={{ 
                                            mb: 4,
                                            color: 'text.secondary',
                                            lineHeight: 1.8
                                        }}
                                    >
                                        Join thousands of educational institutions that are already benefiting
                                        from our comprehensive management solution.
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                                        <StyledLink to="/choose">
                                            <LightPurpleButton 
                                                variant="contained" 
                                                size="large"
                                                sx={{ 
                                                    py: 1.8,
                                                    px: 4,
                                                    borderRadius: '12px',
                                                    boxShadow: '0 8px 20px rgba(67, 97, 238, 0.3)'
                                                }}
                                            >
                                                Get Started Now
                                            </LightPurpleButton>
                                        </StyledLink>
                                    </motion.div>
                                </Grid>
                            </Grid>
                        </StyledCtaPaper>
                    </motion.div>
                </Container>
            </Box>
            
            {/* Footer */}
            <Box 
                component="footer" 
                sx={{ 
                    py: 6,
                    textAlign: 'center',
                    bgcolor: '#f8f9fa'
                }}
            >
                <Container>
                    <Typography variant="body2" color="text.secondary">
                        © {new Date().getFullYear()} School Management System. All rights reserved.
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                        <Link to="/about" style={{ color: theme.palette.text.secondary, marginRight: '1rem', textDecoration: 'none' }}>
                            About
                        </Link>
                        <Link to="/contact" style={{ color: theme.palette.text.secondary, marginRight: '1rem', textDecoration: 'none' }}>
                            Contact
                        </Link>
                        <Link to="/privacy" style={{ color: theme.palette.text.secondary, textDecoration: 'none' }}>
                            Privacy
                        </Link>
                    </Box>
                </Container>
            </Box>
        </StyledContainer>
    );
};

export default Homepage;

const StyledContainer = styled(Container)`
  padding-top: 0;
  padding-bottom: 0;
  overflow-x: hidden;
`;

const StyledHeroPaper = styled(Paper)`
  padding: 3rem;
  border-radius: 24px;
  height: auto;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 15px 40px rgba(58, 12, 163, 0.1);
  
  @media (max-width: 600px) {
    padding: 2rem 1.5rem;
    border-radius: 16px;
  }
`;

const StyledFeature = styled(Box)`
  padding: 1.5rem;
  border-radius: 16px;
  background-color: rgba(67, 97, 238, 0.04);
  height: 100%;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  
  &:hover {
    background-color: rgba(67, 97, 238, 0.08);
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(67, 97, 238, 0.1);
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  width: 100%;
`;

const StyledChip = styled(Chip)`
  padding: 1rem 0.5rem;
  border-radius: 50px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
  font-weight: 600;
  
  .MuiChip-icon {
    color: #4361ee;
  }
`;

const FeatureCard = styled(Paper)`
  padding: 2rem;
  border-radius: 20px;
  height: 100%;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border: none;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 35px rgba(67, 97, 238, 0.1);
  }
`;

const StyledCtaPaper = styled(Paper)`
  padding: 3rem;
  border-radius: 24px;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%);
  box-shadow: 0 20px 40px rgba(67, 97, 238, 0.1);
  
  @media (max-width: 600px) {
    padding: 2rem;
  }
`;