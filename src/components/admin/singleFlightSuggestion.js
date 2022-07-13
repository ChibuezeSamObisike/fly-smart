import { Box, Typography } from "@mui/material";
const SingleFlightSuggestion = (props) => {
  return (
    <Box
      sx={{
        backgroundColor: "transperent",
        borderRadius: "10px",
        padding: "20px",
        color: "black",
        marginTop: "10px",
        margin: "5px",
        cursor: "pointer",
        width: "100%",
        border: "0.75px solid black",
      }}
      fullWidth
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          width: "100%",
        }}
      >
        <Typography
          variant="body2"
          component="h6"
          sx={{ marginBottom: "10px" }}
        >
          Name: {props.jet_code}
        </Typography>
        <Typography
          variant="body2"
          component="h6"
          sx={{ marginBottom: "10px" }}
        >
          Passengers: {props.max_passengers}
        </Typography>
        <Typography
          variant="body2"
          component="h6"
          sx={{ marginBottom: "10px" }}
        >
          Location: {props.f_to.name} to {props.f_from.name}
        </Typography>

        <Typography
          variant="body2"
          component="h6"
          sx={{ marginBottom: "10px" }}
        >
          Date: {props.flight_date.split("T")[0]}
        </Typography>
        <Typography
          variant="body2"
          component="h6"
          sx={{ marginBottom: "10px" }}
        >
          Price: N{props.price}
        </Typography>
      </Box>
    </Box>
  );
};

export default SingleFlightSuggestion;
