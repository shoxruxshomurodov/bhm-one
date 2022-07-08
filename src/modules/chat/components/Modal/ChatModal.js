import React, { Component } from "react";
import Modal from "react-bootstrap4-modal";
import get from "lodash/get";

class ChatModal extends Component {
  state = {
    isOpen: get(this.props, "isOpen", false),
  };
  modalBackdropClicked = () => {
    this.setState({ isOpen: false });
  };
  close = () => {
    this.setState({ isOpen: false });
  };
  render() {
      const { isOpen } = this.state;
    return (
      <Modal visible={isOpen} onClickBackdrop={this.modalBackdropClicked}>
        <div className="modal-header">
          <h5 className="modal-title">Select contact</h5>
        </div>
        <div className="modal-body"></div>
        <div className="modal-footer d-flex justify-content-center">
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.close}
          >
            Close
          </button>
        </div>
      </Modal>
    );
  }
}

export default ChatModal;
