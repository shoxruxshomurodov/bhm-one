import React, { useState } from "react";
import { get, isEmpty, isNil } from "lodash";
import { Modal } from "antd";
import Select from "../../../../../../components/Select/Select";
import { request } from "../../../../../../services/api";
import SavedSucces from "../../../../../../components/SweetAlert/SavedSucces";
import { Input } from "antd";
import Tab from "./Tab";
import Header from "./Header";
import FlipClock from "x-react-flipclock";
import moment from "moment";
import { useFileUpload } from "use-file-upload";
import { AiOutlineCloudUpload } from "react-icons/ai";
const { TextArea } = Input;
const View = (props) => {
  const [successSaved, setSuccessSaved] = useState(false);
  const [files, SetFiles] = useFileUpload();
  const [file_title, SetFile_title] = useState("");
  const {
    loanState,
    statusList,
    myLoanStatus,
    showStatus,
    hideStatus,
    filterByStatus,
    typingComment,
    sendComments,
    isStatusVisible,
    kpi,
    loan_id
  } = props;

  const typingFileTile = (e) => {
    SetFile_title(e.target.value);
  };

  const UploadFiles = () => {
    const formData = new FormData();
    formData.append("files", get(files[0], "file"));
    formData.append("title", file_title);
    formData.append("fileable_id", loan_id);
    return request
      .post(`/problem-credit/intentional/file-upload`, formData)
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
          <div className="scroll-y mx-3 mb-3 card">
            <Header {...props} />
            <div
              className="row no-gutters"
              style={{ maxHeight: "700px", minHeight: "650px" }}
            >
              <div className="col-md-6 card mb-0">
                <Tab {...props} />
              </div>
              <div className="col-md-6">
                <div className="col-12">
                  <div className="row no-gutters">
                    <div className="col-md-6">
                      <div className="p-2">
                        <h5 className="font-weight-bold">Файл юклаш</h5>
                        <div className="d-flex align-items-center ">
                          <AiOutlineCloudUpload
                            onClick={() => SetFiles({ multiple: true })}
                            fontSize={30}
                            style={{ cursor: "pointer" }}
                          />
                          <input
                            type="text"
                            onChange={typingFileTile}
                            placeholder="Файл номи"
                            value={file_title}
                            className="form-control form-control-sm ml-1"
                          />
                          <button
                            onClick={UploadFiles}
                            className="btn btn-sm btn-primary"
                            style={{ height: "30px", fontSize: "12px" }}
                            disabled={isNil(files) ? true : false}
                          >
                            юклаш
                          </button>
                        </div>
                      </div>
                      {files ? (
                        files.map((file) => (
                          <div>
                            <span>{file.name}</span>
                          </div>
                        ))
                      ) : (
                        <span>Файл юкланмаган</span>
                      )}
                    </div>
                    <div
                      className="col-md-6 d-flex align-items-center justify-content-center"
                      style={{ transform: "scale(0.8)" }}
                    >
                      <FlipClock
                        type="countdown"
                        units={[
                          {
                            sep: "",
                            type: "days",
                            title: "Кун"
                          },
                          {
                            sep: " ",
                            type: "hours",
                            title: "Соат"
                          },
                          {
                            sep: ":",
                            type: "minutes",
                            title: "Дақиқа"
                          },
                          {
                            sep: ":",
                            type: "seconds",
                            title: "Сония"
                          }
                        ]}
                        count_to={
                          isNil(get(kpi, "deadline_date"))
                            ? moment().format("YYYY-MM-DD hh:mm:ss")
                            : get(kpi, "deadline_date")
                        }
                      />
                    </div>
                  </div>
                </div>
                {successSaved && <SavedSucces />}
                <div className="p-4">
                  <h5 className="font-weight-bold">Изоҳлар</h5>
                  <button
                    onClick={showStatus}
                    style={{ float: "right" }}
                    className="btn btn-sm btn-primary"
                  >
                    Изоҳ ёзиш
                  </button>

                  <Modal
                    title="Статус Танлаш"
                    visible={isStatusVisible}
                    onOk={sendComments}
                    onCancel={hideStatus}
                    okText="сақлаш"
                    cancelText="Бекор қилиш"
                  >
                    <Select
                      placeholder="Выберите статус"
                      filterBy={filterByStatus}
                      options={statusList}
                      className="w-100 mb-3"
                    />
                    <TextArea
                      placeholder="қўшимча изоҳ учун...."
                      maxLength="200"
                      rows={4}
                      showCount
                      className="mt-2"
                      onChange={typingComment}
                    />
                  </Modal>
                  {!isEmpty(myLoanStatus) && (
                    <div
                      className="p-4 mt-4 "
                      style={{
                        width: "100%",
                        maxHeight: "200px",
                        overflowY: "auto"
                      }}
                    >
                      {myLoanStatus.map((comment) => {
                        return (
                          <div className="card">
                            <h5>
                              <b>Холати</b> : {comment.status_name}
                            </h5>
                            <h6>
                              <b>Изоҳ</b> : {comment.comment}
                            </h6>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;
