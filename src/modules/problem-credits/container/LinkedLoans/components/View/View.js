import React, { useState } from "react";
import { get, values, isEmpty, isNil } from "lodash";
import { Modal } from "antd";
import Select from "../../../../../../components/Select/Select";
import WithUser from "../../../../../../services/auth/rbac/WithUser";
import Utils from "../../../../../../services/helpers/Utils";
import config from "../../../../../../config";
import { request } from "../../../../../../services/api";
import { Input } from "antd";
import Tab from "./Tabs";
import Header from "./Header";
import { useFileUpload } from "use-file-upload";
import { AiOutlineCloudUpload } from "react-icons/ai";
import SavedSucces from "../../../../../../components/SweetAlert/SavedSucces";
const { TextArea } = Input;

const View = (props) => {
  const [successSaved, setSuccessSaved] = useState(false);
  const [files, SetFiles] = useFileUpload();
  const [file_title, SetFile_title] = useState("");
  const {
    loanState,
    statusList,
    loan_id,
    loanEmployees,
    myLoanStatus,
    options,
    showModal,
    hideModal,
    showStatus,
    hideStatus,
    filterByUserId,
    filterByStatus,
    typingComment,
    sentToUserIdAndEmpIds,
    sendComments,
    isModalVisible,
    isStatusVisible
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
                ??????????????????????
                <button className="btn btn-sm no-shadow bg-primary-lt mx-1">
                  {get(loanState, "period")}
                </button>
                ???????? ????????????????
              </span>
            </div>
          </div>
          <div className="scroll-y mx-3 mb-3 card">
            <Header {...props} />
            <div className="row no-gutters">
              <div className="col-md-8">
                <Tab {...props} />
              </div>
              {!isEmpty(loanEmployees) && (
                <div className="col-md-4">
                  <div className="p-4">
                    {values(loanEmployees).map((employee, index) => {
                      return (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            flexDirection: "column",
                            minHeight: "15vh"
                          }}
                          key={index}
                        >
                          <h5 className="font-weight-bold">
                            ?????????????????????????? ??????????
                          </h5>
                          <h5>
                            <b>??.??.??:</b> {employee.full_name}
                          </h5>
                          <h5>
                            <b>?????????? ???????? : </b>
                            {employee.dep_name}
                          </h5>
                          <h5>
                            <b>????????????????</b>: {employee.post_name}
                          </h5>
                          {!isEmpty(get(employee, "user.phone")) && (
                            <h5>
                              <b>?????? ????????????</b>: {employee.user.phone}
                            </h5>
                          )}
                        </div>
                      );
                    })}
                    <WithUser>
                      {({ userCan }) => {
                        return (
                          <>
                            {Utils.userCanStyle(userCan, [
                              config.ROLES.COLLECTOR_FILIAL_MANAGER,
                              config.ROLES.COLLECTOR_CREDIT_ASSIGNER
                            ]) && (
                              <button
                                onClick={showModal}
                                style={{ float: "right" }}
                                className="btn btn-sm btn-primary"
                              >
                                ???????????????????????? ????????????????????
                              </button>
                            )}
                          </>
                        );
                      }}
                    </WithUser>
                    <Modal
                      title="???????????????????????? ????????????????????"
                      visible={isModalVisible}
                      onOk={sentToUserIdAndEmpIds}
                      onCancel={hideModal}
                      okText="???????????????????????? ????????????"
                      cancelText="?????????? ??????????"
                    >
                      <Select
                        placeholder="???????????????? ????????????????????"
                        filterBy={filterByUserId}
                        options={options}
                        className="w-100 mr-1"
                      />
                    </Modal>
                  </div>
                  <div className="p-4">
                    <h5 className="font-weight-bold"> ??????????????</h5>
                    <button
                      onClick={showStatus}
                      style={{ float: "right" }}
                      className="btn btn-sm btn-primary"
                    >
                      ???????? ????????
                    </button>

                    <Modal
                      title="???????????? ????????????"
                      visible={isStatusVisible}
                      onOk={sendComments}
                      onCancel={hideStatus}
                      okText="????????????"
                      cancelText="?????????? ??????????"
                    >
                      <Select
                        placeholder="???????????????? ????????????"
                        filterBy={filterByStatus}
                        options={statusList}
                        className="w-100 mb-3"
                      />
                      <TextArea
                        placeholder="?????????????? ???????? ????????...."
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
                                <b>????????????</b> : {comment.status_name}
                              </h5>
                              <h6>
                                <b>????????</b> : {comment.comment}
                              </h6>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h5 className="font-weight-bold">???????? ??????????</h5>
                    <div className="d-flex align-items-center ">
                      <AiOutlineCloudUpload
                        onClick={() => SetFiles({ multiple: true })}
                        fontSize={30}
                        style={{ cursor: "pointer" }}
                      />
                      <input
                        type="text"
                        onChange={typingFileTile}
                        placeholder="???????? ????????"
                        value={file_title}
                        className="form-control form-control-sm ml-1"
                      />
                      <button
                        onClick={UploadFiles}
                        className="btn btn-sm btn-primary"
                        style={{ height: "30px", fontSize: "12px" }}
                        disabled={isNil(files) ? true : false}
                      >
                        ??????????
                      </button>
                    </div>
                    {files ? (
                      files.map((file) => (
                        <div>
                          <span>{file.name}</span>
                        </div>
                      ))
                    ) : (
                      <span>???????? ????????????????????</span>
                    )}

                    {successSaved && <SavedSucces />}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;
