import React from "react";
import { useFileUpload } from "use-file-upload";
import { get } from "lodash";
const Video = ({ uploadedVideo }) => {
  const [video, selectVideo] = useFileUpload();
  return (
    <>
      <div className="wrapper_btn">
        <button
          className="upload_btn"
          onClick={() => selectVideo({ accept: "video/*" })}
        >
          Video Yuklash
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
            <span> Nomi: {get(video, "name")} </span> <br />
            <span> Hajmi: {get(video, "size")} </span>
          </div>
        </div>
      ) : (
        <small>Video Yuklanmagan</small>
      )}
    </>
  );
};
export default Video;
