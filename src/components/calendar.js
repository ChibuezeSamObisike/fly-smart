import * as React from "react";
import TextField from "@mui/material/TextField";
import MobileDatePicker from "@mui/lab/MobileDatePicker";

//Converts date string to 22-04-05
//new Date(val).toISOString().split("T")[0]
const Calendar = ({ handleChange, value, label, name }) => {
  return (
    <TextField
      id="date"
      label={label}
      required
      name={name}
      value={value}
      onChange={(e) => handleChange(e.target.name, e.target.value)}
      type="date"
      defaultValue="2017-05-24"
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
};

export default Calendar;
