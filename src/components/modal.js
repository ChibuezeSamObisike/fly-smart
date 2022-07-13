import React, { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { TextField } from "@mui/material";
import statesValue from "../../src/states.json";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Typography } from "@mui/material";
import states from "../states.json";
import MyButton from "../styles/button";
import http from "../utils/http";
import { toast } from "react-toastify";
import { LoaderSmall } from "../loader/loader";

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
};

export default function ModalComponent({
  open,
  onClose,
  isEditing,
  isEditingID,
  getData,
  terminalData,
}) {
  const [terminalInfo, setTerminalInfo] = useState({
    name: "",
    city: "",
    code: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditing) {
      const findItem =
        terminalData &&
        isEditing &&
        terminalData?.find((data) => data.id === isEditingID);
      setTerminalInfo(findItem);
    } else {
    }
  }, [isEditingID]);

  const handleSubmit = async () => {
    const { name, city, code } = terminalInfo;
    if (!name || !city || !code) {
      toast.error("Kindly Input all fields");
      return;
    }
    if (isEditing) {
      try {
        const result = await http.patch(
          `terminals/${isEditingID}/`,
          terminalInfo
        );
        setTerminalInfo({ name: "", city: "", code: "" });
        await getData();
        onClose();
      } catch (ex) {
        console.log(ex);
      }
    } else {
      try {
        setLoading(true);
        const result = await http.post("terminals/", terminalInfo);
        console.log(result);
        setTerminalInfo({ name: "", city: "", code: "" });
        await getData();
        setLoading(false);
        onClose();
      } catch (ex) {
        console.log(ex);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={onClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography variant="h6" component="h6" sx={{ fontWeight: "bold" }}>
              {isEditing
                ? " Kindly Edit What you want"
                : "Input Terminal Location"}
            </Typography>
            <form onSubmit={(e) => e.preventDefault()}>
              <FormControl
                fullWidth
                sx={{ marginBottom: "50px", marginTop: "20px" }}
              >
                <TextField
                  labelId="demo-simple-select-label"
                  name="name"
                  label="Name"
                  value={terminalInfo.name}
                  onChange={(e) =>
                    setTerminalInfo({
                      ...terminalInfo,
                      [e.target.name]: e.target.value,
                    })
                  }
                  sx={{ marginBottom: "20px" }}
                  id="demo-simple-select"
                />

                <TextField
                  labelId="demo-simple-select-label"
                  name="city"
                  label="City"
                  value={terminalInfo.city}
                  onChange={(e) =>
                    setTerminalInfo({
                      ...terminalInfo,
                      [e.target.name]: e.target.value,
                    })
                  }
                  sx={{ marginBottom: "20px" }}
                  id="demo-simple-select"
                />

                <TextField
                  labelId="demo-simple-select-label"
                  name="code"
                  label={isEditing ? "" : "Code"}
                  value={terminalInfo.code}
                  onChange={(e) =>
                    setTerminalInfo({
                      ...terminalInfo,
                      [e.target.name]: e.target.value,
                    })
                  }
                  sx={{ marginBottom: "20px" }}
                  id="demo-simple-select"
                />
                {loading && <LoaderSmall />}
              </FormControl>

              <MyButton type="submit" onClick={handleSubmit}>
                {isEditing
                  ? "Submit Edited Details"
                  : "Create Available Flights"}
              </MyButton>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
