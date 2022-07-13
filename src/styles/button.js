import { styled, Button } from "@mui/material";

const MyButton = styled(Button)({
  color: "white",
  backgroundColor: "#5C0632",
  padding: 10,
  width: "100%",
  borderRadius: 4,
  "&:hover": {
    backgroundColor: "#5C0632",
    opacity: 0.6,
  },

  "& > .MuiBox-root": {},
});

export default MyButton;
