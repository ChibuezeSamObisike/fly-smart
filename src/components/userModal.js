import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { Container, TextField } from "@mui/material";
import MyButton from "../styles/button";
import { LoaderSmall } from "../loader/loader";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function UserModal({
  open,
  handleClose,
  handleSubmit,
  handleChange,
  loading,
}) {
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Container>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
                sx={{ textAlign: "center" }}
              >
                We will be needing some of your details
              </Typography>
              <form onSubmit={(e) => e.preventDefault()}>
                <TextField
                  id="outlined-name"
                  label="First Name"
                  name="firstname"
                  fullWidth
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                  type="text"
                  sx={{ margin: "10px" }}
                />
                <TextField
                  id="outlined-name"
                  label="Last Name"
                  name="lastname"
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                  fullWidth
                  type="text"
                  sx={{ margin: "10px" }}
                />
                <TextField
                  id="outlined-name"
                  label="Email"
                  name="email"
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                  type="email"
                  fullWidth
                  sx={{ margin: "10px" }}
                />
                <TextField
                  id="outlined-name"
                  label="Phone"
                  type="number"
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                  name="phone"
                  fullWidth
                  sx={{ margin: "10px" }}
                />
                <Box sx={{ marginLeft: "17px" }}>
                  <MyButton type="submit" onClick={handleSubmit}>
                    Request Quote
                  </MyButton>
                </Box>
              </form>
            </Container>
            {loading && <LoaderSmall />}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
