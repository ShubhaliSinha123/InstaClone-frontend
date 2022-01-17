import React from "react";

import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";

// import classes from "../../css/custom.module.css";

const Profile = () => {
  const data = JSON.parse(localStorage.getItem("user"));

  const getInitials = (name) => {
    let initials = name.split(" ");

    if (initials.length > 1) {
      initials = initials.shift().charAt(0) + initials.pop().charAt(0);
    } else {
      initials = name.substring(0, 1);
    }

    return initials.toUpperCase();
  };

  return (
    <>
    <table style={{ height: "100%", width: "100%"}}>
      <tr>
        <td>
      <Avatar sx={{ bgColor: red[500], height: "7rem", width: "7rem" }} aria-label="recipe">
        {getInitials(data.name)}
      </Avatar>
        </td>
        <td>
          <p>
          @{data.name}
          <button style={{backgroundColor: "white", color: "black", height: "2rem", width: "8rem", fontSize: "0.7rem"}}>Edit profile</button>
          </p>
          <p><p>15 Followers</p>  <p>20 Following</p></p>
        </td>
      </tr>
    </table>
   
    </>
  );
};

export default Profile;
