import React, { useState } from "react";
import { Grid, Container, TextField, Box } from "@mui/material";
import Location from "./location";
import Calendar from "./calendar";
import MyButton from "../styles/button";
import UserModal from "./userModal";
import { toast } from "react-toastify";
import http from "../utils/http";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/AppContext";
import SelectState from "./selectState";

const today = new Date();

const Booking = ({ handleOpen, open, handleClose }) => {
  const { clientBookingDetails, setClientBookingDetails } = useGlobalContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [bookingObj, setBookingObj] = useState({
    flight_from: "",
    flight_to: "",
    flight_date: "",
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    num_of_passengers: "",
    category: "",
    return_flight_date: "",
  });

  const handleChange = (name, val) => {
    setBookingObj({ ...bookingObj, [name]: val });
  };

  const handleSubmit = async () => {
    const {
      firstname,
      lastname,
      phone,
      email,
      flight_from,
      flight_to,
      flight_date,
    } = bookingObj;
    if (
      !firstname ||
      !lastname ||
      !phone ||
      !email ||
      !flight_to ||
      !flight_from
    ) {
      toast.error("Kindly fill or necessary input field");
    } else {
      const result = await onSubmit();
      if (result) {
        setClientBookingDetails(result.data);
        navigate("/email");
      }
      setTimeout(() => setLoading(false), 3000);
      console.log(result);
    }
  };

  const onSubmit = async () => {
    setLoading(true);

    const bookingOneWay = {
      firstname,
      lastname,
      phone,
      email,
      flight_from,
      flight_to,
      flight_date,
      num_of_passengers,
      category,
    };
    // console.log(bookingOneWay);
    try {
      if (category === "ONE WAY") {
        const result = await http.post("quotes/", bookingOneWay);
        console.log(result);
        if (result) return result;
      } else if (category === "ROUND TRIP") {
        const resultAns = await http.post("quotes/", bookingObj);
        console.log(resultAns);
        if (resultAns) return resultAns;
      }
    } catch (ex) {
      console.log(ex);
    }
    // console.log(result);
  };

  const {
    firstname,
    lastname,
    phone,
    email,
    return_flight_date,
    num_of_passengers,
    flight_from,
    flight_to,
    flight_date,
    category,
  } = bookingObj;
  const handleCheck = () => {
    if (!num_of_passengers || !flight_from || !flight_to || !flight_date) {
      toast.error("Kindly input all important fields");
      return true;
    }
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        {" "}
        <h1>Kindly Input your travel details</h1>
      </Box>
      <Grid container sx={{ marginLeft: "130px" }}>
        <Grid item md={6} mb={4}>
          <TextField
            placeholder="Flight From"
            label="Flight From"
            value={flight_from}
            name="flight_from"
            width="150px"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
          />
        </Grid>
        <Grid item md={6} mb={4}>
          <TextField
            placeholder="Flight To"
            id="flight_to"
            label="Flight to"
            name="flight_to"
            width="150px"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            value={flight_to}
          />
        </Grid>
        <Grid item md={6} mb={4}>
          <TextField
            placeholder="Number of passengers eg 5"
            name="num_of_passengers"
            label="No of Passengers"
            width="150px"
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            value={num_of_passengers}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item md={6} mb={4}>
          <SelectState value={category} handleChange={handleChange} />
        </Grid>
        <Grid item md={6} mb={4}>
          <Calendar
            handleChange={handleChange}
            label="Date"
            name="flight_date"
            value={flight_date}
          />
        </Grid>
        {category === "ROUND TRIP" && (
          <Grid item md={6} mb={4}>
            <Calendar
              label="Return Date"
              name="return_flight_date"
              handleChange={handleChange}
              value={return_flight_date}
            />
          </Grid>
        )}

        <Grid item md={6}>
          <MyButton
            sx={{
              marginTop: "7px",
              width: "150px",
            }}
            onClick={() => {
              if (handleCheck()) return;
              handleOpen();
            }}
          >
            Continue
          </MyButton>
        </Grid>
        <Grid item md={6} sx={{ display: "flex", flex: 1 }} />
      </Grid>
      <UserModal
        handleChange={handleChange}
        handleClose={handleClose}
        open={open}
        handleSubmit={handleSubmit}
        loading={loading}
      />
    </>
  );
};

export default Booking;
