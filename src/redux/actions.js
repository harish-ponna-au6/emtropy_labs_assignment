import Axios from "axios";
import {
  IS_LOADING,
  FETCHING_ARTICLES,
  SETTING_PAGE,
  SET_HIDE,
  SET_LIKE,
} from "./actionTypes";

export const fetchingArticles = ({
  category,
  isLoading,
  q,
  page = 1,
}) => async (dispatch) => {
  try {
    isLoading();
    if (page === 1) dispatch({ type: SETTING_PAGE, payload: 1 });
    let endPoint;
    if (category) endPoint = `category=${category}`;
    else endPoint = `q=${q}`;
    const { data } = await Axios(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=b51d4c6eda4b4d83ab71228ddd37d608&${endPoint}&page=${page}`
    );
    isLoading();

    dispatch({
      type: FETCHING_ARTICLES,
      payload: { articles: data.articles, totalResults: data.totalResults },
    });
  } catch (error) {
    isLoading();
    console.log(error);
  }
};

export const isLoading = () => ({ type: IS_LOADING });
export const settingPage = (value) => ({ type: SETTING_PAGE, payload: value });
export const setLike = (payload) => ({ type: SET_LIKE, payload });
export const setHide = (payload) => ({ type: SET_HIDE, payload });
