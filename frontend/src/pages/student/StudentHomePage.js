import React, { useEffect, useState } from 'react';
import { 
    Container, 
    Grid, 
    Paper, 
    Typography, 
    Box,
    Card,
    CardContent,
    Skeleton,
    Divider,
    useTheme,
    alpha
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { calculateOverallAttendancePercentage } from '../../components/attendanceCalculator';
import CustomPieChart from '../../components/CustomPieChart';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import { getSubjectList } from '../../redux/sclassRelated/sclassHandle';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import SeeNotice from '../../components/SeeNotice';
import CountUp from 'react-countup';

// Icons
import SubjectIcon from '@mui/icons-material/MenuBook';
import AssignmentIcon from '@mui/icons-material/Assignment';
import EventNoteIcon from '@mui/icons-material/EventNote';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { colors } from '../../components/styles';

// Styled components
const StyledCard = styled(motion(Card))(({ theme }) => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 16,
    overflow: 'hidden',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    },
}));

const CardHeader = styled(Box)(({ theme, color = colors.primary }) => ({
    padding: theme.spacing(2, 2, 1, 2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
}));

const CardTitle = styled(Typography)(({ theme }) => ({
    fontSize: '1rem',
    fontWeight: 600,
    color: colors.dark,
}));

const IconBox = styled(Box)(({ theme, color = colors.primary }) => ({
    width: 45,
    height: 45,
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: alpha(color, 0.1),
    color: color,
}));

const DataValue = styled(Typography)(({ theme, color = colors.primary }) => ({
    fontSize: '2rem',
    fontWeight: 700,
    color: color,
    lineHeight: 1.2,
}));

const DataLabel = styled(Typography)(({ theme }) => ({
    fontSize: '0.875rem',
    color: colors.gray,
    marginTop: theme.spacing(0.5),
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
    fontSize: '1.25rem',
    fontWeight: 600,
    marginBottom: theme.spacing(3),
    color: colors.dark,
    position: 'relative',
    display: 'inline-block',
    '&:after': {
        content: '""',
        position: 'absolute',
        bottom: -8,
        left: 0,
        width: '40%',
        height: 3,
        backgroundColor: colors.primary,
        borderRadius: 3,
    },
}));

const NoticeContainer = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    borderRadius: 16,
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
    height: '100%',
}));

const StudentHomePage = () => {
    const dispatch = useDispatch();
    const theme = useTheme();

    const { userDetails, currentUser, loading, response } = useSelector((state) => state.user);
    const { subjectsList } = useSelector((state) => state.sclass);

    const [subjectAttendance, setSubjectAttendance] = useState([]);

    const classID = currentUser?.sclassName?._id;

    useEffect(() => {
        if (currentUser?._id) {
            dispatch(getUserDetails(currentUser._id, "Student"));
        }
        if (classID) {
            dispatch(getSubjectList(classID, "ClassSubjects"));
        }
    }, [dispatch, currentUser?._id, classID]);

    const numberOfSubjects = subjectsList?.length || 0;

    useEffect(() => {
        if (userDetails) {
            setSubjectAttendance(userDetails.attendance || []);
        }
    }, [userDetails]);

    const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance);
    const overallAbsentPercentage = 100 - overallAttendancePercentage;

    const chartData = [
        { name: 'Present', value: overallAttendancePercentage },
        { name: 'Absent', value: overallAbsentPercentage }
    ];

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 12
            }
        }
    };

    // Card data
    const cardData = [
        {
            title: 'Total Subjects',
            value: numberOfSubjects,
            icon: <SubjectIcon fontSize="large" />,
            color: colors.primary,
            duration: 2
        },
        {
            title: 'Assignments',
            value: 15,
            icon: <AssignmentIcon fontSize="large" />,
            color: colors.secondary,
            duration: 2.5
        },
        {
            title: 'Events',
            value: 8,
            icon: <EventNoteIcon fontSize="large" />,
            color: colors.info,
            duration: 3
        },
        {
            title: 'Achievements',
            value: 3,
            icon: <EmojiEventsIcon fontSize="large" />,
            color: colors.warning,
            duration: 3.5
        }
    ];

    return (
        <Container maxWidth="xl" sx={{ mt: 2, mb: 4 }}>
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Welcome Section */}
                <motion.div variants={itemVariants}>
                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
                            Welcome back, {currentUser?.name || 'Student'}!
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Here's what's happening with your academic progress today.
                        </Typography>
                    </Box>
                </motion.div>

                {/* Stats Cards */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    {cardData.map((card, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <motion.div variants={itemVariants}>
                                <StyledCard>
                                    <CardHeader color={card.color}>
                                        <CardTitle>{card.title}</CardTitle>
                                        <IconBox color={card.color}>
                                            {card.icon}
                                        </IconBox>
                                    </CardHeader>
                                    <CardContent>
                                        {loading ? (
                                            <Skeleton variant="text" width="80%" height={60} />
                                        ) : (
                                            <>
                                                <DataValue color={card.color}>
                                                    <CountUp start={0} end={card.value} duration={card.duration} />
                                                </DataValue>
                                                <DataLabel>
                                                    {card.title === 'Total Subjects' 
                                                        ? 'Enrolled this semester' 
                                                        : 'Available now'}
                                                </DataLabel>
                                            </>
                                        )}
                                    </CardContent>
                                </StyledCard>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>

                {/* Charts and Notices */}
                <Grid container spacing={3}>
                    {/* Attendance Chart */}
                    <Grid item xs={12} md={5}>
                        <motion.div variants={itemVariants}>
                            <StyledCard>
                                <CardContent>
                                    {loading ? (
                                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
                                            <Skeleton variant="circular" width={200} height={200} />
                                        </Box>
                                    ) : response ? (
                                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
                                            <Typography variant="h6">No Attendance Data Available</Typography>
                                        </Box>
                                    ) : (
                                        subjectAttendance && Array.isArray(subjectAttendance) && subjectAttendance.length > 0 ? (
                                            <CustomPieChart data={chartData} title="Attendance Overview" />
                                        ) : (
                                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
                                                <Typography variant="h6">No Attendance Data Available</Typography>
                                            </Box>
                                        )
                                    )}
                                </CardContent>
                            </StyledCard>
                        </motion.div>
                    </Grid>

                    {/* Notices */}
                    <Grid item xs={12} md={7}>
                        <motion.div variants={itemVariants}>
                            <NoticeContainer>
                                <SectionTitle>Recent Notices</SectionTitle>
                                <Divider sx={{ mb: 2 }} />
                                <SeeNotice />
                            </NoticeContainer>
                        </motion.div>
                    </Grid>
                </Grid>
            </motion.div>
        </Container>
    );
};

export default StudentHomePage;