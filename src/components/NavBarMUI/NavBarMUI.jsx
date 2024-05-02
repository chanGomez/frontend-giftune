import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Modal } from "@mui/material";
import { createPortal } from "react-dom";
import { useState } from "react";
import Questionnaire from "../Questionnire/Questionnaire";
import { doSignInWithGoogle } from "../Auth/Firebase/Auth";
// import { useAuth } from "../common/context/authContext";
import { NavLink, useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {auth} from "../Auth/Firebase/Firebase"
import { createUser } from "../API/API";

// import GiftuneLogo from "../../Assets/Word_logo.png";

const pages = ["Log Out"];
const pagesNotLoggedIn = ["Find Wishlist", "Login"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 14,
  p: 4,
};

function ResponsiveAppBar({ user, setUser }) {
  const navigate = useNavigate();

  function handleLogOut() {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  }

  //modal-----
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  //auth----
  // const { userLoggedIn } = useAuth();

  const [isSigningIn, setIsSigningIn] = useState(false);

  const onGoogleSignIn = async (e) => {
  const provider = await new GoogleAuthProvider();
    return signInWithPopup(auth, provider)
        if (!isSigningIn) {
          setIsSigningIn(true);
          setUser(user.data);
          doSignInWithGoogle().catch((err) => {
            setIsSigningIn(false);
          });
        }
  };

  return user ? (
    //LOGGED IN
    <AppBar position="static">
      <Container maxWidth="xl" sx={{ maxWidth: 1050 }}>
        <Toolbar disableGutters>
          <Typography
            variant="h3"
            noWrap
            href="#app-bar-with-responsive-menu"
            sx={{
              // ml: 5,
              mr: 5,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              // letterSpacing: '.3rem',
              textDecoration: "none",
            }}
          >
            Giftune
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Giftune
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "end",
            }}
          >
            <Button
              onClick={handleLogOut}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              {pages}
            </Button>
          </Box>

          {/* <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box> */}
        </Toolbar>
      </Container>
    </AppBar>
  ) : (
    //NOT LOGGED IN
    <AppBar position="static">
      <Container maxWidth="l" sx={{ maxWidth: 1200 }}>
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          {/* <img className="logo-nav" src={GiftuneLogo} alt="logo"  style={{width: 200, mixBlendMode: 'multiply', filter: "invert()"}}/> */}

          <NavLink to={"/"}>
            <Typography
              variant="h3"
              noWrap
              href="#app-bar-with-responsive-menu"
              sx={{
                // ml: 5,
                mr: 5,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                // letterSpacing: '.3rem',
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Giftune
            </Typography>
          </NavLink>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pagesNotLoggedIn.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Giftune
          </Typography>

          <Box
            sx={{
              flexGrow: 2,
              display: { xs: "none", md: "flex", justifyContent: "end" },
            }}
          >
            {/* {pagesNotLoggedIn.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))} */}
            {/* <NavLink to={"/search-page"}> */}
            <Button
              onClick={() => {
                navigate("/search-page");
              }}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Find Wishlist
            </Button>
            {/* </NavLink> */}
            <Button
              onClick={handleOpen}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Sign In
            </Button>
            {open && (
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  {/* if login successfull && and user does not have DOB then do questionaire */}
                  {user &&
                    navigate(`/dashboard/${user.id}/userwishlist`)}
                  {user ? (
                    <Questionnaire />
                  ) : (
                    <>
                      <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                      >
                        Sign In with google
                      </Typography>
                      <Button onClick={onGoogleSignIn}>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                          GOOGLE
                        </Typography>
                      </Button>
                    </>
                  )}
                </Box>
              </Modal>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
