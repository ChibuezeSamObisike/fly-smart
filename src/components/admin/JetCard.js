import React from "react";
import http from "../../utils/http";
import JetBtn from "../../styles/JetBtn";
import "../../styles/img.css";
import { Typography, Paper } from "@mui/material";
import { Box } from "@mui/system";
import { Carousel } from "react-responsive-carousel";
import Grid from "@mui/material/Grid";

const JetCard = ({
  JetData,
  handleReload,
  onEditing,
  setJets,
  setIsEditing,
  setIsEditingID,
}) => {
  const sxBox = {
    width: "65%",
    display: "flex",
    flexDirection: "column",
    marginBottom: "50px",
    marginTop: "50px",
    borderRadius: "15px",
    marginLeft: "16%",
  };

  const infoBox = {
    justifyContent: "center",
  };

  const onDelete = async (id) => {
    try {
      const result = await http.delete(`flights/${id}`);
      console.log(result);
      handleReload();
      console.log("Item successfully deleted.");
    } catch (error) {
      alert(error);
    }
  };

  const onEdit = async (id) => {
    setIsEditing(true);
    setIsEditingID(id);
    onEditing();
  };

  return (
    <div>
      <Paper sx={sxBox} elevation={6}>
        <Carousel
          showArrows={false}
          showStatus={false}
          autoPlay={true}
          showThumbs={false}
          infiniteLoop={true}
        >
          {JetData?.images?.map((imageUrl) => (
            <img
              src={imageUrl || "#"}
              alt="JetImage"
              className="img"
              key={imageUrl}
            />
          ))}
        </Carousel>

        <Box sx={{ padding: "10px" }}>
          <Typography sx={{ fontSize: "24px", fontWeight: "bold" }}>
            {JetData?.jet_code}
          </Typography>

          <Grid container spacing={3} sx={infoBox}>
            <Grid item xs={6}>
              <Typography>Max Pass: {JetData.max_passengers}</Typography>
              <Typography> ${JetData.price} </Typography>
              <Typography>Date: {JetData.flight_date}</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography sx={{ fontWeight: "bold" }}>
                Flight From: {JetData.f_from.name}
              </Typography>
              <Typography sx={{ fontWeight: "bold" }}>
                Flight To: {JetData.f_to.name}
              </Typography>
            </Grid>
          </Grid>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <JetBtn onClick={() => onDelete(JetData.id)}>REMOVE JET</JetBtn>
            <JetBtn onClick={() => onEdit(JetData.id)}>EDIT JET INFO</JetBtn>
          </Box>
        </Box>
      </Paper>
    </div>
  );
};

export default JetCard;
