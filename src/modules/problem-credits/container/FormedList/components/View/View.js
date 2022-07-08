import React, { useState } from "react";
import { get, isEmpty, isNil } from "lodash";
import { Modal } from "antd";
import Select from "../../../../../../components/Select/Select";
import { request } from "../../../../../../services/api";
import SavedSucces from "../../../../../../components/SweetAlert/SavedSucces";
import { Input } from "antd";
import Tab from "./Tab";
import Header from "./Header";
import Files from "./Files";
import CountDown from "./CountDown";
const { TextArea } = Input;
const View = (props) => {
  const [successSaved, setSuccessSaved] = useState(false);
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
    loan_id,
    juridicFileForm
  } = props;

  const uploadFile = ({ fileTitle, file, fields = {} }) => {
    const formData = new FormData();
    formData.append(`${fields.fileFieldName}`, get(file, "file"));
    formData.append(`${fields.fileFieldTitle}`, fileTitle);
    formData.append("fileable_id", loan_id);
    return request
      .post(`/problem-credit/juridic/file-upload`, formData)
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
                    {juridicFileForm &&
                      juridicFileForm.map(
                        ({ title, fileName, fileTitle, timer, color ,is_open}) => {
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
                                <CountDown timer={timer}  />
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
