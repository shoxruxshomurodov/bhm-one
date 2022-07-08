import * as React from "react";
import { Formik } from "formik";
import { Button, Form, Input, Select } from "antd";
import get from "lodash/get";
import SkeletonLoader from "../../../components/SkeletonLoader/SkeletonLoader";

export function CreateForm({ create }) {
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };
  const { Option } = Select;
  return (
    <Formik
      initialValues={{
        title: null,
        name: null,
        style: null,
        end_rule_class: null,
        is_cert_agree: null,
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
                  disabled={isSubmitting}
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
                  defaultValue={{ value: "" }}
                  style={{ width: "100%" }}
                  placeholder={"Style"}
                  name="style"
                  onChange={(value) => {
                    setFieldValue("style", get(value, "value"));
                  }}
                >
                  <Option value="">Выберите</Option>
                  <Option value="success">success</Option>
                  <Option value="info">info</Option>
                  <Option value="warning">warning</Option>
                  <Option value="primary">primary</Option>
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
                  style={{ width: "100%" }}
                  name="is_cert_agree"
                  placeholder={"C ключом"}
                  onChange={(value) => {
                    setFieldValue("is_cert_agree", value);
                  }}
                >
                  <Option value={true}>Да</Option>
                  <Option value={false}>Нет</Option>
                </Select>
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
