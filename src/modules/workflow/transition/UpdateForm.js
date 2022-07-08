import * as React from "react";
import { Formik } from "formik";
import { Button, Form, Input, Select } from "antd";
import get from "lodash/get";
import SkeletonLoader from "../../../components/SkeletonLoader/SkeletonLoader";

const { Option } = Select;

export function UpdateForm({ attributes = {}, update }) {
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  return (
    <Formik
      initialValues={{
        ...attributes,
      }}
      onSubmit={(values, actions) => {
        update(values, actions);
      }}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        errors,
        touched,
        isSubmitting,
        setFieldValue,
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
                label="Правила"
                name="rule_class"
                hasFeedback={get(errors, "rule_class", []).length > 0}
                validateStatus={
                  get(errors, "rule_class", []).length > 0 ? "error" : ""
                }
                help={
                  get(errors, "rule_class", []).length > 0
                    ? errors.rule_class &&
                      touched.rule_class &&
                      errors.rule_class
                    : null
                }
              >
                <Input
                  size="middle"
                  type="text"
                  name="rule_class"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  defaultValue={values.rule_class}
                  value={values.rule_class}
                  placeholder={"Правило"}
                  disabled={isSubmitting}
                />
              </Form.Item>
              <Form.Item
                label="Конца правила"
                name="end_rule_class"
                hasFeedback={get(errors, "end_rule_class", []).length > 0}
                validateStatus={
                  get(errors, "end_rule_class", []).length > 0 ? "error" : ""
                }
                help={
                  get(errors, "end_rule_class", []).length > 0
                    ? errors.end_rule_class &&
                      touched.end_rule_class &&
                      errors.end_rule_class
                    : null
                }
              >
                <Input
                  size="middle"
                  type="text"
                  name="end_rule_class"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.end_rule_class}
                  defaultValue={values.end_rule_class}
                  placeholder={"Конца правила"}
                  disabled={isSubmitting}
                />
              </Form.Item>
              <Form.Item
                label="Style"
                name="style"
                hasFeedback={get(errors, "style", []).length > 0}
                validateStatus={
                  get(errors, "style", []).length > 0 ? "error" : ""
                }
                help={
                  get(errors, "style", []).length > 0
                    ? errors.style && touched.style && errors.style
                    : null
                }
              >
                <Select
                  labelInValue
                  defaultValue={{ value: get(values, "style") }}
                  value={get(values, "style")}
                  style={{ width: "100%" }}
                  disabled={isSubmitting}
                  onChange={(data) => setFieldValue("style", data.value)}
                  placeholder={"Style"}
                >
                  <Option value="success">success</Option>
                  <Option value="info">info</Option>
                  <Option value="warning">warning</Option>
                  <Option value="primary">primary</Option>
                  <Option value="danger">danger</Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="C ключом"
                name="is_cert_agree"
                hasFeedback={get(errors, "is_cert_agree", []).length > 0}
                validateStatus={
                  get(errors, "is_cert_agree", []).length > 0 ? "error" : ""
                }
                help={
                  get(errors, "is_cert_agree", []).length > 0
                    ? errors.is_cert_agree &&
                      touched.is_cert_agree &&
                      errors.is_cert_agree
                    : null
                }
              >
                <Select
                  labelInValue
                  style={{ width: "100%" }}
                  name="is_cert_agree"
                  value={get(values, "is_cert_agree")}
                  //   defaultValue={{ value: get(values, "is_cert_agree") }}
                  //   defaultValue={{ value: get(values, "is_cert_agree") }}
                  placeholder={"C ключом"}
                  onChange={(data) => {
                    setFieldValue("is_cert_agree", data.value);
                  }}
                >
                  <Option value={true}>Да</Option>
                  <Option value={false}>Нет</Option>
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
