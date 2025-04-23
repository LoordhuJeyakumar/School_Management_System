import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Backdrop, Button, CircularProgress, Container, Grid, Typography, useTheme } from '@mui/material';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { School, Person, Group, ArrowForward } from '@mui/icons-material';
import Popup from '../components/Popup';

const ChooseUser = ({ visitor }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [selectedUser, setSelectedUser] = useState('');
    const [loader, setLoader] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const UserTypes = [
        {
            title: "Admin",
            description: "Manage the entire school system and user access",
            icon: <Person style={{ fontSize: 48 }} />,
            color: "#4361ee",
            path: visitor === "guest" ? "/Admin/dashboard/guest" : "/Adminlogin"
        },
        {
            title: "Student",
            description: "Access courses, assignments, and track progress",
            icon: <School style={{ fontSize: 48 }} />,
            color: "#2a9d8f",
            path: visitor === "guest" ? "/Student/dashboard/guest" : "/Studentlogin"
        },
        {
            title: "Teacher",
            description: "Create classes, assign work, and monitor students",
            icon: <Group style={{ fontSize: 48 }} />,
            color: "#f57c00",
            path: visitor === "guest" ? "/Teacher/dashboard/guest" : "/Teacherlogin"
        }
    ];

    const handleCardClick = (user, path) => {
        setSelectedUser(user);
        navigate(path);
    };

    const handleProceed = (e, path) => {
        // Stop event propagation to prevent triggering the card's onClick
        e.stopPropagation();
        
        if (path) {
            navigate(path);
        } else if (selectedUser) {
            navigate(UserTypes.find(u => u.title === selectedUser).path);
        } else {
            setMessage("Please select a user type");
            setShowPopup(true);
        }
    };

    return (
        <StyledContainer>
            <GradientOverlay />
            <ContentWrapper maxWidth="lg">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <Title>Choose Your Role</Title>
                    <Subtitle>
                        Select the role that best matches your position in the school management system
                    </Subtitle>
                </motion.div>

                <Grid container spacing={4} sx={{ mb: 6 }}>
                    {UserTypes.map((type, index) => (
                        <Grid item xs={12} md={4} key={type.title}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <UserCard
                                    elevation={selectedUser === type.title ? 4 : 1}
                                    onClick={() => handleCardClick(type.title, type.path)}
                                    $isActive={selectedUser === type.title}
                                    $color={type.color}
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <IconWrapper $color={type.color}>
                                            {type.icon}
                                        </IconWrapper>
                                    </motion.div>
                                    <CardTitle variant="h5">
                                        {type.title}
                                    </CardTitle>
                                    <CardDescription>
                                        {type.description}
                                    </CardDescription>
                                    <ActionButton
                                        variant="contained"
                                        $isActive={selectedUser === type.title}
                                        $color={type.color}
                                        endIcon={<ArrowForward />}
                                        onClick={(e) => handleProceed(e, type.path)}
                                    >
                                        Continue as {type.title}
                                    </ActionButton>
                                </UserCard>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>

                <FooterText>
                    Note: Guest access provides limited features for demonstration purposes
                </FooterText>
            </ContentWrapper>

            <Backdrop
                sx={{
                    color: '#fff',
                    zIndex: theme.zIndex.drawer + 1,
                    background: 'rgba(0, 0, 0, 0.8)',
                }}
                open={loader}
            >
                <LoadingWrapper>
                    <CircularProgress color="inherit" size={60} />
                    <Typography variant="h6" sx={{ mt: 2, fontWeight: 500 }}>
                        Please wait...
                    </Typography>
                </LoadingWrapper>
            </Backdrop>

            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </StyledContainer>
    );
};

export default ChooseUser;

const StyledContainer = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    background-color: #f8fafc;
    overflow: hidden;
`;

const GradientOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
        radial-gradient(circle at top right, rgba(67, 97, 238, 0.1) 0%, rgba(67, 97, 238, 0) 70%),
        radial-gradient(circle at bottom left, rgba(58, 12, 163, 0.1) 0%, rgba(58, 12, 163, 0) 70%);
    z-index: 1;
`;

const ContentWrapper = styled(Container)`
    position: relative;
    z-index: 2;
    text-align: center;
    padding: 2rem;
`;

const Title = styled.h1`
    color: #1a237e;
    font-size: 3rem;
    font-weight: 800;
    margin-bottom: 1rem;
    background: linear-gradient(45deg, #4361ee, #3a0ca3);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

    @media (max-width: 600px) {
        font-size: 2.5rem;
    }
`;

const Subtitle = styled.h2`
    color: ${props => props.theme.palette?.text?.secondary || '#64748b'};
    font-size: 1.25rem;
    font-weight: 400;
    margin-bottom: 3rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;

    @media (max-width: 600px) {
        font-size: 1rem;
    }
`;

const UserCard = styled(motion.div)`
    padding: 2rem;
    border-radius: 24px;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    border: 2px solid ${props => props.$isActive ? props.$color : 'transparent'};
    box-shadow: ${props => props.$isActive 
        ? '0 12px 28px rgba(0, 0, 0, 0.12)' 
        : '0 4px 12px rgba(0, 0, 0, 0.05)'};
    transition: all 0.3s ease;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
    }
`;

const IconWrapper = styled.div`
    width: 80px;
    height: 80px;
    border-radius: 20px;
    background: linear-gradient(135deg, 
        ${props => `${props.$color}15`}, 
        ${props => `${props.$color}05`});
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.5rem;

    & > svg {
        color: ${props => props.$color};
    }
`;

const CardTitle = styled(Typography)`
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 0.5rem;
`;

const CardDescription = styled.p`
    color: #64748b;
    font-size: 1rem;
    line-height: 1.5;
    margin-bottom: 1rem;
`;

const ActionButton = styled(Button)`
    text-transform: none;
    font-weight: 600;
    font-size: 0.9rem;
    padding: 0.5rem 1.5rem;
    border-radius: 12px;
    background-color: ${props => props.$isActive ? props.$color : '#f1f5f9'};
    color: ${props => props.$isActive ? '#ffffff' : props.$color};
    box-shadow: none;
    transition: all 0.3s ease;

    &:hover {
        background-color: ${props => props.$color};
        color: white;
        box-shadow: 0 4px 12px ${props => `${props.$color}40`};
    }
`;

const FooterText = styled.p`
    color: #94a3b8;
    font-size: 0.875rem;
    margin-top: 2rem;
`;

const LoadingWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.8);
    padding: 2rem 3rem;
    border-radius: 16px;
`;