import {get} from "lodash";
import React, {Component} from "react";
import {withTranslation} from "react-i18next";
import InfiniteScroll from "react-infinite-scroll-component";
import {Link} from "react-router-dom";
import {TweenLite, Power3} from "gsap";
import LoaderMessage from "../../../../components/Loader/LoaderMessage";
import {FiPlusCircle} from "react-icons/fi";
class ChatContactsForm extends Component {
    constructor(props) {
        super(props);
        this.loadRef = React.createRef();
    }

    fetchMoreData = () => {
        const {fetchMoreMessages} = this.props;
        fetchMoreMessages();
    };

    componentDidMount() {

        TweenLite.from(this.loadRef, 0.8, {
            opacity: 0,
            x: -200,
            ease: Power3.easeInOut
        });
    }


    render() {
        let {
            contacts,
            // t,
            // isFetched = false,
            loadMore: hasMore,
            // count: dataLength,
            handleSubmit
        } = this.props;
        return (
            <>
                <div className="w-100 mode-dark">
                    <div class="page-hero" id="page-hero">
                        <div class="padding d-flex" style={{justifyContent:"space-between"}}>
                            <div class="page-title" style={{width:"80%"}}>
                                <h2 className="text-md text-highlight mode-text-dark">
                                    My contacts
                                </h2>
                                <div className="row">
                                    <div className="col-md-12"><input
                                        className="form-control w-100"
                                        placeholder="Enter name"
                                        onChange={(e) =>handleSubmit(e.target.value)}
                                        style={{
                                            backgroundColor: "#fff",
                                            color: "#000",
                                            margin: "auto",
                                        }}
                                    /></div>
                                </div>

                                {/*<small class="text-muted">*/}
                                {/*  Small count and labeling component.*/}
                                {/*</small>*/}
                            </div>
                            <div class="flex"></div>
                            <div>
                                <Link
                                    to="/chat/create/group"
                                    className="btn bg-success-lt btn-block"
                                >
                                    Add group <FiPlusCircle className="ml-1"/>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div ref={(el) => (this.loadRef = el)}>
                        <div
                            id="scroll-inner"
                            // className="scrollable hover"
                            style={{
                                width: "99%",
                                height: 500,
                                overflow: "visible",
                                overflowY: "scroll"
                            }}
                        >
                            <InfiniteScroll
                                dataLength={contacts.length}
                                next={this.fetchMoreData}
                                hasMore={hasMore}
                                loader={<LoaderMessage/>}
                                scrollableTarget="scroll-inner"
                                // scrollThreshold={0.5}
                            >
                                {contacts &&
                                contacts.map((contact) => (
                                    <Link
                                        key={contact.id}
                                        className="list-group-item d-flex justify-content-between mode-text-dark"
                                        to={{
                                            pathname: `/chat/interlocutor/${contact.id}`
                                        }}
                                        style={{color: "#000"}}
                                    >
                                        {get(contact, "profile")
                                            ? get(contact, "profile.NAME")
                                            : contact.phone}
                                        <div>
                                            <button className="btn btn-sm mr-1 btn-icon gd-info btn-rounded">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width={12}
                                                    height={12}
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth={2}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="feather feather-phone text-fade"
                                                >
                                                    <path
                                                        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                                                </svg>
                                                {" "}
                                            </button>
                                            <button className="btn btn-sm btn-icon gd-info btn-rounded">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width={12}
                                                    height={12}
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth={2}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="feather feather-more-vertical text-fade"
                                                >
                                                    <circle cx={12} cy={12} r={1}/>
                                                    <circle cx={12} cy={5} r={1}/>
                                                    <circle cx={12} cy={19} r={1}/>
                                                </svg>
                                            </button>
                                        </div>
                                    </Link>
                                ))}
                            </InfiniteScroll>

                            {(() => {
                                if (contacts.length === 0) {
                                    return (
                                     <h2 style={{textAlign:"center",margin:100,fontSize:30}}>Contact Not Found</h2>
                                    )
                                }
                            })()}
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default withTranslation("bhm_one")(ChatContactsForm);
