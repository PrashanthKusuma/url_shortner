import { useState, useEffect } from "react";
import axios from "axios";
import { Paper, TextField, Box, IconButton, Snackbar } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

let count = 1;
function counting(count) {
  return count + 1;
}
const columns = [
  {
    field: "Sno",
    headerName: "Sno",
    description: "This column has a value getter and is not sortable.",
    sortable: true,
    width: 160,
    valueGetter: (params) => {
      console.log(params);
      return params.tabIndex + 1;
    },
  },
  { field: "id", headerName: "ID", width: 300 },
  { field: "name", headerName: "Username", width: 200 },
  { field: "type", headerName: "User Type", width: 200 },
];

export default function ManageUsers() {
  const [users, setUsers] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make a GET request to a sample API endpoint
        const response = await axios.get(
          "https://e2zkwbdlg7.execute-api.ap-south-1.amazonaws.com/dev/users"
        );

        // Update state with the fetched data
        console.log(response.data.user);
        setUsers(response.data.user);
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
      <Box>
        {/* {users &&
          users.map((user) => (
            <Paper key={user.id}>
              <Box sx={{ width: "70%", height: "150px" }}>
                <p>{user.name}</p>
              </Box>
            </Paper>
          ))} */}

        <div style={{ height: 450, width: "100%" }}>
          {users && (
            <DataGrid
              rows={users}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
            />
          )}
        </div>
      </Box>
    </>
  );
}
