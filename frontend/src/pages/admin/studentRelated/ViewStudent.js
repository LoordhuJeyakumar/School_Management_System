import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getUserDetails, updateUser } from '../../../redux/userRelated/userHandle';
import { useNavigate, useParams } from 'react-router-dom';
import { getSubjectList } from '../../../redux/sclassRelated/sclassHandle';
import {
    Box, Container, Grid, Paper, Typography, Tab, Avatar,
    CircularProgress, Divider, IconButton, Button, Stack
} from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {
    Delete as DeleteIcon,
    Edit as EditIcon,
    School as SchoolIcon,
    Class as ClassIcon,
    Numbers as RollNoIcon,
    BarChart as ChartIcon,
    TableChart as TableIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { calculateOverallAttendancePercentage, calculateSubjectAttendancePercentage, groupAttendanceBySubject } from '../../../components/attendanceCalculator';
import CustomBarChart from '../../../components/CustomBarChart';
import CustomPieChart from '../../../components/CustomPieChart';
import { StyledTableCell, StyledTableRow } from '../../../components/styles';
import Popup from '../../../components/Popup';

const ViewStudent = () => {
    const [showTab, setShowTab] = useState(false);

    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();
    const { userDetails, response, loading, error } = useSelector((state) => state.user);

    const studentID = params.id;
    const address = "Student";

    useEffect(() => {
        dispatch(getUserDetails(studentID, address));
    }, [dispatch, studentID]);

    useEffect(() => {
        if (userDetails && userDetails.sclassName && userDetails.sclassName._id !== undefined) {
            dispatch(getSubjectList(userDetails.sclassName._id, "ClassSubjects"));
        }
    }, [dispatch, userDetails]);

    if (response) { console.log(response); }
    else if (error) { console.log(error); }

    const [name, setName] = useState('');
    const [rollNum, setRollNum] = useState('');
    const [password, setPassword] = useState('');
    const [sclassName, setSclassName] = useState('');
    const [studentSchool, setStudentSchool] = useState('');
    const [subjectMarks, setSubjectMarks] = useState('');
    const [subjectAttendance, setSubjectAttendance] = useState([]);

    const [openStates, setOpenStates] = useState({});
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const handleOpen = (subId) => {
        setOpenStates((prevState) => ({
            ...prevState,
            [subId]: !prevState[subId],
        }));
    };

    const [value, setValue] = useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [selectedSection, setSelectedSection] = useState('table');

    const fields = password === ""
        ? { name, rollNum }
        : { name, rollNum, password };

    useEffect(() => {
        if (userDetails) {
            setName(userDetails.name || '');
            setRollNum(userDetails.rollNum || '');
            setSclassName(userDetails.sclassName || '');
            setStudentSchool(userDetails.school || '');
            setSubjectMarks(userDetails.examResult || '');
            setSubjectAttendance(userDetails.attendance || []);
        }
    }, [userDetails]);

    const submitHandler = (event) => {
        event.preventDefault();
        dispatch(updateUser(fields, studentID, address))
            .then(() => {
                dispatch(getUserDetails(studentID, address));
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const deleteHandler = () => {
        setMessage("Sorry the delete function has been disabled for now.");
        setShowPopup(true);
    };

    const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance);
    const overallAbsentPercentage = 100 - overallAttendancePercentage;

    const chartData = [
        { name: 'Present', value: overallAttendancePercentage },
        { name: 'Absent', value: overallAbsentPercentage }
    ];

    const subjectData = Object.entries(groupAttendanceBySubject(subjectAttendance)).map(([subName, { subCode, present, sessions }]) => {
        const subjectAttendancePercentage = calculateSubjectAttendancePercentage(present, sessions);
        return {
            subject: subName,
            attendancePercentage: subjectAttendancePercentage,
            totalClasses: sessions,
            attendedClasses: present
        };
    });

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Paper elevation={3} sx={{
                                p: 3,
                                display: 'flex',
                                flexDirection: { xs: 'column', sm: 'row' },
                                alignItems: 'center',
                                gap: 3,
                                background: 'linear-gradient(135deg, #4361ee, #3a0ca3)'
                            }}>
                                <Avatar sx={{ width: 100, height: 100, bgcolor: 'white', color: 'primary.main' }}>
                                    {userDetails.name?.charAt(0)}
                                </Avatar>
                                <Box sx={{ color: 'white' }}>
                                    <Typography variant="h4" sx={{ fontWeight: 600 }}>
                                        {userDetails.name}
                                    </Typography>
                                    <Stack direction="row" spacing={3} mt={1}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <RollNoIcon />
                                            <Typography>Roll No: {userDetails.rollNum}</Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <ClassIcon />
                                            <Typography>Class: {sclassName.sclassName}</Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <SchoolIcon />
                                            <Typography>School: {studentSchool.schoolName}</Typography>
                                        </Box>
                                    </Stack>
                                </Box>
                                <Stack direction="row" spacing={1} sx={{ ml: 'auto', mt: { xs: 2, sm: 0 } }}>
                                    <IconButton onClick={() => setShowTab(!showTab)} sx={{ color: 'white' }}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={deleteHandler} sx={{ color: 'white' }}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Stack>
                            </Paper>
                        </motion.div>
                    </Grid>

                    <Grid item xs={12}>
                        <TabContext value={value}>
                            <Paper sx={{ borderRadius: 2, mb: 2 }}>
                                <TabList 
                                    onChange={handleChange}
                                    variant="fullWidth"
                                    sx={{ borderBottom: 1, borderColor: 'divider' }}
                                >
                                    <Tab label="Attendance" value="1" />
                                    <Tab label="Marks" value="2" />
                                </TabList>
                            </Paper>

                            <TabPanel value="1">
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={8}>
                                        <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
                                            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
                                                <Typography variant="h6">Attendance Overview</Typography>
                                                <Button
                                                    variant="contained"
                                                    onClick={() => navigate(`/Admin/students/student/attendance/${studentID}`)}
                                                >
                                                    Take Attendance
                                                </Button>
                                            </Stack>
                                            {subjectAttendance && subjectAttendance.length > 0 ? (
                                                <>
                                                    {selectedSection === 'table' ? (
                                                        <Box sx={{ overflowX: 'auto' }}>
                                                            {/* Existing attendance table code */}
                                                        </Box>
                                                    ) : (
                                                        <CustomBarChart chartData={subjectData} dataKey="attendancePercentage" />
                                                    )}
                                                    <Stack direction="row" justifyContent="center" mt={2}>
                                                        <Button
                                                            startIcon={selectedSection === 'table' ? <ChartIcon /> : <TableIcon />}
                                                            onClick={() => setSelectedSection(selectedSection === 'table' ? 'chart' : 'table')}
                                                        >
                                                            {selectedSection === 'table' ? 'Show Chart' : 'Show Table'}
                                                        </Button>
                                                    </Stack>
                                                </>
                                            ) : (
                                                <Typography color="text.secondary" align="center">
                                                    No attendance records found
                                                </Typography>
                                            )}
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <Paper elevation={3} sx={{ p: 3, borderRadius: 2, height: '100%' }}>
                                            <Typography variant="h6" gutterBottom>Overall Attendance</Typography>
                                            <Box sx={{ display: 'flex', justifyContent: 'center', pt: 2 }}>
                                                <CustomPieChart data={chartData} />
                                            </Box>
                                            <Typography variant="body1" align="center" mt={2}>
                                                {overallAttendancePercentage.toFixed(2)}% Present
                                            </Typography>
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </TabPanel>

                            <TabPanel value="2">
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
                                            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
                                                <Typography variant="h6">Academic Performance</Typography>
                                                <Button
                                                    variant="contained"
                                                    onClick={() => navigate(`/Admin/students/student/marks/${studentID}`)}
                                                >
                                                    Add Marks
                                                </Button>
                                            </Stack>
                                            {subjectMarks && subjectMarks.length > 0 ? (
                                                <>
                                                    {selectedSection === 'table' ? (
                                                        <Box sx={{ overflowX: 'auto' }}>
                                                            {/* Existing marks table code */}
                                                        </Box>
                                                    ) : (
                                                        <CustomBarChart chartData={subjectMarks} dataKey="marksObtained" />
                                                    )}
                                                    <Stack direction="row" justifyContent="center" mt={2}>
                                                        <Button
                                                            startIcon={selectedSection === 'table' ? <ChartIcon /> : <TableIcon />}
                                                            onClick={() => setSelectedSection(selectedSection === 'table' ? 'chart' : 'table')}
                                                        >
                                                            {selectedSection === 'table' ? 'Show Chart' : 'Show Table'}
                                                        </Button>
                                                    </Stack>
                                                </>
                                            ) : (
                                                <Typography color="text.secondary" align="center">
                                                    No marks records found
                                                </Typography>
                                            )}
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </TabPanel>
                        </TabContext>
                    </Grid>
                </Grid>
            )}
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </Container>
    );
};

export default ViewStudent;