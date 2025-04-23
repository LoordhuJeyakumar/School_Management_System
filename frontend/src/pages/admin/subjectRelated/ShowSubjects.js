import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { getSubjectList } from '../../../redux/sclassRelated/sclassHandle';
import { deleteUser } from '../../../redux/userRelated/userHandle';
import {
    Paper, Box, IconButton, Typography, Container,
    Grid, Card, CardContent, Fade, CircularProgress,
    Divider
} from '@mui/material';
import {
    Delete as DeleteIcon,
    PostAdd as PostAddIcon,
    MenuBook as SubjectIcon,
    Class as ClassIcon,
    AccessTime as SessionsIcon
} from '@mui/icons-material';
import { BlueButton, GreenButton } from '../../../components/buttonStyles';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import Popup from '../../../components/Popup';
import { motion, AnimatePresence } from 'framer-motion';
import styled from '@emotion/styled';

const ShowSubjects = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { subjectsList, loading, error, response } = useSelector((state) => state.sclass);
    const { currentUser } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getSubjectList(currentUser._id, "AllSubjects"));
    }, [currentUser._id, dispatch]);

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const deleteHandler = (deleteID, address) => {
        setMessage("Sorry the delete function has been disabled for now.")
        setShowPopup(true)
    }

    const actions = [
        {
            icon: <PostAddIcon />, 
            name: 'Add New Subject',
            action: () => navigate("/Admin/subjects/chooseclass")
        },
        {
            icon: <DeleteIcon />, 
            name: 'Delete All Subjects',
            action: () => deleteHandler(currentUser._id, "Subjects")
        }
    ];

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h4" sx={{
                        fontWeight: 700,
                        color: 'primary.main',
                        textAlign: 'center',
                        background: 'linear-gradient(45deg, #4361ee, #3a0ca3)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        Subject Management
                    </Typography>
                </Box>

                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <>
                        {response ? (
                            <EmptyState>
                                <SubjectIcon sx={{ fontSize: 60, color: '#94a3b8', mb: 2 }} />
                                <Typography variant="h6" color="text.secondary" gutterBottom>
                                    No Subjects Found
                                </Typography>
                                <GreenButton 
                                    variant="contained"
                                    onClick={() => navigate("/Admin/subjects/chooseclass")}
                                    startIcon={<PostAddIcon />}
                                >
                                    Add Subjects
                                </GreenButton>
                            </EmptyState>
                        ) : (
                            <Grid container spacing={3}>
                                <AnimatePresence>
                                    {subjectsList.map((subject, index) => (
                                        <Grid item xs={12} sm={6} md={4} key={subject._id}>
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -20 }}
                                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                            >
                                                <SubjectCard elevation={3}>
                                                    <CardContent>
                                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                                            <Box>
                                                                <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                                                                    {subject.subName}
                                                                </Typography>
                                                                <Typography variant="body2" color="text.secondary">
                                                                    Code: {subject.subCode}
                                                                </Typography>
                                                            </Box>
                                                            <IconButton 
                                                                onClick={() => deleteHandler(subject._id, "Subject")}
                                                                sx={{ '&:hover': { color: 'error.main' } }}
                                                            >
                                                                <DeleteIcon />
                                                            </IconButton>
                                                        </Box>
                                                        
                                                        <Divider sx={{ my: 1.5 }} />
                                                        
                                                        <Grid container spacing={2} sx={{ mb: 2 }}>
                                                            <Grid item xs={6}>
                                                                <InfoItem>
                                                                    <ClassIcon sx={{ color: 'primary.main' }} />
                                                                    <Typography variant="body2" color="text.secondary">
                                                                        {subject.sclassName.sclassName}
                                                                    </Typography>
                                                                </InfoItem>
                                                            </Grid>
                                                            <Grid item xs={6}>
                                                                <InfoItem>
                                                                    <SessionsIcon sx={{ color: '#2a9d8f' }} />
                                                                    <Typography variant="body2" color="text.secondary">
                                                                        {subject.sessions} Sessions
                                                                    </Typography>
                                                                </InfoItem>
                                                            </Grid>
                                                        </Grid>

                                                        <BlueButton
                                                            fullWidth
                                                            variant="contained"
                                                            onClick={() => navigate(`/Admin/subjects/subject/${subject.sclassName._id}/${subject._id}`)}
                                                            sx={{ 
                                                                mt: 1,
                                                                textTransform: 'none',
                                                                borderRadius: '8px'
                                                            }}
                                                        >
                                                            View Details
                                                        </BlueButton>
                                                    </CardContent>
                                                </SubjectCard>
                                            </motion.div>
                                        </Grid>
                                    ))}
                                </AnimatePresence>
                            </Grid>
                        )}
                        <SpeedDialTemplate actions={actions} />
                    </>
                )}
            </motion.div>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </Container>
    );
};

const SubjectCard = styled(Card)`
    height: 100%;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    }
`;

const InfoItem = styled(Box)`
    display: flex;
    align-items: center;
    gap: 8px;
`;

const EmptyState = styled(Box)`
    text-align: center;
    padding: 3rem;
    background: white;
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

export default ShowSubjects;