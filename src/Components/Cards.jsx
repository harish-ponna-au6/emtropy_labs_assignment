import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchingArticles, isLoading } from "../redux/actions";
import queryString from "query-string";
import "../styles/Cards.css";

const Cards = (props) => {
  const { fetchingArticles, articles, isLoading } = props;
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
          articles.map((article, index) => (
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
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default connect((state) => ({ articles: [...state.articles] }), {
  fetchingArticles,
  isLoading,
})(Cards);
