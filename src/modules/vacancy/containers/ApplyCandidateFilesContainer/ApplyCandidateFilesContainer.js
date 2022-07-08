import React, {Component} from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router";
import ApiActions from "../../../../services/api/Actions";
import {get} from "lodash";
import {toast, ToastContainer} from 'react-toastify';
import BaseOverlayLoader from "../../../../components/BaseOverlayLoader";
import Title from "../../../../components/Title/Title";
import Normalizer from "../../../../services/normalizr";
import ApiService from "./../../services/ApiService";
import ApplyFilesForm from "../../components/apply-form/ApplyFilesForm";
import Candidate from "../../../../schema/Candidate";
import Loader from "../../../../components/Loader";


class ApplyCandidateApplicationContainer extends Component {

    state = {
        loading: false,
    }

    componentDidMount() {
        const {getOneCandidate, candidate_id} = this.props;
        if (candidate_id) {
            getOneCandidate({candidate_id});
        }
    }


    applyCandidateFiles = ({formData}) => {
        this.setState({loading: true});
        ApiService.applyCandidateFiles(formData).then((response) => {
            this.setState({loading: false});
            toast.success('File successfully added');
        }).catch((error) => {
            console.log(error);
            this.setState({loading: false});
            toast.error('Error:' + error?.response?.data);
        })
    }

    render() {
        const {loading} = this.state;
        let {entities, candidate, candidate_id, history, isFetched} = this.props;
        candidate = Normalizer.Denormalize(candidate, Candidate, entities);
        return (
            <>
                {isFetched ? <BaseOverlayLoader loading={loading} text={"Applying candidate ..."}>
                    <div className={"page-content padding"}>
                        <Title>{`${get(candidate, 'candidate.filial')} ${get(candidate, 'candidate.full_name')} `}</Title>
                        <div className="row">
                            <div className="row">
                                <div className="col-md-12">
                                    <ToastContainer/>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <ApplyFilesForm candidate_id={candidate_id}
                                                applyCandidateFiles={this.applyCandidateFiles} history={history}/>
                            </div>
                        </div>
                    </div>
                </BaseOverlayLoader> : <Loader/>}
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        entities: get(state, 'normalize.entities', []),
        candidate: get(state, 'normalize.data.candidate-one.result', {}),
        isFetched: get(state, 'normalize.data.candidate-one.isFetched', false),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getOneCandidate: ({candidate_id, api_url = '/candidates/candidates/one-candidate'}) => {
            const storeName = 'candidate-one';
            const entityName = 'candidate';
            const scheme = {Candidate};
            dispatch({
                type: ApiActions.GET_ONE.REQUEST,
                payload: {
                    url: api_url,
                    config: {
                        params: {
                            candidate_id
                        },
                    },
                    scheme,
                    storeName,
                    entityName,
                },
            });
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ApplyCandidateApplicationContainer));