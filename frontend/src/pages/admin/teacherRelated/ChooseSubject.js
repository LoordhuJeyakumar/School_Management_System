import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getTeacherFreeClassSubjects } from '../../../redux/sclassRelated/sclassHandle';
import { updateTeachSubject } from '../../../redux/teacherRelated/teacherHandle';
import {
    Container, Paper, Typography, Box, IconButton,
    Table, TableBody, TableContainer, TableHead,
    CircularProgress, Chip, Avatar
} from '@mui/material';
import {
    MenuBook as SubjectIcon,
    Code as CodeIcon,
    Add as AddIcon
} from '@mui/icons-material';
import { GreenButton, PurpleButton } from '../../../components/buttonStyles';
import { StyledTableCell, StyledTableRow } from '../../../components/styles';
import { motion, AnimatePresence } from 'framer-motion';
import styled from '@emotion/styled';

const ChooseSubject = ({ situation }) => {
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [classID, setClassID] = useState("");
    const [teacherID, setTeacherID] = useState("");
    const [loader, setLoader] = useState(false);

    const { subjectsList, loading, error, response } = useSelector((state) => state.sclass);

    useEffect(() => {
        if (situation === "Norm") {
            setClassID(params.id);
            dispatch(getTeacherFreeClassSubjects(params.id));
        } else if (situation === "Teacher") {
            const { classID, teacherID } = params;
            setClassID(classID);
            setTeacherID(teacherID);
            dispatch(getTeacherFreeClassSubjects(classID));
        }
    }, [situation, params, dispatch]);

    const updateSubjectHandler = (teacherId, teachSubject) => {
        setLoader(true);
        dispatch(updateTeachSubject(teacherId, teachSubject));
        navigate("/Admin/teachers");
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
            <EmptyState>
                <SubjectIcon sx={{ fontSize: 60, color: '#94a3b8', mb: 2 }} />
                <Typography variant="h6" color="text.secondary" gutterBottom>
                    All Subjects Have Teachers
                </Typography>
                <PurpleButton
                    variant="contained"
                    onClick={() => navigate("/Admin/addsubject/" + classID)}
                    startIcon={<AddIcon />}
                >
                    Add New Subjects
                </PurpleButton>
            </EmptyState>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <StyledPaper elevation={3}>
                    <Box sx={{ p: 3, pb: 2 }}>
                        <Typography variant="h5" sx={{ 
                            fontWeight: 600,
                            color: 'primary.main',
                            mb: 2
                        }}>
                            Choose a Subject
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Select a subject to {situation === "Norm" ? "assign a new teacher" : "update teacher assignment"}
                        </Typography>
                    </Box>

                    <TableContainer>
                        <Table>
                            <TableHead>
                                <StyledTableRow>
                                    <StyledTableCell>Subject</StyledTableCell>
                                    <StyledTableCell align="center">Code</StyledTableCell>
                                    <StyledTableCell align="right">Action</StyledTableCell>
                                </StyledTableRow>
                            </TableHead>
                            <TableBody>
                                <AnimatePresence>
                                    {Array.isArray(subjectsList) && subjectsList.map((subject, index) => (
                                        <motion.tr
                                            key={subject._id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.3, delay: index * 0.1 }}
                                            component={StyledTableRow}
                                        >
                                            <StyledTableCell>
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <SubjectAvatar>
                                                        <SubjectIcon />
                                                    </SubjectAvatar>
                                                    <Box sx={{ ml: 2 }}>
                                                        <Typography variant="subtitle2">
                                                            {subject.subName}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                <Chip
                                                    icon={<CodeIcon />}
                                                    label={subject.subCode}
                                                    size="small"
                                                    sx={{
                                                        bgcolor: 'primary.lighter',
                                                        color: 'primary.main',
                                                        '& .MuiChip-icon': { color: 'inherit' }
                                                    }}
                                                />
                                            </StyledTableCell>
                                            <StyledTableCell align="right">
                                                {situation === "Norm" ? (
                                                    <GreenButton
                                                        variant="contained"
                                                        onClick={() => navigate("/Admin/teachers/addteacher/" + subject._id)}
                                                        sx={{ borderRadius: '8px' }}
                                                    >
                                                        Choose
                                                    </GreenButton>
                                                ) : (
                                                    <GreenButton
                                                        variant="contained"
                                                        onClick={() => updateSubjectHandler(teacherID, subject._id)}
                                                        disabled={loader}
                                                        sx={{ borderRadius: '8px' }}
                                                    >
                                                        {loader ? <CircularProgress size={24} /> : 'Assign'}
                                                    </GreenButton>
                                                )}
                                            </StyledTableCell>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </StyledPaper>
            </motion.div>
        </Container>
    );
};

const StyledPaper = styled(Paper)`
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
`;

const SubjectAvatar = styled(Avatar)`
    background: linear-gradient(135deg, #4361ee, #3a0ca3);
    width: 40px;
    height: 40px;
`;

const EmptyState = styled(Box)`
    text-align: center;
    padding: 3rem;
    background: white;
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    margin: 2rem auto;
    max-width: 400px;
`;

export default ChooseSubject;