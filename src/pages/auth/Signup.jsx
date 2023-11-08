import React, { useState } from "react";
import {
  Button,
  TextField,
  Container,
  Typography,
  Box,
  Link,
  Stack,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { RegisterUser } from "../../redux/silice/auth";
import { useDispatch, useSelector } from "react-redux";

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const { isLoadding } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(RegisterUser(formData));
    // setFormData({});

    console.log("Form submitted:", formData);
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
          Register
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="First Name"
            margin="normal"
            name="fullname"
            onChange={handleChange}
            required
            value={formData?.fullname}
          />
         
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            name="email"
            onChange={handleChange}
            required
            value={formData?.email}
          />
          <Stack>
            <TextField
              fullWidth
              label="Password"
              margin="normal"
              name="password"
              onChange={handleChange}
              type="password"
              required
              value={formData?.password}
            />

          </Stack>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Register
          </Button>
        </form>
        <Box mt={2} textAlign="center">
          <Typography variant="body2">
            Already have an account?{" "}
            <Link component={RouterLink} to="/login">
              Login
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default RegistrationForm;
