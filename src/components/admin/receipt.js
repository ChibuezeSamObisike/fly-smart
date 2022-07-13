import { Typography, Container, Box } from "@mui/material";
import { useState, useRef } from "react";
// import InvoiceComponent from "./invoiceComponent";
import http from "../../utils/http";
import MyButton from "../../styles/button";

const Receipt = () => {
  const sendReceipt = async (id) => {
    let response = await http.post(`quotes/${id}/upload-receipt/`);
    console.log(response);
  };

  return (
    <>
      <Typography component="h3" variant="h6" sx={{ padding: "5px" }}>
        Please Upload your Receipt or an Evidence of Payment.
      </Typography>
      {/* <InvoiceComponent /> */}
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          width: "30%",
          marginTop: "20px",
          marginLeft: "50px",
          "&:hover": {
            background: "none",
            color: "white",
          },
        }}
      >
        <MyButton
          sx={{
            backgroundColor: "transparent",
            border: "0.7px solid black",
            color: "black",
          }}
          onClick={() => sendReceipt()}
        >
          Send
        </MyButton>
      </Box>
    </>
  );
};

export default Receipt;
