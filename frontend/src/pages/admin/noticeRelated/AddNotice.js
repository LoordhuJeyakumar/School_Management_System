import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addStuff } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import { Container, Grid, Paper, Typography, TextField, Box, CircularProgress } from '@mui/material';
import { LightPurpleButton } from '../../../components/buttonStyles';
import { Announcement as AnnouncementIcon } from '@mui/icons-material';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Popup from '../../../components/Popup';

const AddNotice = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { status, response, error } = useSelector(state => state.user);
    const { currentUser } = useSelector(state => state.user);

    const [title, setTitle] = useState('');
    const [details, setDetails] = useState('');
    const [date, setDate] = useState('');
    const adminID = currentUser._id;

    const [loader, setLoader] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const fields = { title, details, date, adminID };
    const address = "Notice";

    const submitHandler = (event) => {
        event.preventDefault();
        setLoader(true);
        dispatch(addStuff(fields, address));
    };

    useEffect(() => {
        if (status === 'added') {
            navigate('/Admin/notices');
            dispatch(underControl());
        } else if (status === 'error') {
            setMessage("Network Error");
            setShowPopup(true);
            setLoader(false);
        }
    }, [status, navigate, error, response, dispatch]);

    return (
        <StyledContainer>
            <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} md={8}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <StyledPaper elevation={2}>
                            <Box sx={{ mb: 4, textAlign: 'center' }}>
                                <IconWrapper>
                                    <AnnouncementIcon sx={{ fontSize: 40 }} />
                                </IconWrapper>
                                <Typography variant="h4" component="h1" sx={{
                                    fontWeight: 700,
                                    my: 2,
                                    background: 'linear-gradient(45deg, #4361ee, #3a0ca3)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent'
                                }}>
                                    Add New Notice
                                </Typography>
                                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                                    Create a new notice to inform students and teachers
                                </Typography>
                            </Box>

                            <form onSubmit={submitHandler}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Notice Title"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            required
                                            InputProps={{
                                                sx: {
                                                    borderRadius: '12px',
                                                }
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Notice Details"
                                            value={details}
                                            onChange={(e) => setDetails(e.target.value)}
                                            required
                                            multiline
                                            rows={4}
                                            InputProps={{
                                                sx: {
                                                    borderRadius: '12px',
                                                }
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            type="date"
                                            value={date}
                                            onChange={(e) => setDate(e.target.value)}
                                            required
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            label="Notice Date"
                                            InputProps={{
                                                sx: {
                                                    borderRadius: '12px',
                                                }
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                                            <LightPurpleButton
                                                fullWidth
                                                type="submit"
                                                disabled={loader}
                                                sx={{
                                                    py: 1.5,
                                                    borderRadius: '12px',
                                                    marginTop: '1rem'
                                                }}
                                            >
                                                {loader ? (
                                                    <CircularProgress size={24} color="inherit" />
                                                ) : (
                                                    "Add Notice"
                                                )}
                                            </LightPurpleButton>
                                        </motion.div>
                                    </Grid>
                                </Grid>
                            </form>
                        </StyledPaper>
                    </motion.div>
                </Grid>
            </Grid>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </StyledContainer>
    );
};

export default AddNotice;

const StyledContainer = styled(Container)`
    min-height: 100vh;
    display: flex;
    align-items: center;
    padding: 2rem 0;
`;

const StyledPaper = styled(Paper)`
    padding: 2rem;
    border-radius: 16px;
    background: white;
    border: 1px solid rgba(241, 242, 244, 0.5);

    &:hover {
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    }
`;

const IconWrapper = styled.div`
    width: 64px;
    height: 64px;
    border-radius: 16px;
    background: linear-gradient(135deg, rgba(67, 97, 238, 0.1), rgba(58, 12, 163, 0.1));
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    margin-bottom: 1rem;

    svg {
        color: #4361ee;
    }
`;