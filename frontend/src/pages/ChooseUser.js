import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Paper,
  Box,
  Container,
  CircularProgress,
  Backdrop,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { AccountCircle, School, Group, ArrowForward } from '@mui/icons-material';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/userRelated/userHandle';
import Popup from '../components/Popup';
import { motion } from 'framer-motion';

const ChooseUser = ({ visitor }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const password = "zxc";

  const { status, currentUser, currentRole } = useSelector(state => state.user);

  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [activeCard, setActiveCard] = useState(null);

  const navigateHandler = (user) => {
    if (user === "Admin") {
      if (visitor === "guest") {
        const email = "admin@schoolmanagementsystem.com";
        const fields = { email, password };
        setLoader(true);
        dispatch(loginUser(fields, user));
      } else {
        navigate('/Adminlogin');
      }
    } else if (user === "Student") {
      if (visitor === "guest") {
        const rollNum = "1";
        const studentName = "Dipesh Awasthi";
        const fields = { rollNum, studentName, password };
        setLoader(true);
        dispatch(loginUser(fields, user));
      } else {
        navigate('/Studentlogin');
      }
    } else if (user === "Teacher") {
      if (visitor === "guest") {
        const email = "tony@12";
        const fields = { email, password };
        setLoader(true);
        dispatch(loginUser(fields, user));
      } else {
        navigate('/Teacherlogin');
      }
    }
  };

  useEffect(() => {
    if (status === 'success' || currentUser !== null) {
      if (currentRole === 'Admin') {
        navigate('/Admin/dashboard');
      } else if (currentRole === 'Student') {
        navigate('/Student/dashboard');
      } else if (currentRole === 'Teacher') {
        navigate('/Teacher/dashboard');
      }
    } else if (status === 'error') {
      setLoader(false);
      setMessage("Network Error");
      setShowPopup(true);
    }
  }, [status, currentRole, navigate, currentUser]);

  const userCards = [
    {
      title: "Admin",
      icon: <AccountCircle style={{ fontSize: 48 }} />,
      description: "Manage school data, users, and system settings",
      color: "#5461c8"
    },
    {
      title: "Student",
      icon: <School style={{ fontSize: 48 }} />,
      description: "Access courses, assignments, and track progress",
      color: "#4caf50"
    },
    {
      title: "Teacher",
      icon: <Group style={{ fontSize: 48 }} />,
      description: "Create classes, assign work, and monitor students",
      color: "#f57c00"
    }
  ];

  return (
    <StyledContainer>
      <GradientOverlay />
      <ContentWrapper>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Title>Choose Your Role</Title>
          <Subtitle>
            Select the role that matches your position in the school management system
          </Subtitle>
        </motion.div>

        <Grid 
          container 
          spacing={isMobile ? 3 : 4} 
          justifyContent="center" 
          sx={{ mt: 6, mb: 6, position: "relative", zIndex: 2 }}
        >
          {userCards.map((card, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
              >
                <UserCard 
                  elevation={6}
                  onMouseEnter={() => setActiveCard(card.title)}
                  onMouseLeave={() => setActiveCard(null)}
                  $isActive={activeCard === card.title}
                  $color={card.color}
                  onClick={() => navigateHandler(card.title)}
                >
                  <IconWrapper $color={card.color}>
                    {card.icon}
                  </IconWrapper>
                  
                  <CardTitle variant="h5">
                    {card.title}
                  </CardTitle>
                  
                  <CardDescription>
                    {card.description}
                  </CardDescription>
                  
                  <ActionButton 
                    variant="contained" 
                    $color={card.color}
                    endIcon={<ArrowForward />}
                    $isActive={activeCard === card.title}
                  >
                    Continue
                  </ActionButton>
                </UserCard>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        <FooterText>
          School Management System • Version 2.5.0
        </FooterText>
      </ContentWrapper>

      <Backdrop
        sx={{ 
          color: '#fff', 
          zIndex: 9999,
          flexDirection: 'column',
          gap: 2,
          backdropFilter: 'blur(4px)'
        }}
        open={loader}
      >
        <LoadingWrapper>
          <CircularProgress color="inherit" size={60} thickness={4} />
          <Typography variant="h6" sx={{ mt: 2, fontWeight: 500 }}>
            Authenticating...
          </Typography>
        </LoadingWrapper>
      </Backdrop>
      
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </StyledContainer>
  );
};

export default ChooseUser;

// Styled Components
const StyledContainer = styled.div`
  background-color: #1a237e;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
`;

const GradientOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at top right, rgba(106, 120, 209, 0.4) 0%, rgba(26, 35, 126, 0) 60%),
              radial-gradient(circle at bottom left, rgba(63, 81, 181, 0.4) 0%, rgba(26, 35, 126, 0) 60%);
  z-index: 1;
`;

const ContentWrapper = styled(Container)`
  text-align: center;
  max-width: 1200px;
  position: relative;
  z-index: 2;
  padding: 2rem 1rem;
`;

const Title = styled.h1`
  color: white;
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);

  @media (max-width: 600px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.h2`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.25rem;
  font-weight: 400;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 600px) {
    font-size: 1rem;
  }
`;

const UserCard = styled(Paper)`
  padding: 2.5rem 1.5rem;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  background-color: #ffffff;
  box-shadow: ${props => props.$isActive 
    ? '0 12px 28px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05)' 
    : '0 6px 16px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.03)'};
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background-color: ${props => props.$isActive ? props.$color : 'transparent'};
    transition: all 0.3s ease;
  }

  &:hover::before {
    background-color: ${props => props.$color};
  }
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 88px;
  height: 88px;
  border-radius: 50%;
  background-color: ${props => `${props.$color}15`};  // 15% opacity of the color
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;

  & > svg {
    color: ${props => props.$color};
    transition: all 0.3s ease;
  }
`;

const CardTitle = styled(Typography)`
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: #1a237e;
`;

const CardDescription = styled.p`
  color: #546e7a;
  font-size: 1rem;
  margin-bottom: 2rem;
  line-height: 1.5;
  flex-grow: 1;
`;

const ActionButton = styled(Button)`
  background-color: ${props => props.$isActive ? props.$color : '#f5f5f5'};
  color: ${props => props.$isActive ? '#ffffff' : props.$color};
  text-transform: none;
  font-weight: 600;
  font-size: 1rem;
  padding: 0.5rem 1.5rem;
  border-radius: 50px;
  box-shadow: none;
  transition: all 0.3s ease;
  border: 1px solid ${props => props.$color};

  &:hover {
    background-color: ${props => props.$color};
    color: white;
    box-shadow: 0 4px 12px ${props => `${props.$color}40`};
  }
`;

const FooterText = styled.p`
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.875rem;
  margin-top: 2rem;
`;

const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(26, 35, 126, 0.8);
  border-radius: 16px;
  padding: 2rem 3rem;
`;