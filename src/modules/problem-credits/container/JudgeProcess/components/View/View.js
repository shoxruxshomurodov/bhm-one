import React, { useState } from "react";
import { get, isNil } from "lodash";
import { request } from "../../../../../../services/api";
import SavedSucces from "../../../../../../components/SweetAlert/SavedSucces";
import Tab from "./Tab";
import Header from "./Header";
import Files from "./Files";
import CountDown from "./CountDown";

const View = (props) => {
  const [successSaved, setSuccessSaved] = useState(false);
  const { loanState, loan_id, judgeFileForm } = props;

  const uploadFile = ({ fileTitle, file, fields = {} }) => {
    const formData = new FormData();
    formData.append(`${fields.fileFieldName}`, get(file, "file"));
    formData.append(`${fields.fileFieldTitle}`, fileTitle);
    formData.append("fileable_id", loan_id);
    return request
      .post(`/problem-credit/juridic/judge-file-upload`, formData)
      .then(() => {
        setSuccessSaved(true);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      });
  };
  return (
    <div className="d-flex flex fixed-content">
      <div className="d-flex flex" id="content-body">
        <div className="d-flex flex-column flex">
          <div className="p-3">
            <div className="toolbar">
              <button
                onClick={() => window.history.back()}
                className="btn btn-sm btn-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-arrow-left"
                >
                  <line x1={19} y1={12} x2={5} y2={12} />
                  <polyline points="12 19 5 12 12 5" />
                </svg>{" "}
              </button>
              <span className="ml-auto">
                Маълумотлар
                <button className="btn btn-sm no-shadow bg-primary-lt mx-1">
                  {get(loanState, "period")}
                </button>
                сана ҳолатига
              </span>
            </div>
          </div>
          <div className="scroll-y mx-3 card">
            <Header {...props} />
            <div
              className="row no-gutters"
              style={{ maxHeight: "750px", minHeight: "650px" }}
            >
              <div className="col-md-6 card mb-0">
                <Tab {...props} />
              </div>
              <div className="col-md-6 pb-4">
                <div className="col-12">
                  <div
                    className="row no-gutters"
                    style={{
                      maxHeight: "700px",
                      minHeight: "650px",
                      overflow: "auto"
                    }}
                  >
                    {judgeFileForm &&
                      judgeFileForm.map(
                        ({
                          title,
                          fileName,
                          fileTitle,
                          timer,
                          color,
                          is_open
                        }) => {
                          return (
                            <>
                              <Files
                                title={title}
                                uploadBtn={uploadFile}
                                fileFieldName={fileName}
                                fileFieldTitle={fileTitle}
                                is_open={is_open}
                                color={color}
                              />
                              {!isNil(timer) ? (
                                <CountDown timer={timer} />
                              ) : (
                                <div className="col-md-6"></div>
                              )}
                            </>
                          );
                        }
                      )}
                  </div>
                </div>
                {successSaved && <SavedSucces />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;
