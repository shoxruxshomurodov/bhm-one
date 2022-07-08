import React, {Component} from 'react';
import ApiActions from "../../../../services/api/Actions";
import {get, isEmpty} from "lodash";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {toast, ToastContainer} from 'react-toastify';
import BaseOverlayLoader from "../../../../components/BaseOverlayLoader";
import Title from "../../../../components/Title/Title";
import Normalizer from "../../../../services/normalizr";
import Candidate from "../../../../schema/Candidate";
import Loader from "../../../../components/Loader";
import QuestionForm from "../../components/apply-form/QuestionForm";
import ApiService from "../../services/ApiService";


class VacancyCandidateQuestionsContainer extends Component {
    state = {
        loading: false,
        ratings:[
            {
                ball:1,
                name:'Қониқарсиз'
            },
            {
                ball:2,
                name:'Қуйи қониқарли'
            },
            {
                ball:3,
                name:'Қониқарли'
            },
            {
                ball:4,
                name:'Яхши'
            },
            {
                ball:5,
                name:'Aъло'
            }
        ]
    }

    componentDidMount() {
        const {getOneCandidate, candidate_id} = this.props;
        getOneCandidate({candidate_id});
    }

    addQuestion = (values) => {
        const {candidate_id,user_id} = this.props;
        this.setState({loading: true});
        ApiService.candidateQuestions({...values,candidate_id,user_id}).then((response) => {
            this.setState({loading: false});
            toast.success('Successfully added');
            this.props.history.push('/vacancy/candidate/'+this.props.candidate_id);

        }).catch((error) => {
            this.setState({loading: false});
            toast.error('Error:' + error?.response?.data);
        })
    }

    render() {
        const {loading,ratings,user_id} = this.state;
        let {entities, candidate, candidate_id, history, isFetched} = this.props;
        candidate = Normalizer.Denormalize(candidate, Candidate, entities);
        return (
            <>
                {isFetched ? <BaseOverlayLoader loading={loading} text={"Applying candidate ..."}>
                    <div className={"page-content padding"}>
                        <Title>{`${get(candidate, 'candidate.full_name')} (${get(candidate, 'candidate.filial')})  `}</Title>
                        <div className="row">
                            <div className="row">
                                <div className="col-md-12">
                                    <ToastContainer/>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="col-md-12">
                                        <QuestionForm rating_list={ratings} submitForm={this.addQuestion} user_id={user_id} />
                                    </div>
                                </div>
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
        entities: get
        (
            state
            ,
            'normalize.entities'
            ,
            []
        ),
        candidate: get
        (
            state
            ,
            'normalize.data.candidate-one.result'
            , {}
        ),
        isFetched: get(state, 'normalize.data.candidate-one.isFetched', false),
        user_id: get(state, 'auth.user.id', null),
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(VacancyCandidateQuestionsContainer));

