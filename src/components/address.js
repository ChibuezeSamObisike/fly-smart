import TextField from "@mui/material/TextField";
import { FaBeer } from "react-icons/fa";
const Addess = (props) => {
  console.log(props);
  return (
    <div className="loc">
      <FaBeer />
      <TextField {...props} style={{ color: "black" }}></TextField>;
    </div>
  );
};

export default Addess;
