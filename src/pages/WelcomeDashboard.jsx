
import React, { useEffect, useState } from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { FaShoppingCart, FaBox, FaUsers, FaCog, FaChartLine } from 'react-icons/fa';
//import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
//import { useBooking } from '../../hooks/useBooking';
import CountUp from 'react-countup';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Card component inside the same file
const StatCard = ({ icon, title, value }) => (
  <Paper elevation={3} sx={{ p: 2, borderRadius: 2, display: 'flex', alignItems: 'center' }}>
    <Box sx={{ mr: 2, fontSize: 30, color: 'primary.main' }}>{icon}</Box>
    <Box>
      <Typography variant="subtitle2" fontWeight={600}>
        {title}
      </Typography>
      <Typography variant="h6" fontWeight={700}>
        <CountUp 
          end={value} 
          duration={2} 
          separator="," 
          enableScrollSpy={true}
          scrollSpyOnce={true}
        />
      </Typography>
    </Box>
  </Paper>
);

const WelcomeDashboard = () => {
  // const { user, loading: authLoading, error: authError } = useAuth();
  // const { chartData, loading: bookingLoading, error: bookingError } = useBooking();

  // if (authLoading || bookingLoading) {
  //   return <Box sx={{ p: 4 }}>Loading...</Box>;
  // }

  // if (authError || bookingError) {
  //   return <Box sx={{ p: 4, color: 'error.main' }}>Error: {authError || bookingError}</Box>;
  // }

  // if (!user) {
  //   return <Navigate to="/" />;
  // }

  return (
    // <Box sx={{ flexGrow: 1, p: 4 }}>
    //   <Typography variant="h4" sx={{ mb: 3 }}>
    //     Welcome, ...!
    //   </Typography>

    //   {/* Cards Section */}
    //   <Grid container spacing={2} sx={{ mb: 3, justifyContent: 'center' }}>
    //     {chartData.stats.map((item, idx) => (
    //       <Grid item key={idx} xs={12} sm={6} md={2.4}   lg={2.4} xl={2.4} sx={{ display: 'flex', justifyContent: 'center' }}>
    //         <Box sx={{ width: '100%', maxWidth: 300 }}>
    //           <StatCard 
    //             icon={
    //               item.icon === 'dashboard' ? <FaChartLine /> :
    //               item.icon === 'shopping' ? <FaShoppingCart /> :
    //               item.icon === 'box' ? <FaBox /> :
    //               item.icon === 'users' ? <FaUsers /> :
    //               item.icon === 'cog' ? <FaCog /> :
    //               <FaCog />
    //             } 
    //             title={item.title} 
    //             value={item.value} 
    //           />
    //         </Box>
    //       </Grid>
    //     ))}
    //   </Grid>

    //   {/* Charts Section */}
    //   <Grid container spacing={2}>
    //     <Grid item xs={12} md={6}>
    //       <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
    //         <Typography variant="subtitle1" fontWeight={600} gutterBottom>
    //           Daily Bookings
    //         </Typography>
    //         <Line data={chartData.line} />
    //       </Paper>
    //     </Grid>
    //     <Grid item xs={12} md={6}>
    //       <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
    //         <Typography variant="subtitle1" fontWeight={600} gutterBottom>
    //           Booking Types Distribution
    //         </Typography>
    //         <Bar data={chartData.bar} />
    //       </Paper>
    //     </Grid>
    //   </Grid>
    // </Box>
    <>hi</>
  );
};

export default WelcomeDashboard;



