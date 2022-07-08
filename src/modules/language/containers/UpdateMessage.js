import React, {Component} from 'react';
import {get} from "lodash";
import {withTranslation} from "react-i18next";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import UpdateMessageForm from "../components/UpdateMessageForm";
import ApiService from "../services/ApiService";
import {toast} from "react-toastify";
import actions from "../../language/actions";
import Loader from "../../../components/Loader/LoaderMessage";
class UpdateMessage extends Component {

    componentDidMount() {
        const {id} = this.props.match.params;
        const {getOneMessage} = this.props;
        const message_id = id;
        getOneMessage({
            message_id
        });
    }

    updateMessage = ({message, ru, uz, en, lt, id}) => {
        var withTranslation_message = [];
        withTranslation_message[0] = {"ru": ru};
        withTranslation_message[1] = {"uz": uz};
        withTranslation_message[2] = {"en": en};
        withTranslation_message[3] = {"lt": lt};
        this.setState({loading: true});
        ApiService.updateMessage(withTranslation_message, message, id).then((response) => {
            this.setState({loading: false});
            toast.success('Success create Message');
            this.props.history.push('/language');
        }).catch((error) => {
            this.setState({loading: false});
            toast.error('Error:' + error?.response?.data);
        })
    }

    render() {
        const {messages, t,isMessageFetched} = this.props;

        return (
            <div>
                {isMessageFetched ? (
                    <UpdateMessageForm
                        messages={messages}
                        updateMessage={this.updateMessage}
                        t={t}
                    />
                ) : (
                    <Loader />
                )}

            </div>
        );
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        getOneMessage: (message_id) => {
            dispatch({ type: actions.GET_ONE_MESSAGE.REQUEST,payload:message_id });
        },
    };
};

const mapStateToProps = (state) => {
    return {
        messages: get
        (
            state
            ,
            'message.one_message'
            , {}
        ),
        entities: get(state, "normalize.entities", {}),
        isMessageFetched: get(state, "message.isMessageFetched", false),
    };
};
export default withTranslation("bhm_one")(connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(UpdateMessage)));
