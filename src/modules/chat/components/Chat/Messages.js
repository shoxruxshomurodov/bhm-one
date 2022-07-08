import React, { Component } from 'react';
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
import Message from './Message';
import MessageContentText from './MessageContentText';
import MessageContentPhotoAlbum from './MessageContentPhotoAlbum';
import MessageContentVideo from './MessageContentVideo';
import MessageContentDocument from './MessageContentDocument';
import InfiniteScroll from 'react-infinite-scroll-component';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FiArrowDown } from 'react-icons/fi';
import Scrollspy from 'react-scrollspy';
import { TweenLite, Power3 } from 'gsap';
class Messages extends Component {
	constructor(props) {
		super(props);
		this.loadRef = React.createRef([]);
		this.loadRef.current = [];
		this.state = {
			scrollHeight: null,
			allHeight: null,
		};
	}

	fetchMoreData = () => {
		const { fetchMoreMessages,loadMore } = this.props;
		console.log('loadmore',loadMore)
		fetchMoreMessages();
	};

	scrollToBottom = () => {
		const toBottom = document.getElementById('scroll-inner');
		const infineScroll = document.querySelector('.infinite-scroll-component').scrollHeight;
		toBottom.scrollTo(0, infineScroll);
	};

	componentDidMount() {
		TweenLite.staggerFromTo(
			this.loadRef.current,
			0.7,
			{ opacity: 0, y: 20, ease: Power3.easeInOut },
			{ opacity: 1, y: 0, ease: Power3.easeInOut },
			0.3
		);
		this.scrollToBottom();
	}

	/*  componentDidUpdate(prevProps,prevState) {
      const { messages } = this.props;
    const { messages: messagesOld } = prevProps;
  }
*/

	componentDidUpdate() {
		const { scrollHeight, allHeight } = this.state;
		if (isEqual(allHeight + 100, scrollHeight) || isEqual(allHeight, scrollHeight)) {
			this.scrollToBottom();
		}
	}

	collectRefsInArrays = (el) => {
		if (el && !this.loadRef.current.includes(el)) {
			this.loadRef.current.push(el);
		}
	};

	findScrollHeight = (e) => {
		e.preventDefault();
		this.setState({
			scrollHeight: Math.floor(e.target.scrollTop) + e.target.clientHeight + 100,
			allHeight: e.target.scrollHeight,
		});
		if (e.target.scrollTop === 0) {
			const toBottom = document.getElementById('scroll-inner');
			toBottom.scrollTo(0, 50);
		}
	};
	render() {
		const {
			messages = [],
			messageTypeProp = 'type',
			//isOwnProp = "isOwn",
			userIdProp = 'created_by',
			userImageProp = 'user.profile.src',
			//userTitleProp = "user.profile.title",
			userCreatedAtProp = 'created_at',
			messageProp = 'message',
			imagesProp = 'images',
			imageLinkProp = 'src',
			imageSrcProp = 'src',
			videoSrcProp = 'video.src',
			videoLinkProp = 'video.src',
			documentUrlProp = 'document.src',
			documentSizeProp = 'document.size',
			handlePlay = (handlePlayProps) => {
				console.log('handle play');
				console.table(handlePlayProps);
			},
			//isFetched = false,
			loadMore: hasMore,
			//count: dataLength,
			user,
		} = this.props;
		const { scrollHeight, allHeight } = this.state;
		return (
			<div className="scrollable hover" id="scroll-inner" style={{ scrollBehavior: 'smooth' }}>
				<div className="list">
					<div className="p-3">
						<div className="chat-list">
							{scrollHeight < allHeight && (
								<Scrollspy items={['goDown']} currentClassName="is-current">
									<a href="#goDown">
										<div className="scrollSpy">
											<FiArrowDown size={20} color="#fff" />
										</div>
									</a>
								</Scrollspy>
							)}
							<InfiniteScroll
								dataLength={messages.length}
								next={this.fetchMoreData}
								hasMore={hasMore}
								inverse={true}
								loader={
									<h4
										style={{
											position: 'absolute',
											top: '10%',
											left: '5%',
											color: '#fff',
										}}
									>
										Loading ....
									</h4>
								}
								scrollableTarget="scroll-inner"
								style={{ overflow: 'hidden' }}
								onScroll={this.findScrollHeight}
							>
								{messages &&
									messages.map((message) => (
										<div ref={this.collectRefsInArrays}>
											<Message
												isOwn={isEqual(get(message, 'created_by'), get(user, 'id'))}
												userLink={`/profile/${get(message, userIdProp)}`}
												userImage={get(message, userImageProp)}
												userTitle={get(message, 'created_by')}
												createdAt={get(message, userCreatedAtProp)}
											>
												{(() => {
													switch (get(message, messageTypeProp, 'text')) {
														case 'text':
															return (
																<MessageContentText text={get(message, messageProp)} />
															);
														case 'photo_album':
															return (
																<MessageContentPhotoAlbum
																	text={get(message, messageProp)}
																	images={get(message, imagesProp)}
																	imageLinkProp={imageLinkProp}
																	imageSrcProp={imageSrcProp}
																/>
															);
														case 'video':
															return (
																<MessageContentVideo
																	text={get(message, messageProp)}
																	src={get(message, videoSrcProp)}
																	url={get(message, videoLinkProp)}
																	imageSrc={get(message, imageSrcProp)}
																	handlePlay={handlePlay}
																/>
															);

														case 'document':
															return (
																<MessageContentDocument
																	text={get(message, messageProp)}
																	size={get(message, documentSizeProp)}
																	url={get(message, documentUrlProp)}
																/>
															);
														default:
															return 'message not unsupport';
													}
												})()}
											</Message>
										</div>
									))}
							</InfiniteScroll>
							<div id="goDown"></div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
Messages.propTypes = {
	messageTypeProp: PropTypes.string.isRequired,
	isOwnProp: PropTypes.bool.isRequired,
	userIdProp: PropTypes.string.isRequired,
	userImageProp: PropTypes.string.isRequired,
	userTitleProp: PropTypes.string.isRequired,
	userCreatedAtProp: PropTypes.string.isRequired,
	messageProp: PropTypes.string.isRequired,
	imagesProp: PropTypes.string.isRequired,
	imageLinkProp: PropTypes.string.isRequired,
	imageSrcProp: PropTypes.string.isRequired,
	videoSrcProp: PropTypes.string.isRequired,
	videoLinkProp: PropTypes.string.isRequired,
	documentUrlProp: PropTypes.string.isRequired,
	documentSizeProp: PropTypes.string.isRequired,
	handlePlay: PropTypes.func,
	isFetched: PropTypes.bool,
};

const mapStateToProps = (state) => {
	return {
		addAnimationMessage: get(state, 'chat.addAnimationMessage'),
	};
};
export default connect(mapStateToProps, null)(Messages);
