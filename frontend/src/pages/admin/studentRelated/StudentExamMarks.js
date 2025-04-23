import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserDetails } from '../../../redux/userRelated/userHandle';
import { getSubjectList } from '../../../redux/sclassRelated/sclassHandle';
import { updateStudentFields } from '../../../redux/studentRelated/studentHandle';
import {
    Box, Container, Typography, TextField, MenuItem,
    Button, CircularProgress, Paper, Stack, Divider,
    Slider, InputAdornment
} from '@mui/material';
import {
    Score as ScoreIcon,
    Person as StudentIcon,
    Grade as GradeIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import Popup from '../../../components/Popup';

const StudentExamMarks = ({ situation }) => {
    const dispatch = useDispatch();
    const { currentUser, userDetails, loading } = useSelector((state) => state.user);
    const { subjectsList } = useSelector((state) => state.sclass);
    const { response, error, statestatus } = useSelector((state) => state.student);
    const params = useParams();

    const [studentID, setStudentID] = useState("");
    const [subjectName, setSubjectName] = useState("");
    const [chosenSubName, setChosenSubName] = useState("");
    const [marksObtained, setMarksObtained] = useState("");

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

    const fields = { subName: chosenSubName, marksObtained };

    const submitHandler = (event) => {
        event.preventDefault();
        setLoader(true);
        dispatch(updateStudentFields(studentID, fields, "UpdateExamResult"));
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
                                <ScoreIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                                <Typography variant="h4" sx={{ fontWeight: 600, color: 'primary.main' }}>
                                    Exam Marks Entry
                                </Typography>
                            </Box>

                            <Box sx={{ 
                                bgcolor: 'primary.lighter',
                                p: 2,
                                borderRadius: 1
                            }}>
                                <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                                    <StudentIcon color="primary" />
                                    <Typography variant="h6">
                                        Student: {userDetails.name}
                                    </Typography>
                                </Stack>
                                {currentUser.teachSubject && (
                                    <Stack direction="row" alignItems="center" spacing={1}>
                                        <GradeIcon color="primary" />
                                        <Typography variant="subtitle1">
                                            Subject: {currentUser.teachSubject?.subName}
                                        </Typography>
                                    </Stack>
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
                                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                        >
                                            {subjectsList?.map((subject, index) => (
                                                <MenuItem key={index} value={subject.subName}>
                                                    {subject.subName}
                                                </MenuItem>
                                            )) || (
                                                <MenuItem value="Select Subject">
                                                    Add Subjects For Marks
                                                </MenuItem>
                                            )}
                                        </TextField>
                                    )}

                                    <Box>
                                        <Typography variant="subtitle1" gutterBottom>
                                            Marks Obtained
                                        </Typography>
                                        <Stack spacing={2} direction="row" alignItems="center">
                                            <TextField
                                                type="number"
                                                value={marksObtained}
                                                onChange={(e) => setMarksObtained(e.target.value)}
                                                required
                                                fullWidth
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            / 100
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                                            />
                                        </Stack>
                                        <Slider
                                            value={Number(marksObtained) || 0}
                                            onChange={(e, newValue) => setMarksObtained(newValue)}
                                            valueLabelDisplay="auto"
                                            step={1}
                                            min={0}
                                            max={100}
                                            sx={{ mt: 2 }}
                                        />
                                    </Box>

                                    <Button
                                        type="submit"
                                        variant="contained"
                                        size="large"
                                        disabled={loader}
                                        sx={{
                                            mt: 2,
                                            py: 1.5,
                                            position: 'relative',
                                            borderRadius: 2,
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
                                        ) : "Submit Marks"}
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

export default StudentExamMarks;