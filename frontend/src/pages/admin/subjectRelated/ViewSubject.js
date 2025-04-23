import React, { useEffect, useState } from 'react'
import { getClassStudents, getSubjectDetails } from '../../../redux/sclassRelated/sclassHandle';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    Box, Container, Typography, Paper, Grid,
    CircularProgress, Divider, Chip, Avatar,
    Tab, Tabs, Button
} from '@mui/material';
import {
    MenuBook as SubjectIcon,
    Class as ClassIcon,
    Person as TeacherIcon,
    Assessment as AssessmentIcon,
    Group as StudentsIcon
} from '@mui/icons-material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { BlueButton, GreenButton } from '../../../components/buttonStyles';
import TableTemplate from '../../../components/TableTemplate';
import { motion, AnimatePresence } from 'framer-motion';
import styled from '@emotion/styled';

const ViewSubject = () => {
    const navigate = useNavigate()
    const params = useParams()
    const dispatch = useDispatch();
    const { subloading, subjectDetails, sclassStudents, getresponse, error } = useSelector((state) => state.sclass);

    const { classID, subjectID } = params

    useEffect(() => {
        dispatch(getSubjectDetails(subjectID, "Subject"));
        dispatch(getClassStudents(classID));
    }, [dispatch, subjectID, classID]);

    const [value, setValue] = useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const studentColumns = [
        { id: 'rollNum', label: 'Roll No.', minWidth: 100 },
        { id: 'name', label: 'Name', minWidth: 170 },
    ]

    const studentRows = sclassStudents.map((student) => {
        return {
            name: student.name,
            rollNum: student.rollNum,
            id: student._id,
        };
    })

    const StudentsButtonHaver = ({ row }) => {
        return (
            <Box sx={{ display: 'flex', gap: 1 }}>
                <BlueButton
                    variant="contained"
                    onClick={() => navigate("/Admin/students/student/" + row.id)}
                >
                    View Profile
                </BlueButton>
                <GreenButton
                    variant="contained"
                    onClick={() => navigate(`/Admin/subject/student/marks/${row.id}/${subjectID}`)}
                >
                    Manage Marks
                </GreenButton>
            </Box>
        );
    };

    const SubjectOverview = () => {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <StyledPaper elevation={3}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                        <Avatar sx={{ bgcolor: 'primary.main', mr: 2, width: 56, height: 56 }}>
                            <SubjectIcon sx={{ fontSize: 30 }} />
                        </Avatar>
                        <Box>
                            <Typography variant="h5" sx={{ fontWeight: 600 }}>
                                {subjectDetails?.subName}
                            </Typography>
                            <Chip 
                                label={subjectDetails?.subCode} 
                                size="small"
                                sx={{ 
                                    bgcolor: 'primary.lighter',
                                    color: 'primary.main',
                                    fontWeight: 500
                                }}
                            />
                        </Box>
                    </Box>

                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <InfoCard>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <ClassIcon sx={{ color: 'primary.main', mr: 1 }} />
                                    <Typography variant="subtitle1" color="text.secondary">
                                        Class Details
                                    </Typography>
                                </Box>
                                <Typography variant="h6">
                                    {subjectDetails?.sclassName?.sclassName || 'Not Assigned'}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                    {sclassStudents?.length || 0} Students Enrolled
                                </Typography>
                            </InfoCard>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <InfoCard>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <TeacherIcon sx={{ color: '#2a9d8f', mr: 1 }} />
                                    <Typography variant="subtitle1" color="text.secondary">
                                        Teacher Information
                                    </Typography>
                                </Box>
                                {subjectDetails?.teacher ? (
                                    <>
                                        <Typography variant="h6">
                                            {subjectDetails.teacher.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                            {subjectDetails?.sessions} Sessions Assigned
                                        </Typography>
                                    </>
                                ) : (
                                    <Box sx={{ mt: 2 }}>
                                        <GreenButton
                                            variant="contained"
                                            onClick={() => navigate("/Admin/teachers/addteacher/" + subjectDetails._id)}
                                            startIcon={<TeacherIcon />}
                                        >
                                            Assign Teacher
                                        </GreenButton>
                                    </Box>
                                )}
                            </InfoCard>
                        </Grid>
                    </Grid>
                </StyledPaper>
            </motion.div>
        );
    };

    const StudentsSection = () => {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                        Students List
                    </Typography>
                    {getresponse && (
                        <GreenButton
                            variant="contained"
                            onClick={() => navigate("/Admin/class/addstudents/" + classID)}
                            startIcon={<StudentsIcon />}
                        >
                            Add Students
                        </GreenButton>
                    )}
                </Box>

                {getresponse ? (
                    <EmptyState>
                        <StudentsIcon sx={{ fontSize: 60, color: '#94a3b8', mb: 2 }} />
                        <Typography variant="h6" color="text.secondary" gutterBottom>
                            No Students Found
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Start by adding students to this class
                        </Typography>
                    </EmptyState>
                ) : (
                    <TableTemplate 
                        buttonHaver={StudentsButtonHaver} 
                        columns={studentColumns} 
                        rows={studentRows} 
                    />
                )}
            </motion.div>
        );
    };

    if (subloading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', position: 'sticky', top: 0, zIndex: 1, bgcolor: 'background.paper' }}>
                    <TabList 
                        onChange={handleChange} 
                        variant="fullWidth"
                        sx={{
                            '& .MuiTab-root': {
                                minHeight: '64px',
                                fontWeight: 600
                            },
                            '& .Mui-selected': {
                                color: 'primary.main'
                            }
                        }}
                    >
                        <Tab label="Overview" value="1" />
                        <Tab label="Students" value="2" />
                    </TabList>
                </Box>

                <Box sx={{ mt: 3 }}>
                    <TabPanel value="1" sx={{ p: 0 }}>
                        <SubjectOverview />
                    </TabPanel>
                    <TabPanel value="2" sx={{ p: 0 }}>
                        <StudentsSection />
                    </TabPanel>
                </Box>
            </TabContext>
        </Container>
    );
}

const StyledPaper = styled(Paper)`
    padding: 2rem;
    border-radius: 16px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
`;

const InfoCard = styled(Paper)`
    padding: 1.5rem;
    height: 100%;
    border-radius: 12px;
    background-color: #f8fafc;
    border: 1px solid rgba(0, 0, 0, 0.05);
`;

const EmptyState = styled(Box)`
    text-align: center;
    padding: 3rem;
    background: white;
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

export default ViewSubject;