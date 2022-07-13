import React, { useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import ProfileImg from "../../images/108.png";
import { IoTrain } from "react-icons/io5";
import { SiManageiq } from "react-icons/si";
import { FaFileInvoice } from "react-icons/fa";
import { IoAirplaneSharp } from "react-icons/io5";
import { MdManageAccounts } from "react-icons/md";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { colors } from "./../../theme/colors";

//MdManageAccounts
//IoTrain

const drawerWidth = 280;

function DashbordTemplate(props) {
  const [colorState, setColorState] = useState(0);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  // console.log(pathname);
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [currPage, setCurrPage] = React.useState(0);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const checkBorder = (idx) => {
    if (idx === currPage) {
      return { borderRight: `2px solid ${colors.primary}` };
    } else {
      return {};
    }
  };

  const drawer = (
    <div>
      <Toolbar />
      <img src={ProfileImg} alt="profile-img" className="img-memoji" />

      <List>
        {[
          {
            idx: 0,
            text: "Manage Quotes",
            icon: <SiManageiq />,
            route: "/admin/quotes",
          },
          {
            idx: 1,
            text: "Manage Terminal",
            icon: <IoTrain />,
            route: "/admin/create-terminal",
          },

          {
            idx: 2,
            text: "Manage Jets",
            icon: <IoAirplaneSharp />,
            route: "/admin/manage-jets",
          },
          {
            idx: 3,
            text: "Manage admins",
            icon: <MdManageAccounts />,
            route: "manage-admins",
          },
          {
            idx: 4,
            text: "Manage Reservations",
            icon: <FaFileInvoice />,
            route: "/admin/manage-reservation",
          },
        ].map(({ text, icon, route, idx }, index) => (
          <NavLink
            button
            key={text}
            style={({ isActive }) => {
              return {
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "black",
                borderRight: isActive && `2px solid ${colors.primary}`,
              };
            }}
            activeClassName="selected"
            to={route}
            // onClick={() => {
            //   setCurrPage(idx);
            //   navigate(route);
            //   console.log(">>>>", currPage, idx);
            // }}
          >
            <Container
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </Container>
          </NavLink>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "#5C0632",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Admin Panel
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <div>{props.children}</div>
      </Box>
    </Box>
  );
}

DashbordTemplate.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DashbordTemplate;
