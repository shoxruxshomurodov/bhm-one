import * as React from "react";
import { Formik } from "formik";
import { Button, Form, Input} from "antd";
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
        name:get(attributes,"name"),
      }}
      onSubmit={(values, actions) => {
        update(values, actions);
      }}
    >
      {({
        handleSubmit,
        handleChange,
        values,
        errors,
        touched,
        isSubmitting,
      }) => {
          if(isSubmitting) {
              return <SkeletonLoader />
          }
        return (
          <>
            <Form {...layout} onFinish={handleSubmit}>
              <Form.Item
                name="name"
                label="Name"
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
                  type="text"
                  name="name"
                  onChange={handleChange}
                  value={values.name}
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
