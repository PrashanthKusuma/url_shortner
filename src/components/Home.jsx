import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, TextField, Button, IconButton, Snackbar } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Login from "./Login";
import { generateKey, copy, isValidUrl } from "./utils.js";

const useStyles = makeStyles((theme) => ({
  formContainer: {
    display: "flex",
    height: "300px",
    width: "auto",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: theme.spacing(4),
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
}));

const Home = () => {
  const classes = useStyles();
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [actualUrl, setActualUrl] = useState("");
  const [isValid, setIsValid] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    setIsValid(isValidUrl(originalUrl));

    if (isValidUrl(originalUrl)) {
      setShortenedUrl(generateKey());
      setActualUrl(originalUrl);
      setOriginalUrl("");
    } else {
      alert("Invalid URL");
    }
  };

  return (
    <div className={classes.formContainer}>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Enter URL"
          variant="outlined"
          className={classes.textField}
          fullWidth
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={!originalUrl}
        >
          Shorten URL
        </Button>
      </form>
      {shortenedUrl && (
        <Paper
          elevation={0}
          sx={{
            position: "relative",
            backgroundColor: "#E9FBF0",
            border: "1px solid #C6F6D9",
            width: 400,
            height: 50,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", width: "100%", height: "50px" }}>
            <div
              style={{
                padding: "15px",
                height: "50px",
                width: "80%",
                textAlign: "left",
              }}
            >
              <div id="shortenurl">
                <a
                  href={shortenedUrl}
                  target="_blank"
                  rel="noopener noreferer"
                  style={{ color: "rgba(0, 0, 0, 0.7)" }}
                >
                  {window.location.href + shortenedUrl}
                </a>
                <br />
                <a
                  href={actualUrl}
                  target="_blank"
                  rel="noopener noreferer"
                  style={{ color: "rgba(0, 0, 0, 0.7)" }}
                >
                  {actualUrl}
                </a>
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${
                    window.location.origin + "/" + shortenedUrl
                  }`}
                  alt={window.location.origin + "/" + shortenedUrl}
                />
              </div>
            </div>
            <div
              style={{
                width: "20%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <IconButton
                aria-label="copy"
                size="small"
                sx={{ height: "40px", width: "40px" }}
                onClick={() => copy(window.location.href + shortenedUrl)}
              >
                <ContentCopyIcon fontSize="small" />
              </IconButton>
            </div>
          </div>
        </Paper>
      )}
    </div>
  );
};

export default Home;
