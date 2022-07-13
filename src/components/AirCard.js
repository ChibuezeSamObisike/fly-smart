import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { Paper, Typography, Button, Box, Container } from "@mui/material";
import CardImg from "../images/yeray-sanchez-ZKEjw7oLmQQ-unsplash.jpg";
import MyButton from "./../styles/button";
import React, { useEffect } from "react";
import http from "../utils/http";
const AirCard = (props) => {
  useEffect(() => {
    console.log(props);
    console.log(props.images[0]);
  }, []);

  const sxBox = {
    width: "45%",
    display: "flex",
    flexDirection: "column",
    marginBottom: "50px",
    borderRadius: "15px",
  };

  const handleBook = async (id) => {
    try {
      const res = await http.post(`quotes/${id}/book_flight/`);
    } catch (ex) {
      console.log(ex);
    }
  };
  return (
    <Paper sx={sxBox}>
      <Box>
        <Carousel
          showArrows={false}
          showStatus={false}
          autoPlay={false}
          showThumbs={false}
          infiniteLoop={false}
        >
          <div>
            <img src={props.images[0]} alt="img" />
          </div>
          <div>
            <img src={props.images[0]} alt="img" />
          </div>
          <div>
            <img src={props.images[0]} alt="img" />
          </div>
        </Carousel>
      </Box>
      <Box sx={{ display: "flex", width: "100%" }}>
        <Container
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography sx={{ fontSize: "24px", fontWeight: "bold" }}>
              N {props.price}
            </Typography>
            {/* <Typography>11h 05m</Typography> */}
            <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
              Flight Name: {props.jet_code}
            </Typography>
          </Box>
          <Box sx={{ marginBottom: "20px", marginTop: "10px" }}>
            <MyButton onClick={() => handleBook(props.id)}>Book</MyButton>
            <Typography>Max pax: {props.max_passengers}</Typography>
          </Box>
        </Container>
      </Box>
    </Paper>
  );
};

export default AirCard;
