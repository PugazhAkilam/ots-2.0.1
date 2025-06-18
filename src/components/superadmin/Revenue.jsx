import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import GaugeChart from "react-gauge-chart";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";

const ADMIN_COST = 1000;
const DELIVERYMEN_COST = 500;

const getLocalCost = () => {
  const stored = localStorage.getItem("totalCostDetails");
  return stored ? JSON.parse(stored) : { admin: 0, deliverymen: 0, others: 0 };
};

const calculateTotalCost = (details) =>
  details.admin * ADMIN_COST +
  details.deliverymen * DELIVERYMEN_COST +
  details.others;

const COLORS = ["#4CAF50", "#2196F3", "#FFC107", "#FF5722"];
const COST_COLORS = ["#f44336", "#e91e63", "#9c27b0", "#673ab7"];

const revenueData = [
  { name: "One-Way Service", value: 85000 },
  { name: "Two-Way Service", value: 40000 },
];

const costData = [
  { name: "Ad Spend", value: 5000 },
  { name: "Seller Commission", value: 5000 },
  { name: "FBA Fees", value: 5000 },
  { name: "Other", value: 5000 },
];

import axios from 'axios';
import API_URL from '../../config';

function Revenue() {
  const [profitPercent, setProfitPercent] = useState(0);
  const [revenueData, setRevenueData] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalCost, setTotalCost] = useState(20000); // Assuming fixed cost for now
  const [openCostDialog, setOpenCostDialog] = useState(false);
  const [costDetails, setCostDetails] = useState(getLocalCost());
  
  useEffect(() => {
    fetchOrderData();
  }, []);
  useEffect(() => {
    const total = calculateTotalCost(costDetails);
    setTotalCost(total);
  }, [costDetails]);
  
  const fetchOrderData = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/admin/all-order-details`);
      const orders = response.data.data;

      // Calculate revenue by order type
      const revenueByType = orders.reduce((acc, order) => {
        const type = order.ordertype === "two-way" ? "Two-Way Service" : "One-Way Service";
        acc[type] = (acc[type] || 0) + order.total_price;
        return acc;
      }, {});

      // Format data for pie chart
      const formattedData = Object.entries(revenueByType).map(([name, value]) => ({
        name,
        value
      }));

      // Calculate total revenue
      const total = formattedData.reduce((sum, item) => sum + item.value, 0);

      setRevenueData(formattedData);
      setTotalRevenue(total);
      
      // Calculate profit percentage
      const profitAmount = total - totalCost;
      const profitPercentage = profitAmount / total;
      setProfitPercent(profitPercentage);

    } catch (error) {
      console.error('Error fetching order data:', error);
    }
  };

  // Update the JSX where total revenue is displayed
  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Scrollable content inside the page */}
      <Box sx={{ flex: '1 1 auto', overflowY: 'auto', p: 2 }}>
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            {/* Total Profit */}
            <Grid item xs={12} md={6}>
  <Card
    sx={{
      backgroundColor: "#4CAF50",
      color: "#fff",
      height: "470px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    }}
  >
    <CardContent sx={{ height: "100%" }}>
      <Box display="flex" height="100%">
        {/* Left Half - Text */}
        <Box flex={1} display="flex" flexDirection="column" sx={{mt:5}}>
          <Typography variant="h4">TOTAL PROFIT</Typography>
           <Typography variant="h3" fontWeight="bold">
      INR {(totalRevenue - totalCost).toLocaleString('en-IN')}
    </Typography>
          <DotLottieReact
            src="https://lottie.host/009a25e3-3266-44cb-a631-e24b8a6317e9/ls6oaAhOIi.lottie"
            loop
            autoplay
            style={{ width: "100%", height: "100%" }}
          />
        </Box>

        {/* Right Half - Lottie */}
        <Box
          flex={1}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{ overflow: "hidden" }}
        >
          <DotLottieReact
            src="https://lottie.host/577a2efc-bb55-48cd-ab5c-b95ebd654b8b/0If13GNOSv.lottie"
            loop
            autoplay
            style={{ width: "100%", height: "100%" }}
          />
        </Box>
      </Box>
    </CardContent>
  </Card>
</Grid>


    {/* Profit Margin Gauge */}
    <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    PROFIT MARGIN
                  </Typography>
                  <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
                    <GaugeChart
                      id="profit-gauge"
                      nrOfLevels={20}
                      percent={profitPercent}
                      colors={["#FF5F6D", "#FFC371", "#00C49F"]}
                      arcWidth={0.3}
                      arcPadding={0.02}
                      textColor="#4CAF50"
                      formatTextValue={(value) => `${Math.round(value)}%`}
                    />
                  </Box>
                  <Typography
                    variant="h4"
                    textAlign="center"
                    color="green"
                    sx={{ mt: 2 }}
                  >
                    {Math.round(profitPercent * 100)}%
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            {/* Revenue Chart */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    TOTAL REVENUE
                  </Typography>
                  <Typography variant="h4" color="primary" gutterBottom>
                    INR {(totalRevenue - totalCost).toLocaleString('en-IN')}
                  </Typography>
                  <Box sx={{ height: 250 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={revenueData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          fill="#8884d8"
                          paddingAngle={5}
                          dataKey="value"
                          label={({ name, percent }) =>
                            `${name}: ${(percent * 100).toFixed(0)}%`
                          }
                        >
                          {revenueData.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Cost Chart */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    TOTAL COSTS
                  </Typography>
                  <Typography variant="h4" color="error" gutterBottom>
  INR {totalCost.toLocaleString('en-IN')}
</Typography>

<Box display="flex" justifyContent="flex-end" gap={2}>
  <Button variant="contained" onClick={() => setOpenCostDialog(true)}>
    Update Cost
  </Button>
  <Button variant="outlined" color="error" onClick={() => {
    localStorage.removeItem("totalCostDetails");
    setCostDetails({ admin: 0, deliverymen: 0, others: 0 });
  }}>
    Clear Cost
  </Button>
</Box>

                  <Box sx={{ height: 250 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={costData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                          label={({ name, percent }) =>
                            `${name}: ${(percent * 100).toFixed(0)}%`
                          }
                        >
                          {costData.map((_, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COST_COLORS[index % COST_COLORS.length]}
                            />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

        
          </Grid>
        </Container>
      </Box>
      <Dialog open={openCostDialog} onClose={() => setOpenCostDialog(false)} maxWidth="xs" fullWidth>
  <DialogTitle>Update Cost Details</DialogTitle>
  <DialogContent>
    <FormControl fullWidth margin="dense">
      <InputLabel>Number of Admin</InputLabel>
      <Select
        value={costDetails.admin}
        onChange={(e) => setCostDetails({ ...costDetails, admin: e.target.value })}
        label="Number of Admin"
      >
        {[0, 1, 2, 3, 4, 5].map((val) => (
          <MenuItem key={val} value={val}>{val}</MenuItem>
        ))}
      </Select>
    </FormControl>

    <FormControl fullWidth margin="dense">
      <InputLabel>Number of Deliverymen</InputLabel>
      <Select
        value={costDetails.deliverymen}
        onChange={(e) => setCostDetails({ ...costDetails, deliverymen: e.target.value })}
        label="Number of Deliverymen"
      >
        {[0, 1, 2, 3, 4, 5, 6, 7].map((val) => (
          <MenuItem key={val} value={val}>{val}</MenuItem>
        ))}
      </Select>
    </FormControl>

    <TextField
      label="Other Cost"
      type="number"
      fullWidth
      margin="dense"
      value={costDetails.others}
      onChange={(e) => setCostDetails({ ...costDetails, others: parseInt(e.target.value || 0) })}
    />

    <Typography variant="subtitle1" sx={{ mt: 2 }}>
      Total Cost: ₹{calculateTotalCost(costDetails).toLocaleString('en-IN')}
    </Typography>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setOpenCostDialog(false)}>Cancel</Button>
    <Button
      variant="contained"
      onClick={() => {
        localStorage.setItem("totalCostDetails", JSON.stringify(costDetails));
        setOpenCostDialog(false);
      }}
    >
      Save
    </Button>
  </DialogActions>
</Dialog>

    </Box>
  );
}

export default Revenue;
