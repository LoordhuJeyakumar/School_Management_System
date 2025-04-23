import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import {
    Container, Grid, Paper, Typography, Box,
    Table, TableBody, TableHead, Stack,
    CircularProgress, IconButton, Collapse,
    Chip, Tooltip, ToggleButtonGroup, ToggleButton
} from '@mui/material';
import {
    KeyboardArrowDown as KeyboardArrowDownIcon,
    KeyboardArrowUp as KeyboardArrowUpIcon,
    CalendarMonth as DateIcon,
    CheckCircle as PresentIcon,
    Cancel as AbsentIcon,
    BarChart as ChartIcon,
    TableChart as TableIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import styled from '@emotion/styled';
import { 
    calculateOverallAttendancePercentage,
    calculateSubjectAttendancePercentage,
    groupAttendanceBySubject
} from '../../components/attendanceCalculator';
import CustomPieChart from '../../components/CustomPieChart';
import CustomBarChart from '../../components/CustomBarChart';

const ViewStdAttendance = () => {
    const dispatch = useDispatch();
    const { currentUser, userDetails, loading } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getUserDetails(currentUser._id, "Student"));
    }, [dispatch, currentUser._id]);

    const [subjectAttendance, setSubjectAttendance] = useState([]);
    const [selectedSection, setSelectedSection] = useState('chart');
    const [openStates, setOpenStates] = useState({});

    useEffect(() => {
        if (userDetails) {
            setSubjectAttendance(userDetails.attendance || []);
        }
    }, [userDetails]);

    const handleOpen = (subId) => {
        setOpenStates((prevState) => ({
            ...prevState,
            [subId]: !prevState[subId],
        }));
    };

    const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance);
    const overallAbsentPercentage = 100 - overallAttendancePercentage;

    const pieChartData = [
        { name: 'Present', value: overallAttendancePercentage },
        { name: 'Absent', value: overallAbsentPercentage }
    ];

    const subjectData = Object.entries(groupAttendanceBySubject(subjectAttendance)).map(([subName, { present, sessions }]) => {
        const attendancePercentage = calculateSubjectAttendancePercentage(present, sessions);
        return {
            subject: subName,
            attendancePercentage,
            totalClasses: sessions,
            attendedClasses: present
        };
    });

    if (loading) {
        return (
            <LoaderWrapper>
                <CircularProgress />
            </LoaderWrapper>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <HeaderCard elevation={1}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>
                                Attendance Overview
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                Track your attendance across all subjects
                            </Typography>
                        </motion.div>
                    </HeaderCard>
                </Grid>

                <Grid item xs={12} md={4}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <StatsCard elevation={1}>
                            <Box sx={{ mb: 3 }}>
                                <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
                                    Overall Attendance
                                </Typography>
                            </Box>
                            <Box sx={{ height: 240, display: 'flex', justifyContent: 'center' }}>
                                <CustomPieChart data={pieChartData} />
                            </Box>
                            <Box sx={{ mt: 2, textAlign: 'center' }}>
                                <Typography variant="h5" sx={{ fontWeight: 600, color: overallAttendancePercentage >= 75 ? 'success.main' : 'error.main' }}>
                                    {overallAttendancePercentage.toFixed(1)}%
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Average Attendance
                                </Typography>
                            </Box>
                        </StatsCard>
                    </motion.div>
                </Grid>

                <Grid item xs={12} md={8}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <DetailCard elevation={1}>
                            <Stack 
                                direction="row" 
                                justifyContent="space-between" 
                                alignItems="center"
                                sx={{ mb: 3 }}
                            >
                                <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
                                    Subject-wise Attendance
                                </Typography>
                                <ToggleButtonGroup
                                    value={selectedSection}
                                    exclusive
                                    onChange={(e, newValue) => newValue && setSelectedSection(newValue)}
                                    size="small"
                                >
                                    <ToggleButton value="chart">
                                        <ChartIcon />
                                    </ToggleButton>
                                    <ToggleButton value="table">
                                        <TableIcon />
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </Stack>

                            <AnimatePresence mode="wait">
                                {selectedSection === 'chart' ? (
                                    <motion.div
                                        key="chart"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Box sx={{ height: 300 }}>
                                            <CustomBarChart 
                                                chartData={subjectData} 
                                                dataKey="attendancePercentage" 
                                            />
                                        </Box>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="table"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Table>
                                            <TableHead>
                                                <StyledTableRow>
                                                    <StyledTableCell>Subject</StyledTableCell>
                                                    <StyledTableCell align="center">Attendance</StyledTableCell>
                                                    <StyledTableCell align="center">Details</StyledTableCell>
                                                </StyledTableRow>
                                            </TableHead>
                                            <TableBody>
                                                {subjectData.map((subject) => (
                                                    <React.Fragment key={subject.subject}>
                                                        <StyledTableRow>
                                                            <StyledTableCell>
                                                                {subject.subject}
                                                            </StyledTableCell>
                                                            <StyledTableCell align="center">
                                                                <AttendanceChip 
                                                                    percentage={subject.attendancePercentage}
                                                                />
                                                            </StyledTableCell>
                                                            <StyledTableCell align="center">
                                                                <Tooltip title="View Details">
                                                                    <IconButton
                                                                        size="small"
                                                                        onClick={() => handleOpen(subject.subject)}
                                                                    >
                                                                        {openStates[subject.subject] ? 
                                                                            <KeyboardArrowUpIcon /> : 
                                                                            <KeyboardArrowDownIcon />
                                                                        }
                                                                    </IconButton>
                                                                </Tooltip>
                                                            </StyledTableCell>
                                                        </StyledTableRow>
                                                        <StyledTableRow>
                                                            <StyledTableCell 
                                                                colSpan={3} 
                                                                sx={{ py: 0 }}
                                                            >
                                                                <Collapse 
                                                                    in={openStates[subject.subject]} 
                                                                    timeout="auto" 
                                                                    unmountOnExit
                                                                >
                                                                    <Box sx={{ p: 2, bgcolor: 'background.paper' }}>
                                                                        <Grid container spacing={2}>
                                                                            <Grid item xs={6}>
                                                                                <DetailItem>
                                                                                    <PresentIcon color="success" />
                                                                                    <Box>
                                                                                        <Typography variant="body2" color="text.secondary">
                                                                                            Classes Attended
                                                                                        </Typography>
                                                                                        <Typography variant="h6">
                                                                                            {subject.attendedClasses}
                                                                                        </Typography>
                                                                                    </Box>
                                                                                </DetailItem>
                                                                            </Grid>
                                                                            <Grid item xs={6}>
                                                                                <DetailItem>
                                                                                    <AbsentIcon color="error" />
                                                                                    <Box>
                                                                                        <Typography variant="body2" color="text.secondary">
                                                                                            Classes Missed
                                                                                        </Typography>
                                                                                        <Typography variant="h6">
                                                                                            {subject.totalClasses - subject.attendedClasses}
                                                                                        </Typography>
                                                                                    </Box>
                                                                                </DetailItem>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Box>
                                                                </Collapse>
                                                            </StyledTableCell>
                                                        </StyledTableRow>
                                                    </React.Fragment>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </DetailCard>
                    </motion.div>
                </Grid>
            </Grid>
        </Container>
    );
};

const LoaderWrapper = styled(Box)`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50vh;
`;

const HeaderCard = styled(Paper)`
    padding: 2rem;
    border-radius: 16px;
    background: linear-gradient(135deg, #4361ee08, #3a0ca308);
`;

const StatsCard = styled(Paper)`
    padding: 1.5rem;
    border-radius: 16px;
    height: 100%;
    background: white;
`;

const DetailCard = styled(Paper)`
    padding: 1.5rem;
    border-radius: 16px;
    min-height: 400px;
    background: white;
`;

const StyledTableRow = styled.tr`
    &:nth-of-type(odd) {
        background-color: ${({ theme }) => theme.palette.action.hover};
    }
`;

const StyledTableCell = styled.td`
    padding: 1rem;
`;

const DetailItem = styled(Box)`
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    border-radius: 8px;
    background: ${({ theme }) => theme.palette.background.default};
`;

const AttendanceChip = ({ percentage }) => (
    <Chip
        label={`${percentage.toFixed(1)}%`}
        sx={{
            bgcolor: percentage >= 75 ? 'success.lighter' : 'error.lighter',
            color: percentage >= 75 ? 'success.dark' : 'error.dark',
            fontWeight: 600
        }}
    />
);

export default ViewStdAttendance;