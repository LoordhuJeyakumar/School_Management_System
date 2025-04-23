import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSubjectList } from '../../redux/sclassRelated/sclassHandle';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import {
    Container, Grid, Paper, Typography, Box,
    CircularProgress, ToggleButtonGroup, ToggleButton,
    Table, TableBody, TableHead, Stack, Chip
} from '@mui/material';
import {
    MenuBook as SubjectIcon,
    Assignment as AssignmentIcon,
    BarChart as ChartIcon,
    TableChart as TableIcon,
    Grade as GradeIcon
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import styled from '@emotion/styled';
import CustomBarChart from '../../components/CustomBarChart';

const StudentSubjects = () => {
    const dispatch = useDispatch();
    const { subjectsList } = useSelector((state) => state.sclass);
    const { userDetails, currentUser, loading } = useSelector((state) => state.user);

    const [subjectMarks, setSubjectMarks] = useState([]);
    const [selectedSection, setSelectedSection] = useState('chart');

    useEffect(() => {
        dispatch(getUserDetails(currentUser._id, "Student"));
    }, [dispatch, currentUser._id]);

    useEffect(() => {
        if (userDetails) {
            setSubjectMarks(userDetails.examResult || []);
        }
    }, [userDetails]);

    useEffect(() => {
        if (currentUser.sclassName?._id) {
            dispatch(getSubjectList(currentUser.sclassName._id, "ClassSubjects"));
        }
    }, [currentUser.sclassName?._id, dispatch]);

    if (loading) {
        return (
            <LoaderWrapper>
                <CircularProgress />
            </LoaderWrapper>
        );
    }

    const chartData = subjectMarks.map(mark => ({
        subject: mark.subName.subName,
        marks: mark.marksObtained
    }));

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
                                Your Subjects
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                View your subjects and academic performance
                            </Typography>
                        </motion.div>
                    </HeaderCard>
                </Grid>

                <Grid item xs={12} md={4}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <StatsCard elevation={1}>
                            <Stack spacing={3}>
                                <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
                                    Enrolled Subjects
                                </Typography>
                                {subjectsList?.length > 0 ? (
                                    subjectsList.map((subject, index) => (
                                        <SubjectItem key={subject._id}>
                                            <IconWrapper>
                                                <SubjectIcon />
                                            </IconWrapper>
                                            <Box>
                                                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                                                    {subject.subName}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Code: {subject.subCode}
                                                </Typography>
                                            </Box>
                                        </SubjectItem>
                                    ))
                                ) : (
                                    <Typography color="text.secondary" align="center">
                                        No subjects found
                                    </Typography>
                                )}
                            </Stack>
                        </StatsCard>
                    </motion.div>
                </Grid>

                <Grid item xs={12} md={8}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <DetailCard elevation={1}>
                            <Stack 
                                direction="row" 
                                justifyContent="space-between" 
                                alignItems="center"
                                sx={{ mb: 3 }}
                            >
                                <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
                                    Academic Performance
                                </Typography>
                                <ToggleButtonGroup
                                    value={selectedSection}
                                    exclusive
                                    onChange={(e, newValue) => newValue && setSelectedSection(newValue)}
                                    size="small"
                                >
                                    <ToggleButton value="chart">
                                        <ChartIcon />
                                    </ToggleButton>
                                    <ToggleButton value="table">
                                        <TableIcon />
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </Stack>

                            <AnimatePresence mode="wait">
                                {selectedSection === 'chart' ? (
                                    <motion.div
                                        key="chart"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Box sx={{ height: 300 }}>
                                            <CustomBarChart 
                                                chartData={chartData} 
                                                dataKey="marks" 
                                            />
                                        </Box>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="table"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Table>
                                            <TableHead>
                                                <StyledTableRow>
                                                    <StyledTableCell>Subject</StyledTableCell>
                                                    <StyledTableCell align="center">Marks</StyledTableCell>
                                                    <StyledTableCell align="center">Status</StyledTableCell>
                                                </StyledTableRow>
                                            </TableHead>
                                            <TableBody>
                                                {subjectMarks.map((mark) => (
                                                    <StyledTableRow key={mark.subName._id}>
                                                        <StyledTableCell>
                                                            <Stack direction="row" spacing={2} alignItems="center">
                                                                <GradeIcon color="primary" />
                                                                {mark.subName.subName}
                                                            </Stack>
                                                        </StyledTableCell>
                                                        <StyledTableCell align="center">
                                                            {mark.marksObtained}
                                                        </StyledTableCell>
                                                        <StyledTableCell align="center">
                                                            <StatusChip status={mark.marksObtained >= 40 ? 'pass' : 'fail'} />
                                                        </StyledTableCell>
                                                    </StyledTableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </DetailCard>
                    </motion.div>
                </Grid>
            </Grid>
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

const StatsCard = styled(Paper)`
    padding: 1.5rem;
    border-radius: 16px;
    height: 100%;
    background: white;
`;

const DetailCard = styled(Paper)`
    padding: 1.5rem;
    border-radius: 16px;
    min-height: 400px;
    background: white;
`;

const SubjectItem = styled(Box)`
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    border-radius: 8px;
    background: ${({ theme }) => theme.palette.background.default};
    transition: transform 0.2s ease;

    &:hover {
        transform: translateX(5px);
    }
`;

const IconWrapper = styled(Box)`
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background: linear-gradient(135deg, #4361ee08, #3a0ca308);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #4361ee;
`;

const StyledTableRow = styled.tr`
    &:nth-of-type(odd) {
        background-color: ${({ theme }) => theme.palette.action.hover};
    }
`;

const StyledTableCell = styled.td`
    padding: 1rem;
`;

const StatusChip = ({ status }) => (
    <Chip
        label={status === 'pass' ? 'Passed' : 'Failed'}
        sx={{
            bgcolor: status === 'pass' ? 'success.lighter' : 'error.lighter',
            color: status === 'pass' ? 'success.dark' : 'error.dark',
            fontWeight: 600
        }}
    />
);

export default StudentSubjects;