import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import API_URL from '../config';

export const useDeliverymen = () => {
  const [deliverymen, setDeliverymen] = useState([]);
  const companyId = useSelector(state => state.user.company_Id);

  useEffect(() => {
    const fetchDeliverymen = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/deliveryman`);
        setDeliverymen(response.data);
      } catch (error) {
        console.error('Error fetching deliverymen:', error);
      }
    };

    fetchDeliverymen();
  }, [companyId]);

  return deliverymen;
};