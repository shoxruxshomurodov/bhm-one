import React from "react";
import { Tabs } from "antd";
import { get, isNull,isEmpty } from "lodash";
import NumberFormat from "react-number-format";
import { BsFileEarmarkCheck, BsCardImage } from "react-icons/bs";
const { TabPane } = Tabs;
const Tab = (props) => {
  const {
    loan_coa,
    loan_id,
    sum,
    account_view,
    close_date,
    open_date,
    creditType,
    loan_account,
    loanState,
    files
  } = props;
  return (
    <Tabs defaultActiveKey="2" className="pl-2">
      <TabPane tab="Мижоз маълумотлари" key="1">
        <div className="row px-2">
          <div className="col-md-6 p-2">
            <ul className="nav flex-column  mode-text-dark">
              <li className="nav-link">
                <span className="text-muted">Cсуда ид</span> <br />
                <i className="text-primary">{loan_id}</i>{" "}
                <strong className="text-primary"></strong>
              </li>
              <li className="nav-link">
                <span className="text-muted">Kредит миқдори</span> <br />
                <i className="text-primary">
                  <NumberFormat
                    value={sum}
                    displayType={"text"}
                    thousandSeparator={" "}
                    suffix=" сум"
                  />
                </i>{" "}
              </li>

              <li className="nav-link">
                <span className="text-muted">Кредит тури</span>
                <br />
                <i className="text-primary">{get(creditType, "name")}</i>{" "}
              </li>

              <li className="nav-link">
                <span className="text-muted">Кредит ажратилган сана</span>
                <br />
                <i className="text-primary">{open_date}</i>{" "}
              </li>
              <li className="nav-link">
                <span className="text-muted">Холати</span>
                <br />
                <i className="text-primary">
                  {get(loanState, "stateStatus.name")}
                </i>{" "}
              </li>
            </ul>
          </div>
          <div className="col-md-6 p-2">
            <ul className="nav flex-column mode-text-dark">
              <li className="nav-link">
                <span className="text-muted">Cсуда ҳисоб</span>
                <br />
                <i className="text-primary">{loan_account}</i>{" "}
              </li>
              <li className="nav-link">
                <span className="text-muted">баланс ҳисоб рақами</span>
                <br />
                <i className="text-primary">{loan_coa}</i>{" "}
              </li>
              <li className="nav-link">
                <span className="text-muted">Йиллик фоиз ставкаси</span>
                <br />
                <i className="text-primary">
                  {get(loanState, "percent_sum")} %
                </i>{" "}
              </li>
              <li className="nav-link">
                <span className="text-muted">
                  Кредит кайтариш охирги санаси
                </span>
                <br />
                <i className="text-primary">{close_date}</i>{" "}
              </li>
              <li className="nav-link">
                <span className="text-muted"> Кредит қарздорлик қолдиғи</span>
                <br />
                <i className="text-primary">
                  <NumberFormat
                    value={get(account_view, "type_1_sum")}
                    displayType={"text"}
                    thousandSeparator={" "}
                    suffix=" сум"
                  />
                </i>{" "}
              </li>
            </ul>
          </div>
        </div>
      </TabPane>
      <TabPane tab="Назоратга олинган қарзлар" key="2">
        <div>
          <div className="list list-row box-shadow mb-4 mt-0 r">
            <div className="list-item bg-gray_first" data-id={16}>
              <div className="d-flex justify-content-between w-100 align-items-center">
                <div>
                  <span>Жорий хисобланган фоиз</span>
                  <br />
                  <span>16309</span>
                </div>
                <h2 className="item-except  mb-0">
                  <NumberFormat
                    value={get(account_view, "type_3_sum")}
                    displayType={"text"}
                    thousandSeparator={" "}
                  />
                </h2>
              </div>
            </div>
            <div className="list-item bg-gray" data-id={16}>
              <div className="d-flex justify-content-between w-100 align-items-center">
                <div>
                  <span>Муддати ўтган кредит қарздорлиги</span>
                </div>
                <h2 className="item-except text-white mb-0">
                  <NumberFormat
                    value={get(account_view, "type_5_sum")}
                    displayType={"text"}
                    thousandSeparator={" "}
                  />
                </h2>
              </div>
            </div>
            <div className="list-item bg-gray" data-id={16}>
              <div className="d-flex justify-content-between w-100 align-items-center">
                <div>
                  <span>Суд жараёнидаги кредит</span>
                  <br />
                </div>
                <h2 className="item-except text-white mb-0">
                  {isNull(get(account_view, "type_8_sum")) ? (
                    0
                  ) : (
                    <NumberFormat
                      value={get(account_view, "type_8_sum")}
                      displayType={"text"}
                      thousandSeparator={" "}
                    />
                  )}
                </h2>
              </div>
            </div>
            <div className="list-item bg-gray" data-id={16}>
              <div className="d-flex justify-content-between w-100 align-items-center">
                <div>
                  <span>
                    Муддати ўтган кредит қарздорлиги учун ҳисобланган фоиз
                  </span>
                  <br />
                  <span>16309/16377</span>
                </div>
                <h2 className="item-except text-white  mb-0">
                  {isNull(get(account_view, "type_7_sum")) ? (
                    0
                  ) : (
                    <NumberFormat
                      value={get(account_view, "type_7_sum")}
                      displayType={"text"}
                      thousandSeparator={" "}
                    />
                  )}
                </h2>
              </div>
            </div>
            <div className="list-item bg-gray" data-id={16}>
              <div className="d-flex justify-content-between w-100 align-items-center">
                <div>
                  <span>Пеня</span>
                  <br />
                  <span>16405</span>
                </div>
                <h2 className="item-except text-white mb-0">
                  {isNull(get(account_view, "type_22_sum")) ? (
                    0
                  ) : (
                    <NumberFormat
                      value={get(account_view, "type_22_sum")}
                      displayType={"text"}
                      thousandSeparator={" "}
                    />
                  )}
                </h2>
              </div>
            </div>
            <div className="list-item bg-gray" data-id={16}>
              <div className="d-flex justify-content-between w-100 align-items-center">
                <div>
                  <span>Муддати ўтган фоиз тўловлари</span>
                  <br />
                  <span>16377</span>
                </div>
                <h2 className="item-except text-white mb-0">
                  {isNull(get(account_view, "type_46_sum")) ? (
                    0
                  ) : (
                    <NumberFormat
                      value={get(account_view, "type_46_sum")}
                      displayType={"text"}
                      thousandSeparator={" "}
                    />
                  )}
                </h2>
              </div>
            </div>
            <div className="list-item bg-gray" data-id={16}>
              <div className="d-flex justify-content-between w-100 align-items-center">
                <div>
                  <span>Пандемия даврида ҳисобланган фоиз</span>
                  <br />
                  <span>16379</span>
                </div>
                <h2 className="item-except text-white mb-0">
                  {isNull(get(account_view, "type_118_sum")) ? (
                    0
                  ) : (
                    <NumberFormat
                      value={get(account_view, "type_118_sum")}
                      displayType={"text"}
                      thousandSeparator={" "}
                    />
                  )}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </TabPane>
      <TabPane tab="Балансдан ташқари х/р лардаги қарзлар" key="3">
        <div className="list list-row box-shadow mb-4 mt-0 bg-white r">
          <div className="list-item bg-gray_first" data-id={16}>
            <div className="d-flex justify-content-between w-100 align-items-center">
              <div>
                <span>Балансдан ташқарида ҳисобланаётган фоиз</span>
                <br />
                <span>91501</span>
              </div>
              <h2 className="item-except text-white mb-0">
                <NumberFormat
                  value={get(account_view, "except_balance_percent")}
                  displayType={"text"}
                  thousandSeparator={" "}
                />
              </h2>
            </div>
          </div>
          <div className="list-item bg-gray" data-id={16}>
            <div className="d-flex justify-content-between w-100 align-items-center">
              <div>
                <span>Балансдан ташқари х/р да юритилаётган кредит</span>
                <br />
                <span>95413</span>
              </div>
              <h2 className="item-except text-white mb-0">
                <NumberFormat
                  value={get(account_view, "type_34_sum")}
                  displayType={"text"}
                  thousandSeparator={" "}
                />
              </h2>
            </div>
          </div>
        </div>
      </TabPane>
      <TabPane tab="Файллар" key="4">
        <div style={{ maxHeight: "600px", overflow: "auto" }}>
        {files &&
          files.map((file) => {
            return (
              <div
                className="d-flex card align-items-center cursor-pointer"
                style={{ flexDirection: "row" }}
                onClick={() => window.open(get(file, "src"), "_blank")}
              >
                {["jpeg", "png", "svg", "jpg"].includes(get(file, "ext")) ? (
                  <BsCardImage />
                ) : (
                  <BsFileEarmarkCheck />
                )}
                <b className="ml-2">{get(file, "title")}</b>
              </div>
            );
          })}
        {isEmpty(files) && <p className="text-center">Файл юкланмаган</p>}
        </div>
      </TabPane>
    </Tabs>
  );
};

export default Tab;
