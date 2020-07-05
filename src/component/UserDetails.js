import {
  TextField,
  makeStyles,
  useMediaQuery,
  Box,
  Button,
  InputAdornment,
  Grid,
  IconButton,
} from "@material-ui/core";
import {
  AccountCircle,
  PhotoCameraRounded,
  ContactPhoneRounded,
  DoneOutlineRounded,
} from "@material-ui/icons";
import { createUser, editUser } from "../store/actions";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  mainDivLg: {
    height: "70%",
    width: "50%",
  },
  mainDivSm: {
    height: "50%",
    width: "90%",
  },
  header: {
    height: "20%",
    background: "#1de9b6",
    borderTopLeftRadius: "inherit",
    borderTopRightRadius: "inherit",
    display: "flex",
    fontSize: "25px",
    justifyContent: "center",
    alignItems: "center",
  },
  textBoxDiv: {
    textAlign: "center",
    marginTop: "20px",
  },
  buttonBoxDiv: {
    justifyContent: "center",
    marginTop: "20px",
  },
  textBox: {
    width: "50%",
  },
  textBoxSm: {
    width: "80%",
  },
  input: {
    display: "none",
  },
  link: {
    textDecoration: "none",
  },
});

export default function UserDetails(props) {
  const classes = useStyles();
  const isMobile = useMediaQuery("(max-device-width:700px)");
  const selector = useSelector((state) => state);
  const dispatch = useDispatch();
  let userObj;
  if (props && props.match && props.match.params.userId) {
    userObj = selector.find((user) => user.id == props.match.params.userId);
  }
  const [userName, setUserName] = useState(userObj ? userObj.userName : "");
  const [contactNumber, setContactNumber] = useState(
    userObj ? userObj.contactNumber : ""
  );
  const [image, setImage] = useState(userObj ? userObj.profilePic : "");
  return (
    <div className={classes.root}>
      <Box
        boxShadow={3}
        borderRadius={16}
        className={isMobile ? classes.mainDivSm : classes.mainDivLg}
      >
        <Box className={classes.header}>User Details Form</Box>
        <Box className={classes.textBoxDiv}>
          <TextField
            label="User Name"
            className={isMobile ? classes.textBoxSm : classes.textBox}
            onChange={(event) => {
              if (event.target.value.length <= 15)
                setUserName(event.target.value);
            }}
            value={userName}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box className={classes.textBoxDiv}>
          <TextField
            label="Contact Number"
            className={isMobile ? classes.textBoxSm : classes.textBox}
            onChange={(event) => {
              if (event.target.value.length <= 10)
                setContactNumber(event.target.value);
            }}
            value={contactNumber}
            type="number"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <ContactPhoneRounded />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box className={classes.textBoxDiv}>
          <label>Upload profile pic</label>
          <input
            accept="image/*"
            className={classes.input}
            id="contained-button-file"
            type="file"
            onChange={(event) =>
              setImage(URL.createObjectURL(event.target.files[0]))
            }
          />
          <label htmlFor="contained-button-file">
            <IconButton aria-label="upload picture" component="span">
              <PhotoCameraRounded />
            </IconButton>
            {image && <DoneOutlineRounded />}
          </label>
        </Box>
        <Grid container spacing={2} className={classes.buttonBoxDiv}>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                if (userObj)
                  dispatch(
                    editUser(userObj.id, userName, contactNumber, image)
                  );
                else dispatch(createUser(userName, contactNumber, image));
              }}
            >
              {userObj ? "Save User" : "Add User"}
            </Button>
          </Grid>
          {!userObj && (
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setContactNumber("");
                  setImage("");
                  setUserName("");
                }}
              >
                Clear
              </Button>
            </Grid>
          )}
          <Grid item>
            <Link className={classes.link} to="/view-all">
              <Button variant="contained" color="primary">
                View All
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
