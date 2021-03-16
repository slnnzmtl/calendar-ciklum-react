import React, { useState } from "react";
import "./AuthPage.scss";
import AuthForm from "../../components/AuthForm/AuthForm.jsx";
import Store from "../../utils/store";

export default function AuthPage() {

// let renderForm = () => {
  // Store.getUsers()
  // .then(() => {
    // return (
      // <AuthForm />
    // )
  // })
// }
const [ready, setReady] = useState(false);

Store.getUsers()
.then(() => {
  setReady(true);
});

  return (
    <div className="auth-wrapper">
      {
        ready &&
        <AuthForm />
      }
    </div>
  )
} 