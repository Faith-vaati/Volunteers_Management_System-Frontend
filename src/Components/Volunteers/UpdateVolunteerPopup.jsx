import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import Grid from "@mui/material/Grid";

const UpdateVolunteerPopup = ({ open, handleClose, volunteerData }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    task: "",
    period: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (volunteerData) {
      setFormData({
        name: volunteerData.name || "",
        email: volunteerData.email || "",
        phone: volunteerData.phone || "",
        task: volunteerData.task || "",
        period: volunteerData.period || "",
        password: "",
        confirmPassword: "",
      });
    }
  }, [volunteerData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const { name, email, phone, task, period, password, confirmPassword } =
      formData;
    if (
      !name ||
      !email ||
      !phone ||
      !task ||
      !period ||
      !password ||
      !confirmPassword
    ) {
      alert("All fields are required.");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    alert("Volunteer updated successfully!");
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom>
          Update Volunteer Information
        </Typography>
        <TextField
          label="Full Name"
          name="name"
          value={formData.name}
          fullWidth
          margin="normal"
          onChange={handleChange}
        />

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Phone Number"
              name="phone"
              type="tel"
              value={formData.phone}
              fullWidth
              onChange={handleChange}
            />
          </Grid>
        </Grid>

        <TextField
          label="Task"
          name="task"
          value={formData.task}
          fullWidth
          margin="normal"
          onChange={handleChange}
        />

        <TextField
          select
          label="Period"
          name="period"
          value={formData.period}
          onChange={handleChange}
          fullWidth
          margin="normal"
        >
          <MenuItem value="1-3 months">1-3 months</MenuItem>
          <MenuItem value="3-6 months">3-6 months</MenuItem>
          <MenuItem value="6-9 months">6-9 months</MenuItem>
          <MenuItem value="9 months-1 year">9 months-1 year</MenuItem>
          <MenuItem value="More than a year">More than a year</MenuItem>
        </TextField>

        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={6}>
            <TextField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              fullWidth
              onChange={handleChange}
            />
          </Grid>
        </Grid>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Update
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default UpdateVolunteerPopup;
