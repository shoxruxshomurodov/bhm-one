import React from "react";
import { get, isEmpty, isNil, isEqual } from "lodash";
import { Modal, Input } from "antd";
import moment from "moment";
import FlipClock from "x-react-flipclock";
import SavedSucces from "../../../../../../components/SweetAlert/SavedSucces";
const { TextArea } = Input;
const Header = (props) => {
  const {
    client_view,
    bank,
    loanState,
    category,
    showWithOutGoal,
    isWithOutGoalModal,
    loan_id,
    hideWithOutGoal,
    changeCategory,
    typingComment,
    isFetchedGoal,
    sentToJuridicAlert,
    categoryOption
  } = props;
  return (
    <div className="px-4 py-4 d-sm-flex no-shrink b-b">
      <div>
        <span
          className="avatar gd-success"
          style={{
            width: "80px",
            height: "80px",
            fontSize: "30px",
            fontWeight: "normal"
          }}
        >
          {get(client_view, "name", "")
            .replace(/['"]+/g, "")
            .charAt(0)}
        </span>
      </div>
      <div className="px-sm-2" style={{ maxWidth: "600px" }}>
        <h2 className="text-md">
          {get(client_view, "name")} - {get(client_view, "inn")}
        </h2>
        <h6 className="d-block text-fade">
          {get(bank, "code")} - {get(bank, "name")}
        </h6>
        <h5 className="badge gd-info p-1">{get(categoryOption, "title")}</h5>
      </div>
      <div
        className="card flex"
        data-sr-id={74}
        style={{
          visibility: "visible",
          transform: "none",
          opacity: 1,
          transition: "none 0s ease 0s",
          boxShadow: "none",
          textAlign: "center"
        }}
      >
        <div>
          {!isEmpty(get(loanState, "overdue_days")) &&
            get(loanState, "overdue_days")}
          <h1
            style={{ fontSize: "20px" }}
            className="text-danger font-weight-bold"
          >
            Тўлов кечиктирилаётган кун : - {get(loanState, "overdue_days")}
          </h1>
          {isEqual(category, "RETURN_TO_FILIAL") && (
            <button
              className="btn btn-danger font-weight-bold"
              onClick={showWithOutGoal}
            >
              Мақсадсиз
            </button>
          )}
        </div>
        <Modal
          title="Мақсадсиз деб топилган кредит"
          visible={isWithOutGoalModal}
          onOk={() => changeCategory(loan_id)}
          onCancel={hideWithOutGoal}
          okText="Юбориш"
          cancelText="Бекор қилиш"
        >
          <TextArea
            placeholder="қўшимча изоҳ учун...."
            maxLength="200"
            rows={4}
            showCount
            className="mt-2"
            onChange={typingComment}
            required
          />
        </Modal>
        {isFetchedGoal && sentToJuridicAlert && <SavedSucces />}
      </div>
      <div
        style={{
          height: "0px",
          marginRight: "40px",
          transform: "scale(1.1)"
        }}
      >
        <h4 className="text-right">Кейин тўлов санаси</h4>
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
            isNil(get(loanState, "date_next"))
              ? moment().format("YYYY-MM-DD hh:mm:ss")
              : get(loanState, "date_next")
          }
        />
      </div>
    </div>
  );
};

export default Header;
