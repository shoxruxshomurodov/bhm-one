import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";

class ChatInterlocutorForm extends Component {
  fetchMoreData = () => {
    const { fetchMoreMessages } = this.props;
    fetchMoreMessages();
  };

  render() {
    const {
      contacts,
      t,
      isFetched = false,
      loadMore: hasMore,
      count: dataLength,
    } = this.props;
    return (
      <div
        className="d-flex flex pr-md-3 justify-content-center align-items-center flex-column"
        style={{ minHeight: "calc(100% - 60px)" }}
      >
        <div className="jumbotron text-center" style={{width:"35%"}}>
          <h2 className="bpm__title mb-5">My contacts</h2>
          <div className="list-group" id="scroll-inner"  style={{height:"300px",overflow:"auto"}}>
              <InfiniteScroll
                dataLength={contacts.length}
                // next={this.fetchMoreData}
                hasMore={true}
                loader={<h4>Loading...</h4>}
                scrollableTarget="scroll-inner"
              >
                {contacts &&
                  contacts.map((contact) => (
                    <Link className="list-group-item" to={{
                        pathname:`/chat/interlocutor/${contact.id}`
                    }}>
                      {contact.phone}
                    </Link>
                  ))}
              </InfiniteScroll>
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation("bhm_one")(ChatInterlocutorForm);
