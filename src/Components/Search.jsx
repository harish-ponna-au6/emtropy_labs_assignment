import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import "../styles/Search.css";

function Search(props) {
  const [state, setstate] = useState("");

  return (
    <div className="Search">
      <input
        onChange={(e) => setstate(e.target.value)}
        type="search"
        name="search"
        placeholder="Search"
      />
      <button
        onClick={() => {
          if (!state) return;
          props.history.push(`/topheadlines?q=${state}`);
        }}
      >
        Search
      </button>
    </div>
  );
}

export default withRouter(Search);
