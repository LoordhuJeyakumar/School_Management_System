import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    Container, Grid, Card, CardContent, Typography, IconButton,
    Box, Button, CircularProgress
} from '@mui/material';
import {
    School as SchoolIcon,
    Group as GroupIcon,
    MenuBook as SubjectsIcon,
    Add as AddIcon,
    ArrowForward as ArrowIcon
} from '@mui/icons-material';
import { getAllSclasses } from '../../../redux/sclassRelated/sclassHandle';
import { BlueButton, GreenButton, LightPurpleButton } from '../../../components/buttonStyles';
import TableTemplate from '../../../components/TableTemplate';

import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import PostAddIcon from '@mui/icons-material/PostAdd';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import AddCardIcon from '@mui/icons-material/AddCard';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const ShowClasses = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const { sclassesList, loading, error, getresponse } = useSelector((state) => state.sclass);
  const { currentUser } = useSelector(state => state.user)

  const adminID = currentUser._id

  useEffect(() => {
    dispatch(getAllSclasses(adminID, "Sclass"));
  }, [adminID, dispatch]);

  if (error) {
    console.log(error)
  }

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const deleteHandler = (deleteID, address) => {
    console.log(deleteID);
    console.log(address);
    setMessage("Sorry the delete function has been disabled for now.")
    setShowPopup(true)
    // dispatch(deleteUser(deleteID, address))
    //   .then(() => {
    //     dispatch(getAllSclasses(adminID, "Sclass"));
    //   })
  }

  const sclassColumns = [
    { id: 'name', label: 'Class Name', minWidth: 170 },
  ]

  const sclassRows = sclassesList && sclassesList.length > 0 && sclassesList.map((sclass) => {
    return {
      name: sclass.sclassName,
      id: sclass._id,
    };
  })

  const SclassButtonHaver = ({ row }) => {
    const actions = [
      { icon: <PostAddIcon />, name: 'Add Subjects', action: () => navigate("/Admin/addsubject/" + row.id) },
      { icon: <PersonAddAlt1Icon />, name: 'Add Student', action: () => navigate("/Admin/class/addstudents/" + row.id) },
    ];
  }
    return (
        <StyledContainer>
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Typography variant="h4" component="h2" sx={{
                        fontWeight: 700,
                        background: 'linear-gradient(45deg, #4361ee, #3a0ca3)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        Classes
                    </Typography>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <LightPurpleButton
                        variant="contained"
                        onClick={() => navigate("/Admin/addclass")}
                        startIcon={<AddIcon />}
                    >
                        Add Class
                    </LightPurpleButton>
                </motion.div>
            </Box>

            {loading ? (
                <LoaderWrapper>
                    <CircularProgress size={40} />
                </LoaderWrapper>
            ) : (
                <Grid container spacing={3}>
                    <AnimatePresence>
                        {sclassesList?.map((sclass, index) => (
                            <Grid item xs={12} sm={6} md={4} key={sclass._id}>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <StyledCard>
                                        <CardContent>
                                            <IconWrapper>
                                                <SchoolIcon sx={{ fontSize: 40 }} />
                                            </IconWrapper>
                                            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                                                Class {sclass.sclassName}
                                            </Typography>
                                            <Grid container spacing={2} sx={{ mb: 2 }}>
                                                <Grid item xs={6}>
                                                    <StatsBox>
                                                        <GroupIcon sx={{ color: '#4361ee', mb: 1 }} />
                                                        <Typography variant="body2" color="text.secondary">
                                                            Students
                                                        </Typography>
                                                        <Typography variant="h6">
                                                            {sclass.numbStudents || 0}
                                                        </Typography>
                                                    </StatsBox>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <StatsBox>
                                                        <SubjectsIcon sx={{ color: '#2a9d8f', mb: 1 }} />
                                                        <Typography variant="body2" color="text.secondary">
                                                            Subjects
                                                        </Typography>
                                                        <Typography variant="h6">
                                                            {sclass?.subjects?.length || 0}
                                                        </Typography>
                                                    </StatsBox>
                                                </Grid>
                                            </Grid>
                                            <Button
                                                fullWidth
                                                variant="outlined"
                                                onClick={() => navigate(`/Admin/classes/class/${sclass._id}`)}
                                                endIcon={<ArrowIcon />}
                                                sx={{
                                                    mt: 2,
                                                    borderRadius: '12px',
                                                    borderWidth: '2px',
                                                    '&:hover': { borderWidth: '2px' }
                                                }}
                                            >
                                                View Details
                                            </Button>
                                        </CardContent>
                                    </StyledCard>
                                </motion.div>
                            </Grid>
                        ))}
                    </AnimatePresence>
                </Grid>
            )}

            {!loading && sclassesList?.length === 0 && (
                <EmptyStateWrapper>
                    <SchoolIcon sx={{ fontSize: 60, color: '#94a3b8', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary">
                        No classes found
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        Add your first class to get started
                    </Typography>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                            variant="outlined"
                            onClick={() => navigate("/Admin/addclass")}
                            startIcon={<AddIcon />}
                            sx={{
                                borderRadius: '12px',
                                borderWidth: '2px',
                                '&:hover': { borderWidth: '2px' }
                            }}
                        >
                            Add Class
                        </Button>
                    </motion.div>
                </EmptyStateWrapper>
            )}
        </StyledContainer>
    );
};

export default ShowClasses;

const StyledContainer = styled(Container)`
    padding-top: 2rem;
    padding-bottom: 2rem;
`;

const StyledCard = styled(Card)`
    height: 100%;
    border-radius: 16px;
    background: white;
    border: 1px solid rgba(241, 242, 244, 0.5);
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
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
    margin-bottom: 1rem;

    svg {
        color: #4361ee;
    }
`;

const StatsBox = styled.div`
    padding: 1rem;
    border-radius: 12px;
    background: linear-gradient(135deg, rgba(67, 97, 238, 0.05), rgba(58, 12, 163, 0.05));
    text-align: center;
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-2px);
    }
`;

const LoaderWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 300px;
`;

const EmptyStateWrapper = styled.div`
    text-align: center;
    padding: 4rem 2rem;
    background: white;
    border-radius: 16px;
    border: 1px solid rgba(241, 242, 244, 0.5);
`;