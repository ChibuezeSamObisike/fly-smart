import { Typography, Box, Button, useTheme } from "@mui/material";
import { styled } from "@mui/system";

const ThirdHeader = () => {
  const theme = useTheme();
  const boxStyle = {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fff",
    height: "75%",
    marginTop: "70px",
    marginRight: "80px",
    width: "auto",
    zIndex: "1000",
    padding: "20px",
    [theme.breakpoints.down("sm")]: {},
  };

  const MyButton = styled(Button)({
    color: "white",
    backgroundColor: "#5C0632",
    padding: "10px 20px",
    borderRadius: "25px",
    display: "block",
    width: "auto",
    marginTop: "20px",

    "&:hover": {
      backgroundColor: "#5C0632",
      opacity: 0.6,
    },

    "& > .MuiBox-root": {},
  });

  return (
    <div className="third-header">
      <Box style={boxStyle}>
        <Typography variant="h4" component="h1" sx={{ marginBottom: "10px" }}>
          Flying to every <br /> airport, worldwide
        </Typography>
        <Typography variant="p" component="p">
          Wherever you are, Central Jets can get
          <br /> you to your chosen destination with
          <br /> the best possible jet at the best possible price.
          <MyButton>About us</MyButton>
        </Typography>
      </Box>
    </div>
  );
};

export default ThirdHeader;
