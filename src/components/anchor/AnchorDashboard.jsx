import React,{useEffect,useState} from 'react'
import Card from './AnchorCard'
import { FaAnchor, FaBox, FaCog, FaShoppingCart, FaTicketAlt, FaUsers } from 'react-icons/fa'
//import { dataLine} from '../assets/chartData'
import {Line, Bar} from 'react-chartjs-2'
import axios from 'axios';
import { FaDeploydog, FaPerson, FaTicket } from 'react-icons/fa6'
import { Box, Grid, Paper, Typography, Avatar, Container } from '@mui/material';
import { PieChart, Pie, Tooltip, Cell, Legend } from 'recharts';
import {Chart as ChartJS, LineElement, BarElement, CategoryScale, LinearScale, PointElement} from 'chart.js'
import CountUp from 'react-countup'
import {  isMuiElement } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import API_URL from '../../config';
//import Typography from '@mui/material'
//const deliveryman_Id = useSelector(state => state.user.deliveryman_id);

ChartJS.register(LineElement, BarElement, CategoryScale, LinearScale, PointElement)

  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
 


const AnchorDashboard = () => {

  const userID = useSelector((state) => state.user.userID);
  const CompanyId = useSelector(state => state.user.company_Id);
  const deliveryman_Id = useSelector(state => state.user.deliveryman_id);
   //console.log(userID);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [customer,setcustomer]=useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const[orders,setOrders]=useState([])

  const [rows, setRows] = useState([]);
  const [orderData, setOrderData] = useState(Array(7).fill(0));

  
  // Function to get the last seven days in 'YYYY-MM-DD' format
const getLastSevenDays = () => {
  const dates = [];
  const today = new Date();
  for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      dates.push(date.toISOString().split('T')[0]); // Format as 'YYYY-MM-DD'
  }
  return dates;
};

// Function to fetch order data and count orders for each of the last seven days
const fetchOrderData = async () => {
  try {
      const response = await axios.get(`${API_URL}/API/myorders/${deliveryman_Id}/all`);
      const orders = response.data;

      // Get the last seven days
      const lastSevenDays = getLastSevenDays();

      // Count orders by date
      const orderCounts = lastSevenDays.map(date => {
          // Filter orders by matching the order_date with each date in the last seven days
          const count = orders.filter(order => order.changed_at.startsWith(date)).length;
          return count;
      });

      return orderCounts; // Return counts for the last seven days
  } catch (error) {
      //console.error('Error fetching order data:', error);
      return Array(7).fill(0); // Return an array of zeros if there's an error
  }
};

  useEffect(() => {
    const getData = async () => {
        const counts = await fetchOrderData();
        setOrderData(counts);
    };
    getData();
}, []);
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/users/${userID}`);
       // console.log('User Data:', response.data); // Log user data
        setUser(response.data); // Set user information in state
      } catch (err) {
       // console.error('Error fetching user info:', err); // Log the error
      }
    };
  
    if (userID) {
      fetchUserInfo();
    }
  }, [userID]);
  // Dependency array - fetch user info when userID changes

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8099/api/customer'); // Your backend API route
        setcustomer(response.data.data);  // Assuming response has a data object with a data array
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchServices = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/assignedOrders/${deliveryman_Id}`);
            setRows(response.data); // Assuming response contains the services array
        } catch (error) {
           // console.error('Error fetching services:', error);
        }
    };

    fetchServices();
},  []);

useEffect(() => {
  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${API_URL}/API/myorders/${deliveryman_Id}/all`); // Replace with your API URL
      setOrders(response.data);
     // console.log("or",response.data);
      
    } catch (error) {
     // console.error('Error fetching orders:', error);
    }
  };

  fetchOrders();
},  []);
  // console.log("cid",CompanyId);
  // console.log("order",orders);
  
  // console.log("admin",user);
  // console.log("cus",customer);
  // console.log("anchor",rows);
  
  if (!user) {
    return <p>Loading...</p>;  // Or a spinner/loading indicator
  }
  // Filter orders with statusName == 2
const ordersWithStatus2 = orders.filter(order => order.orderStatus_Id == 3);
const countStatus2 = ordersWithStatus2.length;

// Filter orders with statusName == 5
const ordersWithStatus5 = orders.filter(order => order.orderStatus_Id == 5);
const countStatus5 = ordersWithStatus5.length;

// Filter orders with statusName == 5
const validStatuses = ['Ready to Pick', 'Pick', 'Drop', 'Ready to Drop'];
const ordersWithStatus3 = orders.filter(order =>
    validStatuses.includes(order.status_Name)
);

const countStatus3 = ordersWithStatus3.length;
const data = [
  { name: 'Picked Orders', value:countStatus2 },
  { name: 'Droped Orders', value: countStatus5 },
 
  
];
const dataLine = {
  labels: getLastSevenDays().map(date => {
      const [year, month, day] = date.split('-');
      return `${day} ${new Date(year, month - 1).toLocaleString('en', { month: 'short' })}`;
  }), // Format dates as 'DD MMM'
  datasets: [
      {
          label: 'Literature Survey',
          data: orderData, // Use fetched order data
          fill: false,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          tension: 0.1,
      },
  ],
};

const options = {
  scales: {
      y: {
          beginAtZero: true,
          title: {
              display: true,
              text: 'Order Count',
          },
          ticks: {
              stepSize: 5,
          },
      },
      x: {
          title: {
              display: true,
              text: 'Date',
          },
      },
  },
};


  return (
    <Box sx={{ p: 4, flexGrow: 1 }}>
    <Box sx={{ display: 'flex', mb: 2, alignItems: 'center' }}>
      <Typography variant="h4" sx={{ mt: 3 }}>
        {user.user_Name} Dashboard <Box component="span" sx={{ color: 'primary.main' }}>(Anchor)</Box>
      </Typography>
    </Box>

    <Grid container spacing={2} sx={{ mb: 4 }}>
      <Grid item xs={2.4}>
        <Card icon={<FaUsers />} title="Customer" value={<CountUp end={customer.length} duration={2} />} />
      </Grid>
      <Grid item xs={2.4}>
        <Card icon={<FaPerson />} title="DeliveryMan" value={<CountUp end={rows.length} duration={2} />} />
      </Grid>
      <Grid item xs={2.4}>
        <Card icon={<FaTicketAlt />} title="Pending Order" value={<CountUp end={countStatus2} duration={2} />} />
      </Grid>
      <Grid item xs={2.4}>
        <Card icon={<FaTicketAlt />} title="In Progress" value={<CountUp end={countStatus3} duration={2} />} />
      </Grid>
      <Grid item xs={2.4}>
        <Card icon={<FaShoppingCart />} title="Delivered Order" value={<CountUp end={countStatus5} duration={2} />} />
      </Grid>
    </Grid>

    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Paper sx={{ p: 3, height: '100%' }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Orders Data</Typography>
          <Line data={dataLine} options={options} />
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper sx={{ p: 3, height: '100%' }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Working Status</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <PieChart width={400} height={400}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  </Box>
  )
}

export default AnchorDashboard
