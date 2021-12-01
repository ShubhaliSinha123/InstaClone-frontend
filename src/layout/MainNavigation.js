//import { NavLink } from "react-dom";

import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <i style={{fontSize:"24px"}} className="fa">
          &#xf16d;
        </i>
        Instagram
      </div>
      <div style={{ float: "center" }}>
        <input type="text" placeholder="Search" />
      </div>
      <nav className={classes.nav}>
        <ul>
          <li>
            <i className="fa fa-home"></i>
          </li>
          <li>
            <span>
              <i class="material-icons">&#xe0ca;</i>
            </span>
            <span className={classes.badge} style={{ fontSize: 15 }}>
              3
            </span>
          </li>
          <li>
            <i className={classes.navstyle} className="fa">
              &#xf0fe;
            </i>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
