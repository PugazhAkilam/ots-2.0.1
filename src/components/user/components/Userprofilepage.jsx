import React from 'react';
import { Avatar, Container, Typography, Grid, Card, CardContent, Button, Box } from '@mui/material';
import PaymentIcon from '@mui/icons-material/Payment';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import { HomeOutlined, LocationOnOutlined } from '@mui/icons-material';
import UserNavbar from './UserNavbar';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { useTheme } from '../../../theme/ThemeContext';
import { useProfile } from '../../../hooks/useProfile';

function UserProfile() {
  const { isDarkMode, toggleTheme } = useTheme();
  const { user, handleCardClick, handleLogout } = useProfile();

  if (!user) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <> 
      <UserNavbar />
      <Container>
        <Grid container spacing={3} alignItems="center" justifyContent="center" style={{ marginTop: 20 }}>
          <Grid item xs={12} sm={4}>
            <Avatar 
              alt="" 
              src="https://img.freepik.com/premium-vector/student-avatar-illustration-user-profile-icon-youth-avatar_118339-4406.jpg?w=360" 
              style={{ width: 100, height: 100, margin: '0 auto' }} 
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, marginBottom: "5px" }}>
              <Typography variant="h5">{user.user_Name}</Typography>
              <DarkModeSwitch
                checked={isDarkMode}
                onChange={toggleTheme}
                size={30}
                sunColor="orange"
                moonColor="#42a5f5"
              />
            </Box>
            <Typography variant="body1">{user.alternativephoneNumber}</Typography>
            <Typography variant="body1">
              <PhoneIcon sx={{ mr: 1, color: "rgba(17, 125, 247, 0.8)" }} /> 
              Phone Number: <span style={{fontWeight:"bold"}}>{user.mobile_Number}</span>
            </Typography>
            <Typography variant="body1">
              <EmailIcon sx={{ mr: 1, color: "rgba(17, 125, 247, 0.8)" }} /> 
              Email:<span style={{fontWeight:"bold"}}>{user.email_ID}</span>
            </Typography>
          </Grid>
        </Grid>

        <Typography variant="h6" style={{ marginTop: 40 }}>
          My Activity
        </Typography>

        <Grid container spacing={3} style={{ marginTop: 20 }}>
          <Grid item xs={6} sm={6} md={3} lg={3}>
            <Card 
              onClick={() => handleCardClick('/user')} 
              style={{ cursor: 'pointer', backgroundColor: isDarkMode ? "rgb(36, 36, 36)" : "rgba(220, 239, 255, 1)" }}
            >
              <CardContent style={{ textAlign: 'center' }}>
                <HomeOutlined style={{ fontSize: 50, color:"orange" }} />
                <Typography variant="h6">Home</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} sm={6} md={3} lg={3}>
            <Card 
              onClick={() => handleCardClick('/useraddress')}  
              style={{ cursor: 'pointer', backgroundColor: isDarkMode ? "rgb(36, 36, 36)" : "rgba(220, 239, 255, 1)" }}
            >
              <CardContent style={{ textAlign: 'center' }}>
                <LocationOnOutlined style={{ fontSize: 50, color:"orange" }} />
                <Typography variant="h6">Address</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} sm={6} md={3} lg={3}>
            <Card 
              onClick={() => handleCardClick('/history')}  
              style={{ cursor: 'pointer', backgroundColor: isDarkMode ? "rgb(36, 36, 36)" : "rgba(220, 239, 255, 1)" }}
            >
              <CardContent style={{ textAlign: 'center' }}>
                <PaymentIcon style={{ fontSize: 50, color:"orange" }} />
                <Typography variant="h6">Orders</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} sm={6} md={3} lg={3}>
            <Card 
              onClick={() => handleCardClick('/wishlist')}  
              style={{ cursor: 'pointer', backgroundColor: isDarkMode ? "rgb(36, 36, 36)" : "rgba(220, 239, 255, 1)" }}
            >
              <CardContent style={{ textAlign: 'center' }}>
                <FavoriteIcon style={{ fontSize: 50, color:"orange" }} />
                <Typography variant="h6">Favorites</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} sm={6} md={3} lg={3}>
            <Card 
              onClick={() => handleCardClick('/cart-category')}  
              style={{ cursor: 'pointer', backgroundColor: isDarkMode ? "rgb(36, 36, 36)" : "rgba(220, 239, 255, 1)" }}
            >
              <CardContent style={{ textAlign: 'center' }}>
                <ShoppingCartIcon style={{ fontSize: 50, color:"orange" }} />
                <Typography variant="h6">My Cart</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container justifyContent="center" style={{ marginTop: 40 }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleLogout}
            startIcon={<ExitToAppIcon />}
            style={{ marginBottom: 20, backgroundColor:"red" }}
          >
            Logout
          </Button>
        </Grid>
      </Container>
    </>
  );
}

export default UserProfile;
