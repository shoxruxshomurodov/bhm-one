import React from "react";
import Swal from "sweetalert2";
import { isEqual } from "lodash";
const Alert = ({ code = 200, message = "Қабул қилинди" }) => {
  Swal.fire({
    position: "center",
    icon: isEqual(code, 200) ? "success" : "error",
    backdrop: "rgba(0,0,0,0.9)",
    background: "none",
    title: message,
    showConfirmButton: false,
    timer: 10000,
    customClass: {
      title: "title-color"
    }
  });
  return <div></div>;
};

export default Alert;
