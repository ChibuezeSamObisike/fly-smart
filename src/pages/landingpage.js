import React, { useState } from "react";
import Booking from "../components/booking";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import SecondHeader from "../components/secondHeader";
import ThirdHeader from "../components/thirdHeader";
import UserModal from "./../components/userModal";
import { Container, Box } from "@mui/material";

const LandingPage = () => {
  // const [registerDetails, setRegisterDetails] = useState({});
  const [totalData, setTotalData] = useState({});
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleTotalData = (data) => {
    setTotalData({ ...data, totalData });
    console.log(totalData);
  };

  return (
    <>
      <NavBar />
      <UserModal
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
        handleTotalData={handleTotalData}
        totalData={totalData}
      />
      <Header />
      <Box
        sx={{
          paddingX: "60px",
          paddingY: "10px",
          marginBottom: "70px",
          background: "#FAFAFA",
          // backgroundColor: "#e1e1e1",
        }}
      >
        <Container>
          <Booking
            handleOpen={handleOpen}
            handleClose={handleClose}
            open={open}
            handleTotalData={handleTotalData}
          />
        </Container>
      </Box>
      <SecondHeader />
      <ThirdHeader />
    </>
  );
};

export default LandingPage;
