import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
    Button, Grid, Box, Typography, Paper, Checkbox, FormControlLabel, 
    TextField, IconButton, InputAdornment, CircularProgress, Backdrop,
    useTheme, useMediaQuery, Container
} from '@mui/material';
import { Visibility, VisibilityOff, ArrowBack } from '@mui/icons-material';
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

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [rollNumberError, setRollNumberError] = useState(false);
    const [studentNameError, setStudentNameError] = useState(false);

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
                    elevation={6} 
                    square
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative',
                        zIndex: 1
                    }}
                >
                    <Box
                        sx={{
                            mt: 4,
                            mx: 4,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}
                    >
                        <IconButton
                            onClick={() => navigate(-1)}
                            sx={{ color: 'primary.main' }}
                        >
                            <ArrowBack />
                        </IconButton>
                        
                        <Typography variant="body2" color="text.secondary">
                            {role === "Admin" && (
                                <span>
                                    Don't have an account?{' '}
                                    <StyledLink to="/Adminregister">
                                        Sign up
                                    </StyledLink>
                                </span>
                            )}
                        </Typography>
                    </Box>
                    
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Typography 
                                variant="h4" 
                                gutterBottom
                                sx={{ 
                                    fontWeight: 700,
                                    color: "primary.main",
                                    mb: 1
                                }}
                            >
                                {role} Login
                            </Typography>
                        </motion.div>
                        
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <Typography 
                                variant="body1" 
                                color="text.secondary"
                                sx={{ mb: 3 }}
                            >
                                Welcome back! Please enter your details
                            </Typography>
                        </motion.div>
                        
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            style={{ width: '100%' }}
                        >
                            <Box 
                                component="form" 
                                noValidate 
                                onSubmit={handleSubmit} 
                                sx={{ width: '100%', mt: 1 }}
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
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={() => setToggle(!toggle)}>
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
                                    mb: 2 
                                }}>
                                    <FormControlLabel
                                        control={<Checkbox value="remember" color="primary" size="small" />}
                                        label={<Typography variant="body2">Remember me</Typography>}
                                    />
                                    <StyledLink href="#" sx={{ fontSize: '0.875rem' }}>
                                        Forgot password?
                                    </StyledLink>
                                </Box>
                                
                                <LightPurpleButton
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    disabled={loader}
                                    sx={{ 
                                        mt: 2, 
                                        mb: 2,
                                        py: 1.5,
                                        fontSize: '1rem'
                                    }}
                                >
                                    {loader ? (
                                        <CircularProgress size={24} color="inherit" />
                                    ) : (
                                        "Sign In"
                                    )}
                                </LightPurpleButton>
                                
                                <Button
                                    fullWidth
                                    onClick={guestModeHandler}
                                    variant="outlined"
                                    sx={{ 
                                        py: 1.5,
                                        fontSize: '1rem',
                                        color: "primary.main", 
                                        borderColor: "primary.main" 
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
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${bgpic})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        display: { xs: 'none', md: 'block' },
                        position: 'relative',
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
                    >
                        <Typography 
                            variant="h3" 
                            component="h1"
                            sx={{ 
                                fontWeight: 700,
                                mb: 3,
                                textShadow: '0 2px 10px rgba(0,0,0,0.3)'
                            }}
                        >
                            Welcome to the School Management System
                        </Typography>
                        <Typography 
                            variant="h6"
                            sx={{ maxWidth: '600px', textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}
                        >
                            Your comprehensive solution for educational administration and engagement
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
            
            {/* Backdrop for guest login */}
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={guestLoader}
            >
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                    <CircularProgress color="primary" />
                    <Typography>Please Wait</Typography>
                </Box>
            </Backdrop>
            
            {/* Popup for error messages */}
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </Container>
    );
};

export default LoginPage;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${props => props?.theme?.palette?.primary?.main};
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    color: ${props => props?.theme?.palette?.primary?.dark};
    text-decoration: underline;
  }
`;