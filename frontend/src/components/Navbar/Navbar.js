import React, { Fragment } from "react";
import AppBar from "@material-ui/core/AppBar";
import {
  Toolbar,
  Typography,
  Button,
  Dialog,
  IconButton,
} from "@material-ui/core";
import logo from "../../assets/NavBar.svg";
import PersonIcon from "@material-ui/icons/Person";
import CollabChat from "../Chat/CollabChat";
import copy from "copy-to-clipboard";

const Navbar = (props) => {
  const Copytext = (value) => {
    copy(value);
    alert("Copied Room ID : " + value);
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <AppBar position="static" style={{ backgroundColor: "#000A29" }}>
        <Toolbar>
          <img
            src={logo}
            style={{ maxWidth: "150px", maxHeight: "50px" }}
            alt="CodeCollab"
          />

          <Button
            variant="contained"
            startIcon={<PersonIcon />}
            onClick={() => Copytext(props.roomId)}
            color="primary"
            style={{
              fontFamily: "poppins",
              marginLeft: "auto",
              fontWeight: "600",
              color: "white",
            }}
          >
            RoomId : {props.roomId}
          </Button>
          <CollabChat
            name={props.name}
            roomId={props.roomId}
            socket={props.socket}
          />
        </Toolbar>
      </AppBar>
    </Fragment>
  );
};

export default Navbar;
