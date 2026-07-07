import React, { useState } from "react";
import "./Settings.css";

import {
  FaHome,
  FaCalendarAlt,
  FaChevronDown,
} from "react-icons/fa";

import {
  TextField,
  MenuItem,
  Button,
  Box,
  Typography,
  Paper,
  Breadcrumbs,
  Link,
} from "@mui/material";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const bloodGroups = [
  "A-",
  "A+",
  "B-",
  "B+",
  "AB-",
  "AB+",
  "O-",
  "O+",
];

const Settings = () => {

  // -------------------------------
  // Security Settings
  // -------------------------------

  const [securityData, setSecurityData] = useState({
    username: "",
    currentPassword: "",
    newPassword: "",
  });

  // -------------------------------
  // Account Settings
  // -------------------------------

  const [accountData, setAccountData] = useState({
    firstName: "",
    lastName: "",
    city: "",
    email: "",
    country: "",
    dob: null,
    mobile: "",
    bloodGroup: "",
    address: "",
  });

  // -------------------------------
  // Input Change
  // -------------------------------

  const handleSecurityChange = (e) => {
    setSecurityData({
      ...securityData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAccountChange = (e) => {
    setAccountData({
      ...accountData,
      [e.target.name]: e.target.value,
    });
  };

  // -------------------------------
  // Save Buttons
  // -------------------------------

  const handleSecuritySave = () => {
    console.log(securityData);
  };

  const handleAccountSave = () => {
    console.log(accountData);
  };

  return (
    <div className="Settings">

      {/*==========================
            HEADER
      ===========================*/}

      <div className="Settings-header">

        <Typography
          variant="h5"
          className="Settings-pageTitle"
        >
          Settings
        </Typography>

        <Breadcrumbs
          separator=">"
          className="Settings-breadcrumb"
        >
          <Link
            underline="hover"
            color="inherit"
            href="#"
            className="Settings-breadLink"
          >
            <FaHome
              style={{
                fontSize: 14,
                marginRight: 6,
              }}
            />
            Home
          </Link>

          <Typography className="Settings-breadCurrent">
            Settings
          </Typography>
        </Breadcrumbs>

      </div>

      {/*==========================
        SECURITY SETTINGS
      ===========================*/}

      <Paper
        elevation={0}
        className="Settings-card"
      >

        <Typography className="Settings-cardTitle">
          Security Settings
        </Typography>

        <Box className="Settings-form">

          {/* Username */}

          <TextField
            fullWidth
            variant="outlined"
            label="Username"
            name="username"
            value={securityData.username}
            onChange={handleSecurityChange}
            className="Settings-input"
          />

          {/* Current Password */}

          <TextField
            fullWidth
            variant="outlined"
            type="password"
            label="Current Password"
            name="currentPassword"
            value={securityData.currentPassword}
            onChange={handleSecurityChange}
            className="Settings-input"
          />

          {/* New Password */}

          <TextField
            fullWidth
            variant="outlined"
            type="password"
            label="New Password"
            name="newPassword"
            value={securityData.newPassword}
            onChange={handleSecurityChange}
            className="Settings-input"
          />

          <Button
            variant="contained"
            className="Settings-saveBtn"
            onClick={handleSecuritySave}
          >
            Save
          </Button>

        </Box>

      </Paper>

      {/*==========================
        ACCOUNT SETTINGS
      ===========================*/}

      <Paper
        elevation={0}
        className="Settings-card"
      >

        <Typography className="Settings-cardTitle">
          Account Settings
        </Typography>

        <div className="Settings-grid">

          {/* First Name */}

          <TextField
            label="First Name"
            name="firstName"
            fullWidth
            value={accountData.firstName}
            onChange={handleAccountChange}
            className="Settings-input"
          />

          {/* Last Name */}

          <TextField
            label="Last Name"
            name="lastName"
            fullWidth
            value={accountData.lastName}
            onChange={handleAccountChange}
            className="Settings-input"
          />

                    {/* ==========================
                City
          ========================== */}

          <TextField
            fullWidth
            label="City"
            name="city"
            value={accountData.city}
            onChange={handleAccountChange}
            className="Settings-input"
          />

          {/* ==========================
                Email
          ========================== */}

          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={accountData.email}
            onChange={handleAccountChange}
            className="Settings-input"
          />

          {/* ==========================
                Country
          ========================== */}

          <TextField
            fullWidth
            label="Country"
            name="country"
            value={accountData.country}
            onChange={handleAccountChange}
            className="Settings-input"
          />

          {/* ==========================
                Date Of Birth
          ========================== */}

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Date Of Birth"
              value={accountData.dob}
              onChange={(newValue) =>
                setAccountData({
                  ...accountData,
                  dob: newValue,
                })
              }
              slots={{
                openPickerIcon: FaCalendarAlt,
              }}
              slotProps={{
                textField: {
                  fullWidth: true,
                  className: "Settings-input",
                },
              }}
            />
          </LocalizationProvider>

          {/* ==========================
                Mobile
          ========================== */}

          <TextField
            fullWidth
            label="Mobile"
            name="mobile"
            value={accountData.mobile}
            onChange={handleAccountChange}
            className="Settings-input"
          />

          {/* ==========================
                Blood Group
          ========================== */}

          <TextField
            select
            fullWidth
            label="Blood Group"
            name="bloodGroup"
            value={accountData.bloodGroup}
            onChange={handleAccountChange}
            className="Settings-input"
            SelectProps={{
              IconComponent: FaChevronDown,
              MenuProps: {
                PaperProps: {
                  sx: {
                    maxHeight: 250,
                    borderRadius: "12px",
                  },
                },
              },
            }}
          >
            {bloodGroups.map((group) => (
              <MenuItem
                key={group}
                value={group}
              >
                {group}
              </MenuItem>
            ))}
          </TextField>

          {/* ==========================
                Address
          ========================== */}

          <TextField
            fullWidth
            multiline
            rows={4}
            label="Address"
            name="address"
            value={accountData.address}
            onChange={handleAccountChange}
            className="Settings-input Settings-address"
          />

        </div>

        {/* ==========================
              Save Button
        ========================== */}

        <Button
          variant="contained"
          className="Settings-saveBtn"
          onClick={handleAccountSave}
        >
          Save Changes
        </Button>

      </Paper>

    </div>
  );
};

export default Settings;