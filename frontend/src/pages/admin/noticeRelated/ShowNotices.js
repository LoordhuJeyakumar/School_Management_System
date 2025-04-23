import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import {
    Paper, Box, IconButton, Typography, Container, CircularProgress
} from '@mui/material';
import {
    NoteAdd as NoteAddIcon,
    Delete as DeleteIcon,
    Notifications as NotificationsIcon
} from '@mui/icons-material';
import { getAllNotices } from '../../../redux/noticeRelated/noticeHandle';
import { deleteUser } from '../../../redux/userRelated/userHandle';
import TableTemplate from '../../../components/TableTemplate';
import { GreenButton } from '../../../components/buttonStyles';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const ShowNotices = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { noticesList, loading, error, response } = useSelector((state) => state.notice);
    const { currentUser } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getAllNotices(currentUser._id, "Notice"));
    }, [currentUser._id, dispatch]);

    if (error) {
        console.log(error);
    }

    const deleteHandler = (deleteID, address) => {
        dispatch(deleteUser(deleteID, address))
            .then(() => {
                dispatch(getAllNotices(currentUser._id, "Notice"));
            })
    }

    const noticeColumns = [
        { id: 'title', label: 'Title', minWidth: 170 },
        { id: 'details', label: 'Details', minWidth: 100 },
        { id: 'date', label: 'Date', minWidth: 170 },
    ];

    const noticeRows = noticesList && noticesList.length > 0 && noticesList.map((notice) => {
        const date = new Date(notice.date);
        const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
        return {
            title: notice.title,
            details: notice.details,
            date: dateString,
            id: notice._id,
        };
    });

    const NoticeButtonHaver = ({ row }) => {
        return (
            <motion.div whileHover={{ scale: 1.02 }}>
                <IconButton 
                    onClick={() => deleteHandler(row.id, "Notice")}
                    sx={{
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            color: 'error.main',
                            transform: 'rotate(8deg)'
                        }
                    }}
                >
                    <DeleteIcon />
                </IconButton>
            </motion.div>
        );
    };

    const actions = [
        {
            icon: <NoteAddIcon />, 
            name: 'Add New Notice',
            action: () => navigate("/Admin/addnotice"),
            color: '#4361ee'
        },
        {
            icon: <DeleteIcon />, 
            name: 'Delete All Notices',
            action: () => deleteHandler(currentUser._id, "Notices"),
            color: '#ef233c'
        }
    ];

    return (
        <StyledContainer>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Box sx={{ mb: 4 }}>
                    <Header>
                        <IconWrapper>
                            <NotificationsIcon sx={{ fontSize: 40 }} />
                        </IconWrapper>
                        <div>
                            <Typography variant="h4" sx={{
                                fontWeight: 700,
                                background: 'linear-gradient(45deg, #4361ee, #3a0ca3)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}>
                                Notices
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                Manage and view all school notices
                            </Typography>
                        </div>
                    </Header>
                </Box>

                {loading ? (
                    <LoaderWrapper>
                        <CircularProgress />
                    </LoaderWrapper>
                ) : (
                    <AnimatePresence>
                        {response ? (
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                    <GreenButton 
                                        variant="contained"
                                        onClick={() => navigate("/Admin/addnotice")}
                                        sx={{
                                            borderRadius: '12px',
                                            padding: '0.5rem 1.5rem'
                                        }}
                                    >
                                        Add Notice
                                    </GreenButton>
                                </motion.div>
                            </Box>
                        ) : (
                            <StyledPaper elevation={2}>
                                {Array.isArray(noticesList) && noticesList.length > 0 ? (
                                    <TableTemplate 
                                        buttonHaver={NoticeButtonHaver} 
                                        columns={noticeColumns} 
                                        rows={noticeRows} 
                                    />
                                ) : (
                                    <EmptyState>
                                        <NotificationsIcon sx={{ fontSize: 60, color: '#94a3b8', mb: 2 }} />
                                        <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                                            No Notices Found
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Start by adding some notices
                                        </Typography>
                                    </EmptyState>
                                )}
                                <SpeedDialTemplate actions={actions} />
                            </StyledPaper>
                        )}
                    </AnimatePresence>
                )}
            </motion.div>
        </StyledContainer>
    );
};

export default ShowNotices;

const StyledContainer = styled(Container)`
    padding-top: 2rem;
    padding-bottom: 2rem;
`;

const StyledPaper = styled(Paper)`
    border-radius: 16px;
    padding: 1.5rem;
    background: white;
    border: 1px solid rgba(241, 242, 244, 0.5);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    gap: 1.5rem;
`;

const IconWrapper = styled.div`
    width: 64px;
    height: 64px;
    border-radius: 16px;
    background: linear-gradient(135deg, rgba(67, 97, 238, 0.1), rgba(58, 12, 163, 0.1));
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
        color: #4361ee;
    }
`;

const EmptyState = styled(Box)`
    text-align: center;
    padding: 3rem 2rem;
`;

const LoaderWrapper = styled(Box)`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 300px;
`;