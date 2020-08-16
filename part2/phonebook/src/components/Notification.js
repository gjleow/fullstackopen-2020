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

  if (message === null) {
    return null;
  }

  return <div style={baseStyle}>{message}</div>;
};

export default Notification;
