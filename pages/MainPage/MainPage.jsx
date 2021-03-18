import React, { useEffect } from "react";
import TableComponent from "../../components/TableComponent/TableComponent.jsx";
import MainMenu from "../../components/MainMenu/MainMenu.jsx";
import "./MainPage.scss";
import { useCurrentUser } from "../../utils/CurrentUserContext.jsx";


export default function MainPage({users, events}) {

  const { currentUser, fetchCurrentUser } = useCurrentUser();

  useEffect(() => {
    fetchCurrentUser();
  }, []);
  
  return (
    <div className="main-page">
      <TableComponent events={events} currentUser={currentUser} />
      <MainMenu users={users} currentUser={currentUser} />
    </div>
  )
}