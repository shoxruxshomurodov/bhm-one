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
export function CreateForm({ create }) {
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
        style: "",
        is_init: "",
      }}
      onSubmit={(values, actions) => {
        create(values, actions);
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
            <Form {...layout} onFinish={handleSubmit}>
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
                  value={values.title}
                  placeholder={"Название"}
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
                  value={values.name}
                  placeholder={"Имя"}
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
                  placeholder="Style"
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
              <Form.Item
                name="is_init"
                label="Начало"
                hasFeedback={get(errors, "is_init", []).length > 0}
                validateStatus={
                  get(errors, "is_init", []).length > 0 ? "error" : ""
                }
                help={
                  get(errors, "is_init", []).length > 0
                    ? errors.is_init && touched.is_init && errors.is_init
                    : null
                }
              >
                <Checkbox
                  onChange={handleChange}
                  onBlur={handleBlur}
                  checked={values.is_init}
                  defaultChecked={values.is_init}
                >
                  Начало
                </Checkbox>
              </Form.Item>
              <Form.Item className="text-center">
                <Button type="primary" htmlType="submit">
                  Создать
                </Button>
              </Form.Item>
            </Form>
          </>
        );
      }}
    </Formik>
  );
}
