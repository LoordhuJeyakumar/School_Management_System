import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    Container, Grid, Paper, Typography, Box,
    ButtonGroup, Popper, ClickAwayListener, MenuList,
    Stack, Chip, CircularProgress, MenuItem, Grow,
    Divider
} from '@mui/material';
import {
    ArrowDropDown as ArrowDropDownIcon,
    People as StudentsIcon,
    Class as ClassIcon,
    MenuBook as SubjectIcon,
    Warning as WarningIcon,
    KeyboardArrowUp,
    KeyboardArrowDown
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import styled from '@emotion/styled';
import { BlackButton, BlueButton, GreenButton } from '../../components/buttonStyles';
import TableTemplate from '../../components/TableTemplate';
import { getClassStudents } from '../../redux/sclassRelated/sclassHandle';


const StudentActions = ({ row, subjectId }) => {
    const [open, setOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const anchorRef = useRef(null);
    const navigate = useNavigate();
    const options = ['Take Attendance', 'Provide Marks'];
  
    const handleAction = () => {
      const path =
        selectedIndex === 0
          ? `/Teacher/class/student/attendance/${row.id}/${subjectId}`
          : `/Teacher/class/student/marks/${row.id}/${subjectId}`;
      navigate(path);
    };
  
    const handleMenuItemClick = (event, index) => {
      setSelectedIndex(index);
      setOpen(false);
    };
  
    const handleToggle = () => setOpen((prev) => !prev);
    const handleClose = (event) => {
      if (anchorRef.current && anchorRef.current.contains(event.target)) return;
      setOpen(false);
    };
  
    return (
      <ButtonGroup variant="contained" ref={anchorRef}>
        <BlueButton onClick={handleAction}>{options[selectedIndex]}</BlueButton>
        <BlackButton size="small" onClick={handleToggle}>
          {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
        </BlackButton>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          disablePortal
          transition
          modifiers={[{ name: 'offset', options: { offset: [0, 8] } }]}
          style={{ zIndex: 1300 }}
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem>
                    {options.map((option, index) => (
                      <MenuItem
                        key={option}
                        selected={index === selectedIndex}
                        onClick={(e) => handleMenuItemClick(e, index)}
                      >
                        {option}
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </ButtonGroup>
    );
  };
  

const TeacherClassDetails = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { currentUser } = useSelector(state => state.user);
    const { sclassStudents, loading, error, getresponse } = useSelector((state) => state.sclass);

    const classID = currentUser.teachSclass?._id;
    const subjectID = currentUser.teachSubject?._id;

    useEffect(() => {
        if (classID) {
            dispatch(getClassStudents(classID));
        }
    }, [dispatch, classID]);

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [open, setOpen] = useState(false);
    const anchorRef = React.useRef(null);
    const options = ['Take Attendance', 'Provide Marks'];

    const handleClick = (row) => {
        if (!subjectID) {
            console.error("No subject assigned");
            return;
        }
        
        if (options[selectedIndex] === 'Take Attendance') {
            navigate(`/Teacher/class/student/attendance/${row.id}/${subjectID}`);
        } else if (options[selectedIndex] === 'Provide Marks') {
            navigate(`/Teacher/class/student/marks/${row.id}/${subjectID}`);
        }
    };

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const studentColumns = [
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'rollNum', label: 'Roll Number', minWidth: 100 }
    ];

    const studentRows = sclassStudents?.map((student) => ({
        name: student.name,
        rollNum: student.rollNum,
        id: student._id
    })) || [];

    const StudentsButtonHaver = ({ row }) => {
        return (
            <Stack direction="row" spacing={1}>
                <BlueButton
                    variant="contained"
                    onClick={() => navigate("/Teacher/class/student/" + row.id)}
                >
                    View Details
                </BlueButton>
                <ButtonGroup variant="contained" ref={anchorRef}>
                    <GreenButton onClick={() => handleClick(row)}>
                        {options[selectedIndex]}
                    </GreenButton>
                    <GreenButton
                        size="small"
                        onClick={handleToggle}
                    >
                        <ArrowDropDownIcon />
                    </GreenButton>
                </ButtonGroup>
                <Popper
                    sx={{ zIndex: 1 }}
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    transition
                    disablePortal
                >
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{
                                transformOrigin:
                                    placement === 'bottom' ? 'center top' : 'center bottom',
                            }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList id="split-button-menu" autoFocusItem>
                                        {options.map((option, index) => (
                                            <MenuItem
                                                key={option}
                                                selected={index === selectedIndex}
                                                onClick={(event) => handleMenuItemClick(event, index)}
                                            >
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </Stack>
        );
    };

    if (loading) {
        return (
            <LoaderWrapper>
                <CircularProgress />
            </LoaderWrapper>
        );
    }

    if (error) {
        return (
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <WarningIcon color="error" sx={{ fontSize: 60, mb: 2 }} />
                    <Typography variant="h6" color="error" gutterBottom>
                        Error loading class details
                    </Typography>
                    <Typography color="textSecondary">{error}</Typography>
                </Paper>
            </Container>
        );
    }

    if (!classID) {
        return (
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <WarningIcon color="warning" sx={{ fontSize: 60, mb: 2 }} />
                    <Typography variant="h6" gutterBottom>
                        No Class Assigned
                    </Typography>
                    <Typography color="textSecondary">
                        You have not been assigned to any class yet.
                    </Typography>
                </Paper>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <HeaderCard elevation={2}>
                            <Stack direction="row" alignItems="center" spacing={2}>
                                <Box sx={{ p: 2, bgcolor: 'primary.lighter', borderRadius: 2 }}>
                                    <ClassIcon sx={{ fontSize: 40, color: 'primary.main' }} />
                                </Box>
                                <Box>
                                    <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                                        Class {currentUser.teachSclass?.sclassName}
                                    </Typography>
                                    <Stack direction="row" spacing={2}>
                                        <Chip
                                            icon={<StudentsIcon />}
                                            label={`${sclassStudents?.length || 0} Students`}
                                            sx={{ bgcolor: 'primary.lighter', color: 'primary.main' }}
                                        />
                                        <Chip
                                            icon={<SubjectIcon />}
                                            label={currentUser.teachSubject?.subName || 'No Subject Assigned'}
                                            sx={{ bgcolor: 'success.lighter', color: 'success.main' }}
                                        />
                                    </Stack>
                                </Box>
                            </Stack>
                        </HeaderCard>
                    </Grid>

                    <Grid item xs={12}>
                        <StyledPaper elevation={2}>
                            <Box sx={{ mb: 3 }}>
                                <Typography variant="h5" sx={{ fontWeight: 600, color: 'primary.main', mb: 2 }}>
                                    Student Directory
                                </Typography>
                                <Divider />
                            </Box>

                            {sclassStudents?.length === 0 ? (
                                <Typography variant="h6" sx={{ textAlign: 'center', py: 3, color: 'text.secondary' }}>
                                    No Students Found
                                </Typography>
                            ) : (
                                <AnimatePresence>
                                    <TableTemplate 
                                        buttonHaver={({ row }) => (
                                            <StudentActions row={row} subjectId={subjectID} />
                                          )}
                                          columns={studentColumns}
                                          rows={studentRows}
                                    />
                                </AnimatePresence>
                            )}
                        </StyledPaper>
                    </Grid>
                </Grid>
            </motion.div>
        </Container>
    );
};

const LoaderWrapper = styled(Box)`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 400px;
`;

const HeaderCard = styled(Paper)`
    padding: 2rem;
    border-radius: 16px;
    background: white;
`;

const StyledPaper = styled(Paper)`
    padding: 1.5rem;
    border-radius: 16px;
    background: white;
`;

export default TeacherClassDetails;