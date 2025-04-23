import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addStuff } from '../../redux/userRelated/userHandle';
import {
    Container, Paper, Typography, TextField, Button,
    Box, CircularProgress, Stack, Avatar, Divider,
    Alert
} from '@mui/material';
import {
    ReportProblem as ComplainIcon,
    Subject as SubjectIcon,
    Description as DescriptionIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import Popup from '../../components/Popup';

const TeacherComplain = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser } = useSelector(state => state.user);

    const [title, setTitle] = useState('');
    const [complaint, setComplaint] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState('');
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState('');

    const fields = {
        title,
        complaint,
        teacherId: currentUser._id,
        teacherName: currentUser.name,
        teacherClass: currentUser.teachSclass,
        school: currentUser.school,
    };

    const submitHandler = (e) => {
        e.preventDefault();
        setLoader(true);
        setError('');

        if (!title.trim() || !complaint.trim()) {
            setError('Please fill in all fields');
            setLoader(false);
            return;
        }

        dispatch(addStuff(fields, "Complaint"))
            .then(() => {
                setShowPopup(true);
                setMessage("Complaint submitted successfully");
                setTimeout(() => navigate('/Teacher/dashboard'), 2000);
            })
            .catch((error) => {
                setError('Something went wrong. Please try again.');
                setLoader(false);
            });
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <StyledPaper elevation={3}>
                    <Stack spacing={3} alignItems="center">
                        <Avatar sx={{
                            width: 70,
                            height: 70,
                            bgcolor: 'primary.main',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                        }}>
                            <ComplainIcon sx={{ fontSize: 45 }} />
                        </Avatar>
                        
                        <div>
                            <Typography variant="h4" component="h1" sx={{
                                fontWeight: 600,
                                background: 'linear-gradient(45deg, #4361ee, #3a0ca3)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                textAlign: 'center'
                            }}>
                                Submit a Complaint
                            </Typography>
                            <Typography variant="body1" color="text.secondary" textAlign="center" sx={{ mt: 1 }}>
                                Please provide details about your concern
                            </Typography>
                        </div>

                        <Divider sx={{ width: '100%', my: 2 }} />

                        {error && (
                            <Alert severity="error" sx={{ width: '100%' }}>
                                {error}
                            </Alert>
                        )}

                        <form onSubmit={submitHandler} style={{ width: '100%' }}>
                            <Stack spacing={4}>
                                <FormField>
                                    <IconWrapper>
                                        <SubjectIcon />
                                    </IconWrapper>
                                    <TextField
                                        fullWidth
                                        label="Complaint Title"
                                        variant="outlined"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        required
                                        placeholder="Enter a brief title for your complaint"
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: 2,
                                                transition: 'all 0.3s ease'
                                            },
                                            '& .MuiOutlinedInput-root:hover': {
                                                backgroundColor: 'rgba(0,0,0,0.01)'
                                            }
                                        }}
                                    />
                                </FormField>

                                <FormField>
                                    <IconWrapper>
                                        <DescriptionIcon />
                                    </IconWrapper>
                                    <TextField
                                        fullWidth
                                        label="Complaint Details"
                                        variant="outlined"
                                        multiline
                                        rows={4}
                                        value={complaint}
                                        onChange={(e) => setComplaint(e.target.value)}
                                        required
                                        placeholder="Provide detailed information about your complaint"
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: 2,
                                                transition: 'all 0.3s ease'
                                            },
                                            '& .MuiOutlinedInput-root:hover': {
                                                backgroundColor: 'rgba(0,0,0,0.01)'
                                            }
                                        }}
                                    />
                                </FormField>

                                <SubmitButton
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    disabled={loader}
                                >
                                    {loader ? (
                                        <CircularProgress size={24} sx={{ color: 'white' }} />
                                    ) : "Submit Complaint"}
                                </SubmitButton>
                            </Stack>
                        </form>

                        <Typography variant="body2" color="text.secondary" sx={{ mt: 2, textAlign: 'center' }}>
                            Your complaint will be reviewed by the administration promptly
                        </Typography>
                    </Stack>
                </StyledPaper>
            </motion.div>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </Container>
    );
};

const StyledPaper = styled(Paper)`
    padding: 2.5rem;
    border-radius: 16px;
    background: linear-gradient(to right bottom, #ffffff, #fafafa);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`;

const FormField = styled(Box)`
    display: flex;
    align-items: flex-start;
    gap: 1rem;
`;

const IconWrapper = styled(Box)`
    color: #4361ee;
    margin-top: 1rem;
`;

const SubmitButton = styled(Button)`
    height: 48px;
    background: linear-gradient(45deg, #4361ee, #3a0ca3);
    border-radius: 8px;
    font-weight: 600;
    text-transform: none;
    box-shadow: 0 4px 12px rgba(67, 97, 238, 0.3);
    transition: all 0.3s ease;
    
    &:hover {
        background: linear-gradient(45deg, #3a0ca3, #4361ee);
        box-shadow: 0 6px 16px rgba(67, 97, 238, 0.4);
        transform: translateY(-1px);
    }
`;

export default TeacherComplain;