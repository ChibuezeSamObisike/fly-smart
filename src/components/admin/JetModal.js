import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Fade,
  Typography,
  FormControl,
  TextField,
} from "@mui/material";
import DateTimePicker from "@mui/lab/DateTimePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import JetBtn from "../../styles/JetBtn";
import http from "../../utils/http";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "0.4px solid #000",
  boxShadow: 0,
  p: 4,
  overflowY: "scroll",
  maxHeight: "85%",
};

function JetModal({
  open,
  onClose,
  onSubmit,
  handleReload,
  isEditing,
  getJets,
  isEditingID,
  jets,
}) {
  const [formState, setFormState] = useState({
    jet_code: "",
    flight_date: "",
    max_passengers: 0,
    price: 0,
    flight_from: "",
    flight_to: "",
    images: [], // for backend
  });

  useEffect(() => {
    if (isEditing) {
      console.log(jets);
      console.log(isEditing);
      let findItem = jets.find((re) => re.id === isEditingID);
      console.log(findItem);
      const {
        jet_code,
        flight_date,
        max_passengers,
        f_from,
        f_to,
        images,
        price,
      } = findItem;
      setFormState({
        jet_code,
        flight_date,
        max_passengers,
        price,
        flight_from: f_from.name,
        flight_to: f_to.name,
        images,
      });
    } else {
      console.log(">>>> Not editing");
      console.log(isEditing);
      console.log(isEditingID);
    }
  }, [isEditing, isEditingID]);

  const [statesValue, setStatesValue] = useState([]);

  const getStates = async () => {
    let {
      data: { results },
    } = await http.get("terminals");
    // console.log(results);
    setStatesValue(
      results.map((result) => {
        return { name: result.name, id: result.id };
      })
    );
  };

  useEffect(() => {
    getStates();
  }, []);

  const handleInputChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateChange = (name) => (value) => {
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  const handleFileUpload = (e) => {
    const selectedFiles = e.target.files;

    setFormState((curr) => ({
      ...curr,
      images: [...selectedFiles],
    }));
  };

  // console.log(formState);

  const handleSubmit = async (id) => {
    const iData = new FormData();
    iData.append("jet_code", formState.jet_code);
    iData.append("flight_date", new Date(formState.flight_date).toISOString());
    iData.append("max_passengers", formState.max_passengers);
    iData.append("price", formState.price);
    iData.append("flight_from", formState.flight_from);
    iData.append("flight_to", formState.flight_to);
    formState.images?.forEach((image, i) => {
      iData.append(`images[${i}]`, image);
    });

    console.log(formState);

    onSubmit(formState);
    if (isEditing) {
      try {
        const result = await http.patch(
          `flights/${isEditingID}/`,
          iData,
          config
        );
        console.log(result);
        console.log("Item successfully edited.");
      } catch (error) {
        alert(error);
      }
      handleReload();
    } else {
      try {
        const response = await http.post("flights/", iData, config);
        console.log(response);
      } catch (err) {
        console.log(err.response);
      }
      handleReload();
    }
  };

  return (
    <div>
      <Modal open={open} onClose={onClose}>
        <Fade in={open}>
          <Box sx={style}>
            <Typography
              variant="h6"
              component="h6"
              sx={{ fontWeight: "bold", textAlign: "center" }}
            >
              Create Flight Suggestion
            </Typography>

            <form encType="multipart/form-data">
              <FormControl>
                <label>Jet Code</label>
                <TextField
                  name="jet_code"
                  id="outlined-basic"
                  label="Jet Code"
                  variant="outlined"
                  value={formState.jet_code}
                  onChange={handleInputChange}
                  sx={{ margin: "10px" }}
                />
              </FormControl>

              <FormControl>
                <label sx={{ paddingBottom: "5px" }}>Date and Time</label>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    name="flight_date"
                    value={formState.flight_date}
                    onChange={handleDateChange("flight_date")}
                    renderInput={(params) => <TextField {...params} />}
                    sx={{ margin: "10px" }}
                  />
                </LocalizationProvider>
              </FormControl>

              <FormControl sx={{ marginTop: "10px" }}>
                <label>Max Passenger</label>
                <TextField
                  id="outlined-basic"
                  name="max_passengers"
                  label="Max Passenger"
                  variant="outlined"
                  type="number"
                  value={formState.max_passengers}
                  onChange={handleInputChange}
                  sx={{ margin: "10px" }}
                />
              </FormControl>

              <FormControl>
                <label>Price</label>
                <TextField
                  id="outlined-basic"
                  name="price"
                  label="Price"
                  variant="outlined"
                  type="number"
                  value={formState.price}
                  onChange={handleInputChange}
                  sx={{ margin: "10px" }}
                />
              </FormControl>

              <Box sx={{ margin: "5px" }}>
                <FormControl sx={{ float: "left" }}>
                  <label>Flight From</label>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="flight_from"
                    value={formState.flight_from}
                    defaultValue="Kindly Select the flight take off location"
                    label="Takes off at"
                    onChange={handleInputChange}
                  >
                    {statesValue?.map(({ name, id }) => (
                      <MenuItem key={name} value={id}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl sx={{ float: "right" }}>
                  <label>Flight To</label>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="flight_to"
                    value={formState.flight_to}
                    defaultValue="Kindly Select the flight take off location"
                    label="Takes off at"
                    onChange={handleInputChange}
                  >
                    {statesValue?.map(({ name, id }) => (
                      <MenuItem key={name} value={id}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              <FormControl sx={{ marginTop: "10px" }}>
                <label>Flight Image</label>
                <TextField
                  accept="image/*"
                  id="outlined-basic"
                  name="images"
                  type="file"
                  variant="outlined"
                  onChange={handleFileUpload}
                  inputProps={{
                    multiple: true,
                  }}
                  sx={{ marginLeft: "10px" }}
                />
              </FormControl>

              <JetBtn onClick={() => handleSubmit()}>
                {isEditing ? "Edit" : "Add"} Jet
              </JetBtn>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default JetModal;
