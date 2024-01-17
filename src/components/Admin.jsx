import {
  Paper,
  Button,
  Divider,
  Box,
  Tabs,
  Tab,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ManageUsers from "./ManageUsers";
import ManageUrls from "./ManageUrls";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function Admin() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.paper",
          display: "flex",
          position: "absolute",
          height: "85%",
          mt: "70px",
        }}
      >
        <Box
          sx={{
            width: "300px",
            display: "flex",
            borderRight: 1,
            borderColor: "divider",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              height: "60px",
              width: "100%",
              display: "flex",

              alignItems: "center",
            }}
          >
            <AccountCircle sx={{ color: "grey", fontSize: "50px", ml: 2 }} />{" "}
            <p>Admin</p>
          </Box>

          <Divider />
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{
              borderRight: 1,
              borderColor: "divider",
              width: "300px",
              position: "fixed",
            }}
          >
            <Tab label="Manage Users" {...a11yProps(0)} />
            <Tab label="Manage Urls" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0} sx={{ width: "100%" }}>
          <ManageUsers />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ManageUrls />
        </TabPanel>
      </Box>
    </>
  );
}
