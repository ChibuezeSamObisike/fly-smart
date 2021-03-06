import { Box, Container, Typography } from "@mui/material";
const SecondHeader = () => {
  return (
    <Container>
      <div className="s-header">
        <Box sx={{ marginBottom: "20px", zIndex: 1000 }}>
          <Typography variant="h4" component="h1">
            Swift jets App – the most innovative <br />
            way to fly private.
          </Typography>
        </Box>

        <Box sx={{ marginBottom: "20px", zIndex: 1000 }}>
          <Typography variant="p" component="p">
            Our technology consistently delivers the best pricing
            <br /> for charters and the unique ability to buy individual
            <br /> seats. Search the world with ease and transparency.
          </Typography>
        </Box>
      </div>
    </Container>
  );
};

export default SecondHeader;
