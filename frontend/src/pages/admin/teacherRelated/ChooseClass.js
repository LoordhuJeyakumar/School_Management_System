 import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllSclasses } from '../../../redux/sclassRelated/sclassHandle';
import {
    Box, Container, Typography, Grid, Card, CardContent,
    CircularProgress, Chip, Avatar
} from '@mui/material';
import {
    Class as ClassIcon,
    PersonAdd as PersonAddIcon,
    School as SchoolIcon
} from '@mui/icons-material';
import { PurpleButton } from '../../../components/buttonStyles';
import { motion, AnimatePresence } from 'framer-motion';
import styled from '@emotion/styled';

const ChooseClass = ({ situation }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { sclassesList, loading, error, getresponse } = useSelector((state) => state.sclass);
    const { currentUser } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getAllSclasses(currentUser._id, "Sclass"));
    }, [currentUser._id, dispatch]);

    if (error) {
        console.log(error);
    }

    const navigateHandler = (classID) => {
        if (situation === "Teacher") {
            navigate("/Admin/teachers/choosesubject/" + classID);
        } else if (situation === "Subject") {
            navigate("/Admin/addsubject/" + classID);
        }
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h4" component="h2" sx={{
                        fontWeight: 700,
                        textAlign: 'center',
                        color: 'primary.main',
                        background: 'linear-gradient(45deg, #4361ee, #3a0ca3)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        Choose Class
                    </Typography>
                    <Typography variant="body1" sx={{ textAlign: 'center', color: 'text.secondary', mt: 1 }}>
                        Select a class to {situation === "Teacher" ? "assign a teacher" : "add subjects"}
                    </Typography>
                </Box>

                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <>
                        {getresponse ? (
                            <EmptyState>
                                <SchoolIcon sx={{ fontSize: 60, color: '#94a3b8', mb: 2 }} />
                                <Typography variant="h6" color="text.secondary" gutterBottom>
                                    No Classes Found
                                </Typography>
                                <PurpleButton
                                    variant="contained"
                                    onClick={() => navigate("/Admin/addclass")}
                                    startIcon={<ClassIcon />}
                                >
                                    Add Class
                                </PurpleButton>
                            </EmptyState>
                        ) : (
                            <Grid container spacing={3}>
                                <AnimatePresence>
                                    {sclassesList.map((sclass, index) => (
                                        <Grid item xs={12} sm={6} md={4} key={sclass._id}>
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -20 }}
                                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                            >
                                                <ClassCard elevation={3}>
                                                    <CardContent>
                                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                            <StyledAvatar>
                                                                <ClassIcon />
                                                            </StyledAvatar>
                                                            <Box sx={{ ml: 2 }}>
                                                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                                                    Class {sclass.sclassName}
                                                                </Typography>
                                                                <Chip
                                                                    icon={<PersonAddIcon />}
                                                                    label={situation === "Teacher" ? "Assign Teacher" : "Add Subjects"}
                                                                    size="small"
                                                                    sx={{
                                                                        mt: 0.5,
                                                                        bgcolor: 'primary.lighter',
                                                                        color: 'primary.main',
                                                                        '& .MuiChip-icon': { color: 'inherit' }
                                                                    }}
                                                                />
                                                            </Box>
                                                        </Box>
                                                        <Box sx={{ mt: 2 }}>
                                                            <PurpleButton
                                                                fullWidth
                                                                variant="contained"
                                                                onClick={() => navigateHandler(sclass._id)}
                                                                sx={{ borderRadius: '8px' }}
                                                            >
                                                                Choose Class
                                                            </PurpleButton>
                                                        </Box>
                                                    </CardContent>
                                                </ClassCard>
                                            </motion.div>
                                        </Grid>
                                    ))}
                                </AnimatePresence>
                            </Grid>
                        )}
                    </>
                )}
            </motion.div>
        </Container>
    );
};

const ClassCard = styled(Card)`
    height: 100%;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    }
`;

const StyledAvatar = styled(Avatar)`
    background: linear-gradient(135deg, #4361ee, #3a0ca3);
    width: 48px;
    height: 48px;
`;

const EmptyState = styled(Box)`
    text-align: center;
    padding: 3rem;
    background: white;
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

export default ChooseClass;