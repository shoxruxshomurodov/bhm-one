import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ApiActions from "../../../../services/api/Actions";
import { get, isEmpty, isNil, isEqual } from "lodash";
import Loader from "../../../../components/Loader";
import { withTranslation } from "react-i18next";
import { Form, Formik } from "formik";
import InputMask from "react-input-mask";
import { notification, Select } from "antd";
import RolesScheme from "../../../../schema/Roles";
import Normalizer from "../../../../services/normalizr";
import { useLocation } from "react-router-dom";
function AccessPage(props) {
  const { t } = props;
  const dispatch = useDispatch();
  const { Option } = Select;
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState(null);
  const [phone, setPhone] = useState(null);
  let data = useSelector((state) =>
    get(state, "normalize.data.employee-roles-list.result", [])
  );
  let rolesList = useSelector((state) =>
    get(state, "normalize.data.roles-list.result", [])
  );
  const isFetched = useSelector((state) =>
    get(state, "normalize.data.employee-roles-list.isFetched", false)
  );
  const hasErrors = useSelector((state) =>
    get(state, "normalize.data.employee-roles-list.hasErrors", false)
  );
  const entities = useSelector((state) => get(state, "normalize.entities", []));
  const user = get(data, "user") ?? [];
  const assigned = get(data, "assigned") ?? {};
  rolesList = get(
    Normalizer.Denormalize(rolesList, { data: [RolesScheme] }, entities),
    "data"
  );
  const role_type = isEqual(get(location, "pathname"), "/credit-problem/access")
    ? "problem"
    : "monitoring";
  const handleChange = (value) => {
    setValue(value);
  };
  const roleAssign = () => {
    if (isNil(value)) {
      notification["error"]({
        message: t("Please select a role"),
        description: t("Ошибка"),
        placement: "topRight",
      });
    } else {
      setIsLoading(true);
      const url = `/monitoring/roles/assign`;
      const storeName = "employee-roles-list-create";
      dispatch({
        type: ApiActions.OPERATION_ADD.REQUEST,
        payload: {
          attributes: { phone, role: value, revoke: 0 },
          url,
          storeName,
          cb: {
            success: (nData, data) => {
              notification["success"]({
                message: t("Успешно"),
                description: t("Создано"),
                placement: "topRight",
              });
              getUserRoles(phone, "", data);
              getAllRoles();
              setIsLoading(false);
            },
            fail: (e) => {
              notification["error"]({
                message: t(get(e, "response.data.message")),
                description: t("Ошибка"),
                placement: "topRight",
              });
              setIsLoading(false);
            },
          },
        },
      });
    }
  };
  const roleRevoke = () => {
    if (isNil(value)) {
      notification["error"]({
        message: t("Please select a role"),
        description: t("Ошибка"),
        placement: "topRight",
      });
    } else {
      setIsLoading(true);
      const url = `/monitoring/roles/assign`;
      const storeName = "employee-roles-list-create";
      dispatch({
        type: ApiActions.OPERATION_ADD.REQUEST,
        payload: {
          attributes: { phone, role: value, revoke: 1 },
          url,
          storeName,
          cb: {
            success: (nData, data) => {
              notification["success"]({
                message: t("Успешно"),
                description: t("Удалено"),
                placement: "topRight",
              });
              getUserRoles(phone, "", data);
              getAllRoles();
              setIsLoading(false);
            },
            fail: (e) => {
              notification["error"]({
                message: t(get(e, "response.data.message")),
                description: t("Ошибка"),
                placement: "topRight",
              });
              setIsLoading(false);
            },
          },
        },
      });
    }
  };
  const getUserRoles = (phone, action, state) => {
    setPhone(phone);
    const storeName = "employee-roles-list";
    dispatch({
      type: ApiActions.GET_ALL.TRIGGER,
      payload: {
        storeName,
      },
    });
    dispatch({
      type: ApiActions.GET_ALL.REQUEST,
      payload: {
        url: `/monitoring/roles/${phone}`,
        config: {
          params: {},
        },
        storeName,
        cb: {
          success: (nData, data) => {
            if (!isEqual(get(state, "message"), "success")) {
              notification["success"]({
                message: t("Успешно"),
                description: t("Найденно"),
                placement: "topRight",
              });
            }
          },
          fail: (e) => {
            notification["error"]({
              message: t(get(e, "response.data.message")),
              description: t("Ошибка"),
              placement: "topRight",
            });
            action.setSubmitting(false);
          },
        },
      },
    });
  };
  const getAllRoles = () => {
    const storeName = "roles-list";
    const entityName = "role";
    const scheme = { data: [RolesScheme] };
    dispatch({
      type: ApiActions.GET_ALL.TRIGGER,
      payload: {
        storeName,
      },
    });
    dispatch({
      type: ApiActions.GET_ALL.REQUEST,
      payload: {
        url: `/monitoring/roles`,
        config: {
          params: {
            role_type,
          },
        },
        scheme,
        storeName,
        entityName,
      },
    });
  };
  useEffect(() => {
    const storeName = "employee-roles-list";
    return () => {
      dispatch({
        type: ApiActions.GET_ALL.TRIGGER,
        payload: {
          storeName,
        },
      });
    };
  }, []);
  useEffect(() => {
    getAllRoles();
  }, [get(location, "pathname")]);
  return (
    <div className={"d-flex flex fixed-content mt-2"}>
      <div
        className={"d-flex flex"}
        style={{ width: "calc(100% - 240px)" }}
        id={"content-body"}
      >
        <div className={"d-flex flex-column flex w-100 mx-4"} id={"user-list"}>
          <Formik
            initialValues={{ phone: null }}
            validate={(values) => {
              const errors = {};
              if (
                !isEmpty(values.phone) &&
                values.phone.replace(/\D/g, "").length < 9 &&
                values.phone.replace(/\D/g, "").length > 0
              ) {
                errors.phone = t("Номер телефона введен не полностью");
              }
              return errors;
            }}
            onSubmit={(values, actions) => {
              getUserRoles(get(values, "phone").replace(/\D/g, ""), actions);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <Form className={"d-flex gap-10 w-100"} onSubmit={handleSubmit}>
                <div className={"w-100"}>
                  <InputMask
                    size="large"
                    mask="(99) 999-99-99"
                    type="text"
                    name="phone"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.phone}
                    placeholder={"Номер телефона"}
                    disabled={isSubmitting}
                    autoFocus={true}
                    className="ant-input ant-input-lg has-value text-center"
                  />
                  {errors.phone && touched.phone && (
                    <small className="text-danger d-block text-center my-2">
                      {errors.phone}
                    </small>
                  )}
                </div>
                <button
                  type={"submit"}
                  className={
                    "btn ml-3 btn-md btn-raised btn-wave btn-icon btn-rounded teal text-white"
                  }
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
                    className="feather feather-search mx-2"
                  >
                    <circle cx={11} cy={11} r={8} />
                    <line x1={21} y1={21} x2="16.65" y2="16.65" />
                  </svg>
                </button>
              </Form>
            )}
          </Formik>
          <>
            {isLoading && <Loader />}
            {!hasErrors && !isLoading && (
              <>
                <>
                  {user && isFetched && (
                    <div
                      className="card mt-2 mode-chat-dark"
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
                              <div>{t("NAME")} :</div>
                              <small>{get(user, "NAME")}</small>
                            </li>
                            <li className="nav-link">
                              <div> {t("FILIAL_CODE")} :</div>
                              <small> {get(user, "FILIAL_CODE")}</small>
                            </li>
                            <li className="nav-link">
                              <div> {t("PHONE_NUMBER")} :</div>
                              <small>{get(user, "PHONE_NUMBER")}</small>
                            </li>
                          </ul>
                        </div>
                        <div className="col-md-6 p-2">
                          <ul className="nav flex-column mode-text-dark">
                            <li className="nav-link">
                              <div> {t("Состояние")} :</div>
                              <small>{get(user, "STATE")}</small>
                            </li>
                            <li className="nav-link">
                              <div> {t("ROLES")} :</div>
                              {assigned &&
                                Object.keys(assigned).map((key) => {
                                  return <small>{key?.toUpperCase()} ,</small>;
                                })}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </>
                <>
                  {isFetched && (
                    <div className={"d-flex align-items-center mt-2"}>
                      <Select
                        onChange={handleChange}
                        showSearch
                        placeholder={t("Select a role")}
                        style={{ width: "100%" }}
                      >
                        {rolesList &&
                          rolesList.map((available) => {
                            return (
                              <Option value={get(available, "name")}>
                                {get(available, "name")}
                              </Option>
                            );
                          })}
                      </Select>
                      <button
                        onClick={roleRevoke}
                        className={
                          "btn ml-3 btn-md btn-raised btn-wave btn-icon btn-rounded red text-white"
                        }
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
                          className="feather feather-delete mx-2"
                        >
                          <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" />
                          <line x1={18} y1={9} x2={12} y2={15} />
                          <line x1={12} y1={9} x2={18} y2={15} />
                        </svg>
                      </button>
                      <button
                        onClick={roleAssign}
                        className={
                          "btn ml-3 btn-md btn-raised btn-wave btn-icon btn-rounded teal text-white"
                        }
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
                          className="feather feather-plus-circle mx-2"
                        >
                          <circle cx={12} cy={12} r={10} />
                          <line x1={12} y1={8} x2={12} y2={16} />
                          <line x1={8} y1={12} x2={16} y2={12} />
                        </svg>
                      </button>
                    </div>
                  )}
                </>
              </>
            )}
          </>
        </div>
      </div>
    </div>
  );
}

export default withTranslation("bhm_one")(AccessPage);
