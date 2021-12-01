import { NavLink } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <div style={{ float: "center" }}>
        Hello! <br /> This is an Instagram Page.
      </div>
      <NavLink to="/posts"> Posts </NavLink>
    </>
  );
};

export default HomePage;
