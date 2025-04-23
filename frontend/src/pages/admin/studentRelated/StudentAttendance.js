import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserDetails } from '../../../redux/userRelated/userHandle';
import { getSubjectList } from '../../../redux/sclassRelated/sclassHandle';
import { updateStudentFields } from '../../../redux/studentRelated/studentHandle';
import {
    Box, Container, Typography, TextField, MenuItem,
    Button, CircularProgress, Paper, ToggleButton,
    ToggleButtonGroup, Stack, Divider
} from '@mui/material';
import {
    CheckCircle as PresentIcon,
    Cancel as AbsentIcon,
    Person as StudentIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import Popup from '../../../components/Popup';

const StudentAttendance = ({ situation }) => {
    const dispatch = useDispatch();
    const { currentUser, userDetails, loading } = useSelector((state) => state.user);
    const { subjectsList } = useSelector((state) => state.sclass);
    const { response, error, statestatus } = useSelector((state) => state.student);
    const params = useParams();

    const [studentID, setStudentID] = useState("");
    const [subjectName, setSubjectName] = useState("");
    const [chosenSubName, setChosenSubName] = useState("");
    const [status, setStatus] = useState('');
    const [date, setDate] = useState('');

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        if (situation === "Student") {
            setStudentID(params.id);
            const stdID = params.id;
            dispatch(getUserDetails(stdID, "Student"));
        } else if (situation === "Subject") {
            const { studentID, subjectID } = params;
            setStudentID(studentID);
            dispatch(getUserDetails(studentID, "Student"));
            setChosenSubName(subjectID);
        }
    }, [situation]);

    useEffect(() => {
        if (userDetails && userDetails.sclassName && situation === "Student") {
            dispatch(getSubjectList(userDetails.sclassName._id, "ClassSubjects"));
        }
    }, [dispatch, userDetails]);

    const changeHandler = (event) => {
        const selectedSubject = subjectsList.find(
            (subject) => subject.subName === event.target.value
        );
        setSubjectName(selectedSubject.subName);
        setChosenSubName(selectedSubject._id);
    };

    const fields = { subName: chosenSubName, status, date };

    const submitHandler = (event) => {
        event.preventDefault();
        setLoader(true);
        dispatch(updateStudentFields(studentID, fields, "StudentAttendance"));
    };

    useEffect(() => {
        if (response) {
            setLoader(false);
            setShowPopup(true);
            setMessage(response);
        } else if (error) {
            setLoader(false);
            setShowPopup(true);
            setMessage("error");
        } else if (statestatus === "added") {
            setLoader(false);
            setShowPopup(true);
            setMessage("Done Successfully");
        }
    }, [response, statestatus, error]);

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Paper elevation={3} sx={{
                        p: 4,
                        borderRadius: 2,
                        background: 'linear-gradient(to right bottom, #ffffff, #fafafa)'
                    }}>
                        <Stack spacing={3}>
                            <Box sx={{ textAlign: 'center' }}>
                                <StudentIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                                <Typography variant="h4" sx={{ fontWeight: 600, color: 'primary.main' }}>
                                    Student Attendance
                                </Typography>
                            </Box>

                            <Box sx={{ 
                                bgcolor: 'primary.lighter',
                                p: 2,
                                borderRadius: 1
                            }}>
                                <Typography variant="h6" gutterBottom>
                                    Student: {userDetails.name}
                                </Typography>
                                {currentUser.teachSubject && (
                                    <Typography variant="subtitle1">
                                        Subject: {currentUser.teachSubject?.subName}
                                    </Typography>
                                )}
                            </Box>

                            <Divider />

                            <form onSubmit={submitHandler}>
                                <Stack spacing={3}>
                                    {situation === "Student" && (
                                        <TextField
                                            select
                                            fullWidth
                                            label="Select Subject"
                                            value={subjectName}
                                            onChange={changeHandler}
                                            required
                                        >
                                            {subjectsList?.map((subject, index) => (
                                                <MenuItem key={index} value={subject.subName}>
                                                    {subject.subName}
                                                </MenuItem>
                                            )) || (
                                                <MenuItem value="Select Subject">
                                                    Add Subjects For Attendance
                                                </MenuItem>
                                            )}
                                        </TextField>
                                    )}

                                    <Box sx={{ textAlign: 'center' }}>
                                        <Typography variant="subtitle1" gutterBottom>
                                            Attendance Status
                                        </Typography>
                                        <ToggleButtonGroup
                                            value={status}
                                            exclusive
                                            onChange={(e, newStatus) => setStatus(newStatus)}
                                            aria-label="attendance status"
                                            sx={{ mb: 2 }}
                                        >
                                            <ToggleButton 
                                                value="Present" 
                                                aria-label="present"
                                                sx={{
                                                    '&.Mui-selected': {
                                                        bgcolor: 'success.lighter',
                                                        '&:hover': { bgcolor: 'success.light' }
                                                    }
                                                }}
                                            >
                                                <PresentIcon sx={{ mr: 1 }} />
                                                Present
                                            </ToggleButton>
                                            <ToggleButton 
                                                value="Absent" 
                                                aria-label="absent"
                                                sx={{
                                                    '&.Mui-selected': {
                                                        bgcolor: 'error.lighter',
                                                        '&:hover': { bgcolor: 'error.light' }
                                                    }
                                                }}
                                            >
                                                <AbsentIcon sx={{ mr: 1 }} />
                                                Absent
                                            </ToggleButton>
                                        </ToggleButtonGroup>
                                    </Box>

                                    <TextField
                                        type="date"
                                        label="Select Date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        required
                                        InputLabelProps={{ shrink: true }}
                                    />

                                    <Button
                                        type="submit"
                                        variant="contained"
                                        size="large"
                                        disabled={loader}
                                        sx={{
                                            mt: 2,
                                            py: 1.5,
                                            position: 'relative',
                                            '&:disabled': {
                                                bgcolor: 'action.disabledBackground',
                                            }
                                        }}
                                    >
                                        {loader ? (
                                            <CircularProgress 
                                                size={24}
                                                sx={{
                                                    position: 'absolute',
                                                    top: '50%',
                                                    left: '50%',
                                                    marginTop: '-12px',
                                                    marginLeft: '-12px',
                                                }}
                                            />
                                        ) : "Submit Attendance"}
                                    </Button>
                                </Stack>
                            </form>
                        </Stack>
                    </Paper>
                </motion.div>
            )}
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </Container>
    );
};

export default StudentAttendance;