import { useState } from "react";
import moment from "moment";

import CustomModal from "../../../common/customModal";
import classes from "../../../css/custom.module.css";

import Card from "@mui/material/Card";
import { CardHeader, IconButton } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { Typography } from "@mui/material";
import CardActions from "@mui/material/CardActions";

import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { styled } from "@mui/material/styles";
import Collapse from "@mui/material/Collapse";
import FavoriteIcon from "@mui/icons-material/Favorite";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(0deg)",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Dashboard = (props) => {
  const [expanded, setExpanded] = useState(false);
  const [comment, setComment] = useState("");
  const [liked, setLiked] = useState(false);

  const token = localStorage.getItem("token");

  const handleExpandClick = () => {
    setExpanded(!expanded);
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

  const handleLikeStatus = async (postId) => {
    try {
      const result = await fetch(`/update-like-status/${postId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      });

      if(result.status === 201) {
        setLiked(true);
      } 
      else {
        setLiked(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createComment = async (comment, postId) => {
    const result = await fetch(`/create-comment/${postId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
      body: JSON.stringify({
        comments: comment,
      }),
    });

    if (result) {
      setComment("");
      console.log(result);
    }
  };

  return (
    <div key={props.id}>
      <br />
      <Card sx={{ maxWidth: 650 }} className={classes.card}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgColor: red[500] }} aria-label="recipe">
              {getInitials(props.data.userId.name)}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={<u>{props.data.userId.name}</u>}
          subheader={props.data.title}
        />
        {props.data.images.split(".").pop() === "webm" ? (
          <iframe
            width="100%"
            height="365px"
            title="Video player"
            src={props.data.images}
            frameBorder="0"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <CardMedia
            component="img"
            height="400"
            image={props.data.images}
            alt={props.data.alt}
          />
        )}
        <CardActions disableSpacing>
          <IconButton
            aria-label="add to favorites"
            onClick={() => handleLikeStatus(props.data._id)}
          >
            {liked ? (
              <FavoriteIcon style={{color: "red"}} />
            ) : (
              <FavoriteBorderOutlinedIcon fontSize="medium" />
            )}
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="comment"
          >
            <ChatBubbleOutlineIcon fontSize="medium" />
          </ExpandMore>
        </CardActions>
        <CardContent style={{ marginTop: "-4%" }}>
          <Typography variant="body2" color="black">
            @{props.data.userId.name.toLowerCase()} -{props.data.caption}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            style={{ fontSize: 13 }}
          >
            ~{moment(props.data.createdAt).startOf("seconds").fromNow()}
          </Typography>
        </CardContent>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <div key={props.id}>
            <CardContent key={props.id}>
              <ul>
                {props.data.comments.map((comment, id) => (
                  <li key={id}>{comment.comments}</li>
                ))}
              </ul>
              <u>
                <input
                  className={classes.input}
                  type="text"
                  placeholder="Add a new comment"
                  value={comment}
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                />
              </u>
              <button
                style={{
                  backgroundColor: "white",
                  color: "blue",
                  border: "none",
                  fontSize: 13,
                }}
                onClick={() => createComment(comment, props.data._id)}
              >
                Post
              </button>
            </CardContent>
          </div>
        </Collapse>
      </Card>
      <CustomModal />
    </div>
  );
};

export default Dashboard;
