import React, {Component} from 'react';
import BaseOverlayLoader from "../../../../components/BaseOverlayLoader";
import Title from "../../../../components/Title/Title";
import {toast, ToastContainer} from "react-toastify";
import {withRouter} from "react-router";
import CreateRoleForm from "../../components/apply-form/CreateRoleForm";
import ApiService from "../../services/ApiService";

class VacancySettingsCreateRoleContainer extends Component {
    state = {
        loading: false
    }

    createRole = ({role, description}) => {
        this.setState({loading: true});
        ApiService.createRole({role, description}).then((response) => {
            this.setState({loading: false});
            toast.success('Successfully created');
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
                    <Title>Create Role</Title>
                    <div className="row">
                        <div className="col-md-12">
                            <ToastContainer/>
                        </div>
                    </div>
                    <CreateRoleForm submitForm={this.createRole}/>
                </div>
            </BaseOverlayLoader>
        );
    }
}

export default withRouter(VacancySettingsCreateRoleContainer);