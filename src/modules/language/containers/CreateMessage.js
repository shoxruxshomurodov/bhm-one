import React, {Component} from 'react';
import actions from "../actions";
import {get} from "lodash";
import {withTranslation} from "react-i18next";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import BaseOverlayLoader from "../../../components/BaseOverlayLoader";
import Title from "../../../components/Title/Title";
import {toast, ToastContainer} from "react-toastify";
import GiveRoleForm from "../../vacancy/components/apply-form/GiveRoleForm";
import CreateMessageForm from "../components/CreateMessageForm";
import ApiService from "../../language/services/ApiService";

class CreateMessage extends Component {
    state = {
        loading:false
    }
    createMessage = ({message,ru,uz,en,lt}) => {
        console.log(message)

        var  withTranslation_message =[];
        withTranslation_message[0]={"ru":ru};
        withTranslation_message[1]={"uz":uz};
        withTranslation_message[2]={"en":en};
        withTranslation_message[3]={"lt":lt};
        console.log(withTranslation_message)
        this.setState({loading:true});
        ApiService.createMessage(withTranslation_message,message).then((response) => {
            this.setState({loading: false});
            toast.success('Success create Message');
            this.props.history.push('/language');
        }).catch((error) => {
            this.setState({loading: false});
            toast.error('Error:' + error?.response?.data);
        })
    }
    render() {
        const {loading} = this.state;
        const {t} = this.props;
        return (
            <BaseOverlayLoader isActive={loading} text={"Loading..."}>
                <div className={"page-content padding"}>
                    <Title>{t("Create Message")}</Title>
                    <div className="row">
                        <div className="col-md-12">
                            <ToastContainer/>
                        </div>
                    </div>
                    <CreateMessageForm
                        createMessage={this.createMessage}
                        t={t}
                     />
                </div>
            </BaseOverlayLoader>
        );
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        createMessage: (params) => {
            dispatch({type: actions.GET_LANGUAGE.REQUEST, payload: params});
        },

    };
};

const mapStateToProps = (state) => {
    return {
        isFetched: get(state, "message.isFetched",false),
    };
};
export default withTranslation("bhm_one")(connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(CreateMessage)));

