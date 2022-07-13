import * as React from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useNavigate } from "react-router-dom";
import { InputLabel } from "@mui/material";

export default function SelectState({ handleChange, value }) {
  const navigate = useNavigate();
  const [age, setAge] = React.useState("");

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl sx={{ width: "200px" }}>
        <InputLabel id="demo-simple-select-label">Kindly Set trip</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          width="150px"
          defaultValue={value}
          name="category"
          label="Select Trip"
          onChange={(e) => {
            setAge(e.target.value);
            handleChange(e.target.name, e.target.value);
          }}
          InputLabelProps={{
            shrink: true,
          }}
        >
          <MenuItem value={"ONE WAY"}>One Way</MenuItem>
          <MenuItem value={"ROUND TRIP"}>Round Trip</MenuItem>
          <MenuItem value={"MULTI CITY"}>Multi City</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
