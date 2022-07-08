import React from "react";
import ReactLoading from "react-loading";
function LoaderMessage() {
  return (
    <div>
      <ReactLoading
        type="bubbles"
        color="#000"
        height={30}
        width={30}
      />
    </div>
  );
}

export default LoaderMessage;
