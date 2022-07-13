import { Container, Typography, Box, useTheme } from "@mui/material";
import Booking from "./booking";

// const theme=
//3.5 3.5 3 2
const Header = ({
  handleOpen,
  title = "Smartest and fastest way of Executive travel",
}) => {
  const theme = useTheme();

  let style = {
    textAlign: "center",
    color: "white",
    zIndex: 120,
  };

  let styleContainer = {
    zIndex: 120,
    position: "relative",
  };
  return (
    <>
      <div className="img-header">
        <Container fixed sx={styleContainer}>
          <Typography variant="h1" component="h1" sx={style}>
            {title}
          </Typography>
        </Container>
      </div>
    </>
  );
};

export default Header;
