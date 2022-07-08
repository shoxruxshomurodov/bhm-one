import React, { Component } from "react";
import * as PropTypes from "prop-types";
import { connect } from "react-redux";
import { TweenLite, Power3 } from "gsap";
class ChatContactList extends Component {
  constructor(props) {
    super(props);
    this.loadRef = React.createRef([]);
    this.loadRef.current = [];
  }

  componentDidMount() {
    TweenLite.staggerFromTo(
      this.loadRef.current,
      0.8,
      { opacity: 0, y: -50, ease: Power3.easeOut },
      { opacity: 1, y: 0, ease: Power3.easeOut },
      0.4
    );
  }
  collectRefsInArrays = (el) => {
    if (el && !this.loadRef.current.includes(el)) {
      this.loadRef.current.push(el);
    }
  };
  render() {
    const { contacts = [], children } = this.props;

    return (
      <React.Fragment>
        {contacts ? (
          <div className="scrollable hover">
            <div className="list list-row">
              {contacts.map((contact) => {
                return (
                  <div ref={this.collectRefsInArrays}>
                    {children({ contact })}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="no-result hide">
            <div className="p-4 text-center">No Results</div>
          </div>
        )}
      </React.Fragment>
    );
  }
}
ChatContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  children: PropTypes.element.isRequired,
};
const mapStateToProps = (state) => {
  return {};
};
export default connect(mapStateToProps, null)(ChatContactList);
