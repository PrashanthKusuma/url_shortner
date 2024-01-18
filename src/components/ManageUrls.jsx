import { useState, useEffect } from "react";
import axios from "axios";
import { Paper, TextField, Box, IconButton, Snackbar } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

export default function ManageUrls() {
  const [urls, setUrls] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make a GET request to a sample API endpoint
        const response = await axios.get(
          "https://5f57e55439.execute-api.ap-south-1.amazonaws.com/dev/urls"
        );

        // Update state with the fetched data
        console.log(response.data);
        setUrls(response.data);
      } catch (error) {
        // Handle errors
        console.error(error);
      }
    };

    // Call the fetchData function
    fetchData();
  }, []);
  return (
    <>
      <Box sx={{ overflowY: true, border: "1px solid red" }}>
        {urls &&
          urls.map((eachUrl) => (
            <Paper key={eachUrl.id}>
              <Box sx={{ width: "70%", height: "150px" }}>
                <p>{eachUrl.original_url}</p>
              </Box>
            </Paper>
          ))}
      </Box>
    </>
  );
}
