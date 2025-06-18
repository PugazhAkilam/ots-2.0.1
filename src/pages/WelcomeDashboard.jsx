import React from 'react';
import { useUserData } from '../hooks/useUserData';
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
import CountUp from 'react-countup';
import { useOrders } from '../hooks/useOrders';
import { useCustomers } from '../hooks/useCustomers';
import { useDeliverymen } from '../hooks/useDeliverymen';

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



// === Card UI Component ===
const StatCard = ({ icon, title, value }) => (
  <Paper elevation={3} sx={{ p: 2, borderRadius: 2, display: 'flex', alignItems: 'center' }}>
    <Box sx={{ mr: 2, fontSize: 30, color: 'primary.main' }}>{icon}</Box>
    <Box>
      <Typography variant="subtitle2" fontWeight={600}>
        {title}
      </Typography>
      <Typography variant="h6" fontWeight={700}>
        <CountUp end={value} duration={2} separator="," />
      </Typography>
    </Box>
  </Paper>
);

// === Main Static Dashboard ===
const WelcomeDashboard = () => {

  const SuperadminData = useUserData();
  const { orders, orderCounts, weeklyOrders } = useOrders();
  const customers = useCustomers();
  const deliverymen = useDeliverymen();

  // Update staticChartData with real data
  const chartData = {
    line: {
      labels: [...Array(7)].map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (6 - i));
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      }),
      datasets: [{
        label: 'Daily Orders',
        data: weeklyOrders,
        fill: false,
        borderColor: '#3f51b5',
        tension: 0.1,
      }],
    },
    bar: {
      labels: ['Pending', 'Completed', 'Cancelled', 'Ready to Drop'],
      datasets: [{
        label: 'Order Status',
        data: [
          orderCounts.pending,
          orderCounts.completed,
          orderCounts.cancelled,
          orderCounts.readyToDrop
        ],
        backgroundColor: '#3f51b5',
      }],
    },
    stats: [
      { icon: 'dashboard', title: 'Total Orders', value: orders.length },
      { icon: 'cog', title: 'Completed Orders', value: orderCounts.totalCompleted},
      { icon: 'shopping', title: 'Admin', value: 4 },
      { icon: 'box', title: 'Deliverymen', value: deliverymen.length },
      { icon: 'users', title: 'Customers', value: customers.length },
    
    ],
  };

  // Update the return statement to use chartData instead of staticChartData
  return (
    <Box sx={{ flexGrow: 1, p: 4 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Welcome, {SuperadminData?.user_Name || 'User'}!
      </Typography>

      {/* Stat Cards */}
      <Grid container spacing={2} sx={{ mb: 3, justifyContent: 'center' }}>
        {chartData.stats.map((item, idx) => (
          <Grid item key={idx} xs={12} sm={6} md={2.4} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ width: '100%', maxWidth: 300 }}>
              <StatCard
                icon={
                  item.icon === 'dashboard' ? <FaChartLine /> :
                  item.icon === 'shopping' ? <FaShoppingCart /> :
                  item.icon === 'box' ? <FaBox /> :
                  item.icon === 'users' ? <FaUsers /> :
                  <FaCog />
                }
                title={item.title}
                value={item.value}
              />
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Charts */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Weekly Orders
            </Typography>
            <Line data={chartData.line} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            Today  Order Status Distribution
            </Typography>
            <Bar data={chartData.bar} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default WelcomeDashboard;
