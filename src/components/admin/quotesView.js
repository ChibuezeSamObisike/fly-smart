import { Container, Grid, Box, Button } from "@mui/material";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { LoaderSmall } from "../../loader/loader";
import SideSwipeableDrawer from "./sideBarToAddDetails";
import SingleFlightSuggestion from "./singleFlightSuggestion";
import http from "../../utils/http";

const QuotesView = () => {
  const navigate = useNavigate();
  const { id: paramsID } = useParams();

  const [quoteViewDetail, setQuoteViewDetail] = useState({});
  const [flightSuggestions, setFlightSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const getDetails = async () => {
    const { data } = await http.get(`quotes/${paramsID}/`);
    setQuoteViewDetail(data);
  };

  const getFlightSuggestions = async () => {
    try {
      const info = await http.get(`quotes/${paramsID}/`);
      //console.log("..", info.data);
      console.log(info.data.flight_suggestions);
      setFlightSuggestions(info.data.flight_suggestions);
    } catch (ex) {
      console.log(ex);
    }
  };

  useEffect(() => {
    setLoading(true);
    getDetails();
    getFlightSuggestions();
    setLoading(false);
    console.log(flightSuggestions);
    console.log(flightSuggestions.length);
  }, []);

  if (loading) return <LoaderSmall />;

  const {
    firstname,
    lastname,
    flight_from,
    flight_to,
    flight_date,
    created_at,
    email,
    phone,
    updated_at,
    is_flight_booked,
  } = quoteViewDetail;
  return (
    <>
      <Container
        sx={{
          margin: "auto",
          marginTop: "40px",
          backgroundColor: "#eee",
          borderRadius: "20px",
          padding: "40px",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
          <Button
            startIcon={<BiArrowBack />}
            sx={{ color: "black" }}
            onClick={() => navigate(-1)}
          >
            Go back
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2 style={{ marginX: "auto", textAlign: "center" }}>
            User Quote details
          </h2>
        </Box>
        <Grid container>
          <Grid item xs={6}>
            <h5>Firstname:</h5>
            <h4>{firstname}</h4>
          </Grid>

          <Grid item xs={6}>
            <h5>LastName: </h5>
            <h4>{lastname}</h4>
          </Grid>

          <Grid item xs={6}>
            <h5>Phone:</h5>
            <h4>{phone}</h4>
          </Grid>

          <Grid item xs={6}>
            <h5>Email: </h5>
            <h4>{email}</h4>
          </Grid>

          <Grid item xs={6}>
            <h5>Flight to:</h5>
            <h4>{flight_to}</h4>
          </Grid>

          <Grid item xs={6}>
            <h5>Flight from: </h5>
            <h4>{flight_from}</h4>
          </Grid>

          <Grid item xs={6}>
            <h5>Flight date:</h5>
            <h4> {flight_date?.split("T")[0]} </h4>
          </Grid>

          <Grid item xs={6}>
            <h5>Is flight booked:</h5>
            <h4>{is_flight_booked ? "Yes" : "No"}</h4>
          </Grid>

          <Grid item xs={6}>
            <h5>Created at:</h5>
            <h4> {created_at?.split("T")[0]}</h4>
          </Grid>

          <Grid item xs={6}>
            <h5>Updated at: </h5>
            <h4>{updated_at?.split("T")[0]}</h4>
          </Grid>
        </Grid>
      </Container>
      <Container>
        <h3>Flight Suggestions</h3>
        <Box sx={{ display: "flex", overflowX: "auto" }} fullWidth>
          {flightSuggestions && flightSuggestions?.length === 0 ? (
            <h1>No flight Suggestion added yet</h1>
          ) : (
            flightSuggestions?.map((flights, i) => (
              <SingleFlightSuggestion key={i} {...flights} />
            ))
          )}
        </Box>
      </Container>
      <SideSwipeableDrawer
        paramsID={paramsID}
        getFlightSuggestions={getFlightSuggestions}
      />
    </>
  );
};

export default QuotesView;
