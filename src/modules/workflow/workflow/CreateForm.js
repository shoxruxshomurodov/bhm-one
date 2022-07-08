import * as React from "react";
import { Formik } from "formik";
import { Button, Form, Input } from "antd";
import get from "lodash/get";
import SkeletonLoader from "../../../components/SkeletonLoader/SkeletonLoader";

export function CreateForm({ create }) {
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  return (
    <Formik
      initialValues={{
        title: null,
        name: null,
        workflowable_type: null,
        workflowable_id: null,
      }}
      onSubmit={(values, actions) => {
        create(values, actions);
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
              <Form.Item label="Type" name="workflowable_type">
                <Input
                  size="middle"
                  type="text"
                  name="workflowable_type"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.workflowable_type}
                  placeholder={"Workflowable type"}
                />
              </Form.Item>
              <Form.Item label="ID" name="workflowable_id">
                <Input
                  size="middle"
                  type="text"
                  name="workflowable_id"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.workflowable_id}
                  placeholder={"Workflowable id"}
                />
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
