import AuthPage from './pages/AuthPage/AuthPage.jsx';
import EventRemovePage from "./pages/EventRemovePage/EventRemovePage.jsx";
import MainPage from "./pages/MainPage/MainPage.jsx";

import React, { Fragment, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {
    HashRouter as Router,
    Switch,
    Route,
    Redirect,
  } from "react-router-dom";

import { subscribe } from "./utils/eventBus";
import Store from "./utils/store";
import '/styles/main.scss';
import EventCreationPage from './pages/EventCreationPage/EventCreationPage.jsx';
import { CurrentUserProvider, useCurrentUser } from "./utils/CurrentUserContext.jsx";


function App() {
    
  console.log("App");
  
  const [users, setUsers] = useState(Store.users);
  const [events, setEvents] = useState();
  const { currentUser, fetchCurrentUser } = useCurrentUser();

  useEffect(() => {
    fetchCurrentUser()
  }, []);

  useEffect(() => {
    if(currentUser) {
      Store.getEvents()
      .then(() => {
        setEvents(Store.events);
      });
    }
    return () => setEvents();
  }, [currentUser]);

  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);

  useEffect(() => {
    Store.getUsers()
    .then(() => {
      setUsers(Store.users);
    });
    return () => setUsers();
  }, []);

  useEffect(() => {
    subscribe("logout", () => {
      Store.clearCurrentUser()
      .then(() => {
        window.location.hash = "/auth";
      });
    });
    
    subscribe("login", () => {
      fetchCurrentUser();
      window.location.hash = ""; 
    });

    subscribe("refreshEvents", () => {
      setEvents(Store.events);
    })
  }, []);

  const isAuth = (children) => {
    return (
      currentUser === null ? (
        <Redirect to="/auth" /> 
      ) : (
        {...children}
      )
    )
  };

  return (
    <Router>
      <Switch>
        <Route exact path="/auth">
          <AuthPage users={users} />
        </Route>
        <Route exact path="/"
          render={() => isAuth(
            <MainPage users={users} events={events} />
          )}
        />
        <Route path="/create" 
          render={() => isAuth(
            <EventCreationPage users={users} />
          )}
        />
        <Route path="/remove/:id"
          render={() => isAuth(
            <EventRemovePage />
          )}
        />
      </Switch>
    </Router>
  )
};

ReactDOM.render(
  <CurrentUserProvider>
    <App />
  </CurrentUserProvider>,
  document.querySelector("#main")
);    