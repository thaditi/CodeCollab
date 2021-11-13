import React, { Fragment, useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import { Grid, Snackbar } from "@material-ui/core";
import CollabEditor from "../Editor/CollabEditor";
import CollabPad from "../Pad/CollabPad";
import io from "socket.io-client";
import { Redirect } from "react-router-dom";
import MuiAlert from "@material-ui/lab/Alert";

const socket = io.connect("https://codecollab-kiit.herokuapp.com/");

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const CollabRoom = (props) => {
  const [roomId] = useState(
    window.location.href.substr(window.location.href.lastIndexOf("/") + 1)
  );
  const [name] = useState(props.location.name);
  const [goToHome, setGoToHome] = useState(false);
  const [open, setOpen] = useState(true);
  const [userDisconnect, setUserDisconnect] = useState(false);
  const [userJoinedName, setUserJoinedName] = useState();
  const [userLeftName, setUserLeftName] = useState();

  socket.on("userjoined", (userName) => {
    setUserJoinedName(userName);
    setOpen(true);
  });

  socket.on("userleft", (userName) => {
    setUserLeftName(userName);
    setUserDisconnect(true);
  });

  useEffect(() => {
    if (props.location.name === undefined || props.location.name === "") {
      alert("Please Enter your name");
      setGoToHome(true);
    }

    var patt = new RegExp("(([A-Za-z]{4})(-)){2}[A-Za-z]{4}");
    var result = patt.test(roomId);
    if (result === false || props.location.pathname === "") {
      alert("Invalid Room Id");
      setGoToHome(true);
    }

    let data = {
      room: roomId,
      name: name,
    };
    socket.emit("joinroom", data);
  }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleDisconnectClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setUserDisconnect(false);
  };

  return (
    <Fragment>
      {goToHome ? (
        <Redirect to="/" />
      ) : (
        <Fragment>
          <Navbar name={name} roomId={roomId} socket={socket} />
          <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
              {userJoinedName} Welcome to Code Collab!
            </Alert>
          </Snackbar>
          <Snackbar
            open={userDisconnect}
            autoHideDuration={3000}
            onClose={handleDisconnectClose}
          >
            <Alert onClose={handleDisconnectClose} severity="error">
              {userLeftName} Left the Room.
            </Alert>
          </Snackbar>
          <div
            style={{
              backgroundColor: "#F3F7F7",
              fontFamily: "poppins",
              padding: "50px",
            }}
          >
            <Grid container spacing={5}>
              <Grid item xs={12} sm={12} md={6}>
                <CollabEditor socket={socket} roomId={roomId} />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <CollabPad socket={socket} roomId={roomId} />
              </Grid>
            </Grid>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default CollabRoom;
