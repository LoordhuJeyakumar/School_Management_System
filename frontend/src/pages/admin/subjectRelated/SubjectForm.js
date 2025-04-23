import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addStuff } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import {
    Button, TextField, Grid, Box, Typography,
    Container, Paper, CircularProgress, IconButton,
    Tooltip
} from "@mui/material";
import {
    Add as AddIcon,
    Remove as RemoveIcon,
    MenuBook as SubjectIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import styled from '@emotion/styled';
import Popup from '../../../components/Popup';

const SubjectForm = () => {
    const [subjects, setSubjects] = useState([{ subName: "", subCode: "", sessions: "" }]);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()

    const userState = useSelector(state => state.user);
    const { status, currentUser, response, error } = userState;

    const sclassName = params.id
    const adminID = currentUser._id
    const address = "Subject"

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [loader, setLoader] = useState(false)

    const handleSubjectNameChange = (index) => (event) => {
        const newSubjects = [...subjects];
        newSubjects[index].subName = event.target.value;
        setSubjects(newSubjects);
    };

    const handleSubjectCodeChange = (index) => (event) => {
        const newSubjects = [...subjects];
        newSubjects[index].subCode = event.target.value;
        setSubjects(newSubjects);
    };

    const handleSessionsChange = (index) => (event) => {
        const newSubjects = [...subjects];
        newSubjects[index].sessions = event.target.value || 0;
        setSubjects(newSubjects);
    };

    const handleAddSubject = () => {
        setSubjects([...subjects, { subName: "", subCode: "", sessions: "" }]);
    };

    const handleRemoveSubject = (index) => () => {
        const newSubjects = [...subjects];
        newSubjects.splice(index, 1);
        setSubjects(newSubjects);
    };

    const fields = {
        sclassName,
        subjects: subjects.map((subject) => ({
            subName: subject.subName,
            subCode: subject.subCode,
            sessions: subject.sessions,
        })),
        adminID,
    };

    const submitHandler = (event) => {
        event.preventDefault();
        setLoader(true)
        dispatch(addStuff(fields, address))
    };

    useEffect(() => {
        if (status === 'added') {
            navigate("/Admin/subjects");
            dispatch(underControl())
            setLoader(false)
        }
        else if (status === 'failed') {
            setMessage(response)
            setShowPopup(true)
            setLoader(false)
        }
        else if (status === 'error') {
            setMessage("Network Error")
            setShowPopup(true)
            setLoader(false)
        }
    }, [status, navigate, error, response, dispatch]);

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <StyledPaper elevation={3}>
                    <Box sx={{ mb: 4, textAlign: 'center' }}>
                        <SubjectIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                        <Typography variant="h4" component="h2" sx={{
                            fontWeight: 700,
                            color: 'primary.main',
                            background: 'linear-gradient(45deg, #4361ee, #3a0ca3)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>
                            Add Subjects
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                            Create new subjects for your class
                        </Typography>
                    </Box>

                    <form onSubmit={submitHandler}>
                        <AnimatePresence>
                            {subjects.map((subject, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <SubjectSection elevation={1}>
                                        <Grid container spacing={3} alignItems="center">
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    fullWidth
                                                    label="Subject Name"
                                                    variant="outlined"
                                                    value={subject.subName}
                                                    onChange={handleSubjectNameChange(index)}
                                                    required
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={3}>
                                                <TextField
                                                    fullWidth
                                                    label="Subject Code"
                                                    variant="outlined"
                                                    value={subject.subCode}
                                                    onChange={handleSubjectCodeChange(index)}
                                                    required
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={3}>
                                                <TextField
                                                    fullWidth
                                                    label="Sessions"
                                                    variant="outlined"
                                                    type="number"
                                                    inputProps={{ min: 0 }}
                                                    value={subject.sessions}
                                                    onChange={handleSessionsChange(index)}
                                                    required
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                    {index === 0 ? (
                                                        <Tooltip title="Add another subject">
                                                            <IconButton
                                                                color="primary"
                                                                onClick={handleAddSubject}
                                                                sx={{ 
                                                                    bgcolor: 'primary.lighter',
                                                                    '&:hover': { bgcolor: 'primary.light' }
                                                                }}
                                                            >
                                                                <AddIcon />
                                                            </IconButton>
                                                        </Tooltip>
                                                    ) : (
                                                        <Tooltip title="Remove this subject">
                                                            <IconButton
                                                                color="error"
                                                                onClick={handleRemoveSubject(index)}
                                                                sx={{ 
                                                                    bgcolor: 'error.lighter',
                                                                    '&:hover': { bgcolor: 'error.light' }
                                                                }}
                                                            >
                                                                <RemoveIcon />
                                                            </IconButton>
                                                        </Tooltip>
                                                    )}
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </SubjectSection>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
                            <SubmitButton
                                variant="contained"
                                color="primary"
                                type="submit"
                                disabled={loader}
                            >
                                {loader ? (
                                    <CircularProgress size={24} sx={{ color: 'white' }} />
                                ) : (
                                    'Save Subjects'
                                )}
                            </SubmitButton>
                        </Box>
                    </form>
                </StyledPaper>
            </motion.div>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </Container>
    );
}

const StyledPaper = styled(Paper)`
    padding: 2rem;
    border-radius: 16px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
`;

const SubjectSection = styled(Paper)`
    padding: 1.5rem;
    margin-bottom: 1rem;
    border-radius: 12px;
    background-color: #f8fafc;
    border: 1px solid rgba(0, 0, 0, 0.05);
`;

const SubmitButton = styled(Button)`
    min-width: 160px;
    height: 48px;
    font-weight: 600;
    text-transform: none;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(67, 97, 238, 0.2);
    transition: all 0.3s ease;
    
    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(67, 97, 238, 0.3);
    }
`;

export default SubjectForm;