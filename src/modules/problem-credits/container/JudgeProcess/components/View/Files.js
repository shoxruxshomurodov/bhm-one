import React, { useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { isNil, get } from "lodash";
import { useFileUpload } from "use-file-upload";

const Files = (props) => {
  const [fileTitle, setfileTitle] = useState("");
  const [file, setFile] = useFileUpload();
  const {
    uploadBtn,
    title,
    fileFieldName,
    fileFieldTitle,
    color,
    is_open
  } = props;
  return (
    <div className="col-md-6">
      <div className="p-2">
        <h5 className="font-weight-bold">{title}</h5>
        <div className="d-flex align-items-center ">
          <AiOutlineCloudUpload
            onClick={() => is_open && setFile()}
            fontSize={30}
            style={{
              cursor: is_open ? "pointer" : "not-allowed"
            }}
            color={!is_open && color}
          />
          <input
            type="text"
            onChange={(e) => setfileTitle(e.target.value)}
            placeholder="Файл номи"
            value={fileTitle}
            className="form-control form-control-sm ml-1"
            disabled={is_open ? false : true}
            style={{
              cursor: is_open ? "auto" : "not-allowed"
            }}
          />
          <button
            onClick={() =>
              uploadBtn({
                fileTitle,
                file,
                fields: { fileFieldName, fileFieldTitle }
              })
            }
            className="btn btn-sm btn-primary"
            style={{ height: "30px", fontSize: "12px" }}
            disabled={!isNil(file) && is_open ? false : true}
          >
            юклаш
          </button>
        </div>
      </div>
      {file ? (
        <span>{get(file, "file.name")}</span>
      ) : (
        <small>Файл юкланмаган</small>
      )}
    </div>
  );
};

export default Files;
