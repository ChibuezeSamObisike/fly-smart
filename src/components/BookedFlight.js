import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { Paper, Typography, Button, Box, Container } from "@mui/material";
import { styled } from "@mui/material";
import CardImg from "../images/yeray-sanchez-ZKEjw7oLmQQ-unsplash.jpg";

const BookedFlight = () => {
  const booked = {
    marginTop: "2px",
    border: "1px solid",
    borderRadius: "5px",
    backgroundColor: "green",
    color: "white",
    padding: "5px",
  };

  const sxBox = {
    width: "45%",
    display: "flex",
    flexDirection: "column",
    marginBottom: "50px",
    borderRadius: "15px",
  };

  return (
    <Paper sx={sxBox}>
      <Box>
        <Carousel
          showArrows={false}
          showStatus={false}
          autoPlay={true}
          showThumbs={false}
          infiniteLoop={true}
        >
          <div>
            <img src={CardImg} alt="img" />
          </div>
          <div>
            <img src={CardImg} alt="img" />
          </div>
          <div>
            <img src={CardImg} alt="img" />
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
              €108,000
            </Typography>
            <Typography>11h 05m</Typography>
            <Typography sx={{ fontSize: "12px", fontWeight: "bold" }}>
              Legacy 450 (2016) OO-NEY
            </Typography>
          </Box>
          <Box sx={{ marginBottom: "20px" }}>
            <Box sx={booked}>Booked</Box>
            <Typography>Max pax: 8</Typography>
          </Box>
        </Container>
      </Box>
    </Paper>
  );
};

export default BookedFlight;
