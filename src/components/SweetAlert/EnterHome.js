import React from "react";
import Swal from "sweetalert2";
const EnterHome = () => {
  Swal.fire({
    position: "center",
    icon: "success",
    backdrop: "rgba(0,0,0,0.9)",
    background: "none",
    title: "Добро пожаловать в нашу систему",
    showConfirmButton: false,
    timer: 1500,
    customClass: {
      title: "title-color",
    },
  });
  return <div></div>;
};

export default EnterHome;
