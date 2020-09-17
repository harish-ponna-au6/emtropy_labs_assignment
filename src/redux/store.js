import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { FETCHING_ARTICLES, IS_LOADING, SETTING_PAGE } from "./actionTypes";

const initialState = {
  totalResults: 0,
  articles: [],
  likes: [],
  hidden: [],
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
    default:
      return state;
  }
};

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export { store };
