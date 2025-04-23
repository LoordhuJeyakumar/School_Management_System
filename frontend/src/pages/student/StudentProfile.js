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
    Email as EmailIcon,
    Phone as PhoneIcon,
    LocationOn as AddressIcon,
    CalendarMonth as DateIcon,
    Wc as GenderIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import { getUserDetails } from '../../redux/userRelated/userHandle';

const StudentProfile = () => {
    const dispatch = useDispatch();
    const { currentUser, userDetails, loading } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getUserDetails(currentUser._id, "Student"));
    }, [dispatch, currentUser._id]);

    const personalInfo = [
        { icon: <EmailIcon />, label: 'Email', value: currentUser?.email || 'Not Added' },
        { icon: <PhoneIcon />, label: 'Phone', value: currentUser?.phone || 'Not Added' },
        { icon: <AddressIcon />, label: 'Address', value: currentUser?.address || 'Not Added' },
        { icon: <DateIcon />, label: 'Date of Birth', value: currentUser?.date_of_birth || 'Not Added' },
        { icon: <GenderIcon />, label: 'Gender', value: currentUser?.gender || 'Not Added' }
    ];

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
                                        {currentUser.name?.charAt(0)}
                                    </StyledAvatar>
                                </AvatarWrapper>
                                <Box>
                                    <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                                        {currentUser.name}
                                    </Typography>
                                    <Stack direction="row" spacing={2}>
                                        <Chip
                                            icon={<PersonIcon />}
                                            label="Student"
                                            sx={{ bgcolor: 'primary.lighter', color: 'primary.main' }}
                                        />
                                        <Chip
                                            icon={<ClassIcon />}
                                            label={`Class ${currentUser.sclassName?.sclassName}`}
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
                                    Academic Information
                                </Typography>
                                <Stack spacing={2}>
                                    <InfoItem>
                                        <IconWrapper>
                                            <ClassIcon />
                                        </IconWrapper>
                                        <Box>
                                            <Typography variant="body2" color="text.secondary">
                                                Class
                                            </Typography>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                                                {currentUser.sclassName?.sclassName}
                                            </Typography>
                                        </Box>
                                    </InfoItem>
                                    <InfoItem>
                                        <IconWrapper>
                                            <PersonIcon />
                                        </IconWrapper>
                                        <Box>
                                            <Typography variant="body2" color="text.secondary">
                                                Roll Number
                                            </Typography>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                                                {currentUser.rollNum}
                                            </Typography>
                                        </Box>
                                    </InfoItem>
                                    <InfoItem>
                                        <IconWrapper>
                                            <SchoolIcon />
                                        </IconWrapper>
                                        <Box>
                                            <Typography variant="body2" color="text.secondary">
                                                School
                                            </Typography>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                                                {currentUser.school?.schoolName}
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
                                    {personalInfo.map((item, index) => (
                                        <Grid item xs={12} sm={6} key={index}>
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
    height: 50vh;
`;

const ProfileHeader = styled(Paper)`
    padding: 2rem;
    border-radius: 16px;
    background: linear-gradient(135deg, #4361ee08, #3a0ca308);
`;

const HeaderContent = styled(Box)`
    display: flex;
    align-items: center;
    gap: 2rem;
`;

const AvatarWrapper = styled(Box)`
    position: relative;
    
    &::after {
        content: '';
        position: absolute;
        top: -4px;
        left: -4px;
        right: -4px;
        bottom: -4px;
        border: 2px solid #4361ee20;
        border-radius: 50%;
    }
`;

const StyledAvatar = styled(Avatar)`
    width: 100px;
    height: 100px;
    font-size: 2.5rem;
    background: linear-gradient(135deg, #4361ee, #3a0ca3);
`;

const InfoCard = styled(Paper)`
    padding: 1.5rem;
    height: 100%;
    border-radius: 16px;
    background: white;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    
    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    }
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

export default StudentProfile;