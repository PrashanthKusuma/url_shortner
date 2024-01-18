import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Login from "./Login";

const Header = ({ isLoggedIn, isAdmin, onLogin, onLogout }) => {
  const [loginOpen, setLoginOpen] = useState(false);
  const handleLoginOpen = () => {
    setLoginOpen(true);
  };

  const handleLoginClose = () => {
    setLoginOpen(false);
  };
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      handleLoginClose();
    }
  });

  return (
    <AppBar position="fixed" sx={{ zIndex: 99 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          URL Shortener
        </Typography>
        {isLoggedIn ? (
          <>
            {isAdmin ? (
              <Button color="inherit" onClick={onLogout}>
                Logout (Admin)
              </Button>
            ) : (
              <Button color="inherit" onClick={onLogout}>
                Logout
              </Button>
            )}
          </>
        ) : (
          <Button color="inherit" onClick={handleLoginOpen}>
            Login
          </Button>
        )}
        <Login open={loginOpen} onClose={handleLoginClose} onLogin={onLogin} />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
