import React from "react";

const Loading = () => {
  return (
    <div
      className="Loading"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        top: "0",
        left: "0",
        position: "fixed",
        fontSize: "30px",
        backgroundColor: "#c1bebea6",
      }}
    >
      Loading...
    </div>
  );
};

export default Loading;
