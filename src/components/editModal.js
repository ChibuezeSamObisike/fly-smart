import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import statesValue from "../states.json";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Typography } from "@mui/material";
import { styled } from "@mui/system";
import MyButton from "../styles/button";
//import { StarRateSharp } from "@mui/icons-material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "0.4px solid #000",
  boxShadow: 0,
  p: 4,
};

export default function EditModal({ open }) {
  //const handleChange = (e) => {};
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={console.log("open")}
        onClose={console.log("close")}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography variant="h6" component="h6" sx={{ fontWeight: "bold" }}>
              Edit current available
            </Typography>
            <form onSubmit={(e) => e.preventDefault()}>
              <FormControl
                fullWidth
                sx={{ marginBottom: "50px", marginTop: "50px" }}
              >
                <InputLabel id="demo-simple-select-label">From</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value="Lagos"
                  label="From"
                  onChange={(e) => console.log(e)}
                >
                  {statesValue.map(({ code, name }) => (
                    <MenuItem key={code} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <MyButton type="submit" onClick={console.log("Hi")}>
                {" "}
                Edit available flights
              </MyButton>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
