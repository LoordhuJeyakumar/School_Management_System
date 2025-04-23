import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllTeachers } from '../../../redux/teacherRelated/teacherHandle';
import { deleteUser } from '../../../redux/userRelated/userHandle';
import {
    Container, Grid, Typography, Box, IconButton,
    Menu, MenuItem, Avatar, Chip, CircularProgress
} from '@mui/material';
import {
    PersonRemove as DeleteIcon,
    MoreVert as MoreVertIcon,
    Class as ClassIcon,
    MenuBook as SubjectIcon,
    PersonAdd as PersonAddIcon,
    Email as EmailIcon,
} from '@mui/icons-material';
import { GreenButton } from '../../../components/buttonStyles';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import { motion, AnimatePresence } from 'framer-motion';
import styled from '@emotion/styled';
import Popup from '../../../components/Popup';

const ShowTeachers = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { teachersList, loading, error, response } = useSelector((state) => state.teacher);
    const { currentUser } = useSelector(state => state.user);

    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        dispatch(getAllTeachers(currentUser._id));
    }, [currentUser._id, dispatch]);

    const handleMenuClick = (event, teacher) => {
        setAnchorEl(event.currentTarget);
        setSelectedTeacher(teacher);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedTeacher(null);
    };

    const handleDelete = () => {
        setMessage("Sorry the delete function has been disabled for now.");
        setShowPopup(true);
        handleMenuClose();
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (response) {
        return (
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <GreenButton
                        variant="contained"
                        onClick={() => navigate("/Admin/teachers/chooseclass")}
                        startIcon={<PersonAddIcon />}
                    >
                        Add Teacher
                    </GreenButton>
                </Box>
            </Container>
        );
    }

    const actions = [
        {
            icon: <PersonAddIcon color="primary" />,
            name: 'Add New Teacher',
            action: () => navigate("/Admin/teachers/chooseclass")
        },
        {
            icon: <DeleteIcon color="error" />,
            name: 'Delete All Teachers',
            action: () => handleDelete()
        }
    ];

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h4" sx={{
                        fontWeight: 700,
                        color: 'primary.main',
                        textAlign: 'center',
                        background: 'linear-gradient(45deg, #4361ee, #3a0ca3)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        Teachers Directory
                    </Typography>
                </Box>

                <Grid container spacing={3}>
                    <AnimatePresence>
                        {teachersList.map((teacher, index) => (
                            <Grid item xs={12} sm={6} md={4} key={teacher._id}>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                >
                                    <TeacherCard elevation={3}>
                                        <Box sx={{ p: 2 }}>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <StyledAvatar>
                                                        {teacher.name.charAt(0)}
                                                    </StyledAvatar>
                                                    <Box sx={{ ml: 2 }}>
                                                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                                            {teacher.name}
                                                        </Typography>
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                            <EmailIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                                                            <Typography variant="body2" color="text.secondary">
                                                                {teacher.email}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                                <IconButton onClick={(e) => handleMenuClick(e, teacher)}>
                                                    <MoreVertIcon />
                                                </IconButton>
                                            </Box>

                                            <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                                                <Chip
                                                    icon={<ClassIcon />}
                                                    label={`Class ${teacher.teachSclass.sclassName}`}
                                                    size="small"
                                                    sx={{
                                                        bgcolor: 'primary.lighter',
                                                        color: 'primary.main',
                                                        '& .MuiChip-icon': { color: 'inherit' }
                                                    }}
                                                />
                                                {teacher.teachSubject?.subName ? (
                                                    <Chip
                                                        icon={<SubjectIcon />}
                                                        label={teacher.teachSubject.subName}
                                                        size="small"
                                                        sx={{
                                                            bgcolor: 'success.lighter',
                                                            color: 'success.main',
                                                            '& .MuiChip-icon': { color: 'inherit' }
                                                        }}
                                                    />
                                                ) : (
                                                    <GreenButton
                                                        size="small"
                                                        onClick={() => navigate(`/Admin/teachers/choosesubject/${teacher.teachSclass._id}/${teacher._id}`)}
                                                    >
                                                        Add Subject
                                                    </GreenButton>
                                                )}
                                            </Box>
                                        </Box>
                                    </TeacherCard>
                                </motion.div>
                            </Grid>
                        ))}
                    </AnimatePresence>
                </Grid>
            </motion.div>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={() => {
                    navigate("/Admin/teachers/teacher/" + selectedTeacher?._id);
                    handleMenuClose();
                }}>
                    View Details
                </MenuItem>
                <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
                    Delete Teacher
                </MenuItem>
            </Menu>

            <SpeedDialTemplate actions={actions} />
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </Container>
    );
};

const TeacherCard = styled(motion.div)`
    background: white;
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    
    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    }
`;

const StyledAvatar = styled(Avatar)`
    background: linear-gradient(135deg, #4361ee, #3a0ca3);
    width: 48px;
    height: 48px;
    font-size: 1.25rem;
    font-weight: 600;
`;

export default ShowTeachers;