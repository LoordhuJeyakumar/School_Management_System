import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Container, Grid, Paper, Typography, Box,
    Avatar, Chip, Stack, CircularProgress
} from '@mui/material';
import {
    Person as PersonIcon,
    School as SchoolIcon,
    Class as ClassIcon,
    MenuBook as SubjectIcon,
    Email as EmailIcon,
    Phone as PhoneIcon,
    LocationOn as AddressIcon,
    Work as ExperienceIcon
} from '@mui/icons-material';
import { getTeacherDetails } from '../../redux/teacherRelated/teacherHandle';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';

const TeacherProfile = () => {
    const dispatch = useDispatch();
    const { currentUser } = useSelector(state => state.user);
    const { loading, teacherDetails, error } = useSelector((state) => state.teacher);

    useEffect(() => {
        dispatch(getTeacherDetails(currentUser._id));
    }, [dispatch, currentUser._id]);

    const profileData = [
        { label: 'Email', value: teacherDetails?.email || currentUser?.email, icon: <EmailIcon /> },
        { label: 'Phone Number', value: teacherDetails?.phoneNumber || 'Not Added', icon: <PhoneIcon /> },
        { label: 'Address', value: teacherDetails?.address || 'Not Added', icon: <AddressIcon /> },
        { label: 'Experience', value: teacherDetails?.experience || 'Not Added', icon: <ExperienceIcon /> }
    ];

    if (loading) {
        return (
            <LoaderWrapper>
                <CircularProgress />
            </LoaderWrapper>
        );
    }

    if (error) {
        console.log(error);
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
                                        {teacherDetails?.name?.charAt(0) || currentUser?.name?.charAt(0)}
                                    </StyledAvatar>
                                </AvatarWrapper>
                                <Box>
                                    <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                                        {teacherDetails?.name || currentUser?.name}
                                    </Typography>
                                    <Stack direction="row" spacing={2}>
                                        <Chip 
                                            icon={<PersonIcon />}
                                            label="Teacher"
                                            sx={{ bgcolor: 'primary.lighter', color: 'primary.main' }}
                                        />
                                        <Chip
                                            icon={<SchoolIcon />}
                                            label={teacherDetails?.school?.schoolName}
                                            sx={{ bgcolor: 'success.lighter', color: 'success.main' }}
                                        />
                                    </Stack>
                                </Box>
                            </HeaderContent>
                        </ProfileHeader>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <InfoCard elevation={1}>
                            <Box sx={{ mb: 3 }}>
                                <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main', mb: 2 }}>
                                    Class Information
                                </Typography>
                                <Stack spacing={2}>
                                    <InfoItem>
                                        <IconWrapper>
                                            <ClassIcon />
                                        </IconWrapper>
                                        <Box>
                                            <Typography variant="body2" color="text.secondary">
                                                Assigned Class
                                            </Typography>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                                                Class {teacherDetails?.teachSclass?.sclassName || currentUser?.teachSclass?.sclassName}
                                            </Typography>
                                        </Box>
                                    </InfoItem>
                                    <InfoItem>
                                        <IconWrapper>
                                            <SubjectIcon />
                                        </IconWrapper>
                                        <Box>
                                            <Typography variant="body2" color="text.secondary">
                                                Teaching Subject
                                            </Typography>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                                                {teacherDetails?.teachSubject?.subName || currentUser?.teachSubject?.subName}
                                            </Typography>
                                        </Box>
                                    </InfoItem>
                                </Stack>
                            </Box>
                        </InfoCard>
                    </Grid>

                    <Grid item xs={12} md={8}>
                        <InfoCard elevation={1}>
                            <Box sx={{ mb: 3 }}>
                                <Typography variant="h6" sx={{ 
                                    fontWeight: 600,
                                    color: 'primary.main',
                                    mb: 3,
                                    pb: 1,
                                    borderBottom: '2px solid',
                                    borderColor: 'primary.light'
                                }}>
                                    Personal Information
                                </Typography>
                                <Grid container spacing={3}>
                                    {profileData.map((item, index) => (
                                        <Grid item xs={12} sm={6} key={item.label}>
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                            >
                                                <InfoItem>
                                                    <IconWrapper>
                                                        {item.icon}
                                                    </IconWrapper>
                                                    <Box>
                                                        <Typography variant="body2" color="text.secondary">
                                                            {item.label}
                                                        </Typography>
                                                        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                                                            {item.value}
                                                        </Typography>
                                                    </Box>
                                                </InfoItem>
                                            </motion.div>
                                        </Grid>
                                    ))}
                                </Grid>
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
`;

const InfoItem = styled(Box)`
    display: flex;
    align-items: center;
    gap: 1rem;
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

export default TeacherProfile;