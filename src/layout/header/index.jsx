import React, { useState, useEffect } from "react";
import CustomModal from '../../common/customModal';
import { SocialIcon } from 'react-social-icons';
import 'antd/dist/antd.css';

import { Link } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";

import { useNavigate } from "react-router-dom";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const initialState = {
  anchorEl: null,
  mobileMoreAnchorEl: null,
};

const Header = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [total, setTotal] = useState({ notifications: 0, messages: 0 });
  const [visible, setVisible] = useState(initialState);

  const token = localStorage.getItem("x-access-token");

  useEffect(() => {
    const getNotifications = async () => {
      try {
        const result = await fetch("/notifications", {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
        });
        const resultData = await result.json();
        setData(resultData);

        if (resultData) {
          setTotal({
            notifications:
              resultData.postData.length + resultData.commentData.length,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    getNotifications();
  }, [token]);

  const isMenuOpen = Boolean(visible.anchorEl);
  const isMobileMenuOpen = Boolean(visible.mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setVisible({ anchorEl: event.currentTarget });
  };

  const handleNotification = () => {
    // navigate("/notifications");
    setShowModal(!showModal);
  };

  const handleLogout = async () => {
    const result = await fetch("/logout-user", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    });

    if (result.status === 200) {
      let confirmAction = window.confirm("Are you sure, you want to logout?");
      if (confirmAction) {
        localStorage.clear("instaUser");
        localStorage.clear("x-access-token");
        navigate("/login");
      } else {
        navigate("/dashboard");
      }
    } else {
      navigate("/dashboard");
    }
  };

  const handleMobileMenuClose = () => {
    setVisible({ mobileMoreAnchorEl: null });
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  const handleMenuClose = () => {
    setVisible({ anchorEl: null });
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setVisible({ mobileMoreAnchorEl: event.currentTarget });
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={visible.anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleProfile}>Profile</MenuItem>
      <MenuItem onClick={handleLogout}>Log Out</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={visible.mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    ></Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: "white" }}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              display: {
                xs: "none",
                sm: "block",
                color: "black",
                marginLeft: "20%",
              },
            }}
          >
            <SocialIcon url="https://instagram.com/jaketrent" bgColor="white" fgColor="black" />
            <Link to="/dashboard" style={{ color: "black" }}>
              Instagram
            </Link>
          </Typography>
          <Search
            style={{
              border: "1px solid grey",
              marginLeft: "15%",
              height: "35px",
            }}
          >
            <SearchIconWrapper>
              <SearchIcon style={{ color: "grey" }} />
            </SearchIconWrapper>
            <StyledInputBase
              style={{ color: "grey" }}
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton
            size="large"
            aria-label="logout"
            color="inherit"
            aria-haspopup="true"
            onClick={() => {
              navigate("/create-post");
            }}
          >
            <AddCircleSharpIcon style={{ color: "grey" }} />
          </IconButton>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton size="large" color="inherit">
              <Badge badgeContent={total.messages ? total.messages : '0'} color="error">
                <MailIcon style={{ color: "grey" }} />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              color="inherit"
              onClick={() => handleNotification}
            >
              <Badge
                badgeContent={total.notifications ? total.notifications : "0"}
                color="error"
              >
                <NotificationsIcon style={{ color: "grey" }} />
              </Badge>
            </IconButton>

            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle style={{ color: "grey" }} />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon style={{ color: "grey" }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {showModal && (
        <CustomModal title="Hello" showModal={showModal} data={data} />
      )}
    </Box>
  );
};

export default Header;
