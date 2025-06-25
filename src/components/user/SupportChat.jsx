import React, { useState, useRef } from "react";
import {
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Box,
  Typography,
  TextField
} from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";
import CloseIcon from "@mui/icons-material/Close";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import axios from "axios";
import API_URL from "../../config"; // Update with your API base URL
import { useSelector } from "react-redux";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const commonQA = {
  "How do I place a laundry order?":
    "You can place an order by selecting services and scheduling pickup via our app or website.",
  "What is the turnaround time for delivery?":
    "Our standard turnaround time is 24–48 hours depending on service type.",
  "What are your laundry package options?":
    "We offer standard, premium, and express packages. You can check details on our services page.",
  "How can I track my order status?":
    "You can track your order in the 'My Orders' section with real-time updates.",
  "Is same-day delivery available?":
    "Yes, same-day delivery is available for express orders placed before 10 AM.",
  "How do I add a new address?":
    "Go to your profile settings > Addresses > Add New Address."
};

//const senderId = 1; // Replace with actual user ID
const receiverId ="admin01"; // Replace with actual admin/support ID

const SupportChat = () => {
  const [openChat, setOpenChat] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const senderId=useSelector((state) => state.user.userID);
 // const usertype_owner=useSelector((state) => state.user.user_type);
  const chatBoxRef = useRef(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleChatOpen = () => {
    setOpenChat(true);
    fetchMessages();
  };

  const handleChatClose = () => {
    setOpenChat(false);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const fetchMessages = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/api/v2/superadmin/messages/${senderId}/${receiverId}`
      );
      setMessages(res.data || []);
      setTimeout(() => {
        chatBoxRef.current?.scrollTo({
          top: chatBoxRef.current.scrollHeight,
          behavior: "smooth"
        });
      }, 100);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    try {
      const msg = {
        sender_Id: senderId,
        receiver_Id:receiverId,
        sender_Role:5,
        receiver_Role:1,
        message: message.trim()
      };
      await axios.post(`${API_URL}/api/v2/superadmin/send`, msg);
      setMessage("");
      fetchMessages();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleQuestionClick = async (question) => {
    const answer = commonQA[question];
    try {
      const msg = {
        sender_Id: senderId,
        receiver_Id:receiverId,
        sender_Role:5,
        receiver_Role:1,
        message: `${question}\n\n${answer}`
      };
      await axios.post(`${API_URL}/api/v2/superadmin/send`, msg);
      fetchMessages();
    } catch (error) {
      console.error("Error sending QA message:", error);
    }
  };

  return (
    <>
      {/* Help & Support Floating Button */}
      <Fab
        color="primary"
        aria-label="help"
        onClick={handleChatOpen}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 1000
        }}
      >
        <HelpIcon />
      </Fab>

      {/* Chat Dialog */}
      <Dialog
        open={openChat}
        onClose={handleChatClose}
        PaperProps={{
          sx: {
            borderRadius: "10px",
            maxWidth: "350px",
            width: "100%"
          }
        }}
      >
        <DialogTitle
          sx={{
            bgcolor: "#2790f5",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 16px"
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <SupportAgentIcon />
            <Typography variant="h6">OTS 2.0 Services</Typography>
          </Box>
          <IconButton
            size="small"
            onClick={handleChatClose}
            sx={{ color: "white" }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ p: 2 }}>
          {/* Welcome message */}
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <SupportAgentIcon sx={{ mr: 1, color: "#2790f5" }} />
              <Typography
                variant="body1"
                sx={{ bgcolor: "#f0f0f0", p: 1, borderRadius: "10px" }}
              >
                Hi! I'm Kirush, Owner of OTS 2.0 👋. How can I help you today?
              </Typography>
            </Box>
          </Box>

          {/* Message Box */}
          <Box
            ref={chatBoxRef}
            sx={{
              maxHeight: "250px",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 1,
              mb: 2,
              pr: 1
            }}
          >
            {messages.map((msg, index) => (
              <Box
                key={index}
                sx={{
                  alignSelf:
                    msg.senderId === senderId ? "flex-end" : "flex-start",
                  bgcolor:
                    msg.senderId === senderId ? "#d1edc1" : "#f0f0f0",
                  p: 1.2,
                  borderRadius: "10px",
                  maxWidth: "80%",
                  whiteSpace: "pre-wrap",
                  boxShadow: 1,
                  mb:2
                }}
              >
                <Typography variant="body2">{msg.message}</Typography>
              </Box>
            ))}
          </Box>

          {/* Common questions */}
         {/* Common questions */}


{/* Toggle for Common Questions */}
<Box
  onClick={() => setShowSuggestions(!showSuggestions)}
  sx={{
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    cursor: "pointer",
    mb: 3
  }}
>
  <Typography variant="subtitle2">Common questions:</Typography>
  {showSuggestions ? <ExpandLessIcon /> : <ExpandMoreIcon />}
</Box>

{showSuggestions &&
  Object.keys(commonQA).map((question, index) => (
    <Box
      key={index}
      onClick={() => handleQuestionClick(question)}
      sx={{
        border: "1px solid #e0e0e0",
        borderRadius: "20px",
        p: 1,
        mb: 1,
        cursor: "pointer",
        "&:hover": { bgcolor: "#f5f5f5" }
      }}
    >
      <Typography variant="body2">{question}</Typography>
    </Box>
))}



          {/* Input field and send button */}
          <Box
            sx={{
              display: "flex",
              mt: 2,
              borderTop: "1px solid #e0e0e0",
              pt: 2
            }}
          >
            <TextField
              fullWidth
              placeholder="Tell us how we can help..."
              variant="outlined"
              size="small"
              value={message}
              onChange={handleMessageChange}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              sx={{ mr: 1 }}
            />
            <IconButton
              color="primary"
              onClick={handleSendMessage}
              
              disabled={!message.trim()}
              sx={{ bgcolor: "#f0f0f0" }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 12H19"
                  stroke="#2790f5"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 5L19 12L12 19"
                  stroke="#2790f5"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </IconButton>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SupportChat;
