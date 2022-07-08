import * as React from "react";
import { Formik } from "formik";
import {Button, Form, Input, Select} from "antd";
import get from "lodash/get";
import SkeletonLoader from "../../../components/SkeletonLoader/SkeletonLoader";
const {Option} = Select;
export function UpdateForm({ attributes = {}, update,processList}) {
    console.log(attributes,"attributes")
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };
  return (
    <Formik
      initialValues={{
          name: get(attributes,"name"), monitoring_process_id:{value:get(attributes,"process.id"),label:get(attributes,"process.name")}
      }}
      onSubmit={(values, actions) => {
        update(values, actions);
      }}
    >
      {({
        handleSubmit,
        handleChange,
            handleBlur,
        setFieldValue,
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
                            name="name"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            disabled={isSubmitting}
                            value={values.name}
                        />
                    </Form.Item>
                    <Form.Item
                        name="monitoring_process_id"
                        label="Process"
                        hasFeedback={get(errors, "monitoring_process_id", []).length > 0}
                        validateStatus={
                            get(errors, "monitoring_process_id", []).length > 0 ? "error" : ""
                        }
                        help={
                            get(errors, "monitoring_process_id", []).length > 0
                                ? errors.monitoring_process_id && touched.monitoring_process_id && errors.monitoring_process_id
                                : null
                        }
                    >
                        <Select name="monitoring_process_id" value={values.monitoring_process_id} placeholder={"Monitoring process"} onChange={value => setFieldValue("monitoring_process_id",value)}>
                            {processList && processList.map(process => {
                                return (
                                    <Option value={get(process,"id")}>{get(process,"name")}</Option>
                                )
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
