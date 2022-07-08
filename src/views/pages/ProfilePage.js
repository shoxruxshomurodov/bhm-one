import React, { Component } from "react";
import { connect } from "react-redux";
import { FiUser, FiPhone } from "react-icons/fi";
import { get } from "lodash";
import { TweenLite, Power3 } from "gsap";
import "../../assets/styles/style.css";
import "../../assets/styles/App.css";
import { Link } from "react-router-dom";
import Hat from "../../components/Hat/Hat";
import { EditOutlined } from "@ant-design/icons";
import { RiEditBoxLine } from "react-icons/ri";
import { BiEditAlt } from "react-icons/bi";
import { FaUserEdit } from "react-icons/fa";
import { Button } from "antd";
class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.loadRef = React.createRef();
  }

  componentDidMount() {
    TweenLite.from(this.loadRef, 0.8, {
      opacity: 0,
      x: -200,
      ease: Power3.easeInOut,
    });
  }

  render() {
    const { profile } = this.props;
    return (
      <>
        <Hat
          name="Бош саҳифа"
          desc="bpm'one - бизнес жараёнларни бошқаришнинг ягона портали"
        />
        <div
          className="page-content"
          id="page-content"
          ref={(el) => (this.loadRef = el)}
        >
          <div className="padding sr">
            <div
              className="card"
              data-sr-id={2}
              style={{
                visibility: "visible",
                transform: "none",
                opacity: 1,
                transition: "none 0s ease 0s",
              }}
            >
              <div className="card-header bg-img p-0 no-border ">
                <div className="bg-dark-overlay gd-info mode-chat-dark">
                  <div className="d-md-flex">
                    <div className="p-4">
                      <div className="d-flex">
                        <div>
                          <span className="avatar w-64 text-lg">
                            <FiUser style={{ color: "#fff" }} />
                            <i className="on" />
                          </span>
                        </div>

                        <div className="mx-3">
                          <h5 className="mt-2" style={{ color: "#fff" }}>
                            {get(profile, "profile")
                              ? get(profile, "profile.NAME")
                              : get(profile, "phone")}
                          </h5>
                          <div className="text-fade text-sm">
                            <FiPhone className="mr-1" />+{get(profile, "phone")}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex"></div>
                    <div className="align-items-center d-flex p-4">
                      <div className="toolbar">
                        <Link
                          to="/profile-edit"
                          className="btn btn-sm btn-icon bg-dark-overlay btn-rounded"
                        >
                          <FaUserEdit
                            size={20}
                            style={{
                              paddingLeft: 4,
                            }}
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="card mode-chat-dark"
                  style={{
                    visibility: "visible",
                    transform: "none",
                    opacity: 1,
                    transition: "none 0s ease 0s",
                    marginBottom: "0px",
                    borderRadius: "0px",
                  }}
                >
                  <div className="row px-2">
                    <div className="col-md-6 p-2">
                      <ul className="nav flex-column  mode-text-dark">
                        <li className="nav-link">
                          <div>Пол :</div>
                          <small>{get(profile, "employee.GENDER")}</small>
                        </li>
                        <li className="nav-link">
                          <div> Дата начала:</div>
                          <small> {get(profile, "employee.DATE_BEGIN")}</small>
                        </li>
                        <li className="nav-link">
                          <div> Дата рождения :</div>
                          <small>{get(profile, "employee.BIRTH_DATE")}</small>
                        </li>
                        <li className="nav-link">
                          <div> Паспорт Серии :</div>
                          <small>
                            {get(profile, "employee.PASSPORT_SERIA")}
                          </small>
                        </li>
                        <li className="nav-link">
                          <div> Номер паспорта :</div>
                          <small>
                            {get(profile, "employee.PASSPORT_NUMBER")}
                          </small>
                        </li>
                        <li className="nav-link">
                          <div>Работа с телефоном :</div>
                          <small>{get(profile, "employee.PHONE_WORK")}</small>
                        </li>
                        <li className="nav-link">
                          <div> ИНПС :</div>
                          <small>{get(profile, "employee.INPS")}</small>
                        </li>
                        <li className="nav-link">
                          <div>INN :</div>
                          <small>{get(profile, "employee.INN")}</small>
                        </li>
                      </ul>
                    </div>
                    <div className="col-md-6 p-2">
                      <ul className="nav flex-column mode-text-dark">
                        <li className="nav-link">
                          <div> Состояние :</div>
                          <small>{get(profile, "section.DEP_CONDITION")}</small>
                        </li>
                        <li className="nav-link">
                          <div> Ставка :</div>
                          <small>{get(profile, "employee.STAVKA")}</small>
                        </li>
                        <li className="nav-link">
                          <div> Название отдела :</div>
                          <small>{get(profile, "section.DEP_NAME")}</small>
                        </li>
                        <li className="nav-link">
                          <div> Должность:</div>
                          <small>{get(profile, "section.POST_NAME")}</small>
                        </li>
                        <li className="nav-link">
                          <div> Банк :</div>
                          <small>{get(profile, "section.DEP_FILIAL")}</small>
                        </li>
                        <li className="nav-link">
                          <div> Идентификатор сотрудника в iABS :</div>
                          <small>{get(profile, "profile.USER_ID")}</small>
                        </li>
                        <li className="nav-link">
                          <div>Номер таблицы :</div>
                          <small>{get(profile, "employee.EMP_ID")}</small>
                        </li>
                        <li className="nav-link">
                          <div>Идентификатор сотрудника в СБ :</div>
                          <small>{get(profile, "employee.TAB_NUM")}</small>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    profile: get(state, "auth.user", {}),
  };
};

export default connect(mapStateToProps, null)(ProfilePage);
