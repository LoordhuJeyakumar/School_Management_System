import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
    Grid, Box, Typography, Paper, Checkbox, FormControlLabel, TextField, 
    CssBaseline, IconButton, InputAdornment, CircularProgress, Container
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Visibility, VisibilityOff, School } from '@mui/icons-material';
import bgpic from "../../assets/designlogin.jpg"
import { LightPurpleButton } from '../../components/buttonStyles';
import { registerUser } from '../../redux/userRelated/userHandle';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Popup from '../../components/Popup';

const defaultTheme = createTheme();

const AdminRegisterPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { status, currentUser, response, error, currentRole } = useSelector(state => state.user);

    const [toggle, setToggle] = useState(false);
    const [loader, setLoader] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [adminNameError, setAdminNameError] = useState(false);
    const [schoolNameError, setSchoolNameError] = useState(false);
    const role = "Admin";

    const handleSubmit = (event) => {
        event.preventDefault();

        const name = event.target.adminName.value;
        const schoolName = event.target.schoolName.value;
        const email = event.target.email.value;
        const password = event.target.password.value;

        if (!name || !schoolName || !email || !password) {
            if (!name) setAdminNameError(true);
            if (!schoolName) setSchoolNameError(true);
            if (!email) setEmailError(true);
            if (!password) setPasswordError(true);
            return;
        }

        const fields = { name, email, password, role, schoolName };
        setLoader(true);
        dispatch(registerUser(fields, role));
    };

    const handleInputChange = (event) => {
        const { name } = event.target;
        if (name === 'email') setEmailError(false);
        if (name === 'password') setPasswordError(false);
        if (name === 'adminName') setAdminNameError(false);
        if (name === 'schoolName') setSchoolNameError(false);
    };

    useEffect(() => {
        if (status === 'success' || (currentUser !== null && currentRole === 'Admin')) {
            navigate('/Admin/dashboard');
        } else if (status === 'failed') {
            setMessage(response);
            setShowPopup(true);
            setLoader(false);
        } else if (status === 'error') {
            console.log(error);
        }
    }, [status, currentUser, currentRole, navigate, error, response]);

    return (
        <ThemeProvider theme={defaultTheme}>
            <StyledContainer>
                <Grid container component="main" sx={{ height: '100vh' }}>
                    <CssBaseline />
                    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                        <Box sx={{ position: 'relative', height: '100%', overflow: 'auto' }}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <StyledPaper>
                                    <StyledIconWrapper>
                                        <School sx={{ fontSize: 40, color: '#4361ee' }} />
                                    </StyledIconWrapper>
                                    <Typography variant="h4" sx={{ 
                                        mb: 2,
                                        fontWeight: 700,
                                        background: 'linear-gradient(45deg, #4361ee, #3a0ca3)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent'
                                    }}>
                                        Admin Registration
                                    </Typography>
                                    <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
                                        Create your own school by registering as an admin.
                                        <br />
                                        You will be able to add students and faculty and
                                        manage the system.
                                    </Typography>
                                    <Box component="form" noValidate onSubmit={handleSubmit}>
                                        <StyledFormFields>
                                            <TextField
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="adminName"
                                                label="Enter your name"
                                                name="adminName"
                                                autoComplete="name"
                                                autoFocus
                                                error={adminNameError}
                                                helperText={adminNameError && 'Name is required'}
                                                onChange={handleInputChange}
                                            />
                                            <TextField
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="schoolName"
                                                label="Create your school name"
                                                name="schoolName"
                                                autoComplete="off"
                                                error={schoolNameError}
                                                helperText={schoolNameError && 'School name is required'}
                                                onChange={handleInputChange}
                                            />
                                            <TextField
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="email"
                                                label="Enter your email"
                                                name="email"
                                                autoComplete="email"
                                                error={emailError}
                                                helperText={emailError && 'Email is required'}
                                                onChange={handleInputChange}
                                            />
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
                                                }}
                                            />
                                            <Grid container sx={{ mt: 2 }}>
                                                <FormControlLabel
                                                    control={<StyledCheckbox value="remember" color="primary" />}
                                                    label="Remember me"
                                                />
                                            </Grid>
                                            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                                                <LightPurpleButton
                                                    type="submit"
                                                    fullWidth
                                                    variant="contained"
                                                    sx={{ mt: 3, mb: 2 }}
                                                >
                                                    {loader ? (
                                                        <CircularProgress size={24} sx={{ color: '#fff' }} />
                                                    ) : (
                                                        "Register"
                                                    )}
                                                </LightPurpleButton>
                                            </motion.div>
                                        </StyledFormFields>
                                        <Grid container justifyContent="center" spacing={2}>
                                            <Grid item>
                                                <Typography variant="body2" color="text.secondary">
                                                    Already have an account?
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <StyledLink to="/Adminlogin">
                                                    Sign in
                                                </StyledLink>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </StyledPaper>
                            </motion.div>
                        </Box>
                    </Grid>
                    <Grid
                        item
                        xs={false}
                        sm={4}
                        md={7}
                        sx={{
                            position: 'relative',
                            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${bgpic})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundColor: (t) =>
                                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            display: { xs: 'none', sm: 'flex' },
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                            color: '#fff',
                            padding: 4,
                        }}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        >
                            <Box sx={{ maxWidth: '600px' }}>
                                <Typography variant="h3" sx={{ 
                                    fontWeight: 700,
                                    mb: 3,
                                    textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                                }}>
                                    Welcome to School Management System
                                </Typography>
                                <Typography variant="h6" sx={{ 
                                    textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
                                }}>
                                    Empower your educational institution with our comprehensive management solution
                                </Typography>
                            </Box>
                        </motion.div>
                    </Grid>
                </Grid>
                <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
            </StyledContainer>
        </ThemeProvider>
    );
}

export default AdminRegisterPage;

const StyledContainer = styled(Container)`
    min-height: 100vh;
    background: ${props => props.theme.palette?.background?.default || '#f8fafc'};
`;

const StyledPaper = styled(Box)`
    margin: 4rem 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    
    @media (max-width: 600px) {
        margin: 2rem 1rem;
    }
`;

const StyledIconWrapper = styled.div`
    width: 64px;
    height: 64px;
    border-radius: 16px;
    background: linear-gradient(135deg, rgba(67, 97, 238, 0.1), rgba(58, 12, 163, 0.1));
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 2rem;
`;

const StyledFormFields = styled.div`
    width: 100%;
    max-width: 400px;
`;

const StyledCheckbox = styled(Checkbox)`
    &.Mui-checked {
        color: #4361ee;
    }
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: #4361ee;
    font-weight: 600;
    transition: all 0.3s ease;
    
    &:hover {
        color: #3a0ca3;
        text-decoration: underline;
    }
`;
