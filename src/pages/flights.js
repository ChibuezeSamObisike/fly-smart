import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import AirCard from "../components/AirCard";
import NavBar from "../components/NavBar";
import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import http from "../utils/http";
import { LoaderSmall } from "./../loader/loader";

const Flights = () => {
  const data = useLocation();
  const params = new URLSearchParams(useLocation().search);
  const quoteId = params.get("quote");

  const [quoteDetails, setQuoteDetails] = useState({});
  const [loading, setLoading] = useState(true);

  const getQuotes = async () => {
    const { data } = await http.get(`quotes/${quoteId}`);
    console.log(data);
    setQuoteDetails(data);
  };

  const bookFlight = async () => {
    const result = await http.post(`quotes/${quoteId}/book_flight/`);
  };

  useEffect(() => {
    getQuotes();
    setLoading(false);
  }, []);

  if (loading) return <LoaderSmall />;

  return (
    <>
      <NavBar />
      <Box
        sx={{
          display: "flex",
          marginTop: "150px",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography component="h1" variant="h1">
          Hi {quoteDetails.firstname}!
        </Typography>
        <Typography variant="p" component="p">
          Thank you for your request.
        </Typography>
        <Typography
          sx={{
            width: "45%",
            textAlign: "center",
            marginBottom: "40px",
            marginTop: "25px",
          }}
        >
          Here are some of the best owner quotes so far for your flight from{" "}
          <span sx={{ fontWeight: "600" }}>{quoteDetails.flight_from}</span>{" "}
          {""}
          to{" "}
          <span sx={{ fontWeight: "600" }}>
            {""} {quoteDetails.flight_to}
          </span>{" "}
          on <span sx={{ fontWeight: "600" }}>{quoteDetails.flight_date}</span>{" "}
          Prices are all inclusive.
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {quoteDetails?.flight_suggestions?.length >= 1 ? (
          quoteDetails?.flight_suggestions?.map((flight, i) => (
            <AirCard key={flight.id} {...flight} />
          ))
        ) : (
          <h1>You have not booked any flight yet</h1>
        )}
      </Box>
    </>
  );
};

export default Flights;
