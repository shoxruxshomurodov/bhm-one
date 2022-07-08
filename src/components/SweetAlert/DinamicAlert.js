import React from "react";
import Swal from "sweetalert2";
import { isEqual } from "lodash";
const DinamicAlert = ({ code = 200, message = "Қабул қилинди" }) => {
  setTimeout(() => {
    Swal.fire({
      position: "center",
      icon: isEqual(code, 200) ? "success" : "error",
      backdrop: "rgba(0,0,0,0.9)",
      background: "none",
      title: message,
      showConfirmButton: false,
      timer: 1500,
      customClass: {
        title: "title-color"
      }
    });
  }, 700);
  return <div></div>;
};

export default DinamicAlert;
