import { Box } from "@mui/system";
const EachFlight = ({ name }) => {
  return (
    <Box
      sx={{
        padding: "10px",
        border: "0.75px solid grey",
        borderRadius: "50px",
        marginBottom: "5px",
      }}
    >
      {name}
    </Box>
  );
};

export default EachFlight;
