import React from "react";
import Video from "../Video/Video";
const Form = () => {
  return (
    <div className="card" style={{ width: "35%", height: "100%" }}>
      <div className="card-header">
        <strong>Video va Text Yuklash</strong>
      </div>
      <div className="card-body">
        <>
          <div className="form-group">
            <label className="text-muted" htmlFor="exampleInputEmail1">
              Video yuklang
            </label>
            <Video />
            <input
              type="text"
              className="form-control"
              placeholder="Aylanib turuvchi text"
            />{" "}
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>

          <button type="submit" className="btn btn-primary">
            Yuklash
          </button>
        </>
      </div>
    </div>
  );
};

export default Form;
