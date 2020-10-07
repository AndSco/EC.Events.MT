import React from "react";
import RegistrationContext from "../contexts/eventRegistration/RegistrationContext";
import { NavLink } from "react-router-dom";

const Navbar = props => {
  const context = React.useContext(RegistrationContext);
  const {
    isAdminLoggedIn,
    startCreatingEvent,
    finishedCreatingEvent,
    finishedEditingEvent,
    logoutAdmin,
    isCreatingEvent
  } = context;
  return (
    <nav id="navbar">
      <div id="main-titles" style={styles.titleContainer}>
        <h2 id="logo" style={styles.logo}>
          @EC.EVENTS.MT
        </h2>
        <h4 id="sub-heading" style={styles.subheading}>
          {!isAdminLoggedIn
            ? "Your gateway to the EC Representation in Malta's events"
            : "ADMIN PANEL"}
        </h4>
      </div>
      {!isAdminLoggedIn ? (
        <a
          href="https://ec.europa.eu/info/legal-notice_en#privacy-policy"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h5>{"Privacy Policy".toUpperCase()}</h5>
        </a>
      ) : (
        <div id="admin-menu-items">
          <NavLink to="/">
            <h5
              onClick={() => {
                finishedCreatingEvent();
                finishedEditingEvent();
              }}
              style={{ color: !isCreatingEvent ? "#FF006C" : "" }}
            >
              OPEN EVENTS
            </h5>
          </NavLink>
          <NavLink to="/">
            <h5
              onClick={startCreatingEvent}
              style={{ color: isCreatingEvent ? "#FF006C" : "" }}
            >
              CREATE NEW EVENT
            </h5>
          </NavLink>
          <h5 onClick={logoutAdmin}>LOG OUT</h5>
        </div>
      )}
    </nav>
  );
};

const styles = {
  titleContainer: {
    display: "flex",
    alignItems: "center"
  },
  logo: {
    display: "flex",
    paddingRight: 15,
    borderRight: "solid grey 2px",
    borderRightWidth: 6
  },
  subheading: {
    paddingLeft: 18
  }
};

export default Navbar;
