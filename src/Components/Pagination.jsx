import React, { useEffect } from "react";
import { connect } from "react-redux";
import queryString from "query-string";
import { withRouter } from "react-router-dom";
import { settingPage } from "../redux/actions";

import "../styles/Pagination.css";

const Pagination = (props) => {
  const {
    history: { push },
    location: { search },
    totalResults,
    settingPage,
    page,
  } = props;

  const { q, category } = queryString.parse(search);

  const handleClick = () => {
    let route;
    if (category) route = `category=${category}`;
    else route = `q=${q}`;
    push(`/topheadlines?${route}&page=${page}`);
  };

  useEffect(() => {
    let route;
    if (category) route = `category=${category}`;
    else route = `q=${q}`;
    push(`/topheadlines?${route}&page=${page}`);
  }, [page, category, q, push]);

  return (
    <div className="Pagination">
      <div>
        <p
          onClick={() => {
            if (page - 1 <= 0) return;
            settingPage(page - 1);
            handleClick();
          }}
          className={page === 1 ? "disabled" : null}
        >
          Prev
        </p>
        <p
          onClick={() => {
            if (page * 20 > totalResults) return;
            settingPage(page + 1);
            handleClick();
          }}
          className={page * 20 > totalResults ? "disabled" : null}
        >
          Next
        </p>
      </div>
    </div>
  );
};

export default connect(
  (state) => ({ totalResults: state.totalResults, page: state.page }),
  { settingPage }
)(withRouter(Pagination));
