import { TextField, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  let inputSx = {
    margin: "20px 0",
  };
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <form>
        <TextField id="outlined-name" label="Name" fullWidth sx={inputSx} />
        <TextField id="outlined-name" label="Name" fullWidth sx={inputSx} />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: "#5C0632",
            padding: "10px",
          }}
          onClick={() => navigate("/flights")}
        >
          SignUp
        </Button>
      </form>
    </Box>
  );
};

export default SignUp;
