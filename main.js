import AuthPage from './pages/AuthPage/AuthPage.jsx';
import EventRemovePage from "./pages/EventRemovePage/EventRemovePage.jsx";
import MainPage from "./pages/MainPage/MainPage.jsx";

import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import {
    HashRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

import { subscribe } from "./utils/eventBus";
import Store from "./utils/store";
import '/styles/main.scss';
import EventCreationPage from './pages/EventCreationPage/EventCreationPage.jsx';

let container = document.querySelector("#main");

// customElements.define("multi-select", MultiSelect);

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <MainPage />
                </Route>
                <Route path="/create">
                    <EventCreationPage />
                </Route>
                <Route path="/remove/:id">
                    <EventRemovePage />
                </Route>
            </Switch>
        </Router>
    )
};

function render(app, container) { 
    ReactDOM.render(
        app,
        container
    );
};

Store.getCurrentUser()
.then(() => {
    if (Store.isLoggedIn) {
        render (
            <App />, 
            container
        );
    } else {
        render (
            <AuthPage />,
            container
        )
    }
})


subscribe("logout", () => {
    render (
        <AuthPage />, 
        container
    );
});

subscribe("login", () => {
    render (
        <App />, 
        container
    );
});