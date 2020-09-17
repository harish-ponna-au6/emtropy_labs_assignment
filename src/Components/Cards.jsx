import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchingArticles,
  isLoading,
  setHide,
  setLike,
} from "../redux/actions";
import queryString from "query-string";

import "../styles/Cards.css";

const Cards = (props) => {
  const {
    fetchingArticles,
    articles,
    isLoading,
    likes,
    hidden,
    setLike,
    setHide,
  } = props;
  const { category, q, page } = queryString.parse(props.location.search);

  useEffect(() => {
    fetchingArticles({ category, isLoading, q, page });
  }, [category, fetchingArticles, q, isLoading, page]);

  const noImage =
    "https://www.spaces.in/blog/wp-content/uploads/2018/02/no-image-3.jpg";

  return (
    <>
      <div className="Cards">
        {articles.length !== 0 &&
          articles.map((article, index) => {
            return (
              !hidden[article.publishedAt] && (
                <div key={index} className="card">
                  <Link to="#" onClick={() => window.open(article.url)}>
                    <img
                      src={article.urlToImage ? article.urlToImage : noImage}
                      alt="logo"
                    />
                  </Link>
                  <div className="content">
                    <p>
                      <b>Title</b> : {article.title}
                    </p>
                    <p>
                      <b>Author</b> : {article.author}
                    </p>
                    <p>
                      <b>Published Date</b> : {article.publishedAt}
                    </p>
                    <div className="like_hide">
                      <p onClick={() => setLike(article.publishedAt)}>
                        {likes[article.publishedAt] ? "Liked" : "Like"}
                      </p>
                      <p onClick={() => setHide(article.publishedAt)}>Hide</p>
                    </div>
                  </div>
                </div>
              )
            );
          })}
      </div>
    </>
  );
};

export default connect(
  (state) => ({
    articles: [...state.articles],
    likes: { ...state.likes },
    hidden: { ...state.hidden },
  }),
  {
    fetchingArticles,
    isLoading,
    setHide,
    setLike,
  }
)(Cards);
