import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import { Container, Typography, Button } from "@mui/material";
import MyButton from "../../styles/button";
import { toast } from "react-toastify";
import EachFlight from "./eachFlight";
import http from "../../utils/http";

export default function SideSwipeableDrawer({
  paramsID,
  getFlightSuggestions,
}) {
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleAddFlight = (anchor, open) => {
    setState({ ...state, [anchor]: open });
  };

  let colors = ["#fc757b", "#7d48c3", "#0e7b55", "#5475ff"];
  const [flightInfo, setFlightInfo] = useState([]);

  const getFlights = async () => {
    const {
      data: { results },
    } = await http.get("flights");
    // console.log(results);
    setFlightInfo(results);
  };
  useEffect(() => {
    getFlights();
  }, []);

  const [selectedFlights, setSelectedFlights] = useState([]);

  const handleStateFlights = (flight) => {
    setSelectedFlights((prev) => [...prev, flight]);
  };

  const handleRemoveFlights = (flight) => {
    const fli = selectedFlights.filter((flightInfo) => flightInfo !== flight);
    setSelectedFlights(fli);
  };

  const handleSubmit = async () => {
    console.log("p>", paramsID);
    const submitID = selectedFlights.map((flight) => flight.id);
    console.log(submitID);
    try {
      const result = await http.post(
        `quotes/${paramsID}/create_flight_suggestion/`,
        {
          flight_suggestions: submitID,
        }
      );
      getFlightSuggestions();
    } catch (ex) {
      console.log(ex);
    }
  };

  const randomColors = () => {
    let x = Math.floor(Math.random() * colors.length);
    return colors[x];
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 540 }}
      role="presentation"
    >
      <List sx={{ margin: "20px" }}>
        <form onSubmit={(e) => e.preventDefault()}>
          <Container>
            <Typography
              component="h4"
              variant="h4"
              sx={{ marginBottom: "10px", letterSpacing: "-2" }}
            >
              Added Flights
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <MyButton onClick={handleSubmit} sx={{ marginBottom: "20px" }}>
                Submit Added Flights
              </MyButton>

              {selectedFlights?.map((flight) => {
                // console.log(flight);
                return (
                  <EachFlight key={flight.jet_code} name={flight.jet_code} />
                );
              })}
            </Box>

            {!flightInfo.length && <h3>No added flights</h3>}
            {flightInfo?.map((flight, index) => (
              <Box
                sx={{
                  backgroundColor: randomColors(),
                  borderRadius: "10px",
                  marginTop: "10px",
                  cursor: "pointer",
                }}
                fullWidth
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "25px",
                    color: "white",
                  }}
                >
                  <Typography variant="h6" component="h6">
                    Name: {flight.jet_code}
                  </Typography>
                  <Typography variant="h6" component="h6">
                    Jet Code: {flight.jet_code}
                  </Typography>
                  <Typography variant="h6" component="h6">
                    Location: {flight.f_to.name} to {flight.f_from.name}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      sx={{
                        backgroundColor: "white",
                        color: "black",
                        "&:hover": {
                          color: "white",
                        },
                      }}
                      disabled={selectedFlights.includes(flight)}
                      onClick={() => {
                        toast.success("added to the selected");
                        handleStateFlights(flight);
                      }}
                    >
                      {selectedFlights.includes(flight) ? "Added" : "Add"}
                    </Button>
                    <Button
                      sx={{
                        backgroundColor: "transperent",
                        outline: "none",
                        color: "white",
                        border: "1px solid white",
                        margin: "10px",
                      }}
                      onClick={() => {
                        toast.error("Removed to the selected");
                        handleRemoveFlights(flight);
                      }}
                    >
                      Remove
                    </Button>
                  </Box>
                </Box>
              </Box>
            ))}
          </Container>
        </form>
      </List>
      <Divider />
    </Box>
  );

  return (
    <>
      {" "}
      <div>
        {["right"].map((anchor) => (
          <React.Fragment key={anchor}>
            <SwipeableDrawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
              onOpen={toggleDrawer(anchor, true)}
            >
              {list(anchor)}
            </SwipeableDrawer>
          </React.Fragment>
        ))}
      </div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          width: "auto",
          marginTop: "40px",
        }}
      >
        <MyButton onClick={toggleDrawer("right", true)}>
          Add Flight Suggestions
        </MyButton>
      </Box>
    </>
  );
}
