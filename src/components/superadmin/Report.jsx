import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Tabs,
  Tab,
  Box,
  Grid,
} from '@mui/material';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  LineElement,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const ReportsAnalytics = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const handleTabChange = (_, newValue) => setTabIndex(newValue);

  // Sample data for demonstration
  const orderVolumeData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Orders',
      data: [50, 75, 60, 90, 100, 80, 70],
      borderColor: 'rgba(75,192,192,1)',
      fill: false,
    }],
  };

  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [{
      label: 'Revenue',
      data: [2000, 2400, 3000, 2800, 3500],
      backgroundColor: 'rgba(63,81,181,0.6)',
    }],
  };

  const serviceUsageData = {
    labels: ['Washing', 'Water Cans', 'Mobile Repair', 'Grocery'],
    datasets: [{
      label: 'Usage',
      data: [120, 90, 40, 150],
      backgroundColor: ['#2196f3', '#4caf50', '#ff9800', '#f44336'],
    }],
  };

  const deliveryPerformanceData = {
    labels: ['On-Time', 'Late'],
    datasets: [{
      data: [85, 15],
      backgroundColor: ['#4caf50', '#f44336'],
    }],
  };

  return (
    <Card sx={{ m: 3, p: 2 }}>
      <Typography variant="h5" gutterBottom>
        📊 Reports & Analytics
      </Typography>

      <Tabs value={tabIndex} onChange={handleTabChange} sx={{ mb: 2 }}>
        <Tab label="Order & Revenue" />
        <Tab label="Admin Performance" />
        <Tab label="Service Usage" />
        <Tab label="Delivery Performance" />
      </Tabs>

      <Box>
        {tabIndex === 0 && (
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Daily Order Volume</Typography>
                  <Line data={orderVolumeData} />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Monthly Revenue</Typography>
                  <Bar data={revenueData} />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {tabIndex === 1 && (
          <Card>
            <CardContent>
              <Typography variant="h6">Performance Reports per Admin</Typography>
              <ul>
                <li>Admin A - 120 Orders - 98% Accuracy</li>
                <li>Admin B - 100 Orders - 95% Accuracy</li>
                <li>Admin C - 80 Orders - 93% Accuracy</li>
              </ul>
            </CardContent>
          </Card>
        )}

        {tabIndex === 2 && (
          <Card>
            <CardContent>
              <Typography variant="h6">Most / Least Used Services</Typography>
              <Bar data={serviceUsageData} />
            </CardContent>
          </Card>
        )}

        {tabIndex === 3 && (
          <Card>
            <CardContent>
              <Typography variant="h6">Delivery On-Time Rate</Typography>
              <Doughnut data={deliveryPerformanceData} />
            </CardContent>
          </Card>
        )}
      </Box>
    </Card>
  );
};

export default ReportsAnalytics;
