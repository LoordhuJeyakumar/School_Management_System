import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { getAllStudents } from '../../../redux/studentRelated/studentHandle';
import {
    Box, Grid, Card, CardContent, Typography, Avatar,
    IconButton, Menu, MenuItem, Tooltip, Fade,
    Container, CircularProgress
} from '@mui/material';
import {
    PersonRemove as PersonRemoveIcon,
    MoreVert as MoreVertIcon,
    AssignmentInd as AssignmentIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import styled from '@emotion/styled';
import Popup from '../../../components/Popup';

const ShowStudents = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { studentsList, loading, error } = useSelector((state) => state.student);
    const { currentUser } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getAllStudents(currentUser._id));
    }, [currentUser._id, dispatch]);

    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const handleMenuOpen = (event, student) => {
        setAnchorEl(event.currentTarget);
        setSelectedStudent(student);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedStudent(null);
    };

    const handleAttendance = () => {
        navigate(`/Admin/students/student/attendance/${selectedStudent.id}`);
        handleMenuClose();
    };

    const handleMarks = () => {
        navigate(`/Admin/students/student/marks/${selectedStudent.id}`);
        handleMenuClose();
    };

    const handleViewDetails = () => {
        navigate(`/Admin/students/student/${selectedStudent.id}`);
        handleMenuClose();
    };

    const deleteHandler = (deleteID) => {
        setMessage("Sorry the delete function has been disabled for now.");
        setShowPopup(true);
        handleMenuClose();
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" sx={{ 
                mb: 4,
                fontWeight: 700,
                color: 'primary.main',
                textAlign: 'center'
            }}>
                Student Directory
            </Typography>

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Grid container spacing={3}>
                    <AnimatePresence>
                        {studentsList?.map((student, index) => (
                            <Grid item xs={12} sm={6} md={4} key={student._id}>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                >
                                    <StyledCard elevation={3}>
                                        <CardContent>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <StyledAvatar>
                                                        {student.name.charAt(0)}
                                                    </StyledAvatar>
                                                    <Box sx={{ ml: 2 }}>
                                                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                                            {student.name}
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            Roll No: {student.rollNum}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                                <IconButton onClick={(e) => handleMenuOpen(e, {
                                                    id: student._id,
                                                    name: student.name
                                                })}>
                                                    <MoreVertIcon />
                                                </IconButton>
                                            </Box>
                                            <Typography variant="body1" sx={{
                                                p: 1.5,
                                                bgcolor: 'rgba(0,0,0,0.03)',
                                                borderRadius: 1,
                                                display: 'flex',
                                                alignItems: 'center'
                                            }}>
                                                <AssignmentIcon sx={{ mr: 1, color: 'primary.main' }} />
                                                Class: {student.sclassName.sclassName}
                                            </Typography>
                                        </CardContent>
                                    </StyledCard>
                                </motion.div>
                            </Grid>
                        ))}
                    </AnimatePresence>
                </Grid>
            )}

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                TransitionComponent={Fade}
            >
                <MenuItem onClick={handleViewDetails}>View Details</MenuItem>
                <MenuItem onClick={handleAttendance}>Take Attendance</MenuItem>
                <MenuItem onClick={handleMarks}>Provide Marks</MenuItem>
                <MenuItem onClick={() => deleteHandler(selectedStudent?.id)} sx={{ color: 'error.main' }}>
                    Delete Student
                </MenuItem>
            </Menu>

            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </Container>
    );
};

const StyledCard = styled(Card)`
    height: 100%;
    transition: transform 0.3s ease;
    &:hover {
        transform: translateY(-5px);
    }
`;

const StyledAvatar = styled(Avatar)`
    background: linear-gradient(45deg, #4361ee, #3a0ca3);
    width: 48px;
    height: 48px;
`;

export default ShowStudents;