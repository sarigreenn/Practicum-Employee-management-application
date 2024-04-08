
import axios from 'axios';
import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import logo from '../images/logo.png'
import backgroundImage from '../images/רקע.PNG';




const Login = ({ setToken }) => {
  const { register, handleSubmit } = useForm();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


  const onSubmit = (data) => {
    const { firstName, lastName, password } = data;
    axios.post("https://localhost:7201/api/Auth", { firstName, lastName, password })
      .then((response) => {
        console.log("enter successfully");
        localStorage.setItem('token', response.data.token); // Assuming token is returned in response data
        setToken(response.data.token);
        handleClose();
      })
      .catch((error) => {
        alert("One or more of the data you entered is incorrect");
        console.error("Error entering: ", error);
      });
  };


  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        position: "relative",
        overflow: "hidden", 
        background: "#98d5dd",

      }}
    >
      <img
        src={backgroundImage}
        alt="Background"
        style={{
          height: "70vh", 
        }}
      />
      <Button
        className="login-btn"
        variant="contained"
        onClick={handleOpen}
        sx={{
          fontWeight: "bold",
          position: "absolute",
          top: "1rem",
          right: "1rem",
          fontWeight: 'bold',
          fontFamily: "Arial, Helvetica, sans-serif",
          textTransform: 'none',
        }}
      >
        Login
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ display: "flex", flexDirection: "column" }}
          >
            {/* Form inputs */}
            <TextField
              label="First name"
              {...register("firstName")}
              sx={{ marginBottom: "1rem" }}
              required
            />
            <TextField
              label="Last name"
              {...register("lastName")}
              sx={{ marginBottom: "1rem" }}
              required
            />
            <TextField
              label="Password"
              type="password"
              {...register("password")}
              sx={{ marginBottom: "1rem" }}
              required
            />
          </form>
        </DialogContent>
        <DialogActions>
          {/* Form buttons */}
          <Button
            className="login-btn"
            variant="contained"
            onClick={handleSubmit(onSubmit)}
            sx={{ backgroundColor: "#007bff", color: "white", fontWeight: "bold" }}
          >
            Login
          </Button>
          <Button
            className="login-btn"
            variant="contained"
            onClick={handleClose}
            sx={{ backgroundColor: "#007bff", color: "white", fontWeight: "bold" }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );

};

export default Login;
