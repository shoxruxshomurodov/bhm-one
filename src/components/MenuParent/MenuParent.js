import React, {useState} from "react";
import classNames from "classnames";

const MenuParent = ({children, icon = "", title = "", iconClassname, titleClassname}) => {
  const [open, setOpen] = useState(false);

  return (
    <li className={`${open ? "active" : null}`}>
      <a onClick={() => setOpen((prev) => !prev)}>
        <span className={classNames("nav-icon", iconClassname)}>{icon}</span>
        <span
          className={classNames("nav-text", titleClassname)}>{title}</span>
        <span className={`nav-caret`}/>
      </a>
      <ul className={`nav-sub ${open ? "nav-mega" : null}`}>{children}</ul>
    </li>
  );
};

export default MenuParent;
