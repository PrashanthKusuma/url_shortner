import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  IconButton,
  Box,
  Tabs,
  Tab,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/system";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const useStyles = () => ({
  dialog: {
    "& .MuiDialogContent-root": {
      padding: 2,
    },
    "& .MuiDialogActions-root": {
      padding: 1,
    },
  },
  closeButton: {
    position: "absolute",
    right: 8,
    top: 8,
    zIndex: 1,
  },
  formContainer: {
    width: "100%",
  },
  tabPanel: {
    width: "500px",
  },
  tabPanelBox: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  textField: {
    margin: "5px",
  },
  button: {
    margin: "10px",
  },
});

const BootstrapDialog = styled(Dialog)(() => useStyles().dialog);

const CustomTabPanel = ({ children, value, index, ...other }) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`simple-tabpanel-${index}`}
    aria-labelledby={`simple-tab-${index}`}
    {...other}
  >
    {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
  </div>
);

const Login = ({ open, onClose, onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [value, setValue] = useState(0);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleLogin = () => {
    setUsername("");
    setPassword("");
    onLogin(username, password);
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    if (password === confirmPassword) {
      try {
        const response = await axios.post(
          "https://e2zkwbdlg7.execute-api.ap-south-1.amazonaws.com/dev/users",
          {
            id: uuidv4(),
            name: username,
            password: password,
          }
        );
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };
  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        className={classes.dialog}
      >
        <IconButton
          aria-label="close"
          onClick={onClose}
          style={classes.closeButton}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Box className={classes.formContainer}>
            <Tabs value={value} onChange={handleChange} centered>
              <Tab label="Login" />
              <Tab label="Register" />
            </Tabs>
            <CustomTabPanel value={value} index={0} style={classes.tabPanel}>
              <Box style={classes.tabPanelBox}>
                <TextField
                  id="outlined-basic-username"
                  label="User ID"
                  variant="outlined"
                  style={classes.textField}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                  id="outlined-basic-password"
                  label="Password"
                  variant="outlined"
                  style={classes.textField}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  variant="contained"
                  disableElevation
                  style={classes.button}
                  onClick={handleLogin}
                >
                  Login
                </Button>
              </Box>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1} style={classes.tabPanel}>
              <Box style={classes.tabPanelBox}>
                <TextField
                  id="outlined-basic-regname"
                  label="User ID"
                  variant="outlined"
                  style={classes.textField}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                  id="outlined-basic-regpassword"
                  label="Password"
                  variant="outlined"
                  style={classes.textField}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <TextField
                  id="outlined-basic-redconfirmpass"
                  label="Confirm Password"
                  variant="outlined"
                  style={classes.textField}
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Button
                  variant="contained"
                  disableElevation
                  style={classes.button}
                  onClick={handleRegister}
                >
                  Register
                </Button>
              </Box>
            </CustomTabPanel>
          </Box>
        </DialogContent>
      </BootstrapDialog>
    </React.Fragment>
  );
};

export default Login;
