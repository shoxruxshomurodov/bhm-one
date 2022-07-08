import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as PropTypes from 'prop-types';
//import MessageContentText from "./MessageContentText";

class MessageContentVideo extends Component {
	_handlePlay = () => {
		const {
			handlePlay = () => {
				console.log('your custom handle play');
			},
			src,
		} = this.props;
		handlePlay({ ...this.props });
		console.log(`handle play ${src}`);
	};

	render() {
		const { text, url, imageSrc } = this.props;
		return (
			<>
				<div className="chat-content rounded msg bg-body">{text}</div>
				<div className="w-md my-3">
					<div className="row row-xs">
						<div className="col-12">
							<div className="media media-2x1 r box-shadows">
								<Link to={url} className="media-content" style={{ backgroundImage: imageSrc }} />
								<div className="media-action active">
									<a
										href="#"
										className="btn btn-md btn-icon btn-white btn-rounded"
										onClick={() => {
											this._handlePlay();
										}}
									>
										<i data-feather="play" width={12} height={12} />
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</>
		);
	}
}

MessageContentVideo.propTypes = {
	text: PropTypes.string.isRequired,
	src: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired,
	imageSrc: PropTypes.string.isRequired,
	handlePlay: PropTypes.func,
};

export default MessageContentVideo;
