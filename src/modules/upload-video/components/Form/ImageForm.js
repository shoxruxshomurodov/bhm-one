import React from "react";
import { useFileUpload } from "use-file-upload";
import { isEqual, isNil } from "lodash";
const Form = ({ uploadImage, inProcess }) => {
  const [image, selectImage] = useFileUpload();
  return (
    <div className="card">
      <div className="card-header">
        <strong>Расм юклаш</strong>
      </div>
      <div className="card-body">
        <>
          <div className="form-group text-center">
            <>
              {image ? (
                <img
                  src={image?.source}
                  alt="preview"
                  width="200"
                  height="200"
                  style={{ objectFit: "cover" }}
                  className="mb-1"
                />
              ) : (
                <small>Расм Юкланмаган</small>
              )}
              <div className="wrapper_btn">
                <button
                  className="upload_btn"
                  onClick={() => selectImage({ accept: "image/*" })}
                >
                  Расм юклаш
                </button>
              </div>
            </>
          </div>
          <button
            type="submit"
            onClick={() => uploadImage(image)}
            className="btn btn-primary"
            disabled={isNil(image)}
          >
            Юклаш
            {isEqual(inProcess, "image") && (
              <div class="spinner-border spinner-border-sm text-light ml-2"></div>
            )}
          </button>
        </>
      </div>
    </div>
  );
};

export default Form;
