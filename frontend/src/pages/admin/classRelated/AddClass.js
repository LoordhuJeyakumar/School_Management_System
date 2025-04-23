import React, { useEffect, useState } from "react";
import { 
  Box, 
  Button, 
  CircularProgress, 
  Stack, 
  TextField, 
  Typography, 
  useMediaQuery,
  useTheme,
  InputAdornment,
  Paper
} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addStuff } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import Popup from "../../../components/Popup";
import Classroom from "../../../assets/classroom.png";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Add, ArrowBack, Class } from "@mui/icons-material";

const AddClass = () => {
    const [sclassName, setSclassName] = useState("");
    const [isButtonHovered, setIsButtonHovered] = useState(false);
    
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userState = useSelector(state => state.user);
    const { status, currentUser, response, error, tempDetails } = userState;

    const adminID = currentUser._id;
    const address = "Sclass";

    const [loader, setLoader] = useState(false);
    const [message, setMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    const fields = {
        sclassName,
        adminID,
    };

    const submitHandler = (event) => {
        event.preventDefault();
        if (!sclassName.trim()) return;
        setLoader(true);
        dispatch(addStuff(fields, address));
    };

    useEffect(() => {
        if (status === 'added' && tempDetails) {
            navigate("/Admin/classes/class/" + tempDetails._id);
            dispatch(underControl());
            setLoader(false);
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
        }
    }, [status, navigate, error, response, dispatch, tempDetails]);

    return (
        <PageContainer>
            <ContentWrapper>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <FormCard elevation={6}>
                        <BackButton 
                            onClick={() => navigate(-1)}
                            startIcon={<ArrowBack />}
                            variant="text"
                        >
                            Back to Classes
                        </BackButton>
                        
                        <Stack direction="column" spacing={3} alignItems="center">
                            <HeaderSection>
                                <Typography variant="h4" fontWeight="700" color="primary">
                                    Create New Class
                                </Typography>
                                <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}>
                                    Add a new class to your school management system
                                </Typography>
                            </HeaderSection>
                            
                            <IllustrationContainer>
                                <motion.div
                                    whileHover={{ scale: 1.03 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                >
                                    <img
                                        src={Classroom}
                                        alt="Classroom illustration"
                                        style={{ 
                                            width: '100%', 
                                            maxWidth: '300px',
                                            filter: 'drop-shadow(0px 5px 15px rgba(0, 0, 0, 0.15))'
                                        }}
                                    />
                                </motion.div>
                            </IllustrationContainer>

                            <form onSubmit={submitHandler} style={{ width: '100%' }}>
                                <Stack spacing={4} width="100%">
                                    <StyledTextField
                                        label="Class Name"
                                        variant="outlined"
                                        value={sclassName}
                                        onChange={(event) => {
                                            setSclassName(event.target.value);
                                        }}
                                        placeholder="Enter class name (e.g. 10th Grade Science)"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Class sx={{ color: 'primary.main' }} />
                                                </InputAdornment>
                                            ),
                                        }}
                                        fullWidth
                                        required
                                    />
                                    
                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <SubmitButton
                                            fullWidth
                                            size="large"
                                            variant="contained"
                                            type="submit"
                                            disabled={loader || !sclassName.trim()}
                                            onMouseEnter={() => setIsButtonHovered(true)}
                                            onMouseLeave={() => setIsButtonHovered(false)}
                                            endIcon={!loader && <Add />}
                                        >
                                            {loader ? (
                                                <CircularProgress size={24} color="inherit" />
                                            ) : (
                                                "Create Class"
                                            )}
                                        </SubmitButton>
                                    </motion.div>
                                </Stack>
                            </form>
                        </Stack>
                    </FormCard>
                </motion.div>
            </ContentWrapper>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </PageContainer>
    );
};

export default AddClass;

// Styled Components
const PageContainer = styled(Box)`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f7f9fc;
  padding: 2rem 1rem;
`;

const ContentWrapper = styled(Box)`
  width: 100%;
  max-width: 600px;
`;

const FormCard = styled(Paper)`
  padding: 2.5rem;
  border-radius: 16px;
  position: relative;
  overflow: visible;
  background-color: white;
  
  @media (max-width: 600px) {
    padding: 2rem 1.5rem;
  }
`;

const HeaderSection = styled(Box)`
  text-align: center;
  margin-bottom: 1rem;
`;

const IllustrationContainer = styled(Box)`
  display: flex;
  justify-content: center;
  margin: 1rem 0 2rem;
  width: 100%;
`;

const StyledTextField = styled(TextField)`
  & .MuiOutlinedInput-root {
    border-radius: 12px;
    
    &:hover .MuiOutlinedInput-notchedOutline {
      border-color: ${props => props.theme.palette?.primary?.main || '#1976d2'};
    }
  }
  
  & .MuiInputLabel-root.Mui-focused {
    color: ${props => props.theme.palette?.primary?.main || '#1976d2'};
  }
`;

const SubmitButton = styled(Button)`
  padding: 12px 0;
  border-radius: 12px;
  font-weight: 600;
  text-transform: none;
  font-size: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  background: linear-gradient(90deg, #1976d2, #0d47a1);
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
    background: linear-gradient(90deg, #1e88e5, #1565c0);
  }
  
  &:disabled {
    background: #e0e0e0;
  }
`;

const BackButton = styled(Button)`
  position: absolute;
  top: 20px;
  left: 20px;
  color: #546e7a;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
    color: #37474f;
  }
`;