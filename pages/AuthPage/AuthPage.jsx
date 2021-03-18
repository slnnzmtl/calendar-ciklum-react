import React, { useState } from "react";
import "./AuthPage.scss";
import AuthForm from "../../components/AuthForm/AuthForm.jsx";

export default function AuthPage({users, returnUser}) {
  
  return (
    <div className="auth-wrapper">
        <AuthForm users={users} returnUser={returnUser} />
    </div>
  )
} 