import React from 'react'
import Box from '@mui/material/Box'
import { connect } from 'react-redux'
import Button from '@mui/material/Button'
import { TextField } from '@mui/material'
import { signin } from '../redux/actions/authActions'

function Login({ signin }) {
    const handlelogin = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email= data.get("email")
        const password= data.get("password")
        console.log(data,email,password)
        signin(email,password)
      };
    return (
        <div>
            <h1 style={{textAlign: "center", color: "#007FFF", margin: "0.5rem 0" }}>Login</h1>
            <Box component="form" onSubmit={handlelogin}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      type="email"
                      autoComplete="email"
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
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      style={{ color: "white" }}
                    >
                      Login
                    </Button>
                  </Box>
        </div>
    );
}

export default connect(null,{signin})(Login);