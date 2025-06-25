import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';


import AdminLayout from './pages/AdminLayout';
import WelcomeDashboard from './pages/WelcomeDashboard';
import NotFound from './pages/NotFoundPage';
import Unauthorized from './pages/UnAuth';
import UserHome from './components/user/UserHome';
import UserLogin from './components/user/UserLogin';
import UserCart from './components/user/UserCart';
import DeliveryAddress from './components/user/DeliveryAddress';
import AddNewAddress from './components/user/AddNewAddress';
import OrderSummaryPage from './components/user/OrderSummaryPage';
import Wishlist from './components/user/components/Wishlist';
import NotificationPage from './components/user/components/NotifcationPage';
import UserProfile from './components/user/components/Userprofilepage';
import ProductDetailsPage from './components/user/components/ProductDetailsPage';
import EditAddress from './components/user/EditAddress';
import UserAddress from './components/user/UserAddress';
 
//import UserAddress from './components/user/UserAddress';

//admin
import AdminDashBoard from './components/Dashboard';
import AdminOrder from './components/admin/OrderList';
import AdminCustomers from './components/admin/Customers'
import AdminAnchor from './components/admin/Anchor';
import AdminServices from './components/admin/Services';
import AdminOrderList from './components/admin/OrderList';
import AdminOrderDetails from './components/admin/OrderDetails';
import AdminProfilePage from './components/admin/AdminProfilePage';
import AdminProduct from './components/admin/Product';
import  AdminCategory  from './components/admin/Category';
import LaundryReception from "./components/admin/LaundryReception"
import ChatBox from './components/superadmin/ChatBox'
import DeliverymanChat from './components/superadmin/DeliverymanChat';
//anchor
import AnchorTakeOrderAnchor from './components/anchor/TakeorderAnchor';
//import AnchorPendingOrder from './components/anchor/PendingOrder';
import AnchorDashboard from './components/anchor/AnchorDashboard';
import AnchorPickUpOrder from './components/anchor/PickUpOrder';
//import AnchorDeleveryOrder from './components/anchor/DeliveryOrder';
import AnchorUserSalaryCase from './components/anchor/UserCase';
import AnchorProfilePage from './components/anchor/AnchorProfilePage';
import ServicesPage from './components/admin/OrderPage';
import OrderList from './components/admin/OrderList2';
import AdminManagement from './components/superadmin/AdminManagement';
import ReportsAnalytics from './components/superadmin/Report';
import CustomerOverview from './components/superadmin/Customer';
import CommunicationSupport from './components/superadmin/Communication';
import SettingsConfiguration from './components/superadmin/Setting';
import SuperAdminPage from './components/superadmin/SuperAdminPage';
import Revenue from './components/superadmin/Revenue';

function App() {
  const InitialRedirect = () => {
    const userType = localStorage.getItem('user_type');
    
    switch(userType) {
      case '1':
        return <Navigate to="/superadmin" />;
      case '2':
        return <Navigate to="/admin" />;
      case '4':
        return <Navigate to="/anchor" />;
      case '5':
        return <Navigate to="/user" />;
      default:
        return <UserHome />;
    }
  };

  return (
    <Router>
        <Routes>
          <Route path="/" element={<InitialRedirect />} />
          <Route path="/login" element={<UserLogin />} />
         <Route path="/401" element={<Unauthorized />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={  <AdminDashBoard />} />
            <Route path="one-way" element={<AdminOrder />}/>
            <Route path="two-way" element={<OrderList />}/>
       

            <Route path="laundryReception" element={<LaundryReception />}/>
            <Route path="customers" element={<AdminCustomers />}/>
            <Route path="anchor" element={<AdminAnchor />}/>
            <Route path="service" element={<AdminServices />}/>
            <Route path="orderlist" element={<AdminOrderList />}/>
            <Route path="orderdetails" element={<AdminOrderDetails />}/>
            <Route path="profilepage" element={<AdminProfilePage />}/>
            <Route path="product" element={<AdminProduct />}/>
            <Route path="category" element={<AdminCategory />}/>
            <Route path="orderpage" element={<ServicesPage />}/>
            <Route path="chatbox" element={<DeliverymanChat />} />
          </Route>

          {/* Super Admin Routes */}
          <Route path="/superadmin" element={<AdminLayout />}>
            <Route index element={  <WelcomeDashboard />} />
            <Route path="adminmanagement" element={<AdminManagement />} />
            <Route path="service" element={<AdminServices />}/>
            <Route path="product" element={<AdminProduct />}/>
            <Route path="revenue"  element={<Revenue /> } />
            <Route path="superadminpage" element={<SuperAdminPage />} />
            <Route path="deliveryman" element={<>hi</>} />
            <Route path="report"  element={<ReportsAnalytics /> } />
            <Route path="customer"  element={<CustomerOverview /> } />
            <Route path="communication"  element={<CommunicationSupport /> } />
            <Route path="setting"  element={<SettingsConfiguration /> } />
            <Route path="laundryReception" element={<LaundryReception />}/>
            <Route path="chatbox2" element={<ChatBox />}/>
            <Route path="chatbox" element={<DeliverymanChat />} /> {/* Update this line */}
          </Route>

          {/* Anchor Routes */}
          <Route path="/anchor" element={<AdminLayout />}>
               <Route index element={  <AnchorDashboard />} />
               <Route path="anchorTakeorder" element={<AnchorTakeOrderAnchor />} />
               <Route path="pendingorder" element={<AnchorPickUpOrder />} />
               <Route path="chatbox" element={<DeliverymanChat />} />
               <Route path="profilepage" element={<AnchorProfilePage/> } />
          </Route>


        
          {/* <Route path="/account" element={<UserProfile />} /> */}
            {/* User Routes */}
            <Route path="/user" element={ <UserHome /> } />
                <Route path="/useraddress" element={<UserAddress />} />
                <Route path="/cart" element={<UserCart />} />
                <Route path="/delivery" element={<DeliveryAddress />} /> 
       
                <Route path="/addaddress" element={<AddNewAddress />} />
                <Route path="/editaddress" element={<EditAddress />} />
                 <Route path="/history" element={<OrderSummaryPage />} />
                <Route path="/wishlist" element={<Wishlist />} />
      
       
                 <Route path="/notifications" element={<NotificationPage />} />
                 <Route path="/account" element={<UserProfile />} />
                 <Route path="/product-details" element={<ProductDetailsPage />} />
                  <Route path="/cart-category" element={<UserCart />} />
     

      
    
          <Route path="*" element={<NotFound />} />
          
        </Routes>
      {/* </AuthProvider> */}
    </Router>
  );
}

export default App;