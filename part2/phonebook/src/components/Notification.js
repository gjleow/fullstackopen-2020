import React from "react";

const Notification = ({ message }) => {
  const baseStyle = {
    color: "green",
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };

  const errorStyle = {
    ...baseStyle,
    color: "red",
  };

  if (message === null) {
    return null;
  }

  if (message.type === "base") {
    return <div style={baseStyle}>{message.text}</div>;
  } else {
    return <div style={errorStyle}>{message.text}</div>;
  }
};

export default Notification;
