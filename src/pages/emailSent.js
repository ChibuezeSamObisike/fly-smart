import { Box, Container } from "@mui/material";
import Img from "../images/images.png";
import { useGlobalContext } from "../context/AppContext";

const EmailSent = () => {
  const sxBox = {
    display: "flex",
    marginX: "150px",
    position: "fixed",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
  };

  const { clientBookingDetails } = useGlobalContext();

  return (
    <>
      <Box sx={sxBox}>
        <div>
          <h1>
            Hi {clientBookingDetails.firstname}, I just sent you an email,{" "}
            <br /> kindly Check your details
          </h1>
        </div>
        <div style={{ marginLeft: "20px" }}>
          <img src={Img} alt="Img" />
        </div>
      </Box>
    </>
  );
};

export default EmailSent;
