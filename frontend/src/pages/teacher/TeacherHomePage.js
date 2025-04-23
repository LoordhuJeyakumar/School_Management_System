import React, { useEffect } from 'react';
import { Container, Grid, Paper, Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import {
    Class as StudentsIcon,
    MenuBook as LessonsIcon,
    Assessment as TestsIcon,
    Timer as TimeIcon
} from '@mui/icons-material';
import { getClassStudents, getSubjectDetails } from '../../redux/sclassRelated/sclassHandle';
import SeeNotice from '../../components/SeeNotice';

const TeacherHomePage = () => {
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user);
    const { subjectDetails, sclassStudents } = useSelector((state) => state.sclass);

    const classID = currentUser.teachSclass?._id;
    const subjectID = currentUser.teachSubject?._id;

    useEffect(() => {
        dispatch(getSubjectDetails(subjectID, "Subject"));
        dispatch(getClassStudents(classID));
    }, [dispatch, subjectID, classID]);

    const statsData = [
        {
            title: "Class Students",
            count: sclassStudents?.length || 0,
            icon: <StudentsIcon sx={{ fontSize: 40 }} />,
            color: "#4361ee"
        },
        {
            title: "Total Lessons",
            count: subjectDetails?.sessions || 0,
            icon: <LessonsIcon sx={{ fontSize: 40 }} />,
            color: "#2a9d8f"
        },
        {
            title: "Tests Taken",
            count: 24,
            icon: <TestsIcon sx={{ fontSize: 40 }} />,
            color: "#e63946"
        },
        {
            title: "Total Hours",
            count: 30,
            icon: <TimeIcon sx={{ fontSize: 40 }} />,
            color: "#ff9f1c",
            suffix: "hrs"
        }
    ];

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                {statsData.map((stat, index) => (
                    <Grid item xs={12} sm={6} md={3} key={stat.title}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <StatsCard elevation={3}>
                                <IconWrapper style={{ backgroundColor: stat.color + '10', color: stat.color }} className='stats-icon'>
                                    {stat.icon}
                                </IconWrapper>
                                <Box sx={{ mt: 2 }}>
                                    <Typography variant="h6" sx={{ 
                                        fontWeight: 600,
                                        color: 'text.primary',
                                        mb: 1
                                    }}>
                                        {stat.title}
                                    </Typography>
                                    <Typography variant="h4" sx={{ 
                                        fontWeight: 700,
                                        color: stat.color,
                                        display: 'flex',
                                        alignItems: 'baseline'
                                    }}>
                                        <CountUp
                                            start={0}
                                            end={stat.count}
                                            duration={2}
                                            separator=","
                                        />
                                        {stat.suffix && (
                                            <Typography variant="subtitle1" component="span" sx={{ ml: 0.5, color: 'text.secondary' }}>
                                                {stat.suffix}
                                            </Typography>
                                        )}
                                    </Typography>
                                </Box>
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
                        <NoticeCard elevation={3}>
                            <Box sx={{ p: 2 }}>
                                <Typography variant="h5" sx={{ 
                                    fontWeight: 600,
                                    color: 'primary.main',
                                    mb: 3,
                                    borderBottom: '2px solid',
                                    borderColor: 'primary.light',
                                    pb: 1
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
    );
};

const StatsCard = styled(Paper)`
    padding: 1.5rem;
    height: 100%;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    
    &:hover .stats-icon {
        transform: translateY(-5px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    }
`;

const IconWrapper = styled(Box)`
    width: 60px;
    height: 60px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s ease;

    ${StatsCard}:hover & {
        transform: scale(1.1);
    }
`;

const NoticeCard = styled(Paper)`
    border-radius: 16px;
    overflow: hidden;
    background: linear-gradient(to right bottom, #ffffff, #f8f9fa);
`;

export default TeacherHomePage;