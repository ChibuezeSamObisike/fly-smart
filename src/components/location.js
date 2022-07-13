import * as React from "react";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import Autocomplete from "@mui/material/Autocomplete";
import { GiAirplaneDeparture } from "react-icons/gi";
import states from "../../src/states.json";

const Location = ({ name, handleChange }) => {
  const [value, setValue] = useState(name);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);

  const optionsFake = [];
  useEffect(() => {
    states.forEach((state) => optionsFake.push(state.name));
    setOptions(optionsFake);
  }, []);

  return (
    <div className="loc">
      <Autocomplete
        fullWidth
        value={value}
        variant="standard"
        freeSolo
        name={name}
        onChange={(event, newValue) => {
          setValue(newValue);
          handleChange(name, newValue);
        }}
        defaultValue={value}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
          handleChange(name, newInputValue);
        }}
        id="controllable-states-demo"
        options={options}
        renderOption={(props, option) => (
          <Box
            component="li"
            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
            {...props}
          >
            <GiAirplaneDeparture color="black" /> &nbsp; &nbsp; &nbsp;
            {option}
          </Box>
        )}
        sx={{ backgroundColor: "" }}
        renderInput={(params) => (
          <TextField
            variant="standard"
            name={name}
            sx={{ border: "none", outline: "none" }}
            {...params}
            InputProps={{
              ...params.InputProps,
              type: "text",
              disableUnderline: true,
              startAdornment: (
                <InputAdornment position="start">
                  <GiAirplaneDeparture />
                </InputAdornment>
              ),
            }}
            label=""
          />
        )}
      />
    </div>
  );
};

export default Location;
