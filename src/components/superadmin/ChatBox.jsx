import React, { useEffect, useState, useRef } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import io from 'socket.io-client';
import axios from 'axios';
import API_URL from '../../config';

// Socket connection
const socket = io(API_URL, {
  path: '/socket.io/',
  transports: ['websocket', 'polling']
});

const ChatBox = ({ senderId, receiverId, senderRole, receiverRole }) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const messagesContainerRef = useRef(null);

  const fetchMessages = async () => {
    const res = await axios.get(`${API_URL}/api/v2/superadmin/messages/${senderId}/${receiverId}`);
    setMessages(res.data);
  };

  const handleSend = async () => {
    if (!text.trim()) return;
    
    const msg = { sender_Id: senderId, receiver_Id: receiverId, sender_Role: senderRole, receiver_Role: receiverRole, message: text };
    await axios.post(`${API_URL}/api/v2/superadmin/send`, msg);
    socket.emit('sendMessage', msg);
    setText('');
  };

  // Scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    fetchMessages();
    socket.on('receiveMessage', (msg) => {
      if ((msg.sender_Id === senderId && msg.receiver_Id === receiverId) || (msg.sender_Id === receiverId && msg.receiver_Id === senderId)) {
        setMessages((prev) => [...prev, msg]);
      }
    });
    return () => socket.off('receiveMessage');
  }, [senderId, receiverId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
      {/* Messages container - standard order (old at top, new at bottom) */}
      <Box 
        ref={messagesContainerRef}
        sx={{ 
          flex: 1, 
          overflowY: 'auto', 
          display: 'flex', 
          flexDirection: 'column', // Standard top-to-bottom flow
          p: 2,
          gap: 1
        }}
      >
        {/* Display messages in chronological order (oldest first) */}
        {messages.map((msg, i) => (
          <Box 
            key={i} 
            sx={{
              alignSelf: msg.sender_Id === senderId ? 'flex-end' : 'flex-start',
              backgroundColor: msg.sender_Id === senderId ? '#dcf8c6' : 'white',
              borderRadius: '8px',
              p: 1.5,
              px: 2,
              maxWidth: '70%',
              wordBreak: 'break-word',
              boxShadow: '0 1px 1px rgba(0,0,0,0.1)'
            }}
          >
            <Typography variant="body1">{msg.message}</Typography>
          </Box>
        ))}
      </Box>

      {/* Input area */}
      <Box sx={{ 
        display: 'flex', 
        p: 2, 
        backgroundColor: '#f0f2f5',
        borderTop: '1px solid #e0e0e0',
        alignItems: 'center',
        gap: 1
      }}>
        <TextField
          fullWidth
          size="small"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type a message..."
          variant="outlined"
          sx={{
            backgroundColor: 'white',
            borderRadius: '8px',
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px'
            }
          }}
        />
        <Button 
          variant="contained" 
          onClick={handleSend} 
          sx={{ 
            borderRadius: '8px',
            backgroundColor: '#128C7E',
            '&:hover': {
              backgroundColor: '#075E54'
            }
          }}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default ChatBox;
