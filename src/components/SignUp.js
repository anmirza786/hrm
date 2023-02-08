import React from "react";
import Box from "@mui/material/Box";
import { connect } from "react-redux";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { register } from "../redux/actions/authActions";

function SignUp({ register }) {
  const handlesignup = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    const password2 = data.get("password2");
    if (password !== password2) {
      alert("Password Did not match");
    } else {
      register(email, password);
    }
  };
  return (
    <div>
      <h1 style={{ textAlign: "center", color: "#007FFF", margin: "0.5rem 0" }}>
        Signup
      </h1>
      <Box component="form" onSubmit={handlesignup}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          type="email"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password2"
          label="Password Confirm"
          type="password2"
          id="password2"
          autoComplete="current-password"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          style={{ color: "white" }}
        >
          Sign Up
        </Button>
      </Box>
    </div>
  );
}

export default connect(null, { register })(SignUp);
