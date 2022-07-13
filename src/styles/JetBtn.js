import { Button } from "@mui/material";
import { withStyles } from "@mui/styles";

const styles = () => ({
  button: {
    backgroundColor: "#5C0632",
    color: "white",
    margin: "15px",
    display: "flex",
    justifyContent: "center",
    "&:hover": {
      backgroundColor: "grey",
      color: "#5C0632",
    },
  },
});

function JetBtn(props) {
  const { classes, children } = props;
  return (
    <Button
      variant="contained"
      color="primary"
      className={classes.button}
      onClick={props.onClick}
    >
      <b> {children}</b>
    </Button>
  );
}

export default withStyles(styles)(JetBtn);
