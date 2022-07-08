import * as React from "react";
import {Formik} from "formik";
import {Button, Checkbox, Form, Input, Select} from "antd";
import get from "lodash/get";
import SkeletonLoader from "../../../../components/SkeletonLoader/SkeletonLoader";

export function CreateForm({create, state_list, id , t}) {
    const {Option} = Select;
    const layout = {
        labelCol: {span: 6}, wrapperCol: {span: 18},
    };
    return (<Formik
        initialValues={{
            monitoring_process_id: id,
            name: "",
            description: "",
            states: [],
            is_required: true,
            group: ""
        }}
        onSubmit={(values, actions) => {
            create(values, actions);
            console.log(values)
        }}
    >
        {({
              handleSubmit, handleChange, setFieldValue, values, errors, touched, isSubmitting,
          }) => {
            if (isSubmitting) {
                return <SkeletonLoader/>
            }
            return (<>
                    <Form {...layout} onFinish={handleSubmit}>
                        <Form.Item
                            name="name"
                            label="Name"
                            hasFeedback={get(errors, "name", []).length > 0}
                            validateStatus={get(errors, "name", []).length > 0 ? "error" : ""}
                            help={get(errors, "name", []).length > 0 ? errors.name && touched.name && errors.name : null}
                        >
                            <Input
                                placeholder={"Name"}
                                name="name"
                                type="text"
                                onChange={handleChange}
                                value={values.name}
                            />
                        </Form.Item>
                        <Form.Item
                            name="description"
                            label="Description"
                            hasFeedback={get(errors, "description", []).length > 0}
                            validateStatus={get(errors, "description", []).length > 0 ? "error" : ""}
                            help={get(errors, "description", []).length > 0 ? errors.name && touched.name && errors.name : null}
                        >
                            <Input
                                placeholder={"Description"}
                                name="description"
                                type="text"
                                onChange={handleChange}
                                value={values.description}
                            />
                        </Form.Item>
                        <Form.Item
                            name="states"
                            label="States"
                            hasFeedback={get(errors, "states", []).length > 0}
                            validateStatus={get(errors, "states", []).length > 0 ? "error" : ""}
                            help={get(errors, "states", []).length > 0 ? errors.name && touched.name && errors.name : null}
                        >
                            <Select value={values.workflow_id} placeholder={"States"}
                                    onChange={value => setFieldValue("states", value)} mode="multiple"
                                    allowClear>
                                {state_list && state_list.map((state) => {
                                    return <Option
                                        value={get(state, "id")}>{get(state, "title")}</Option>
                                })}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="group"
                            label={t("Group")}
                            hasFeedback={get(errors, "group", []).length > 0}
                            validateStatus={get(errors, "group", []).length > 0 ? "error" : ""}
                            help={get(errors, "group", []).length > 0 ? errors.group && touched.group && errors.group : null}
                        >
                            <Select value={values.workflow_id} placeholder={"States"}
                                    onChange={value => setFieldValue("group", value)}
                                    allowClear>
                                <Option value={'main'} >{t("All")}</Option>
                                <Option value={'republic'} >{t("Republic")}</Option>
                                <Option value={'region'} >{t("Region")}</Option>
                                <Option value={'filial'} >{t("Filial")}</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="is_required"
                            label="Требуется для ?"
                            hasFeedback={get(errors, "is_required", []).length > 0}
                            validateStatus={get(errors, "is_required", []).length > 0 ? "error" : ""}
                            help={get(errors, "is_required", []).length > 0 ? errors.name && touched.name && errors.name : null}
                        >
                            <Checkbox
                                onChange={handleChange} name="is_required" value={values.is_required}
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
    </Formik>)
        ;
}
