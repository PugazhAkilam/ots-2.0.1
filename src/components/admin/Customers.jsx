import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Alert, 
  Container, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid
} from '@mui/material';
import API_URL from '../../config';

const CustomerTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: '', phoneNumber: '', email: '',alternativePhoneNumber:'',country: 'India', 
    area: 'Annamalai Nagar', state: 'tamilnadu', city: 'Trichy', street: 'Kumudham Salai', floorDoorNumber: '1 floor', door: 'NO 12', pincode: '620018', landmark: '620018',location:{latitude: '10.8278097', longitude: '78.6844134' }
  });

  // Fetch users from API
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/api/customer`);
      setUsers(response.data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle dialog open/close
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Handle input change
  const handleChange = (e) => {
    setNewCustomer({ ...newCustomer, [e.target.name]: e.target.value });
  };

  // Submit new customer
  const handleSubmit = async () => {
    try {
      await axios.post(`${API_URL}/api/users`, newCustomer);
      fetchUsers(); // Refresh customer list
      handleClose();
    } catch (err) {
      console.error('Error adding customer:', err);
    }
  };

  if (loading) return <CircularProgress />;
  return (
    <Container style={{ padding: "30px" }}>
      <Typography variant="h6">Customer Details</Typography>
      <Button variant="contained" color="primary" onClick={handleOpen} sx={{ marginBottom: 2 }}>
        Add Customer
      </Button>

      {/* Add Customer Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Customer</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{mt:1}}>
            {["name", "phoneNumber", "email", "alternativePhoneNumber" ].map((field) => (
              <Grid item xs={12} sm={6} key={field}>
                <TextField 
                  label={field.charAt(0).toUpperCase() + field.slice(1)} 
                  fullWidth name={field} value={newCustomer[field]} 
                  onChange={handleChange} 
                />
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Cancel</Button>
          <Button onClick={handleSubmit} color="primary">Submit</Button>
        </DialogActions>
      </Dialog>

      {/* Customer Table */}
      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        <Table sx={{ minWidth: 650, }} aria-label="user table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>User ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Username</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Phone</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Alternative Mobile</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{user.user_Name}</TableCell>
                <TableCell>{user.email_ID}</TableCell>
                <TableCell>{user.mobile_Number}</TableCell>
                <TableCell>{user.alter_Mobile_number}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default CustomerTable;
