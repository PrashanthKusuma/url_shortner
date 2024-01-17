import data from "../data.json";
import { Paper, TextField, Box, IconButton, Snackbar } from "@mui/material";

export default function ManageUsers() {
  return (
    <>
      <Box>
        {data.users.map((user) => (
          <Paper key={user.id}>
            <Box sx={{ width: "70%", height: "150px" }}>
              <p>{user.username}</p>
            </Box>
          </Paper>
        ))}
      </Box>
    </>
  );
}
