import React, { useState } from "react";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { IoAirplaneSharp } from "react-icons/io5";
import ModalComponent from "./modal";
import http from "../utils/http";
import TableComponent from "./tableComponent.js";

const Terminal = () => {
  //Normal Modal Functionality
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingID, setIsEditingID] = useState(null);
  const [terminalData, setTerminalData] = React.useState([]);

  const handleIsEditing = (id) => {
    console.log(id);
    setIsModalOpen(true);
    setIsEditingID(id);
    console.log(isEditingID);
    setIsEditing(true);
  };

  // React.useEffect(() => {
  //   console.log(isEditingID);
  // }, [isEditingID]);

  const handleClose = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setIsEditingID(null);
  };

  const handleOpen = () => {
    setIsModalOpen(true);
  };

  React.useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const {
      data: { results },
    } = await http.get("terminals");
    setTerminalData(results);
  };

  return (
    <div className="divTerminal">
      <Container>
        <ModalComponent
          open={isModalOpen}
          onClose={handleClose}
          isEditing={isEditing}
          isEditingID={isEditingID}
          getData={getData}
          terminalData={terminalData}
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="outlined"
            endIcon={<IoAirplaneSharp />}
            onClick={() => handleOpen()}
          >
            Create Terminal
          </Button>
        </Box>
        <TableComponent
          terminalData={terminalData}
          handleIsEditing={handleIsEditing}
          getData={getData}
        />
      </Container>
    </div>
  );
};

export default Terminal;
