import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
    Button, Grid, Box, Typography, Paper, Checkbox, FormControlLabel, 
    TextField, IconButton, InputAdornment, CircularProgress, Backdrop,
    useTheme, useMediaQuery, Container, Divider, alpha
} from '@mui/material';
import { 
    Visibility, VisibilityOff, ArrowBack, 
    LockOutlined, EmailOutlined, BadgeOutlined, PersonOutline 
} from '@mui/icons-material';
import bgpic from "../assets/designlogin.jpg";
import { LightPurpleButton } from '../components/buttonStyles';
import styled from 'styled-components';
import { loginUser } from '../redux/userRelated/userHandle';
import Popup from '../components/Popup';
import { motion } from 'framer-motion';

const LoginPage = ({ role }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { status, currentUser, response, error, currentRole } = useSelector(state => state.user);

    const [toggle, setToggle] = useState(false);
    const [guestLoader, setGuestLoader] = useState(false);
    const [loader, setLoader] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [rollNumberError, setRollNumberError] = useState(false);
    const [studentNameError, setStudentNameError] = useState(false);

    // Page animations
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { 
                staggerChildren: 0.1,
                delayChildren: 0.2,
                duration: 0.5 
            }
        }
    };
    
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.4 } }
    };

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();

        if (role === "Student") {
            const rollNum = event.target.rollNumber.value;
            const studentName = event.target.studentName.value;
            const password = event.target.password.value;

            if (!rollNum || !studentName || !password) {
                if (!rollNum) setRollNumberError(true);
                if (!studentName) setStudentNameError(true);
                if (!password) setPasswordError(true);
                return;
            }
            const fields = { rollNum, studentName, password };
            setLoader(true);
            dispatch(loginUser(fields, role));
        } else {
            const email = event.target.email.value;
            const password = event.target.password.value;

            if (!email || !password) {
                if (!email) setEmailError(true);
                if (!password) setPasswordError(true);
                return;
            }

            const fields = { email, password };
            setLoader(true);
            dispatch(loginUser(fields, role));
        }
    };

    // Handle input change and clear errors
    const handleInputChange = (event) => {
        const { name } = event.target;
        if (name === 'email') setEmailError(false);
        if (name === 'password') setPasswordError(false);
        if (name === 'rollNumber') setRollNumberError(false);
        if (name === 'studentName') setStudentNameError(false);
    };

    // Guest login handler
    const guestModeHandler = () => {
        const password = "zxc";

        if (role === "Admin") {
            const email = "admin@schoolmanagementsystem.com";
            const fields = { email, password };
            setGuestLoader(true);
            dispatch(loginUser(fields, role));
        }
        else if (role === "Student") {
            const rollNum = "1";
            const studentName = "Dipesh Awasthi";
            const fields = { rollNum, studentName, password };
            setGuestLoader(true);
            dispatch(loginUser(fields, role));
        }
        else if (role === "Teacher") {
            const email = "tony@12";
            const fields = { email, password };
            setGuestLoader(true);
            dispatch(loginUser(fields, role));
        }
    };

    // Handle navigation based on login status
    useEffect(() => {
        if (status === 'success' || currentUser !== null) {
            if (currentRole === 'Admin') {
                navigate('/Admin/dashboard');
            }
            else if (currentRole === 'Student') {
                navigate('/Student/dashboard');
            } else if (currentRole === 'Teacher') {
                navigate('/Teacher/dashboard');
            }
        }
        else if (status === 'failed') {
            setMessage(response);
            setShowPopup(true);
            setLoader(false);
        }
        else if (status === 'error') {
            setMessage("Network Error");
            setShowPopup(true);
            setLoader(false);
            setGuestLoader(false);
        }
    }, [status, currentRole, navigate, error, response, currentUser]);

    // Generate role-specific color
    const getRoleColor = () => {
        switch(role) {
            case "Admin": return theme.palette.primary.main;
            case "Student": return "#4caf50";
            case "Teacher": return "#ff9800";
            default: return theme.palette.primary.main;
        }
    };

    // Get background gradient based on role
    const getBackgroundGradient = () => {
        const roleColor = getRoleColor();
        return `linear-gradient(120deg, ${alpha(roleColor, 0.8)}, rgba(0, 0, 0, 0.7))`;
    };

    return (
        <Container maxWidth="xl" disableGutters>
            <Grid container component="main" sx={{ height: '100vh' }}>
                {/* Left side - Login Form */}
                <Grid 
                    item 
                    xs={12} 
                    sm={12} 
                    md={5} 
                    component={Paper} 
                    elevation={10} 
                    square
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative',
                        zIndex: 1,
                        borderRadius: { md: '0 20px 20px 0' },
                        boxShadow: { md: '5px 0 20px rgba(0,0,0,0.1)' }
                    }}
                >
                    <Box
                        sx={{
                            mt: 2,
                            mx: 4,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}
                    >
                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <IconButton
                                onClick={() => navigate(-1)}
                                sx={{ 
                                    color: getRoleColor(),
                                    bgcolor: theme.palette.grey[100],
                                    '&:hover': {
                                        bgcolor: theme.palette.grey[200],
                                    }
                                }}
                            >
                                <ArrowBack />
                            </IconButton>
                        </motion.div>
                        
                        {role === "Admin" && (
                            <motion.div
                                initial={{ x: 20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Typography variant="body2" color="text.secondary">
                                    <span>
                                        Don't have an account?{' '}
                                        <StyledLink to="/Adminregister" $roleColor={getRoleColor()}>
                                            Sign up
                                        </StyledLink>
                                    </span>
                                </Typography>
                            </motion.div>
                        )}
                    </Box>
                    
                    <Box
                        sx={{
                            my: 6,
                            mx: { xs: 3, sm: 6 },
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                        component={motion.div}
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <RoleAvatar role={role} color={getRoleColor()} />
                        
                        <motion.div variants={itemVariants}>
                            <Typography 
                                variant="h4" 
                                gutterBottom
                                sx={{ 
                                    fontWeight: 800,
                                    color: getRoleColor(),
                                    mb: 1,
                                    letterSpacing: '-0.5px'
                                }}
                            >
                                {role} Login
                            </Typography>
                        </motion.div>
                        
                        <motion.div variants={itemVariants}>
                            <Typography 
                                variant="body1" 
                                color="text.secondary"
                                sx={{ mb: 4, maxWidth: '380px', textAlign: 'center' }}
                            >
                                Welcome back! Please enter your details
                            </Typography>
                        </motion.div>
                        
                        <motion.div variants={itemVariants} style={{ width: '100%' }}>
                            <Box 
                                component="form" 
                                noValidate 
                                onSubmit={handleSubmit} 
                                sx={{ width: '100%' }}
                            >
                                {role === "Student" ? (
                                    <>
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="rollNumber"
                                            label="Roll Number"
                                            name="rollNumber"
                                            autoComplete="off"
                                            type="number"
                                            autoFocus
                                            error={rollNumberError}
                                            helperText={rollNumberError && 'Roll Number is required'}
                                            onChange={handleInputChange}
                                            sx={{ mb: 2 }}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <BadgeOutlined sx={{ color: 'text.secondary' }} />
                                                    </InputAdornment>
                                                ),
                                                sx: { borderRadius: 2 }
                                            }}
                                        />
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="studentName"
                                            label="Full Name"
                                            name="studentName"
                                            autoComplete="name"
                                            error={studentNameError}
                                            helperText={studentNameError && 'Name is required'}
                                            onChange={handleInputChange}
                                            sx={{ mb: 2 }}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <PersonOutline sx={{ color: 'text.secondary' }} />
                                                    </InputAdornment>
                                                ),
                                                sx: { borderRadius: 2 }
                                            }}
                                        />
                                    </>
                                ) : (
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        autoFocus
                                        error={emailError}
                                        helperText={emailError && 'Email is required'}
                                        onChange={handleInputChange}
                                        sx={{ mb: 2 }}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <EmailOutlined sx={{ color: 'text.secondary' }} />
                                                </InputAdornment>
                                            ),
                                            sx: { borderRadius: 2 }
                                        }}
                                    />
                                )}
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type={toggle ? 'text' : 'password'}
                                    id="password"
                                    autoComplete="current-password"
                                    error={passwordError}
                                    helperText={passwordError && 'Password is required'}
                                    onChange={handleInputChange}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LockOutlined sx={{ color: 'text.secondary' }} />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton 
                                                    onClick={() => setToggle(!toggle)}
                                                    edge="end"
                                                    aria-label="toggle password visibility"
                                                >
                                                    {toggle ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                        sx: { borderRadius: 2 }
                                    }}
                                />
                                
                                <Box sx={{ 
                                    display: "flex", 
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    mt: 1,
                                    mb: 3 
                                }}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox 
                                                value="remember" 
                                                color="primary" 
                                                size="small"
                                                checked={rememberMe} 
                                                onChange={(e) => setRememberMe(e.target.checked)}
                                                sx={{
                                                    '&.Mui-checked': {
                                                        color: getRoleColor(),
                                                    }
                                                }}
                                            />
                                        }
                                        label={<Typography variant="body2">Remember me</Typography>}
                                    />
                                    <StyledLink to="#" $roleColor={getRoleColor()} sx={{ fontSize: '0.875rem' }}>
                                        Forgot password?
                                    </StyledLink>
                                </Box>
                                
                                {/* Using the existing LightPurpleButton from components/buttonStyles */}
                                <LightPurpleButton
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    disabled={loader}
                                    sx={{ 
                                        mt: 2, 
                                        mb: 3,
                                        py: 1.5,
                                        fontSize: '1rem',
                                        fontWeight: 600,
                                        borderRadius: 2,
                                        backgroundColor: getRoleColor(),
                                        boxShadow: `0 4px 14px 0 ${alpha(getRoleColor(), 0.4)}`,
                                        '&:hover': {
                                            backgroundColor: alpha(getRoleColor(), 0.9),
                                            boxShadow: `0 6px 20px 0 ${alpha(getRoleColor(), 0.6)}`,
                                        }
                                    }}
                                >
                                    {loader ? (
                                        <CircularProgress size={24} sx={{ color: '#fff' }} />
                                    ) : (
                                        "Sign In"
                                    )}
                                </LightPurpleButton>
                                
                                <Divider sx={{ my: 2 }}>
                                    <Typography variant="body2" color="text.secondary">
                                        OR
                                    </Typography>
                                </Divider>
                                
                                <Button
                                    fullWidth
                                    onClick={guestModeHandler}
                                    variant="outlined"
                                    sx={{ 
                                        py: 1.5,
                                        fontSize: '0.9rem',
                                        fontWeight: 600,
                                        color: "text.secondary", 
                                        borderColor: "divider",
                                        borderWidth: "1px",
                                        borderRadius: 2,
                                        '&:hover': {
                                            borderColor: getRoleColor(),
                                            color: getRoleColor(),
                                            backgroundColor: alpha(getRoleColor(), 0.04),
                                        }
                                    }}
                                >
                                    Login as Guest
                                </Button>
                            </Box>
                        </motion.div>
                    </Box>
                </Grid>
                
                {/* Right side - Background Image */}
                <Grid
                    item
                    xs={false}
                    sm={false}
                    md={7}
                    sx={{
                        backgroundImage: `${getBackgroundGradient()}, url(${bgpic})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        display: { xs: 'none', md: 'block' },
                        position: 'relative',
                        borderRadius: '20px 0 0 20px',
                        overflow: 'hidden'
                    }}
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            p: 4,
                            textAlign: 'center',
                            color: '#fff',
                        }}
                        component={motion.div}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                    >
                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                        >
                            <Typography 
                                variant="h2" 
                                component="h1"
                                sx={{ 
                                    fontWeight: 800,
                                    mb: 3,
                                    textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                                    letterSpacing: '-1px'
                                }}
                            >
                                Welcome to the School Management System
                            </Typography>
                        </motion.div>
                        
                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 1 }}
                        >
                            <Typography 
                                variant="h5"
                                sx={{ 
                                    maxWidth: '800px', 
                                    textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                                    mb: 6
                                }}
                            >
                                Your comprehensive solution for educational administration and engagement
                            </Typography>
                        </motion.div>
                        
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 1.2 }}
                        >
                            <Box 
                                sx={{
                                    p: 3,
                                    borderRadius: 3,
                                    backgroundColor: 'rgba(255,255,255,0.15)',
                                    backdropFilter: 'blur(10px)',
                                    maxWidth: '600px',
                                    border: '1px solid rgba(255,255,255,0.2)'
                                }}
                            >
                                <RoleFeatures role={role} />
                            </Box>
                        </motion.div>
                    </Box>
                </Grid>
            </Grid>
            
            {/* Backdrop for guest login */}
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={guestLoader}
            >
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                    <CircularProgress sx={{ color: getRoleColor() }} />
                    <Typography variant="h6">Logging in as Guest</Typography>
                </Box>
            </Backdrop>
            
            {/* Popup for error messages */}
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </Container>
    );
};

// Helper Components
const RoleAvatar = ({ role, color }) => {
    return (
        <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
        >
            <Box
                sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    backgroundColor: alpha(color, 0.1),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 3,
                    border: `2px solid ${alpha(color, 0.3)}`
                }}
            >
                {role === "Admin" && (
                    <PersonOutline sx={{ fontSize: 40, color: color }} />
                )}
                {role === "Student" && (
                    <BadgeOutlined sx={{ fontSize: 40, color: color }} />
                )}
                {role === "Teacher" && (
                    <EmailOutlined sx={{ fontSize: 40, color: color }} />
                )}
            </Box>
        </motion.div>
    );
};

const RoleFeatures = ({ role }) => {
    let features = [];
    
    if (role === "Admin") {
        features = [
            "Complete control over school system",
            "Manage teachers, students, and courses",
            "Generate reports and analytics",
            "Configure system settings"
        ];
    } else if (role === "Student") {
        features = [
            "Access course materials and assignments",
            "Track your academic progress",
            "Communicate with teachers",
            "View your schedule and announcements"
        ];
    } else if (role === "Teacher") {
        features = [
            "Manage your classes and students",
            "Create and grade assignments",
            "Track student performance",
            "Communicate with parents and administration"
        ];
    }
    
    return (
        <>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                {role} Features
            </Typography>
            
            <Box component="ul" sx={{ pl: 2 }}>
                {features.map((feature, index) => (
                    <Typography 
                        component="li" 
                        key={index} 
                        sx={{ mb: 1 }}
                    >
                        {feature}
                    </Typography>
                ))}
            </Box>
        </>
    );
};

// Styled components
const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${props => props.$roleColor || props?.theme?.palette?.primary?.main};
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    opacity: 0.8;
    text-decoration: underline;
  }
`;

export default LoginPage;