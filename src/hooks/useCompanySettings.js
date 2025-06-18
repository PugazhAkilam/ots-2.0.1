// useCompanySettings.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from '../config';

const useCompanySettings = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [companyData, setCompanyData] = useState({
    name: '',
    logo: '',
    frontPageImage: '',
    description: '',
    email: '',
    phone: '',
    address: '',
    website: ''
  });
  const [logoFile, setLogoFile] = useState(null);
  const [frontPageFile, setFrontPageFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [frontPagePreview, setFrontPagePreview] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);

  const [menuAccessData, setMenuAccessData] = useState([
    { id: 1, title: 'Dashboard', menu: 'Master', submenu: 'Main', list: 'Dashboard Access', admin: true, owner: true, anchor: false, customer: false },
    { id: 2, title: 'Laundry Reception', menu: 'Master', submenu: 'Operations', list: 'Reception Management', admin: true, owner: true, anchor: false, customer: false },
    { id: 3, title: 'Orders', menu: 'Transaction', submenu: 'Order', list: 'Order Management', admin: true, owner: true, anchor: true, customer: true },
    { id: 9, title: 'One Way', menu: 'Transaction', submenu: 'Order', list: 'Order Management', admin: true, owner: true, anchor: true, customer: true },
    { id: 4, title: 'Two Way', menu: 'Transaction', submenu: 'Order', list: 'Order Management', admin: true, owner: true, anchor: true, customer: true },
    { id: 5, title: 'Customer', menu: 'Transaction', submenu: 'Order', list: 'Order Management', admin: true, owner: true, anchor: true, customer: true },
    { id: 6, title: 'Anchor', menu: 'Transaction', submenu: 'Order', list: 'Order Management', admin: true, owner: true, anchor: true, customer: true },
    { id: 7, title: 'Services', menu: 'Master', submenu: 'Service', list: 'Service Management', admin: true, owner: false, anchor: false, customer: false },
    { id: 8, title: 'Products', menu: 'Master', submenu: 'Product', list: 'Product Management', admin: true, owner: true, anchor: false, customer: false },
    { id: 10, title: 'Take Order', menu: 'Master', submenu: 'Deliveryman', list: 'Deliveryman Management', admin: true, owner: true, anchor: false, customer: false },
    { id: 11, title: 'My Order', menu: 'Master', submenu: 'Company', list: 'Company Settings', admin: true, owner: true, anchor: false, customer: false },
    { id: 12, title: 'Profile Page', menu: 'Master', submenu: 'Menu Access', list: 'Menu Access Management', admin: true, owner: true, anchor: false, customer: false },
    { id: 13, title: 'Company Settings', menu: 'Master', submenu: 'Company', list: 'Company Settings', admin: true, owner: true, anchor: false, customer: false },
    { id: 14, title: 'Admin Management', menu: 'Master', submenu: 'Menu Access', list: 'Menu Access Management', admin: true, owner: true, anchor: false, customer: false },
    { id: 15, title: 'Report & Analytics', menu: 'Master', submenu: 'Deliveryman', list: 'Deliveryman Management', admin: true, owner: true, anchor: false, customer: false },
    { id: 16, title: 'Customer OverView', menu: 'Master', submenu: 'Company', list: 'Company Settings', admin: true, owner: true, anchor: false, customer: false },
    { id: 17, title: 'Communication Support', menu: 'Master', submenu: 'Menu Access', list: 'Menu Access Management', admin: true, owner: true, anchor: false, customer: false },
    { id: 18, title: 'Setting Configuration', menu: 'Master', submenu: 'Deliveryman', list: 'Deliveryman Management', admin: true, owner: true, anchor: false, customer: false },

  ]);

  useEffect(() => {
    const fetchCompanySettings = async () => {
      try {
        const companyId = 1;
        const response = await axios.get(`${API_URL}/api/v2/superadmin/company-settings/${companyId}`);
        setCompanyData(response.data);
      } catch (error) {
        console.error('Error fetching company settings:', error);
        setMessage({ type: 'error', text: 'Failed to load company settings' });
      }
    };
    fetchCompanySettings();
  }, []);

  useEffect(() => {
    return () => {
      if (logoPreview) URL.revokeObjectURL(logoPreview);
      if (frontPagePreview) URL.revokeObjectURL(frontPagePreview);
    };
  }, [logoPreview, frontPagePreview]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompanyData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogoChange = (e) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleFrontPageImageChange = (e) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setFrontPageFile(file);
      setFrontPagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const formData = new FormData();
      Object.keys(companyData).forEach(key => {
        if (key !== 'logo' && key !== 'frontPageImage') {
          formData.append(key, companyData[key]);
        }
      });
      if (logoFile) formData.append('logo', logoFile);
      if (frontPageFile) formData.append('frontPageImage', frontPageFile);

      await axios.put(`${API_URL}/api/v2/superadmin/company-settings`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setMessage({ type: 'success', text: 'Company settings updated successfully' });
    } catch (error) {
      console.error('Error updating company settings:', error);
      setMessage({ type: 'error', text: 'Failed to update company settings' });
    } finally {
      setLoading(false);
    }
  };
// Inside useCompanySettings

const handleMenuAccessChange = async (id, role, newValue) => {
  try {
    // Update local state
    setMenuAccessData(prevData =>
      prevData.map(item =>
        item.id === id ? { ...item, [role]: newValue } : item
      )
    );

    // Update in database
    await axios.put(`${API_URL}/api/v2/superadmin/menu-access/${id}`, {
      role,
      value: newValue
    });

    setMessage({ type: 'success', text: 'Menu access updated successfully' });
  } catch (error) {
    console.error('Error updating menu access:', error);
    setMessage({ type: 'error', text: 'Failed to update menu access' });
  }
};

// Add function to fetch menu access data
useEffect(() => {
  const fetchMenuAccess = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/v2/superadmin/menu-access`);
      setMenuAccessData(response.data.data);
    } catch (error) {
      console.error('Error fetching menu access:', error);
      setMessage({ type: 'error', text: 'Failed to load menu access data' });
    }
  };

  fetchMenuAccess();
}, []);
  
  return {
    activeTab,
    setActiveTab,
    handleTabChange,
    companyData,
    handleInputChange,
    logoPreview,
    handleLogoChange,
    frontPagePreview,
    handleFrontPageImageChange,
    handleSubmit,
    loading,
    message,
    menuAccessData,
    handleMenuAccessChange
  };
};

export default useCompanySettings;
