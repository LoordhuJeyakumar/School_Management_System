import React from 'react';
import { Container, Grid, Typography, Avatar, Box, Paper } from '@mui/material';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import {
    Email as EmailIcon,
    Phone as PhoneIcon,
    School as SchoolIcon,
    AdminPanelSettings as AdminIcon,
    PersonAdd as UsersIcon,
    Class as ClassesIcon
} from '@mui/icons-material';

const AdminProfile = () => {
    const { currentUser } = useSelector((state) => state.user);

    const profileData = [
        { icon: <EmailIcon />, label: "Email", value: currentUser.email },
        { icon: <PhoneIcon />, label: "Phone", value: currentUser.phone || "Not provided" },
        { icon: <SchoolIcon />, label: "School", value: currentUser.school },
        { icon: <AdminIcon />, label: "Role", value: "Administrator" }
    ];

    const statsData = [
        {
            value: "350+",
            label: "Total Students",
            color: "#4361ee"
        },
        {
            value: "45+",
            label: "Total Teachers",
            color: "#2a9d8f"
        },
        {
            value: "12",
            label: "Total Classes",
            color: "#e63946"
        }
    ];

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <ProfileHeader elevation={2}>
                            <HeaderContent>
                                <AvatarWrapper>
                                    <StyledAvatar>
                                        {currentUser.name?.charAt(0)}
                                    </StyledAvatar>
                                </AvatarWrapper>
                                <div>
                                    <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                                        {currentUser.name}
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        School Administrator
                                    </Typography>
                                </div>
                            </HeaderContent>
                        </ProfileHeader>
                    </motion.div>
                </Grid>

                <Grid item xs={12} md={8}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <ProfileCard elevation={2}>
                            <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, color: '#1a237e' }}>
                                Administrator Information
                            </Typography>
                            <Grid container spacing={3}>
                                {profileData.map((item, index) => (
                                    <Grid item xs={12} sm={6} key={index}>
                                        <InfoCard>
                                            <IconWrapper>
                                                {item.icon}
                                            </IconWrapper>
                                            <InfoContent>
                                                <Typography variant="body2" color="text.secondary">
                                                    {item.label}
                                                </Typography>
                                                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                                    {item.value}
                                                </Typography>
                                            </InfoContent>
                                        </InfoCard>
                                    </Grid>
                                ))}
                            </Grid>
                        </ProfileCard>
                    </motion.div>
                </Grid>

                <Grid item xs={12} md={4}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <StatsCard elevation={2}>
                            <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, color: '#1a237e' }}>
                                Overview
                            </Typography>
                            <Grid container spacing={2}>
                                {statsData.map((stat, index) => (
                                    <Grid item xs={12} key={index}>
                                        <StatBox $color={stat.color}>
                                            <StatValue $color={stat.color}>
                                                {stat.value}
                                            </StatValue>
                                            <StatLabel>
                                                {stat.label}
                                            </StatLabel>
                                        </StatBox>
                                    </Grid>
                                ))}
                            </Grid>
                        </StatsCard>
                    </motion.div>
                </Grid>

                <Grid item xs={12}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <QuickActionsCard elevation={2}>
                            <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, color: '#1a237e' }}>
                                Quick Actions
                            </Typography>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={4}>
                                    <ActionButton $color="#4361ee">
                                        <UsersIcon sx={{ fontSize: 32 }} />
                                        <ActionText>Manage Users</ActionText>
                                    </ActionButton>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <ActionButton $color="#2a9d8f">
                                        <ClassesIcon sx={{ fontSize: 32 }} />
                                        <ActionText>Manage Classes</ActionText>
                                    </ActionButton>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <ActionButton $color="#e63946">
                                        <AdminIcon sx={{ fontSize: 32 }} />
                                        <ActionText>School Settings</ActionText>
                                    </ActionButton>
                                </Grid>
                            </Grid>
                        </QuickActionsCard>
                    </motion.div>
                </Grid>
            </Grid>
        </Container>
    );
};

export default AdminProfile;

const ProfileHeader = styled(Paper)`
    padding: 2rem;
    background: linear-gradient(135deg, #4361ee05, #4361ee10);
    border: 1px solid #4361ee20;
    border-radius: 16px;
`;

const HeaderContent = styled.div`
    display: flex;
    align-items: center;
    gap: 2rem;
`;

const AvatarWrapper = styled.div`
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
    background-color: #4361ee;
    border: 4px solid white;
`;

const ProfileCard = styled(Paper)`
    padding: 2rem;
    border-radius: 16px;
    background: white;
    border: 1px solid rgba(241, 242, 244, 0.5);
    height: 100%;
    
    &:hover {
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    }
`;

const InfoCard = styled(Box)`
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    border-radius: 12px;
    background: linear-gradient(135deg, #4361ee05, #4361ee10);
    border: 1px solid #4361ee10;
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    }
`;

const IconWrapper = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #4361ee;
    color: white;
`;

const InfoContent = styled.div`
    flex: 1;
`;

const StatsCard = styled(ProfileCard)``;

const StatBox = styled(Box)`
    padding: 1.5rem;
    border-radius: 12px;
    background: linear-gradient(135deg, 
        ${props => props.$color}05,
        ${props => props.$color}10);
    border: 1px solid ${props => props.$color}20;
    text-align: center;
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    }
`;

const StatValue = styled(Typography).attrs({
    variant: 'h4'
})`
    font-weight: 700;
    color: ${props => props.$color};
    margin-bottom: 0.5rem;
`;

const StatLabel = styled(Typography).attrs({
    variant: 'body2'
})`
    color: #64748b;
`;

const QuickActionsCard = styled(ProfileCard)`
    margin-top: 1rem;
`;

const ActionButton = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    border-radius: 12px;
    background: linear-gradient(135deg, 
        ${props => props.$color}05,
        ${props => props.$color}10);
    border: 1px solid ${props => props.$color}20;
    cursor: pointer;
    transition: all 0.3s ease;

    svg {
        color: ${props => props.$color};
        margin-bottom: 1rem;
    }

    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
        background: linear-gradient(135deg, 
            ${props => props.$color}10,
            ${props => props.$color}15);
    }
`;

const ActionText = styled(Typography).attrs({
    variant: 'body1'
})`
    font-weight: 600;
    color: #1e293b;
`;