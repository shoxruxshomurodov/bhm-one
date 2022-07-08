import React from "react";
import { useFileUpload } from "use-file-upload";
import { get, isNil } from "lodash";
const Form = ({ uploadVideo, uploaded_video }) => {
  const [video, selectVideo] = useFileUpload();
  return (
    <div className="card">
      <div className="card-header">
        <strong>Видео юклаш</strong>
      </div>
      <div className="card-body">
        <>
          <div className="form-group">
            <>
              <div className="wrapper_btn">
                <button
                  className="upload_btn"
                  onClick={() => selectVideo({ accept: "video/*" })}
                >
                 Видео юклаш
                </button>
              </div>

              {video ? (
                <div>
                  <iframe
                    style={{ width: "100%" }}
                    height={200}
                    src={get(video, "source")}
                    allow="autoplay"
                    title="video"
                  />
                  <div>
                    <span> Номи: {get(video, "name")} </span> <br />
                    <span> Ҳажми: {get(video, "size")} </span>
                  </div>
                </div>
              ) : (
                <small>Видео Юкланмаган</small>
              )}
            </>
          </div>
          <button
            type="submit"
            onClick={() => uploadVideo(video)}
            className="btn btn-primary"
            disabled={isNil(video)}
          >
            Юклаш
          </button>
        </>
      </div>
    </div>
  );
};

export default Form;
