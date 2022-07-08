import * as React from "react";
import { Formik } from "formik";
import { Button, Form, Select } from "antd";
import get from "lodash/get";
import SkeletonLoader from "../../../components/SkeletonLoader/SkeletonLoader";
const { Option } = Select;
export function CreateForm({ create, stateList, processList }) {
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };
  return (
    <Formik
      initialValues={{
        monitoring_state_id: "",
        monitoring_process_file_id: "",
      }}
      onSubmit={(values, actions) => {
        create(values, actions);
      }}
    >
      {({
        handleSubmit,
        setFieldValue,
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
                name="monitoring_state_id"
                label="State"
                hasFeedback={get(errors, "monitoring_state_id", []).length > 0}
                validateStatus={
                  get(errors, "monitoring_state_id", []).length > 0
                    ? "error"
                    : ""
                }
                help={
                  get(errors, "monitoring_state_id", []).length > 0
                    ? errors.monitoring_state_id &&
                      touched.monitoring_state_id &&
                      errors.monitoring_state_id
                    : null
                }
              >
                <Select
                  placeholder={"Monitoring state"}
                  onChange={(value) =>
                    setFieldValue("monitoring_state_id", value)
                  }
                >
                  {stateList &&
                    stateList.map((state) => {
                      return (
                        <Option value={get(state, "id")}>
                          {get(state, "name")}
                        </Option>
                      );
                    })}
                </Select>
              </Form.Item>
              <Form.Item
                name="monitoring_process_file_id"
                label="Process File"
                hasFeedback={
                  get(errors, "monitoring_process_file_id", []).length > 0
                }
                validateStatus={
                  get(errors, "monitoring_process_file_id", []).length > 0
                    ? "error"
                    : ""
                }
                help={
                  get(errors, "monitoring_process_file_id", []).length > 0
                    ? errors.monitoring_process_file_id &&
                      touched.monitoring_process_file_id &&
                      errors.monitoring_process_file_id
                    : null
                }
              >
                <Select
                  placeholder={"Monitoring process"}
                  onChange={(value) =>
                    setFieldValue("monitoring_process_file_id", value)
                  }
                >
                  {processList &&
                    processList.map((process) => {
                      return (
                        <Option value={get(process, "id")}>
                          {get(process, "name")}
                        </Option>
                      );
                    })}
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
