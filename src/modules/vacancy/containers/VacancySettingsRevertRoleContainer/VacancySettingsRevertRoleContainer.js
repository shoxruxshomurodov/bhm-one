import React, {Component} from 'react';
import BaseOverlayLoader from "../../../../components/BaseOverlayLoader";
import Title from "../../../../components/Title/Title";
import {toast, ToastContainer} from "react-toastify";
import {withRouter} from "react-router";
import ApiService from "../../services/ApiService";
import RevertRoleForm from "../../components/apply-form/RevertRoleForm";
import {withTranslation} from "react-i18next";
import actions from "../../../vacancy/actions";
import {get} from "lodash";
import {connect} from "react-redux";

class VacancySettingsRevertRoleContainer extends Component {
    state = {
        loading:false
    }

    revertRole = ({role,user_id}) => {
        this.setState({loading:true});
        user_id = parseInt(user_id);
        ApiService.revertRole({role,user_id}).then((response) => {
            this.setState({loading: false});
            toast.success('Success Revert Role');
            this.props.history.push('/vacancy/revert/role');
        }).catch((error) => {
            this.setState({loading: false});
            toast.error('Error:' + error?.response?.data);
        })
    }
    roleSend=(role)=>{
        this.setState({role})
        const {  getVacancyUser } = this.props;
        return getVacancyUser({params: {
                include: "profile",
            },
            role
        })
    }
    render() {
        const {loading} = this.state;
        const {t} = this.props;
        const {vacancy_user} = this.props;
        return (
            <BaseOverlayLoader isActive={loading} text={"Loading..."}>
                <div className={"page-content padding"}>
                    <Title>{t('Revert Role')}</Title>
                    <div className="row">
                        <div className="col-md-12">
                            <ToastContainer/>
                        </div>
                    </div>
                    <RevertRoleForm
                        submitForm={this.revertRole}
                        roleSend={this.roleSend}
                        vacancy_user={vacancy_user}
                    />
                </div>
            </BaseOverlayLoader>
        );
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getVacancyUser: ({ params ,role}) => {
            dispatch({ type: actions.GET_VACANCY_USER.REQUEST, payload: { params ,role} });
        },
    };
};

const mapStateToProps = (state) => {
    return {
        vacancy_user: get(state, "vacancy.vacancy_user", []),
        entities: get(state, "normalize.entities", {}),
        isFetched: get(state, "vacancy.isFetched",false),
    };
};



export default withTranslation("bhm_one") (connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(VacancySettingsRevertRoleContainer)));