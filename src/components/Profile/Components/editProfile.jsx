import React from "react";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import { Link } from "react-router-dom";

const EditProfile = () => {
  return (
    <>
      <div
        className="w3-sidebar w3-light-grey w3-bar-block"
        style={{ width: "10%" }}
      >
        <h3 className="w3-bar-item">
          <Avatar
            sx={{ bgColor: red[500], height: "7rem", width: "7rem" }}
            aria-label="recipe"
          >
            SS
          </Avatar>
        </h3>
        <Link to="#" className="w3-bar-item w3-button">
          Link 1
        </Link>
        <Link to="#" className="w3-bar-item w3-button">
          Link 2
        </Link>
        <Link to="#" className="w3-bar-item w3-button">
          Link 3
        </Link>
      </div>

      {/* <!-- Page Content --> */}
      <div style={{ marginLeft: "25%" }}>
        <div className="w3-container w3-teal">
          <h1>My Page</h1>
        </div>

        <img src="img_car.jpg" alt="Car" style={{ width: "100%" }} />

        <div className="w3-container">
          <h2>Sidebar Navigation Example</h2>
          <p>The sidebar with is set with "style="width:25%".</p>
          <p>The left margin of the page content is set to the same value.</p>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
