import React, {Component} from 'react';
import actions from "../actions";
import {get} from "lodash";
import {withTranslation} from "react-i18next";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import BaseOverlayLoader from "../../../components/BaseOverlayLoader";
import Title from "../../../components/Title/Title";
import {toast, ToastContainer} from "react-toastify";
import CreateMessageForm from "../components/CreateMessageForm";
import ApiService from "../../appeal/services/ApiService";
import Filial from "../../../schema/Filial";
import ApiActions from "../../../services/api/Actions";
import Utils from "../../../services/helpers/Utils";
import config from "../../../config";
import Normalizer from "../../../services/normalizr";

class AppealCreateContainer extends Component {
    state = {
        loading:false
    }
    createAppeal = (values) => {

        this.setState({loading:true});
        ApiService.createAppeal(values ).then((response) => {
            this.setState({loading: false});
            toast.success('Success create Appeal');

        }).catch((error) => {
            this.setState({loading: false});
            toast.error('Error:' + error?.response?.data);
        })
    }

    componentDidMount() {
        const {
            getFilials,

        } = this.props;
        getFilials();
    }

    render() {
        const {loading} = this.state;
        let {t,filials,entities} = this.props;
        filials = Normalizer.Denormalize(filials, [Filial], entities);
        return (
            <BaseOverlayLoader isActive={loading} text={"Loading..."}>
                <div className={"page-content padding"}>

                    <div className="row">
                        <div className="col-md-12">
                            <ToastContainer/>
                        </div>
                    </div>
                    <CreateMessageForm
                        createAppeal={this.createAppeal}
                        filials={filials}
                        t={t}
                    />
                </div>
            </BaseOverlayLoader>
        );
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        createAppeal: (params) => {
            dispatch({type: actions.GET_LANGUAGE.REQUEST, payload: params});
        },
        getFilials: () => {
            const storeName = 'filial';
            const entityName = 'filial';
            const scheme = [Filial];
            dispatch({
                type: ApiActions.GET_ALL.REQUEST,
                payload: {
                    url: '/site/banks',
                    config: {
                        params: {

                        },
                    },
                    scheme,
                    storeName,
                    entityName,
                },
            });
        },

    };
};

const mapStateToProps = (state) => {
    return {
        entities: get(state, 'normalize.entities', []),
        isFetched: get(state, "message.isFetched",false),
        filials: get(state, 'normalize.data.filial.result', []),
    };
};
export default withTranslation("bhm_one")(connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(AppealCreateContainer)));

