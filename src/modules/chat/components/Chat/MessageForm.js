import React, { Component } from "react";
import * as PropTypes from "prop-types";
import { FiSend } from "react-icons/fi";
import { Formik } from "formik";
class MessageForm extends Component {
  render() {
    const {
      handleImageBtn = () => {
        console.log("handle image btn");
      },
      handleCameraBtn = () => {
        console.log("handle camera btn");
      },
      handleMapPinBtn = () => {
        console.log("handle map pin btn");
      },
      handlePaperClipBtn = () => {
        console.log("handle map pin btn");
      },
      handleSubmitMessage = (values) => {
        console.log("submit: " + values);
      },
      chat_id,
    } = this.props;
    return (
      <div className="mt-auto b-t" id="chat-form">
        <div className="p-2">
          <div className="px-3">
            <div className="toolbar my-1 d-none">
              <button className="text-muted mx-1" onClick={handleImageBtn}>
                <i data-feather="image" width={14} height={14} />
              </button>
              <button className="text-muted mx-1" onClick={handleCameraBtn}>
                <i data-feather="camera" width={14} height={14} />
              </button>
              <button className="text-muted mx-1" onClick={handleMapPinBtn}>
                <i data-feather="map-pin" width={14} height={14} />
              </button>
              <button className="text-muted mx-1" onClick={handlePaperClipBtn}>
                <i data-feather="paperclip" width={14} height={14} />
              </button>
            </div>
          </div>
          <Formik
            initialValues={{ message: "", chat_id }}
            // validate={(values) => {}}
            onSubmit={(values, actions) => {
              handleSubmitMessage(values, actions);
              actions.resetForm({
                values: {
                  message: "",
                },
              });
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              isSubmitting,
            }) => (
              <form className="input-group" onSubmit={handleSubmit}>
                <input
                  type="text"
                  id="text"
                  className="form-control p-3 no-shadow no-border mode-chat-dark"
                  placeholder="Say something"
                  onChange={(e) => {
                    setFieldValue("message", e.target.value);
                  }}
                  value={values.message}
                />
                <button
                  className="btn btn-icon btn-rounded gd-success"
                  type="submit"
                >
                  <FiSend />
                </button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    );
  }
}

MessageForm.propTypes = {
  handleImageBtn: PropTypes.func,
  handleCameraBtn: PropTypes.func,
  handleMapPinBtn: PropTypes.func,
  handlePaperClipBtn: PropTypes.func,
  handleSubmit: PropTypes.func.isRequired,
  text: PropTypes.string,
};

export default MessageForm;
