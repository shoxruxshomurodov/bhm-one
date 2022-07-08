import * as React from "react";
import { Formik } from "formik";
import get from "lodash/get";
import { Button, Form, Input } from "antd";
 function TaskApplyForm({ transition_name, apply, transitionInfo }) {
  return (
    <Formik
      enableReinitialize
      initialValues={{
        transition_name,
        end_comment: null,
      }}
      onSubmit={(values, actions) => {
        apply(values, actions);
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
        return (
          <>
            <Form onFinish={handleSubmit}>
              <Form.Item
                label="Комментарий"
                name="end_comment"
                hasFeedback={get(errors, "end_comment", []).length > 0}
                validateStatus={
                  get(errors, "end_comment", []).length > 0 ? "error" : ""
                }
                help={
                  get(errors, "end_comment", []).length > 0
                    ? errors.end_comment &&
                      touched.end_comment &&
                      errors.end_comment
                    : null
                }
              >
                <Input
                  size="large"
                  type="text"
                  name="end_comment"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.end_comment}
                  defaultValue={values.end_comment}
                  placeholder={"Комментарий"}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type={get(transitionInfo, "style") ?? "primary"}
                  htmlType="submit"
                >
                  {get(transitionInfo, "title")}
                </Button>
              </Form.Item>
            </Form>
          </>
        );
      }}
    </Formik>
  );
}
export default React.memo(TaskApplyForm)