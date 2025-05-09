import React from "react";
import { Card, CardActionArea, CardContent, CardMedia, Typography, Grid, Container, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import laundry from "../../assets/img/kirush.png";
import oldagehome from "../../assets/oldage/s1.jpg";
import carwash from "../../assets/car.jpeg";

const services = [
    {
        title: "Laundry",
        description: "Click to explore laundry services.",
        image: laundry,
        path: "/laundry"
    },
    {
        title: "Old Age Home",
        description: "Click to learn more about our old age home services.",
        image: oldagehome,
        path: "/oldage"
    },
    {
        title: "Door Step Car Wash",
        description: "Click to learn more about our Car Wash services.",
        image: carwash,
        path: "/carhome"
    }
];

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{ background: "linear-gradient(to right, #6a11cb, #2575fc)", minHeight: "100vh", py: 5 }}>
            {/* Hero Section */}
            <Container sx={{ textAlign: "center", color: "#fff", pb: 5 }}>
                <Typography variant="h3" fontWeight="bold">
                    Welcome to Kirush Services..!
                </Typography>
                <Typography variant="h5" mt={2} mb={3}>
                Choose from our range of premium services tailored for your needs.
                </Typography>
                <Button 
                    variant="contained" 
                    size="large" 
                    sx={{ bgcolor: "#ffcc00", color: "#000", fontWeight: "bold", ":hover": { bgcolor: "#ffaa00" } }}
                    onClick={() => navigate("/oldage")}
                >
                    Explore Now
                </Button>
            </Container>

            {/* Services Section */}
            <Container>
                <Grid container spacing={3} justifyContent="center">
                    {services.map((service, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card 
                                sx={{ 
                                    width: "100%", 
                                    height: 400,  
                                    display: "flex", 
                                    flexDirection: "column", 
                                    justifyContent: "space-between", 
                                    transition: "transform 0.3s",
                                    "&:hover": { transform: "scale(1.05)" }
                                }}
                            >
                                <CardActionArea onClick={() => navigate(service.path)}>
                                    <CardMedia
                                        component="img"
                                        image={service.image}
                                        alt={service.title}
                                        sx={{ 
                                            width: "100%", 
                                            height: "300px",  
                                            objectFit: index==1?"cover":"fill" 
                                        }}  
                                    />
                                    <CardContent sx={{ flexGrow: 1, textAlign: "center" }}>
                                        <Typography variant="h5" fontWeight="bold" color="primary">
                                            {service.title}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            {service.description}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default HomePage;
