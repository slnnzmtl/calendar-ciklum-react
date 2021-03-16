import React, { useEffect, useState } from "react";
import TableComponent from "../../components/TableComponent/TableComponent.jsx";
import MainMenu from "../../components/MainMenu/MainMenu.jsx";
import "./MainPage.scss";

export default function MainPage() {

    return (
      <div className="main-page">
        <TableComponent />
        <MainMenu />
      </div>
    )
}