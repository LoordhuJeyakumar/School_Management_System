import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getSubjectDetails } from '../../../redux/sclassRelated/sclassHandle';
import { registerUser } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import {
    Container, Paper, Box, Typography, TextField,
    Button, Avatar, CircularProgress, Chip
} from '@mui/material';
import {
    School as SubjectIcon,
    Class as ClassIcon,
    Person as TeacherIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import Popup from '../../../components/Popup';

const AddTeacher = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const subjectID = params.id;

    const { status, response, error } = useSelector(state => state.user);
    const { subjectDetails } = useSelector((state) => state.sclass);

    useEffect(() => {
        dispatch(getSubjectDetails(subjectID, "Subject"));
    }, [dispatch, subjectID]);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [loader, setLoader] = useState(false);

    const role = "Teacher";
    const school = subjectDetails && subjectDetails.school;
    const teachSubject = subjectDetails && subjectDetails._id;
    const teachSclass = subjectDetails && subjectDetails.sclassName && subjectDetails.sclassName._id;

    const fields = { name, email, password, role, school, teachSubject, teachSclass };

    const submitHandler = (event) => {
        event.preventDefault();
        setLoader(true);
        dispatch(registerUser(fields, role));
    };

    useEffect(() => {
        if (status === 'added') {
            dispatch(underControl());
            navigate("/Admin/teachers");
        } else if (status === 'failed') {
            setMessage(response);
            setShowPopup(true);
            setLoader(false);
        } else if (status === 'error') {
            setMessage("Network Error");
            setShowPopup(true);
            setLoader(false);
        }
    }, [status, navigate, error, response, dispatch]);

    return (
        <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <StyledPaper elevation={3}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
                        <Avatar sx={{ m: 1, bgcolor: 'primary.main', width: 56, height: 56 }}>
                            <TeacherIcon sx={{ fontSize: 32 }} />
                        </Avatar>
                        <Typography component="h1" variant="h5" sx={{ fontWeight: 600 }}>
                            Add Teacher
                        </Typography>
                    </Box>

                    <SubjectInfo elevation={1}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <SubjectIcon sx={{ color: 'primary.main', mr: 1 }} />
                            <Typography variant="subtitle1" color="text.secondary">
                                Subject Details
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                            <Chip 
                                label={subjectDetails?.subName || 'Loading...'}
                                sx={{ bgcolor: 'primary.lighter', color: 'primary.main' }}
                            />
                            <Chip 
                                icon={<ClassIcon />}
                                label={subjectDetails?.sclassName?.sclassName || 'Loading...'}
                                sx={{ bgcolor: 'success.lighter', color: 'success.main' }}
                            />
                        </Box>
                    </SubjectInfo>

                    <form onSubmit={submitHandler}>
                        <TextField
                            fullWidth
                            label="Name"
                            variant="outlined"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            sx={{ mb: 2 }}
                            required
                        />
                        <TextField
                            fullWidth
                            label="Email"
                            type="email"
                            variant="outlined"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            sx={{ mb: 2 }}
                            required
                        />
                        <TextField
                            fullWidth
                            label="Password"
                            type="password"
                            variant="outlined"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            sx={{ mb: 3 }}
                            required
                        />
                        <SubmitButton
                            fullWidth
                            type="submit"
                            variant="contained"
                            disabled={loader}
                        >
                            {loader ? (
                                <CircularProgress size={24} sx={{ color: 'white' }} />
                            ) : (
                                'Register'
                            )}
                        </SubmitButton>
                    </form>
                </StyledPaper>
            </motion.div>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </Container>
    );
};

const StyledPaper = styled(Paper)`
    padding: 2rem;
    border-radius: 16px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
`;

const SubjectInfo = styled(Paper)`
    padding: 1.5rem;
    margin-bottom: 2rem;
    border-radius: 12px;
    background-color: #f8fafc;
    border: 1px solid rgba(0, 0, 0, 0.05);
`;

const SubmitButton = styled(Button)`
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

export default AddTeacher;