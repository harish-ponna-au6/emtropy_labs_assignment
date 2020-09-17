import React from "react";
import "./styles/App.css";
import Header from "./Components/Header";
import Search from "./Components/Search";
import { Redirect, Route, Switch } from "react-router-dom";
import Cards from "./Components/Cards";
import { connect } from "react-redux";
import Loading from "./Components/Loading";
import Pagination from "./Components/Pagination";

function App(props) {
  const { isLoadingState } = props;
  return (
    <div className="App">
      {isLoadingState && <Loading />}
      <Search />
      <Header />
      <Pagination />
      <Switch>
        <Route exact path="/topheadlines" component={Cards} />
        <Redirect to="/topheadlines?category=science" />
      </Switch>
    </div>
  );
}

export default connect((state) => ({ isLoadingState: state.isLoading }))(App);
