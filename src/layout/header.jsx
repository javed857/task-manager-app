import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
import AddIcon from "../assets/images/add_icon.svg";
import UserImage from "../assets/images/user_image.svg";
import config from "../assets/config";
import axios from "axios";

function ResponsiveAppBar() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState();

  useEffect(() => {
    axios.get(`${config?.apiURL}/api/`).then((res) => {
      setUserName(
        `${
          res?.data?.results?.[0]?.name?.first +
          " " +
          res?.data?.results?.[0]?.name?.last
        }`
      );
    });
  }, []);

  return (
    <AppBar
      position="static"
      className="header_container"
      sx={{
        backgroundColor: "#005981",
        height: "100px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="l">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              display: { xs: "flex" },
              flexGrow: 1,
            }}
            className="app_icon_container"
          >
            <span style={{color:"white", textDecoration:"none"}}>To Do</span>
          </Typography>

          <img
            src={AddIcon}
            alt="win"
            className="add_icon_image"
            title="Create New Task"
            style={{
              paddingRight: "20px",
              cursor: "pointer",
            }}
            onClick={() => navigate("/create")}
          />
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="User">
              <IconButton sx={{ p: 0 }}>
                <Avatar
                  alt="Remy Sharp"
                  src={UserImage}
                  sx={{
                    width: "68px",
                    height: "68px",
                  }}
                />
                <span
                  style={{
                    paddingLeft: "10px",
                    color: "white",
                  }}
                >
                 {userName}
                </span>
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
