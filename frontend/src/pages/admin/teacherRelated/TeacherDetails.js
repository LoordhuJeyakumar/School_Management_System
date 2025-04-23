import React, { useEffect } from 'react';
import { getTeacherDetails } from '../../../redux/teacherRelated/teacherHandle';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    Container, Grid, Paper, Typography, Box,
    Avatar, Chip, Button, CircularProgress
} from '@mui/material';
import {
    Person as PersonIcon,
    Email as EmailIcon,
    School as SchoolIcon,
    Class as ClassIcon,
    MenuBook as SubjectIcon,
    Timer as SessionsIcon,
    Add as AddIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';

const TeacherDetails = () => {
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();
    const { loading, teacherDetails, error } = useSelector((state) => state.teacher);

    const teacherID = params.id;

    useEffect(() => {
        dispatch(getTeacherDetails(teacherID));
    }, [dispatch, teacherID]);

    if (error) {
        console.log(error);
    }

    if (loading) {
        return (
            <LoaderWrapper>
                <CircularProgress />
            </LoaderWrapper>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <ProfileHeader elevation={2}>
                            <HeaderContent>
                                <AvatarWrapper>
                                    <StyledAvatar>
                                        {teacherDetails?.name?.charAt(0)}
                                    </StyledAvatar>
                                </AvatarWrapper>
                                <Box>
                                    <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                                        {teacherDetails?.name}
                                    </Typography>
                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                        <Chip
                                            icon={<PersonIcon />}
                                            label="Teacher"
                                            sx={{
                                                bgcolor: 'primary.lighter',
                                                color: 'primary.main',
                                                '& .MuiChip-icon': { color: 'inherit' }
                                            }}
                                        />
                                        <Chip
                                            icon={<EmailIcon />}
                                            label={teacherDetails?.email}
                                            sx={{
                                                bgcolor: 'success.lighter',
                                                color: 'success.main',
                                                '& .MuiChip-icon': { color: 'inherit' }
                                            }}
                                        />
                                    </Box>
                                </Box>
                            </HeaderContent>
                        </ProfileHeader>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <InfoCard elevation={1}>
                            <Box sx={{ mb: 2 }}>
                                <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main', mb: 2 }}>
                                    Class Information
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <IconWrapper>
                                        <ClassIcon />
                                    </IconWrapper>
                                    <Box sx={{ ml: 2 }}>
                                        <Typography variant="body2" color="text.secondary">
                                            Assigned Class
                                        </Typography>
                                        <Typography variant="h6">
                                            Class {teacherDetails?.teachSclass?.sclassName}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <IconWrapper>
                                        <SchoolIcon />
                                    </IconWrapper>
                                    <Box sx={{ ml: 2 }}>
                                        <Typography variant="body2" color="text.secondary">
                                            School
                                        </Typography>
                                        <Typography variant="h6">
                                            {teacherDetails?.school?.schoolName}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </InfoCard>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <InfoCard elevation={1}>
                            <Box sx={{ mb: 2 }}>
                                <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main', mb: 2 }}>
                                    Subject Information
                                </Typography>
                                {teacherDetails?.teachSubject ? (
                                    <>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                            <IconWrapper>
                                                <SubjectIcon />
                                            </IconWrapper>
                                            <Box sx={{ ml: 2 }}>
                                                <Typography variant="body2" color="text.secondary">
                                                    Teaching Subject
                                                </Typography>
                                                <Typography variant="h6">
                                                    {teacherDetails.teachSubject.subName}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <IconWrapper>
                                                <SessionsIcon />
                                            </IconWrapper>
                                            <Box sx={{ ml: 2 }}>
                                                <Typography variant="body2" color="text.secondary">
                                                    Sessions
                                                </Typography>
                                                <Typography variant="h6">
                                                    {teacherDetails.teachSubject.sessions} Sessions
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </>
                                ) : (
                                    <Box sx={{ textAlign: 'center', py: 3 }}>
                                        <SubjectIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                                        <Typography variant="body1" color="text.secondary" gutterBottom>
                                            No Subject Assigned
                                        </Typography>
                                        <Button
                                            variant="contained"
                                            onClick={() => navigate(`/Admin/teachers/choosesubject/${teacherDetails?.teachSclass?._id}/${teacherDetails?._id}`)}
                                            startIcon={<AddIcon />}
                                            sx={{ mt: 2 }}
                                        >
                                            Assign Subject
                                        </Button>
                                    </Box>
                                )}
                            </Box>
                        </InfoCard>
                    </Grid>
                </Grid>
            </motion.div>
        </Container>
    );
};

const LoaderWrapper = styled(Box)`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 400px;
`;

const ProfileHeader = styled(Paper)`
    padding: 2rem;
    border-radius: 16px;
    background: linear-gradient(135deg, #4361ee08, #3a0ca308);
    margin-bottom: 2rem;
`;

const HeaderContent = styled(Box)`
    display: flex;
    align-items: center;
    gap: 2rem;
`;

const AvatarWrapper = styled(Box)`
    position: relative;
`;

const StyledAvatar = styled(Avatar)`
    width: 80px;
    height: 80px;
    font-size: 2rem;
    font-weight: 600;
    background: linear-gradient(135deg, #4361ee, #3a0ca3);
`;

const InfoCard = styled(Paper)`
    padding: 1.5rem;
    height: 100%;
    border-radius: 16px;
    background: white;
`;

const IconWrapper = styled(Box)`
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background: linear-gradient(135deg, #4361ee08, #3a0ca308);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #4361ee;
`;

export default TeacherDetails;