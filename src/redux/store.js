import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import {
  FETCHING_ARTICLES,
  IS_LOADING,
  SETTING_PAGE,
  SET_HIDE,
  SET_LIKE,
} from "./actionTypes";

const initialState = {
  totalResults: 0,
  articles: [],
  likes: localStorage.getItem("likes")
    ? JSON.parse(localStorage.getItem("likes"))
    : {},
  hidden: localStorage.getItem("hidden")
    ? JSON.parse(localStorage.getItem("hidden"))
    : {},
  isLoading: false,
  page: 1,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case FETCHING_ARTICLES:
      return {
        ...state,
        articles: payload.articles,
        totalResults: payload.totalResults,
      };

    case IS_LOADING:
      return { ...state, isLoading: !state.isLoading };

    case SETTING_PAGE:
      return { ...state, page: payload };

    case SET_LIKE: {
      var newState = { ...state };

      if (newState.likes[payload]) {
        console.log("if");
        delete newState.likes[payload];
        newState.articles.forEach((article) => {
          if (article.publishedAt === payload) article.isLiked = false;
        });
      } else {
        newState.likes[payload] = true;
        console.log({ likes: newState.likes });
        newState.articles.forEach((article) => {
          if (article.publishedAt === payload) article.isLiked = true;
        });
      }

      localStorage.setItem("likes", JSON.stringify(newState.likes));
      return { ...newState };
    }

    case SET_HIDE: {
      let newState = { ...state };

      newState.hidden[payload] = true;
      newState.articles = newState.articles.filter(
        (article) => article.publishedAt !== payload
      );

      localStorage.setItem("hidden", JSON.stringify(newState.hidden));
      return { ...newState };
    }

    default:
      return state;
  }
};

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export { store };
