import React, { useEffect, useState } from "react";
import "./ErrorsHandler.scss";

export default function ErrorsHandler({error}) {

  console.log(error)

  const [visible, setVisible] = useState();


  useEffect(() => {
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
    }, 3000);
  }, []);
  

  let render = (isVisible) => {
    if (isVisible) {
      return (
        <div className="errors-handler">
          <div className="errors-handler__item">
            <p className="errors-handler__p">
              {error}
            </p>
          </div>
        </div>
      )
    } else {
      return "";
    }
  };

  return render(visible);
};