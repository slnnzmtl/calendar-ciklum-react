import React, { useEffect } from "react";
import store from "./store";

export const CurrentUserContext = React.createContext();

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = React.useState(store.currentUser);
  console.log('context')

  const fetchCurrentUser = async () => {
    store.getCurrentUser()
    .then(() => {
      setCurrentUser(store.currentUser);
    });
  };

  return (
    <CurrentUserContext.Provider value={{ currentUser, fetchCurrentUser }}> 
      {children}
    </CurrentUserContext.Provider>
  )
};

export const useCurrentUser = () => React.useContext(CurrentUserContext); 