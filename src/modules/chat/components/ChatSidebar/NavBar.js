import React, { Component } from "react";
import * as PropTypes from "prop-types";
import {FiUsers } from "react-icons/fi";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { TweenLite, Power3 } from "gsap";
class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
    };
    this.loadRefTwo = React.createRef();
  }

  handleType = (e) => {
    const {
      handleSubmit = (text) => {
        console.log("search:" + text);
      },
    } = this.props;
    this.setState(
      { ...this.state },
      {
        text: e.target.value,
      }
    );
    console.log("type: " + e.target.value);
    handleSubmit(e.target.value);
  };
  componentDidMount() {
    TweenLite.staggerFrom(
      [this.loadRefTwo],
      1,
      { opacity: 0, y: -100, ease: Power3.easeOut },
      0.4
    );
  }
  render() {
    const {
      placeholderSearch = "Search",
      handleSubmit = (text) => {
        console.log("search:" + text);
      },
    } = this.props;
    const { text } = this.state;
    return (
      <React.Fragment>
        <div className="navbar" style={{ minHeight: "unset" }}>
          <Link
            to="/chat"
            className="btn w-lg mb-1 bg-info-lt btn-block"
            ref={(el) => (this.loadRefTwo = el)}
          >
            My contacts <FiUsers className="ml-1" />
          </Link>
          <div className="input-group flex bg-light rounded d-none">
            <input
              type="text"
              className="form-control no-bg no-border no-shadow search d-none"
              placeholder={placeholderSearch}
              required
              onKeyUp={this.handleType}
              value={text}
            />
            <span className="input-group-append">
              <button
                className="btn no-bg no-shadow"
                type="button"
                onClick={() => handleSubmit(text)}
              >
                <i data-feather="search" className="text-fade" />
              </button>
            </span>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

NavBar.propTypes = {
  placeholderSearch: PropTypes.string,
  handleSubmit: PropTypes.string.isRequired,
};
const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
