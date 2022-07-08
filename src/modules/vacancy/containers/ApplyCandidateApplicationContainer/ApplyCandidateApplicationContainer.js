import React, {Component} from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router";
import ApiActions from "../../../../services/api/Actions";
import Vacancy from "../../../../schema/Vacancy";
import {get, isEmpty} from "lodash";
import {toast, ToastContainer} from 'react-toastify';
import BaseOverlayLoader from "../../../../components/BaseOverlayLoader";
import Title from "../../../../components/Title/Title";
import Normalizer from "../../../../services/normalizr";
import ApplyForm from "../../components/apply-form/ApplyForm";
import ApiService from "./../../services/ApiService";
import Loader from "../../../../components/Loader";


class ApplyCandidateApplicationContainer extends Component {
    state = {
        loading: false,
        mvd: {},
        study_type_list: [
            {
                id: 1,
                type: "Ўрта махсус",

            },
            {
                id: 2,
                type: "Тугалланмаган олий",

            },
            {
                id: 3,
                type: "Бакалавр",

            },
            {
                id: 4,
                type: "Магистр",

            }
        ],
        application_type_list: [
            {
                id: 0,
                type: "Прием"
            },
            {
                id: 1,
                type: "Ротация"
            }
        ],
        genders: [{
            id: 1,
            name: 'Erkak'
        }, {
            id: 2,
            name: 'Ayol'
        }]
    }

    componentDidMount() {
        const {getOneVacancy, vacancy_id} = this.props;
        getOneVacancy({vacancy_id});
    }

    applyCandidateInfo = (values, formMethods) => {
        this.setState({loading: true});
        let {phone, ...otherParams} = values;
        phone = phone.replace(/\D/g, '');
        values = {phone, ...otherParams};
        ApiService.applyCandidateInfo(values).then((response) => {
            if (response && response.data) {
                this.setState({loading: false});
                toast.success('Successfully applied');
                this.props.history.push('/vacancy/candidate/' + response.data?.id);
            } else {
                toast.warn('Something is error');
                this.setState({loading: false});
            }
        }).catch((e) => {
            this.setState({loading: false});
            e.response.data && e.response.data.map(item => {
                toast.error('Error:' + item?.message);
            })
        })
    }

    getMvdData = (passport, inps) => {
        this.setState({loading: true});
        passport = passport.toUpperCase().split(/\s/).join('');
        if (isEmpty(passport) || isEmpty(inps)) {
            toast.warn('Form should not be empty');
        } else {
            ApiService.getMvdData({passport, inps}).then((res) => {
                this.setState({loading: false});
                if (res && res.data) {
                    this.setState({mvd: res.data});
                    toast.success('Data successfully obtained from mvd');
                }
            }).catch((e) => {
                e.response.data && e.response.data.map(item => {
                    toast.error('Error:' + item?.field);
                })

            })
        }
    }

    render() {
        const {loading, study_type_list, application_type_list,genders,mvd} = this.state;
        let {entities, vacancy, vacancy_id, isFetched} = this.props;
        vacancy = Normalizer.Denormalize(vacancy, Vacancy, entities);
        return (<>
                {isFetched ? <BaseOverlayLoader loading={loading} text={"Applying candidate ..."}>
                    <div className={"page-content padding"}>
                           <Title>{get(vacancy, 'post_name')}</Title>

                        <div className="row">
                            <div className="row">
                                <div className="col-md-12">
                                    <ToastContainer/>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <ApplyForm vacancy_id={vacancy_id} study_type_list={study_type_list}
                                           application_type_list={application_type_list}
                                           submitForm={this.applyCandidateInfo} getMvdData={this.getMvdData} genders={genders} mvd={mvd}/>
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
        vacancy: get(state, 'normalize.data.vacancy-one.result', null),
        isFetched: get(state, 'normalize.data.vacancy-one.isFetched', false)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getOneVacancy: ({vacancy_id, api_url = '/candidates/candidates/one-vacancy'}) => {
            const storeName = 'vacancy-one';
            const entityName = 'vacancy';
            const scheme = Vacancy;
            dispatch({
                type: ApiActions.GET_ONE.REQUEST,
                payload: {
                    url: api_url,
                    config: {
                        params: {
                            vacancy_id
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