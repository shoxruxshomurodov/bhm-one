import React, {Component} from 'react';
import BaseOverlayLoader from "../../../../components/BaseOverlayLoader";
import Title from "../../../../components/Title/Title";
import {toast, ToastContainer} from "react-toastify";
import {withRouter} from "react-router";
import ApiService from "../../services/ApiService";
import GiveRoleForm from "../../components/apply-form/GiveRoleForm";

class VacancySettingsGiveRoleContainer extends Component {
    state = {
        loading:false
    }

    giveRole = ({role,phone}) => {
        this.setState({loading:true});
        phone = '998'+phone.replace(/\D/g, '');
        ApiService.giveRole({role,phone}).then((response) => {
            this.setState({loading: false});
            toast.success('Success set Role');
            this.props.history.push('/vacancy/give/role');
        }).catch((error) => {
            this.setState({loading: false});
            toast.error('Error:' + error?.response?.data);
        })
    }
    render() {
        const {loading} = this.state;
        return (
            <BaseOverlayLoader isActive={loading} text={"Loading..."}>
                <div className={"page-content padding"}>
                    <Title>Give Role</Title>
                    <div className="row">
                        <div className="col-md-12">
                            <ToastContainer/>
                        </div>
                    </div>
                    <GiveRoleForm submitForm={this.giveRole} />
                </div>
            </BaseOverlayLoader>
        );
    }
}

export default withRouter(VacancySettingsGiveRoleContainer);