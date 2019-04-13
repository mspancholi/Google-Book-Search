import React from "react";
import "./style.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function ActionBtn(props) {
  return (
    <button className="action-btn" {...props}  tabIndex="0">
      {props.btn_text}
    </button>
  );
}

export default ActionBtn;
