import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getClassDetails, getClassStudents, getSubjectList } from "../../../redux/sclassRelated/sclassHandle";
import { deleteUser } from '../../../redux/userRelated/userHandle';
import {
    Box, Container, Typography, Tab, IconButton, Grid, Paper, Avatar,
    CircularProgress, Chip
} from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { resetSubjects } from "../../../redux/sclassRelated/sclassSlice";
import { BlueButton, GreenButton, PurpleButton } from "../../../components/buttonStyles";
import {
    School as SchoolIcon,
    Group as GroupIcon,
    Book as BookIcon,
    PersonAdd as PersonAddIcon,
    DeleteOutline as DeleteIcon,
    PostAdd as PostAddIcon
} from '@mui/icons-material';
import TableTemplate from "../../../components/TableTemplate";
import SpeedDialTemplate from "../../../components/SpeedDialTemplate";
import Popup from "../../../components/Popup";
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const ClassDetails = () => {
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { subjectsList, sclassStudents, sclassDetails, loading, error, response, getresponse } = useSelector((state) => state.sclass);

    const classID = params.id;

    useEffect(() => {
        dispatch(getClassDetails(classID, "Sclass"));
        dispatch(getSubjectList(classID, "ClassSubjects"));
        dispatch(getClassStudents(classID));
    }, [dispatch, classID]);

    if (error) {
        console.log(error);
    }

    const [value, setValue] = useState('1');
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const deleteHandler = (deleteID, address) => {
        setMessage("Sorry the delete function has been disabled for now.");
        setShowPopup(true);
    };
  
    const ClassOverview = () => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <StyledPaper elevation={3}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant="h4" sx={{
                            fontWeight: 700,
                            color: '#3a0ca3',
                            textAlign: 'center',
                            mb: 3
                        }}>
                            Class {sclassDetails?.sclassName}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <StatCard>
                            <IconWrapper>
                                <GroupIcon sx={{ fontSize: 40 }} />
                            </IconWrapper>
                            <Typography variant="h4" sx={{ fontWeight: 600, mt: 2 }}>
                                {sclassStudents?.length || 0}
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                Total Students
                            </Typography>
                        </StatCard>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <StatCard>
                            <IconWrapper>
                                <BookIcon sx={{ fontSize: 40 }} />
                            </IconWrapper>
                            <Typography variant="h4" sx={{ fontWeight: 600, mt: 2 }}>
                                {subjectsList?.length || 0}
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                Total Subjects
                            </Typography>
                        </StatCard>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <StatCard>
                            <IconWrapper>
                                <SchoolIcon sx={{ fontSize: 40 }} />
                            </IconWrapper>
                            <Typography variant="h4" sx={{ fontWeight: 600, mt: 2 }}>
                                {sclassDetails?.school?.schoolName  || 'N/A'}
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                School Name
                            </Typography>
                        </StatCard>
                    </Grid>
                </Grid>
            </StyledPaper>
        </motion.div>
    );

    const SubjectsSection = () => {
        const subjectColumns = [
            { id: 'name', label: 'Subject Name', minWidth: 170 },
            { id: 'code', label: 'Subject Code', minWidth: 100 },
        ];

        const subjectRows = subjectsList?.map((subject) => ({
            name: subject.subName,
            code: subject.subCode,
            id: subject._id,
        })) || [];

        const SubjectsButtonHaver = ({ row }) => (
            <ButtonGroup>
                <IconButton onClick={() => deleteHandler(row.id, "Subject")}>
                    <DeleteIcon color="error" />
                </IconButton>
                <BlueButton
                    variant="contained"
                    onClick={() => navigate(`/Admin/class/subject/${classID}/${row.id}`)}
                >
                    View
                </BlueButton>
            </ButtonGroup>
        );

        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <StyledPaper elevation={3}>
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                            Subjects
                        </Typography>
                        {response ? (
                            <GreenButton
                                variant="contained"
                                onClick={() => navigate("/Admin/addsubject/" + classID)}
                                startIcon={<PostAddIcon />}
                            >
                                Add Subjects
                            </GreenButton>
                        ) : (
                            <>
                                <TableTemplate
                                    buttonHaver={SubjectsButtonHaver}
                                    columns={subjectColumns}
                                    rows={subjectRows}
                                />
                                <SpeedDialTemplate actions={[
                                    {
                                        icon: <PostAddIcon />,
                                        name: 'Add New Subject',
                                        action: () => navigate("/Admin/addsubject/" + classID)
                                    },
                                    {
                                        icon: <DeleteIcon />,
                                        name: 'Delete All Subjects',
                                        action: () => deleteHandler(classID, "SubjectsClass")
                                    }
                                ]} />
                            </>
                        )}
                    </Box>
                </StyledPaper>
            </motion.div>
        );
    };

    const StudentsSection = () => {
        const studentColumns = [
            { id: 'name', label: 'Name', minWidth: 170 },
            { id: 'rollNum', label: 'Roll Number', minWidth: 100 },
        ];

        const studentRows = sclassStudents?.map((student) => ({
            name: student.name,
            rollNum: student.rollNum,
            id: student._id,
        })) || [];

        const StudentsButtonHaver = ({ row }) => (
            <ButtonGroup>
                <IconButton onClick={() => deleteHandler(row.id, "Student")}>
                    <DeleteIcon color="error" />
                </IconButton>
                <BlueButton
                    variant="contained"
                    onClick={() => navigate("/Admin/students/student/" + row.id)}
                >
                    View
                </BlueButton>
                <PurpleButton
                    variant="contained"
                    onClick={() => navigate("/Admin/students/student/attendance/" + row.id)}
                >
                    Attendance
                </PurpleButton>
            </ButtonGroup>
        );

        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <StyledPaper elevation={3}>
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                            Students
                        </Typography>
                        {getresponse ? (
                            <GreenButton
                                variant="contained"
                                onClick={() => navigate("/Admin/class/addstudents/" + classID)}
                                startIcon={<PersonAddIcon />}
                            >
                                Add Students
                            </GreenButton>
                        ) : (
                            <>
                                <TableTemplate
                                    buttonHaver={StudentsButtonHaver}
                                    columns={studentColumns}
                                    rows={studentRows}
                                />
                                <SpeedDialTemplate actions={[
                                    {
                                        icon: <PersonAddIcon />,
                                        name: 'Add New Student',
                                        action: () => navigate("/Admin/class/addstudents/" + classID)
                                    },
                                    {
                                        icon: <DeleteIcon />,
                                        name: 'Delete All Students',
                                        action: () => deleteHandler(classID, "StudentsClass")
                                    }
                                ]} />
                            </>
                        )}
                    </Box>
                </StyledPaper>
            </motion.div>
        );
    };

    return (
        <StyledContainer>
            {loading ? (
                <LoaderWrapper>
                    <CircularProgress />
                </LoaderWrapper>
            ) : (
                <Box sx={{ width: '100%' }}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider', position: 'sticky', top: 0, zIndex: 1, bgcolor: 'background.paper' }}>
                            <TabList onChange={handleChange} variant="fullWidth">
                                <StyledTab label="Overview" value="1" />
                                <StyledTab label="Subjects" value="2" />
                                <StyledTab label="Students" value="3" />
                            </TabList>
                        </Box>
                        <Box sx={{ mt: 3 }}>
                            <TabPanel value="1">
                                <ClassOverview />
                            </TabPanel>
                            <TabPanel value="2">
                                <SubjectsSection />
                            </TabPanel>
                            <TabPanel value="3">
                                <StudentsSection />
                            </TabPanel>
                        </Box>
                    </TabContext>
                </Box>
            )}
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </StyledContainer>
    );
};

export default ClassDetails;

const StyledContainer = styled(Container)`
    padding-top: 2rem;
    padding-bottom: 2rem;
`;

const StyledPaper = styled(Paper)`
    padding: 2rem;
    border-radius: 16px;
    background: white;
    border: 1px solid rgba(241, 242, 244, 0.5);
    transition: all 0.3s ease;

    &:hover {
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    }
`;

const StatCard = styled(Box)`
    text-align: center;
    padding: 2rem;
    border-radius: 16px;
    background: linear-gradient(135deg, rgba(67, 97, 238, 0.05), rgba(58, 12, 163, 0.05));
    transition: transform 0.3s ease;

    &:hover {
        transform: translateY(-5px);
    }
`;

const IconWrapper = styled.div`
    width: 64px;
    height: 64px;
    border-radius: 16px;
    background: linear-gradient(135deg, rgba(67, 97, 238, 0.1), rgba(58, 12, 163, 0.1));
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;

    svg {
        color: #4361ee;
    }
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 0.5rem;
    align-items: center;
`;

const StyledTab = styled(Tab)`
    font-weight: 600;
    text-transform: none;
    
    &.Mui-selected {
        color: #4361ee;
    }
`;

const LoaderWrapper = styled(Box)`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 300px;
`;