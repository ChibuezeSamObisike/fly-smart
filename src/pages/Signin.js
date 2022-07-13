import React, { useState } from "react";
import { Button, Container, Typography, Box } from "@mui/material";
import { styled } from "@mui/system";
import ImageBg from "../components/imageBg";
import Login from "../components/Login";

const SignIn = () => {
  const [signUp, setSignUp] = useState(true);
  let containerStyle = {
    marginX: "100px",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
    marginBottom: "100px",
  };

  const MyButton = styled(Button)({
    color: "#5C0632",
    border: "2px solid #5C0632",
    padding: 10,
    width: "100%",
    borderRadius: 4,
    width: "170px",
    "&:hover": {
      backgroundColor: "#5C0632",
      opacity: 0.6,
      color: "white",
    },

    "&:active": {
      backgroundColor: "#5C0632",
    },

    "& > .MuiBox-root": {},
  });
  return (
    <>
      <ImageBg />
      <div className="signin-header">
        <Container sx={containerStyle}>
          <Login />
        </Container>
      </div>
    </>
  );
};

export default SignIn;
