import { createTheme } from "@mui/material";

const theme = createTheme();

export const globalTheme = createTheme({
  typography: {
    h1: {
      fontWeight: 600,
      fontSize: 72,
      letterSpacing: -3,
      // or 'bold'
      [theme.breakpoints.down("sm")]: {
        fontSize: 36,
        letterSpacing: -1,
      },
    },
    h4: {
      letterSpacing: -3,
      fontWeight: 600,
    },
    p: {
      fontSize: "20px",
      letterSpacing: -1,
    },
    fontFamily: ["Inter"].join(","),
  },
});
