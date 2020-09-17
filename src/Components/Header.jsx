import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import "../styles/Header.css";
import queryString from "query-string";

function Header(props) {
  const {
    location: { search },
  } = props;

  const [state, setstate] = useState("science");

  const { category } = queryString.parse(search);

  useEffect(() => {
    setstate(category);
  }, [category]);

  return (
    <div className="Header">
      <Link to="/topheadlines?category=science">
        <div className={`science ${state === "science" ? "active" : null}`}>
          <i className="fas fa-vials"></i>
          <p>Science</p>
        </div>
      </Link>
      <Link to="/topheadlines?category=sports">
        <div className={`sports ${state === "sports" ? "active" : null}`}>
          <i className="far fa-futbol"></i>
          <p>Sports</p>
        </div>
      </Link>
      <Link to="/topheadlines?category=technology">
        <div
          className={`technology ${state === "technology" ? "active" : null}`}
        >
          <i className="fas fa-microchip"></i>
          <p>Technology</p>
        </div>
      </Link>
    </div>
  );
}

export default withRouter(Header);
