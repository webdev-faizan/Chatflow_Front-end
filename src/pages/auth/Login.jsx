import React, { useState } from "react";
import {
  Button,
  TextField,
  Container,
  Typography,
  Box,
  Link,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { LoginUser } from "../../redux/silice/auth";
import { useDispatch } from "react-redux";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(LoginUser(formData));
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box mt={5}>
        <Typography variant="h4" align="center">
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            name="email"
            onChange={handleChange}
            required
            value={formData.email}
          />
          <TextField
            fullWidth
            label="Password"
            margin="normal"
            name="password"
            onChange={handleChange}
            type="password"
            required
            value={formData.password}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </form>
        <Box mt={2} textAlign="center">
          <Typography variant="body2">
            Don't have an account?{" "}
            <Link component={RouterLink} to="/signup">
              Sign up
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginForm;
