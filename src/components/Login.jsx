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
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleLogin = () => {
    setUsername("");
    setPassword("");
    onLogin(username, password);
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
                  id="outlined-basic"
                  label="User ID"
                  variant="outlined"
                  style={classes.textField}
                />
                <TextField
                  id="outlined-basic"
                  label="Password"
                  variant="outlined"
                  style={classes.textField}
                  type="password"
                />
                <TextField
                  id="outlined-basic"
                  label="Confirm Password"
                  variant="outlined"
                  style={classes.textField}
                  type="password"
                />
                <Button
                  variant="contained"
                  disableElevation
                  style={classes.button}
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
