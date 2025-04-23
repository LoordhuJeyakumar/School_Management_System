import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import {
    Container, Grid, Paper, Typography, Box,
    Avatar, Chip, Stack, CircularProgress,
    Table, TableBody, TableRow, IconButton,
    Collapse, Tooltip
} from '@mui/material';
import {
    School as SchoolIcon,
    Class as ClassIcon,
    Person as PersonIcon,
    Assignment as AssignmentIcon,
    Email as EmailIcon,
    Phone as PhoneIcon,
    KeyboardArrowDown as KeyboardArrowDownIcon,
    KeyboardArrowUp as KeyboardArrowUpIcon
} from '@mui/icons-material';
import { calculateOverallAttendancePercentage } from '../../components/attendanceCalculator';
import CustomPieChart from '../../components/CustomPieChart';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';

const TeacherViewStudent = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const { currentUser, userDetails, loading } = useSelector((state) => state.user);

    const address = "Student";
    const studentID = params.id;
    const teachSubject = currentUser.teachSubject?.subName;

    useEffect(() => {
        dispatch(getUserDetails(studentID, address));
    }, [dispatch, studentID]);

    const [sclassName, setSclassName] = useState('');
    const [studentSchool, setStudentSchool] = useState('');
    const [subjectMarks, setSubjectMarks] = useState('');
    const [subjectAttendance, setSubjectAttendance] = useState([]);
    const [openStates, setOpenStates] = useState({});

    useEffect(() => {
        if (userDetails) {
            setSclassName(userDetails.sclassName || '');
            setStudentSchool(userDetails.school || '');
            setSubjectMarks(userDetails.examResult || '');
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

    const chartData = [
        { name: 'Present', value: overallAttendancePercentage },
        { name: 'Absent', value: overallAbsentPercentage }
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
                                        {userDetails?.name?.charAt(0)}
                                    </StyledAvatar>
                                </AvatarWrapper>
                                <Box>
                                    <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                                        {userDetails?.name}
                                    </Typography>
                                    <Stack direction="row" spacing={2}>
                                        <Chip
                                            icon={<PersonIcon />}
                                            label="Student"
                                            sx={{ bgcolor: 'primary.lighter', color: 'primary.main' }}
                                        />
                                        <Chip
                                            icon={<ClassIcon />}
                                            label={`Class ${sclassName.sclassName}`}
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
                                    Student Information
                                </Typography>
                                <Stack spacing={2}>
                                    <InfoItem>
                                        <IconWrapper>
                                            <EmailIcon />
                                        </IconWrapper>
                                        <Box>
                                            <Typography variant="body2" color="text.secondary">
                                                Email
                                            </Typography>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                                                {userDetails?.email}
                                            </Typography>
                                        </Box>
                                    </InfoItem>
                                    <InfoItem>
                                        <IconWrapper>
                                            <PhoneIcon />
                                        </IconWrapper>
                                        <Box>
                                            <Typography variant="body2" color="text.secondary">
                                                Phone
                                            </Typography>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                                                {userDetails?.phone || 'Not provided'}
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
                                                {studentSchool.schoolName}
                                            </Typography>
                                        </Box>
                                    </InfoItem>
                                </Stack>
                            </Box>
                        </InfoCard>
                    </Grid>

                    <Grid item xs={12} md={8}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <StyledPaper elevation={1}>
                                    <Box sx={{ mb: 2 }}>
                                        <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main', mb: 1 }}>
                                            Attendance Overview
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Overall attendance statistics for {teachSubject}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ height: 200, display: 'flex', justifyContent: 'center' }}>
                                        <CustomPieChart data={chartData} />
                                    </Box>
                                </StyledPaper>
                            </Grid>

                            <Grid item xs={12}>
                                <StyledPaper elevation={1}>
                                    <Box sx={{ mb: 2 }}>
                                        <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main', mb: 1 }}>
                                            Academic Performance
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Subject marks and evaluations
                                        </Typography>
                                    </Box>
                                    
                                    {Array.isArray(subjectMarks) && subjectMarks.length > 0 ? (
                                        <Table>
                                            <TableBody>
                                                {subjectMarks.map((result, index) => {
                                                    if (result.subName.subName === teachSubject) {
                                                        return (
                                                            <React.Fragment key={index}>
                                                                <TableRow>
                                                                    <StyledTableCell>
                                                                        <Stack direction="row" alignItems="center" spacing={2}>
                                                                            <AssignmentIcon color="primary" />
                                                                            <Box>
                                                                                <Typography variant="subtitle1" fontWeight={500}>
                                                                                    {result.subName.subName}
                                                                                </Typography>
                                                                                <Typography variant="body2" color="text.secondary">
                                                                                    Latest Assessment
                                                                                </Typography>
                                                                            </Box>
                                                                        </Stack>
                                                                    </StyledTableCell>
                                                                    <StyledTableCell align="right">
                                                                        <Stack direction="row" spacing={2} alignItems="center" justifyContent="flex-end">
                                                                            <Chip
                                                                                label={`${result.marksObtained}%`}
                                                                                color={result.marksObtained >= 40 ? 'success' : 'error'}
                                                                                variant="outlined"
                                                                            />
                                                                            <Tooltip title="View Details">
                                                                                <IconButton
                                                                                    size="small"
                                                                                    onClick={() => handleOpen(result.subName._id)}
                                                                                >
                                                                                    {openStates[result.subName._id] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                                                                </IconButton>
                                                                            </Tooltip>
                                                                        </Stack>
                                                                    </StyledTableCell>
                                                                </TableRow>
                                                                <TableRow>
                                                                    <StyledTableCell colSpan={2} sx={{ py: 0 }}>
                                                                        <Collapse in={openStates[result.subName._id]} timeout="auto" unmountOnExit>
                                                                            <Box sx={{ py: 2 }}>
                                                                                <Typography variant="body2" color="text.secondary" paragraph>
                                                                                    Detailed Performance Analysis
                                                                                </Typography>
                                                                                {/* Add more detailed information here */}
                                                                            </Box>
                                                                        </Collapse>
                                                                    </StyledTableCell>
                                                                </TableRow>
                                                            </React.Fragment>
                                                        );
                                                    }
                                                    return null;
                                                })}
                                            </TableBody>
                                        </Table>
                                    ) : (
                                        <Typography color="text.secondary">No marks recorded yet</Typography>
                                    )}
                                </StyledPaper>
                            </Grid>
                        </Grid>
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
`;

const StyledAvatar = styled(Avatar)`
    width: 80px;
    height: 80px;
    background: linear-gradient(135deg, #4361ee, #3a0ca3);
    font-size: 2rem;
    font-weight: 600;
`;

const InfoCard = styled(Paper)`
    padding: 1.5rem;
    height: 100%;
    border-radius: 16px;
    background: white;
`;

const InfoItem = styled(Box)`
    display: flex;
    align-items: flex-start;
    gap: 1rem;
`;

const IconWrapper = styled(Box)`
    width: 40px;
    height: 40px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #4361ee08, #3a0ca308);
    color: #4361ee;
`;

const StyledPaper = styled(Paper)`
    padding: 1.5rem;
    border-radius: 16px;
    background: white;
`;

const StyledTableCell = styled(Box)`
    padding: 1rem;
`;

export default TeacherViewStudent;