import React, { useEffect, useState } from "react";
import Header from "./Header";
import Home from "./Home";
import User from "./User";
import Admin from "./Admin";
import data from "../data.json";

export default function Main() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const userData = JSON.parse(user);
      setIsLoggedIn(true);
      const userFound = data.users.find(
        (user) => user.username === userData.username
      );
      setIsAdmin(userFound.type === "admin");
    }
  }, []);

  const handleLogin = (enteredUsername, enteredPassword) => {
    const userFound = data.users.find(
      (user) =>
        user.username === enteredUsername && user.password === enteredPassword
    );

    if (userFound) {
      localStorage.setItem(
        "user",
        JSON.stringify({ username: enteredUsername })
      );
      setIsLoggedIn(true);
      setIsAdmin(userFound.type === "admin");
    } else {
      // Handle invalid credentials, e.g., show an error message
      console.log("Invalid credentials");
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
