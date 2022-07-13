import { TextField, Box, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import http from "../utils/http";
import { setToken, isAuthenticated } from "./../utils/auth";
import { toast } from "react-toastify";

const Login = () => {
  const [adminData, setAdminData] = useState({});
  const navigate = useNavigate();

  //Submitting the Login Token
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {
        data: { access },
      } = await http.post("auth/login/", adminData);
      console.log(access);
      setToken(access);
      http.setJwt(access);
      if (access) return navigate("/admin/quotes");
    } catch (ex) {
      console.error(ex);

      navigate("/");
    }
  };

  //Check if user is loggged in Already
  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/admin/quotes");
    }
  }, []);

  //Handle Change
  const handleChange = (e) => {
    setAdminData({ ...adminData, [e.target.name]: e.target.value });
  };

  //Style
  let inputSx = {
    margin: "20px 0",
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Username</label>
        <TextField
          id="outlined-name"
          name="email"
          label="Username"
          onChange={(e) => handleChange(e)}
          fullWidth
          sx={inputSx}
        />
        <label htmlFor="">Password</label>
        <TextField
          id="outlined-name"
          label="Password"
          name="password"
          type="password"
          onChange={(e) => handleChange(e)}
          fullWidth
          sx={inputSx}
        />
        <Container>
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#5C0632",
              padding: "10px",
              width: "25%",
              marginLeft: "300px",
            }}
            onClick={handleSubmit}
          >
            Login
          </Button>
        </Container>
      </form>
    </Box>
  );
};

export default Login;
