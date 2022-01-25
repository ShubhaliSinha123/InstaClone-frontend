import React, { useState, useEffect } from "react";
import LoadingSpinner from "../../ui/LoadingSpinner";

import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import TocIcon from "@mui/icons-material/Toc";
import ImageListItem from "@mui/material/ImageListItem";

const Profile = () => {
  const [resultData, setResultData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(null);
  const [showPicture, setShowPicture] = useState(true);
  const [showVideo, setShowVideo] = useState(false);
  const data = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setHasError(null);
      try {
        const result = await fetch("/all-user-posts", {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
        });

        const data = await result.json();
        setResultData(data.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setHasError(error);
      }
    };
    fetchData();
  }, [token]);

  const handlePicture = (e) => {
    e.preventDefault();

    setShowPicture(true);
    setShowVideo(false);
  };

  const handleVideo = (e) => {
    e.preventDefault();

    setShowVideo(true);
    setShowPicture(false);
  };

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
      <table style={{ height: "100%", width: "100%" }}>
        <tbody>
          <tr>
            <td>
              <Avatar
                sx={{ bgColor: red[500], height: "7rem", width: "7rem" }}
                aria-label="recipe"
              >
                {getInitials(data.name)}
              </Avatar>
            </td>
            <td>
              <p>
                @{data.name}
                <button
                  style={{
                    backgroundColor: "white",
                    color: "black",
                    height: "2rem",
                    width: "8rem",
                    fontSize: "0.7rem",
                    marginLeft: "2%",
                    border: "1px solid #ccc",
                  }}
                >
                  Edit profile
                </button>
              </p>
              <table style={{ width: "80%" }}>
                <tbody>
                  <tr>
                    <td>{resultData.length} posts</td>
                    <td>15 Followers</td>
                    <td>20 Following</td>
                  </tr>
                </tbody>
              </table>
              <p>{data.email}</p>
            </td>
          </tr>
        </tbody>
      </table>
      <br />
      <hr />
      <button disabled={showPicture} onClick={handlePicture}>
        <TocIcon />
        Pictures
      </button>
      <button
        disabled={showVideo}
        style={{ marginLeft: "7%" }}
        onClick={handleVideo}
      >
        <OndemandVideoIcon />
        Videos
      </button>
      <br />
      {isLoading && !hasError ? (
        <div className="centered">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          {showPicture &&
            resultData.map((data, id) => (
              <ImageListItem key={id}>
                <span key={id}>
                  {data.images.split(".").pop() === "webm" ? (
                    ""
                  ) : (
                    <img
                      height="200"
                      style={{ width: "90%" }}
                      src={data.images}
                      alt={data.alt}
                    />
                  )}
                </span>
              </ImageListItem>
            ))}
          {showVideo &&
            resultData.map((data, id) => (
              <span key={id} style={{ marginLeft: "2%" }}>
                {data.images.split(".").pop() === "webm" ? (
                  <iframe
                    width="45%"
                    height="200px"
                    title="Video player"
                    src={data.images}
                    frameBorder="0"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  ""
                )}
              </span>
            ))}
        </>
      )}
    </>
  );
};

export default Profile;
