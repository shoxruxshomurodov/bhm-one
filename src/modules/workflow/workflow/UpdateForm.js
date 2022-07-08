import * as React from "react";
import { Formik } from "formik";
import { Button, Form, Input } from "antd";
import get from "lodash/get";
import SkeletonLoader from "../../../components/SkeletonLoader/SkeletonLoader";

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
                  defaultValue={values.name}
                  placeholder={"Имя"}
                />
              </Form.Item>
              <Form.Item
                label="Type"
                name="workflowable_type"
                hasFeedback={get(errors, "workflowable_type", []).length > 0}
                validateStatus={
                  get(errors, "workflowable_type", []).length > 0 ? "error" : ""
                }
                help={
                  get(errors, "workflowable_type", []).length > 0
                    ? errors.workflowable_type &&
                      touched.workflowable_type &&
                      errors.workflowable_type
                    : null
                }
              >
                <Input
                  size="middle"
                  type="text"
                  name="workflowable_type"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.workflowable_type}
                  defaultValue={values.workflowable_type}
                  placeholder={"Workflowable id"}
                />
              </Form.Item>
              <Form.Item
                label="ID"
                name="workflowable_id"
                hasFeedback={get(errors, "workflowable_id", []).length > 0}
                validateStatus={
                  get(errors, "workflowable_id", []).length > 0 ? "error" : ""
                }
                help={
                  get(errors, "workflowable_id", []).length > 0
                    ? errors.workflowable_id &&
                      touched.workflowable_id &&
                      errors.workflowable_id
                    : null
                }
              >
                <Input
                  size="middle"
                  type="text"
                  name="workflowable_id"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.workflowable_id}
                  defaultValue={values.workflowable_id}
                  placeholder={"Workflowable id"}
                />
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
