import * as React from "react";
import { Formik } from "formik";
import { Button, Checkbox, Form, Input, Select } from "antd";
import get from "lodash/get";
import SkeletonLoader from "../../../components/SkeletonLoader/SkeletonLoader";
const STYLE = {
  danger: "red",
  warning: "gold",
  info: "cyan",
  success: "green",
  primary: "blue",
  dark: "default",
  null: "blue",
};
export function UpdateForm({ attributes = {}, update }) {
  const { Option } = Select;
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };
  return (
    <Formik
      initialValues={{
        title: "",
        name: "",
        is_init: "",
        is_can_update_credit_request: "",
        style: "",
        is_can_change_amount: "",
        ...attributes,
      }}
      onSubmit={(values, actions) => {
        update(values, actions);
      }}
    >
      {({
        handleSubmit,
        handleChange,
        setFieldValue,
        handleBlur,
        values,
        errors,
        touched,
        isSubmitting,
      }) => {
        if (isSubmitting) {
          return <SkeletonLoader />;
        }
        return (
          <>
            <Form onFinish={handleSubmit} {...layout}>
              <Form.Item
                label="Название"
                name="title"
                hasFeedback={get(errors, "title", []).length > 0}
                validateStatus={
                  get(errors, "title", []).length > 0 ? "error" : ""
                }
                help={
                  get(errors, "title", []).length > 0
                    ? errors.title && touched.title && errors.title
                    : null
                }
              >
                <Input
                  size="middle"
                  type="text"
                  name="title"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  defaultValue={values.title}
                  value={values.title}
                  placeholder={`Название`}
                  disabled={isSubmitting}
                />
              </Form.Item>
              <Form.Item
                label="Имя"
                name="name"
                hasFeedback={get(errors, "name", []).length > 0}
                validateStatus={
                  get(errors, "name", []).length > 0 ? "error" : ""
                }
                help={
                  get(errors, "name", []).length > 0
                    ? errors.name && touched.name && errors.name
                    : null
                }
              >
                <Input
                  size="middle"
                  type="text"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  defaultValue={values.name}
                  value={values.name}
                  placeholder={"Имя"}
                  disabled={isSubmitting}
                />
              </Form.Item>
              <Form.Item
                name="style"
                label="Style"
                hasFeedback={get(errors, "style", []).length > 0}
                validateStatus={
                  get(errors, "style", []).length > 0 ? "error" : ""
                }
                help={
                  get(errors, "style", []).length > 0
                    ? errors.is_init && touched.is_init && errors.is_init
                    : null
                }
              >
                <Select
                  onChange={(value) => setFieldValue("style", value)}
                  defaultValue={values.style}
                >
                  {STYLE &&
                    Object.entries(STYLE).map(([key, value]) => {
                      return (
                        <Option style={{ color: value }} value={key}>
                          {key}
                        </Option>
                      );
                    })}
                </Select>
              </Form.Item>
              <Form.Item className="text-center">
                <Button type="primary" htmlType="submit">
                  Изменить
                </Button>
              </Form.Item>
            </Form>
          </>
        );
      }}
    </Formik>
  );
}
