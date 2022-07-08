import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import get from 'lodash/get';
import * as PropTypes from 'prop-types';

class MessageContentPhotoAlbum extends Component {
	render() {
		const { text, images = [], imageLinkProp = 'src', imageSrcProp = 'src' } = this.props;
		return (
			<>
				<div className="chat-content rounded msg bg-body">{text}</div>
				<div className="w-md my-3">
					<div className="row row-xs">
						<div className="col-4">
							{images.map((image) => {
								return (
									<div className="media media-4x3 r box-shadows">
										<Link
											to={get(image, imageLinkProp)}
											className="media-content"
											style={{ backgroundImage: get(image, imageSrcProp) }}
										/>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</>
		);
	}
}

MessageContentPhotoAlbum.propTypes = {
	text: PropTypes.string.isRequired,
	images: PropTypes.array.isRequired,
	imageLinkProp: PropTypes.string.isRequired,
	imageSrcProp: PropTypes.string.isRequired,
};

export default MessageContentPhotoAlbum;
