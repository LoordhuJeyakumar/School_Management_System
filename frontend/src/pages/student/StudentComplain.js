import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {  getAllComplains } from '../../redux/complainRelated/complainHandle';
import { addStuff } from '../../redux/userRelated/userHandle';
import {
    Container, Grid, Paper, Typography, Box,
    TextField, Button, CircularProgress, Stack,
    Divider, IconButton, Collapse, Chip
} from '@mui/material';
import {
    Send as SendIcon,
    AccessTime as TimeIcon,
    KeyboardArrowDown as ExpandMoreIcon,
    KeyboardArrowUp as ExpandLessIcon,
    CheckCircle as ResolvedIcon,
    PendingActions as PendingIcon,
    History as HistoryIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import styled from '@emotion/styled';
import Popup from '../../components/Popup';

const StudentComplain = () => {
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user);
    const { complains, loading, error, response } = useSelector((state) => state.complain);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState('');
    const [expandedComplain, setExpandedComplain] = useState(null);

    const user = currentUser._id
    const school = currentUser.school._id
 const address = "Complain"
 const fields = {
    user,
    date:Date.now(),
    complaint:{
        title,
        description
    },
    school,
};
 useEffect(() => {
        dispatch(getAllComplains(currentUser._id));
    }, [dispatch, currentUser._id]);

    const submitHandler = (e) => {
        e.preventDefault();
        if (title.trim() === '' || description.trim() === '') {
            setMessage('Please fill in all fields');
            setShowPopup(true);
            return;
        }
        const complainData = {
            user: currentUser._id,
            title: title,
            description: description,
            date: new Date().toISOString(),
            status: 'Pending'
        };
        dispatch(addStuff(fields, address))
        setTitle('');
        setDescription('');
    };

    const handleExpand = (complainId) => {
        setExpandedComplain(expandedComplain === complainId ? null : complainId);
    };

    const formatDate = (dateString) => {
        const options = { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <HeaderCard elevation={1}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>
                                Submit a Complaint
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                Report any issues or concerns you have
                            </Typography>
                        </motion.div>
                    </HeaderCard>
                </Grid>

                <Grid item xs={12} md={5}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <FormCard elevation={1}>
                            <form onSubmit={submitHandler}>
                                <Stack spacing={3}>
                                    <TextField
                                        label="Title"
                                        variant="outlined"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        fullWidth
                                        required
                                    />
                                    <TextField
                                        label="Description"
                                        variant="outlined"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        fullWidth
                                        required
                                        multiline
                                        rows={4}
                                    />
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        endIcon={<SendIcon />}
                                        disabled={loading}
                                    >
                                        {loading ? <CircularProgress size={24} /> : 'Submit Complaint'}
                                    </Button>
                                </Stack>
                            </form>
                        </FormCard>
                    </motion.div>
                </Grid>

                <Grid item xs={12} md={7}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <ComplaintsCard elevation={1}>
                            <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main', mb: 3 }}>
                                Your Complaints History
                            </Typography>
                            {loading ? (
                                <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
                                    <CircularProgress />
                                </Box>
                            ) : complains?.length > 0 ? (
                                <Stack spacing={2}>
                                    {complains.map((complain) => (
                                        <ComplaintItem
                                            key={complain._id}
                                            elevation={0}
                                            $expanded={expandedComplain === complain._id}
                                        >
                                            <Box sx={{ p: 2 }}>
                                                <Stack
                                                    direction="row"
                                                    justifyContent="space-between"
                                                    alignItems="center"
                                                    spacing={2}
                                                >
                                                    <Box>
                                                        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                                                            {complain.title}
                                                        </Typography>
                                                        <Stack direction="row" spacing={1} alignItems="center">
                                                            <TimeIcon fontSize="small" color="action" />
                                                            <Typography variant="body2" color="text.secondary">
                                                                {formatDate(complain.date)}
                                                            </Typography>
                                                        </Stack>
                                                    </Box>
                                                    <Stack direction="row" spacing={2} alignItems="center">
                                                        <StatusChip status={complain.status} />
                                                        <IconButton
                                                            onClick={() => handleExpand(complain._id)}
                                                            size="small"
                                                        >
                                                            {expandedComplain === complain._id ? 
                                                                <ExpandLessIcon /> : 
                                                                <ExpandMoreIcon />
                                                            }
                                                        </IconButton>
                                                    </Stack>
                                                </Stack>
                                                <Collapse in={expandedComplain === complain._id}>
                                                    <Divider sx={{ my: 2 }} />
                                                    <Typography variant="body1">
                                                        {complain.description}
                                                    </Typography>
                                                    {complain.response && (
                                                        <Box sx={{ mt: 2, p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                                                            <Typography variant="subtitle2" color="primary" gutterBottom>
                                                                Response:
                                                            </Typography>
                                                            <Typography variant="body2">
                                                                {complain.response}
                                                            </Typography>
                                                        </Box>
                                                    )}
                                                </Collapse>
                                            </Box>
                                        </ComplaintItem>
                                    ))}
                                </Stack>
                            ) : (
                                <EmptyState>
                                    <HistoryIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                                    <Typography variant="h6" color="text.secondary">
                                        No complaints yet
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Your submitted complaints will appear here
                                    </Typography>
                                </EmptyState>
                            )}
                        </ComplaintsCard>
                    </motion.div>
                </Grid>
            </Grid>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </Container>
    );
};

const LoaderWrapper = styled(Box)`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50vh;
`;

const HeaderCard = styled(Paper)`
    padding: 2rem;
    border-radius: 16px;
    background: linear-gradient(135deg, #4361ee08, #3a0ca308);
`;

const FormCard = styled(Paper)`
    padding: 1.5rem;
    border-radius: 16px;
    background: white;
    height: 100%;
`;

const ComplaintsCard = styled(Paper)`
    padding: 1.5rem;
    border-radius: 16px;
    background: white;
    min-height: 400px;
`;

const ComplaintItem = styled(Paper)`
    border-radius: 12px;
    background: ${({ theme }) => theme.palette.background.default};
    transition: all 0.3s ease;
    
    ${({ $expanded }) => $expanded && `
        background: white;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    `}
`;

const EmptyState = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3rem;
    text-align: center;
`;

const StatusChip = ({ status }) => {
    const getStatusConfig = (status) => {
        switch (status.toLowerCase()) {
            case 'resolved':
                return {
                    icon: <ResolvedIcon fontSize="small" />,
                    color: 'success'
                };
            case 'pending':
                return {
                    icon: <PendingIcon fontSize="small" />,
                    color: 'warning'
                };
            default:
                return {
                    icon: <PendingIcon fontSize="small" />,
                    color: 'default'
                };
        }
    };

    const config = getStatusConfig(status);

    return (
        <Chip
            icon={config.icon}
            label={status}
            color={config.color}
            size="small"
            sx={{ fontWeight: 500 }}
        />
    );
};

export default StudentComplain;