import React, { useEffect } from 'react';
import { Container, Grid, Paper, Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import CountUp from 'react-countup';

import { motion } from 'framer-motion';
import {
    People as PeopleIcon,
    School as SchoolIcon,
    Class as ClassIcon,
    AttachMoney as MoneyIcon
} from '@mui/icons-material';
import SeeNotice from '../../components/SeeNotice';
import { getAllStudents } from '../../redux/studentRelated/studentHandle';
import { getAllTeachers } from '../../redux/teacherRelated/teacherHandle';

const AdminHomePage = () => {
    const dispatch = useDispatch();
    const { studentsList } = useSelector((state) => state.student);
    const { teachersList } = useSelector((state) => state.teacher);
    const { currentUser } = useSelector((state) => state.user);

    const numberOfStudents = studentsList?.length || 0;
    const numberOfTeachers = teachersList?.length || 0;
    
    useEffect(() => {
        dispatch(getAllStudents(currentUser._id));
        dispatch(getAllTeachers(currentUser._id));
    }, [currentUser._id, dispatch]);

    const statsData = [
        {
            title: "Total Students",
            count: numberOfStudents,
            icon: <PeopleIcon sx={{ fontSize: 40 }} />,
            color: "#4361ee"
        },
        {
            title: "Total Teachers",
            count: numberOfTeachers,
            icon: <SchoolIcon sx={{ fontSize: 40 }} />,
            color: "#2a9d8f"
        },
        {
            title: "Total Classes",
            count: 12,
            icon: <ClassIcon sx={{ fontSize: 40 }} />,
            color: "#e63946"
        },
        {
            title: "Revenue",
            count: 23000,
            icon: <MoneyIcon sx={{ fontSize: 40 }} />,
            prefix: "$",
            color: "#ff9f1c"
        }
    ];

    return (
        <>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                    {statsData.map((stat, index) => (
                        <Grid item xs={12} sm={6} md={3} key={stat.title}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <StatsCard elevation={2} $bgColor={stat.color}>
                                    <IconWrapper $bgColor={stat.color}>
                                        {stat.icon}
                                    </IconWrapper>
                                    <StatsContent>
                                        <StatTitle variant="h6">
                                            {stat.title}
                                        </StatTitle>
                                        <StatValue>
                                            {stat.prefix}<CountUp start={0} end={stat.count} duration={2.5} />
                                        </StatValue>
                                    </StatsContent>
                                    <GradientOverlay $bgColor={stat.color} />
                                </StatsCard>
                            </motion.div>
                        </Grid>
                    ))}

                    <Grid item xs={12}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <NoticeCard elevation={2}>
                                <Box sx={{ p: 3 }}>
                                    <Typography variant="h5" sx={{ 
                                        fontWeight: 600,
                                        mb: 3,
                                        color: '#1a237e'
                                    }}>
                                        Recent Notices
                                    </Typography>
                                    <SeeNotice />
                                </Box>
                            </NoticeCard>
                        </motion.div>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default AdminHomePage;

const StatsCard = styled(Paper)`
    position: relative;
    padding: 24px;
    height: 160px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: linear-gradient(135deg, 
        ${props => props.$bgColor}05,
        ${props => props.$bgColor}10);
    border: 1px solid ${props => props.$bgColor}20;
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    }
`;

const IconWrapper = styled.div`
    width: 48px;
    height: 48px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${props => props.$bgColor};
    color: white;
    margin-bottom: 16px;
`;

const StatsContent = styled.div`
    position: relative;
    z-index: 1;
`;

const StatTitle = styled(Typography)`
    font-weight: 600;
    color: #1e293b;
    margin-bottom: 8px;
`;

const StatValue = styled.div`
    font-size: 28px;
    font-weight: 700;
    color: ${props => props.theme.palette?.primary?.main || '#4361ee'};
`;

const GradientOverlay = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background: radial-gradient(circle, 
        ${props => props.$bgColor}15 0%, 
        transparent 70%);
    transform: translate(30%, -30%);
`;

const NoticeCard = styled(Paper)`
    border-radius: 16px;
    background: white;
    transition: all 0.3s ease;
    border: 1px solid rgba(241, 242, 244, 0.5);

    &:hover {
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    }
`;