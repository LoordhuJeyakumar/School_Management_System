import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Paper, Box, Checkbox, Typography, CircularProgress,
  Container, Card, CardContent, useTheme
} from '@mui/material';
import { getAllComplains } from '../../../redux/complainRelated/complainHandle';
import TableTemplate from '../../../components/TableTemplate';

const SeeComplains = () => {
  const theme = useTheme();
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const dispatch = useDispatch();
  const { complainsList, loading, error, response } = useSelector((state) => state.complain);
  const { currentUser } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(getAllComplains(currentUser._id, "Complain"));
  }, [currentUser._id, dispatch]);

  if (error) {
    console.log(error);
  }

  const complainColumns = [
    { id: 'user', label: 'User', minWidth: 170 },
    { id: 'complaint', label: 'Complaint', minWidth: 100 },
    { id: 'date', label: 'Date', minWidth: 170 },
  ];

  const complainRows = complainsList && complainsList.length > 0 && complainsList.map((complain) => {
    const date = new Date(complain.date);
    const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
    return {
      user: complain.user.name,
      complaint: complain.complaint,
      date: dateString,
      id: complain._id,
    };
  });

  const ComplainButtonHaver = ({ row }) => {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Checkbox {...label} sx={{
          '&.Mui-checked': {
            color: theme.palette.primary.main,
          }
        }} />
      </Box>
    );
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Card elevation={3}>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom sx={{ 
            color: theme.palette.primary.main,
            fontWeight: 600,
            mb: 3
          }}>
            Student Complaints
          </Typography>
          
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              {response ? (
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center',
                  minHeight: '200px',
                  backgroundColor: theme.palette.grey[50],
                  borderRadius: 1
                }}>
                  <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
                    No Complaints Available
                  </Typography>
                </Box>
              ) : (
                <Paper sx={{ 
                  width: '100%', 
                  overflow: 'hidden',
                  boxShadow: 'none',
                  backgroundColor: theme.palette.background.paper,
                  borderRadius: 2
                }}>
                  {Array.isArray(complainsList) && complainsList.length > 0 && (
                    <TableTemplate 
                      buttonHaver={ComplainButtonHaver} 
                      columns={complainColumns} 
                      rows={complainRows}
                    />
                  )}
                </Paper>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default SeeComplains;