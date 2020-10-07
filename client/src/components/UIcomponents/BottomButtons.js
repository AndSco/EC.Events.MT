import React from "react";

const BottomButtons = props => {
  return (
    <div
      style={{
        ...styles.container,
        justifyContent: props.isSingleButton ? "center" : "space-between"
      }}
      className="button-container"
    >
      {props.children}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    width: "100%"
  }
};

export default BottomButtons;
