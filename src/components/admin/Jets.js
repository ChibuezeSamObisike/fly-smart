import React, { useState, useEffect } from "react";
import { Box, Container, Button } from "@mui/material";
import { IoAirplaneSharp } from "react-icons/io5";
import JetModal from "./JetModal";
import JetCard from "./JetCard";
import http from "../../utils/http";
import emptyJet from "../../Airplane-Coloring-Page.jpg.webp";
import "../../styles/img.css";
import { LoaderSmall } from "../../loader/loader";

const Jets = () => {
  //state declaration for modal and jet info creation
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jets, setJets] = useState([]);
  const [jetUpload, setJetUpload] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingID, setIsEditingID] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const onCreateJet = (jetPayload) => {
    // console.log(">>>>>>>>>>>>", jetPayload);
    setJets([jetPayload, ...jets]);
    setIsModalOpen(false);
  };

  const getJets = async () => {
    try {
      setIsLoading(true);
      const { data } = await http.get("flights");
      console.log("jets", data);
      setJetUpload(data.results);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getJets();
  }, []);

  const handleClose = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setIsEditingID(null);
  };

  const addJetModalOpen = () => {
    setIsModalOpen(true);
  };

  const onEditing = (id) => {
    setIsModalOpen(true);
  };

  if (isLoading) return <LoaderSmall />;

  return (
    <div>
      <Container>
        <JetModal
          open={isModalOpen}
          onClose={handleClose}
          getJets={getJets}
          onSubmit={onCreateJet}
          isEditing={isEditing}
          jets={jetUpload}
          isEditingID={isEditingID}
          handleReload={getJets}
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="outlined"
            endIcon={<IoAirplaneSharp />}
            onClick={() => addJetModalOpen()}
          >
            Add Jet
          </Button>
        </Box>
      </Container>

      {jetUpload.length === 0 ? (
        <div className="noJetsContainer">
          <img src={emptyJet} className="noJetImage" />
          <h1 style={{ color: "grey" }}>No jets available</h1>
        </div>
      ) : (
        jetUpload?.map((jet) => (
          <JetCard
            JetData={jet}
            setJets={setJets}
            handleReload={getJets}
            onEditing={onEditing}
            setIsEditing={setIsEditing}
            setIsEditingID={setIsEditingID}
          />
        ))
      )}
    </div>
  );
};

export default Jets;
