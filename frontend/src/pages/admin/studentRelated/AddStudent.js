import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../../redux/userRelated/userHandle';
import Popup from '../../../components/Popup';
import { underControl } from '../../../redux/userRelated/userSlice';
import { getAllSclasses } from '../../../redux/sclassRelated/sclassHandle';
import { CircularProgress } from '@mui/material';
import { Container, Paper, Typography, TextField, MenuItem, Button, Avatar } from '@mui/material';
import { motion } from 'framer-motion';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const AddStudent = ({ situation }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const userState = useSelector(state => state.user);
    const { status, currentUser, response, error } = userState;
    const { sclassesList } = useSelector((state) => state.sclass);

    const [name, setName] = useState('');
    const [rollNum, setRollNum] = useState('');
    const [password, setPassword] = useState('');
    const [className, setClassName] = useState('');
    const [sclassName, setSclassName] = useState('');

    const adminID = currentUser._id;
    const role = "Student";
    const attendance = [];

    useEffect(() => {
        if (situation === "Class") {
            setSclassName(params.id);
        }
    }, [params.id, situation]);

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        dispatch(getAllSclasses(adminID, "Sclass"));
    }, [adminID, dispatch]);

    const changeHandler = (event) => {
        if (event.target.value === 'Select Class') {
            setClassName('Select Class');
            setSclassName('');
        } else {
            const selectedClass = sclassesList.find(
                (classItem) => classItem.sclassName === event.target.value
            );
            setClassName(selectedClass.sclassName);
            setSclassName(selectedClass._id);
        }
    };

    const fields = { name, rollNum, password, sclassName, adminID, role, attendance };

    const submitHandler = (event) => {
        event.preventDefault();
        if (sclassName === "") {
            setMessage("Please select a classname");
            setShowPopup(true);
        } else {
            setLoader(true);
            dispatch(registerUser(fields, role));
        }
    };

    useEffect(() => {
        if (status === 'added') {
            dispatch(underControl());
            navigate(-1);
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
                <Paper elevation={3} sx={{
                    p: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    borderRadius: 2,
                    background: 'linear-gradient(to right bottom, #ffffff, #fafafa)'
                }}>
                    <Avatar sx={{
                        m: 1,
                        bgcolor: 'primary.main',
                        width: 56,
                        height: 56
                    }}>
                        <PersonAddIcon fontSize="large" />
                    </Avatar>
                    <Typography variant="h4" gutterBottom sx={{
                        fontWeight: 600,
                        color: 'primary.main',
                        mb: 4
                    }}>
                        Add Student
                    </Typography>

                    <form onSubmit={submitHandler} style={{ width: '100%' }}>
                        <TextField
                            fullWidth
                            label="Name"
                            variant="outlined"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            sx={{ mb: 2 }}
                        />

                        {situation === "Student" && (
                            <TextField
                                select
                                fullWidth
                                label="Class"
                                value={className}
                                onChange={changeHandler}
                                required
                                sx={{ mb: 2 }}
                            >
                                <MenuItem value="Select Class">Select Class</MenuItem>
                                {sclassesList.map((classItem, index) => (
                                    <MenuItem key={index} value={classItem.sclassName}>
                                        {classItem.sclassName}
                                    </MenuItem>
                                ))}
                            </TextField>
                        )}

                        <TextField
                            fullWidth
                            label="Roll Number"
                            type="number"
                            variant="outlined"
                            value={rollNum}
                            onChange={(e) => setRollNum(e.target.value)}
                            required
                            sx={{ mb: 2 }}
                        />

                        <TextField
                            fullWidth
                            label="Password"
                            type="password"
                            variant="outlined"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            sx={{ mb: 3 }}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            size="large"
                            disabled={loader}
                            sx={{
                                py: 1.5,
                                bgcolor: 'primary.main',
                                '&:hover': { bgcolor: 'primary.dark' },
                                transition: 'all 0.3s ease'
                            }}
                        >
                            {loader ? <CircularProgress size={24} color="inherit" /> : "Add Student"}
                        </Button>
                    </form>
                </Paper>
            </motion.div>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </Container>
    );
};

export default AddStudent;