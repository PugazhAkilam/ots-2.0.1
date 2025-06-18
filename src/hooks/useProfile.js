import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/userSlice';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import API_URL from '../config';

export const useProfile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userID = useSelector((state) => state.user.userID);
  const { dispatch: cartDispatch } = useCart();
  const { dispatch: wishlistDispatch } = useWishlist();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        if (userID) {
          const response = await fetch(`${API_URL}/api/users/${userID}`);
          if (!response.ok) throw new Error('User not found');
          const data = await response.json();
          setUser(data);
        } else {
          navigate('/login');
        }
      } catch (error) {
        navigate('/login');
      }
    };

    fetchUserProfile();
  }, [userID, navigate]);

  const handleCardClick = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    dispatch(logout());
    cartDispatch({ type: 'RESET_CART' });  
    wishlistDispatch({ type: 'RESET_WISHLIST' });
    localStorage.removeItem('totalPrice');
    localStorage.removeItem('totalQuantity');
    navigate('/user');
  };

  return {
    user,
    handleCardClick,
    handleLogout
  };
};