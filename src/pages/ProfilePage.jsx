import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid,
  IconButton,
  Button,
  Divider
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
// import { useAuth } from '../context/AuthContext';

const ProfilePage = () => { 
  // const { user,loading } = useAuth();
  // if (loading) {
  //   return <div>Loading...</div>;
  // }
  return (
    <Box p={3} sx={{ minHeight: '100vh' }}>
      {/* Profile Header */}
      {/* <Card sx={{ mb: 3, display: 'flex', alignItems: 'center', p: 2,justifyContent:"center" }}>
        <Avatar
          alt="Ajinkya Rahane"
          src="https://www.livemint.com/lm-img/img/2025/03/15/original/Ajinkya_Rahane__1742033134449.jpg"
          sx={{ width: 72, height: 72, mr: 2 }}
        />
        <Box>
          <Typography variant="h6">{user && user.name}</Typography>
          <Typography color="text.secondary">{user.userType===2?"admin":"Employee"}</Typography>
          <Typography color="text.secondary">Chennai</Typography>
        </Box>
      </Card> */}<Card
  sx={{
    mb: 3,
    p: 2,
    maxWidth: 400,
    mx: 'auto', // center horizontally
    borderRadius:"10px",
  }}
>
  <Grid container alignItems="center" spacing={2}>
    <Grid item xs={12} sm={4}>
      <Avatar
        alt="User Avatar"
        src="https://img.freepik.com/free-photo/view-3d-businessman_23-2150709828.jpg?w=740&t=st=1729161369~exp=1729161969~hmac=47188f3a919bafde6b37e2292c1a1d206ac7da4f836f439c994844022c519be5"
        sx={{ width: 150, height: 150, mx: 'auto' }}
      />
    </Grid>
    <Grid item xs={12} sm={8}>
  <Typography variant="h5" textAlign="center">
    {/* {user.name} */}
  </Typography>
  <Typography color="text.secondary" textAlign="center">
    {/* {user.userType === 2 ? "Admin" : "Employee"} */}
  </Typography>
  <Typography color="text.secondary" textAlign="center">
    Chennai
  </Typography>
</Grid>

  </Grid>
</Card>

      {/* Personal Information */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">Personal Information</Typography>
            <IconButton color="warning">
              <EditIcon />
            </IconButton>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Typography variant="body2" color="text.secondary">First Name</Typography>
              {/* <Typography>{user && user.name}</Typography> */}
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="body2" color="text.secondary">Last Name</Typography>
              <Typography>-</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="body2" color="text.secondary">Date of Birth</Typography>
              <Typography>12-10-1990</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="body2" color="text.secondary">Email Address</Typography>
              {/* <Typography>{user && user.email}</Typography> */}
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="body2" color="text.secondary">Phone Number</Typography>
              <Typography>(+91) 97861 72510</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="body2" color="text.secondary">User Role</Typography>
              {/* <Typography>{user.userType===2?"admin":"Employee"}</Typography> */}
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Address Information */}
      <Card>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">Address</Typography>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Typography variant="body2" color="text.secondary">Country</Typography>
              <Typography>India</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="body2" color="text.secondary">City</Typography>
              <Typography>Chennai</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="body2" color="text.secondary">Postal Code</Typography>
              <Typography>ERT 1254</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProfilePage;
