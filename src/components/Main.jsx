import React, { useEffect, useState } from "react";
import Header from "./Header";
import Home from "./Home";
import User from "./User";
import Admin from "./Admin";
import axios from "axios";

export default function Main() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const userData = JSON.parse(user);
      setIsLoggedIn(true);
      setIsAdmin(userData.type === "admin");
    }
  }, []);

  const handleLogin = async (enteredUsername, enteredPassword) => {
    try {
      // Make a POST request to your AWS Lambda login endpoint
      const response = await axios.get(
        "https://e2zkwbdlg7.execute-api.ap-south-1.amazonaws.com/dev/users"
      );

      // Handle the response from your AWS Lambda function
      let userFound =
        response && response.data.user.find((e) => e.name == enteredUsername);

      if (userFound && userFound.password == enteredPassword) {
        localStorage.setItem("user", JSON.stringify(userFound));
        setIsLoggedIn(true);
        setIsAdmin(userFound.type === "admin");
        console.log("login success");
      }

      // Further actions, such as updating state or redirecting the user
    } catch (error) {
      // Handle errors, such as displaying an error message to the user
      console.error("Login failed", error.message);
    }
  };

  const handleLogout = () => {
    // Logic for handling logout and updating localStorage
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    // Optionally, reset isAdmin state if needed
    setIsAdmin(false);
  };

  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        isAdmin={isAdmin}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />
      {isLoggedIn ? isAdmin ? <Admin /> : <User /> : <Home />}
    </>
  );
}
