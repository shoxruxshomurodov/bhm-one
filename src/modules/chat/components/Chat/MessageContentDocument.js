import React, {Component} from 'react';
import {Link} from "react-router-dom";
import * as PropTypes from "prop-types";

class MessageContentDocument extends Component {

    render() {
        const {text, size, url} = this.props;
        return (
            <div className="chat-content rounded msg block bg-primary--lt">
                <Link to={url}>
                    {text}
                    <span className="text-muted">{size}</span>
                    <i className="text-muted" data-feather="download"/>
                </Link>
            </div>
        );
    }
}

MessageContentDocument.propTypes = {
    text: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
};

export default MessageContentDocument;

