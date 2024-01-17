import urls from "../urls.json";
import { Paper, TextField, Box, IconButton, Snackbar } from "@mui/material";

export default function ManageUrls() {
  return (
    <>
      <Box sx={{ overflowY: true, border: "1px solid red" }}>
        {urls.urls.map((eachUrl) => (
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
