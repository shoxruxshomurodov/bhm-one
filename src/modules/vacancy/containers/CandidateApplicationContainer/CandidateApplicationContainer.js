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
import BaseButton from "../../../../components/BaseButton";
import Loader from "../../../../components/Loader";
import Modal from "../../../../components/Modal/Modal";
import Utils from "../../../../services/helpers/Utils";
import config from "../../../../config";
import ApiService from "../../services/ApiService";
import actions from "../../../face-control/actions";


class CandidateApplicationContainer extends Component {
    state = {
        loading: false,
        visible: false,
        status: null,
        status_show: false,
        dep_code: null,
        application_status: Utils.userCanStyle(
            this.props.userCan,
            [config.ROLES.VACANCY_DEPARTMENT_MANAGER]
        ) ? [{id: 4, name: 'ОДОБРЕНО'}, {id: 5, name: 'ОТКАЗАНО'}] : [{id: 0, name: 'ОТПРАВЛЕНО'}, {
            id: 1,
            name: 'ЗАБЛОКИРОВАНО'
        }, {id: 2, name: 'НА СОБЕСЕДОВАНИЕ'}, {id: 3, name: 'НА ПОВТОРНОЕ РАССМОТРЕНИЕ'}, {id: 6, name: 'УТВЕРЖДЕНО'}],
    }

    componentDidMount() {
        const {getOneCandidate, candidate_id} = this.props;
        getOneCandidate({candidate_id});
    }

    showModal = () => {
        this.setState({visible: true});
    }

    hideModal = () => {
        this.setState({visible: false,status_show:false});
    }

    showStatusModal = () => {
        const {getDepartmentList} = this.props;
        getDepartmentList();
        this.setState({status_show: true});
    }

    changeStatus = () => {
        const {candidate_id, getOneCandidate} = this.props;
        const {status, dep_code} = this.state;
        if (status && candidate_id) {
            if (dep_code) {
                ApiService.changeStatus({candidate_id, dep_code}).then((res) => {
                    if (res && res.data) {
                        ApiService.candidateStatusChange({candidate_id, status}).then((res) => {
                            getOneCandidate({candidate_id});
                            toast.success('Success');
                        }).catch((e) => {
                            toast.error('Error');
                        });
                    }
                }).catch((e) => {
                    toast.error('Error');
                });
            } else {
                ApiService.candidateStatusChange({candidate_id, status}).then((res) => {
                    getOneCandidate({candidate_id});
                    toast.success('Success');
                }).catch((e) => {
                    toast.error('Error');
                });
            }
            this.setState({status_show: false});
        }
    }

    downloadPdfFile = () => {
        const {candidate_id} = this.props;
            ApiService.getCandidateFile(candidate_id).then((response) => {
                if (response && response.data) {
                    window.location.href = response.data;
                }
            }).catch((error) => {
                toast.error("Error");
            })

    }

    render() {
        const {loading, visible, status_show, application_status} = this.state;
        let {entities, candidate, candidate_id, history, isFetched, userCan, selectDepartmentList} = this.props;
        candidate = Normalizer.Denormalize(candidate, Candidate, entities);
        let arrSelectDepartment = Object.entries(selectDepartmentList).map(([key, value]) => {
            return {value: key, label: value};
        });

        return (
            <>
                <BaseOverlayLoader loading={loading} text={"Applying candidate ..."}>
                    {isFetched ?
                        <>
                            <div className={"page-content padding"}>
                                <div className="row">
                                    <div className="col-md-8">
                                        <Title>{`${get(candidate, 'candidate.full_name')} (${get(candidate, 'candidate.filial')})  `}</Title>
                                    </div>
                                    <div className="col-md-4">
                                        <button
                                            className="btn btn-md btn-raised btn-wave btn-icon btn-rounded mb-2 green text-white"
                                            onClick={this.downloadPdfFile}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16}
                                                 viewBox="0 0 24 24"
                                                 fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"
                                                 strokeLinejoin="round" className="feather feather-download mx-2">
                                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                                <polyline points="7 10 12 15 17 10"/>
                                                <line x1={12} y1={15} x2={12} y2={3}/>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <ToastContainer/>
                                        </div>
                                        <div className="col-md-12">
                                            <Modal onOk={this.hideModal} onCancel={this.hideModal} visible={visible}>
                                                <Title>History</Title>
                                                {get(candidate, 'history') && get(candidate, 'history').map(({
                                                                                                                 status,
                                                                                                         date,
                                                                                                         user
                                                                                                     }, index) => <div
                                            key={index} className="row mt-3">
                                            <div className="col-md-6">{user}</div>
                                            <div className="col-md-3">{date}</div>
                                            <div className="col-md-3">{status}</div>
                                        </div>)}
                                    </Modal>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="col-md-8">
                                        <div className="card flex p-3"  style={{visibility: 'visible', transform: 'none', opacity: 1, transition: 'none 0s ease 0s'}}>
                                            <div className="row mt-3">
                                                <div className="col-6">
                                                    <p>Лавозим: {get(candidate, 'candidate.position')}</p>
                                                </div>
                                                <div className="col-6">
                                                    <p>Таълим: {get(candidate, 'candidate.study_type')}</p>
                                                </div>
                                                <div className="col-6">
                                                    <p>Тури: {get(candidate, 'candidate.type')}</p>
                                                </div>
                                                <div className="col-6">
                                                    <p className={"d-flex align-items-center"}><span
                                                        className={"mr-2"}>Статус:</span> <BaseButton
                                                        style={{}}>{get(candidate, 'status.name')}</BaseButton></p>
                                                </div>
                                                {get(candidate, 'files') && get(candidate, 'files').map(({path, type}, index) => <div key={index}
                                                                                                                                      className="col-6">
                                                    <p>{type}<a download target={"_blank"} href={path}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16}
                                                             viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
                                                             strokeLinecap="round" strokeLinejoin="round"
                                                             className="feather feather-download mx-2">
                                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                                            <polyline points="7 10 12 15 17 10"/>
                                                            <line x1={12} y1={15} x2={12} y2={3}/>
                                                        </svg>
                                                    </a>
                                                    </p>
                                                </div>)}
                                            </div>
                                        </div>
                                    </div>
                                    {get(candidate, 'questions') && get(candidate, 'questions',[]).map(({title},index) => <div key={index} className="col-md-8">
                                        <div className="card mb-2"><div className="card-header no-border"><a className="collapsed" ><strong>Savol:</strong> {title}</a></div></div>
                                    </div>)
                                    }
                                </div>
                                <div className="row mt-3">

                                    {
                                        Utils.userCanStyle(
                                            userCan,
                                            [config.ROLES.VACANCY_HR_MANAGER, config.ROLES.VACANCY_FILIAL_MANAGER]
                                        ) && <div className="col-md-2">
                                            <BaseButton className={"btn-info btn-block"}
                                                        handleBtn={() => history.push('/vacancy/apply-candidate-files/' + candidate_id)}>Файлларни
                                                бириктириш</BaseButton></div>
                                    }


                                    {Utils.userCanStyle(
                                        userCan,
                                        [config.ROLES.VACANCY_DEPARTMENT_MANAGER]
                                    ) &&
                                    <div className="col-md-2"><BaseButton
                                        handleBtn={() => history.push('/vacancy/candidate-questions/' + candidate_id)}
                                        className={"btn-info btn-block"}>Савол бириктириш</BaseButton></div>}


                                    {Utils.userCanStyle(
                                        userCan,
                                        [config.ROLES.VACANCY_HR_MANAGER, config.ROLES.VACANCY_DEPARTMENT_MANAGER]
                                    ) &&
                                    <div className="col-md-2"><BaseButton handleBtn={this.showStatusModal} className={"btn-info btn-block"}>Статусни
                                        ўзгартириш</BaseButton></div>}

                                    <div className="col-md-2">
                                        {isEmpty(get(candidate, 'candidate.files')) &&
                                        <BaseButton handleBtn={this.showModal}
                                                    className={"btn-info btn-block"}>История</BaseButton>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Modal onOk={this.changeStatus} onCancel={this.hideModal} visible={status_show}>
                        <Title>Change status</Title>
                        <select className={'form-control mt-3'}
                                value={this.state.status ?? get(candidate, 'status.type')}
                                onChange={(e) => this.setState({status: parseInt(e.target.value)})}>
                            <option selected>Select status</option>
                            {
                                application_status && application_status.map(({id, name}) => <option key={id}
                                                                                                     value={id}> {name} </option>)
                            }
                        </select>
                        {Utils.userCanStyle(
                            userCan,
                            [config.ROLES.VACANCY_HR_MANAGER]
                        ) && <select className={'form-control mt-3'}
                                     onChange={(e) => this.setState({dep_code: e.target.value})}>
                            <option selected>Выберите Отдел</option>
                            {
                                arrSelectDepartment && arrSelectDepartment.map(({value, label}) => <option key={value}
                                                                                                           value={value}> {label} </option>)
                            }
                        </select>}
                    </Modal>
                        </>
                        : <Loader/>
                    }
                </BaseOverlayLoader>
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
        selectDepartmentList: get(state, 'face.departmentList', {}),
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
        getDepartmentList: () => dispatch({type: actions.GET_DEPARTMENT_LIST.REQUEST}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CandidateApplicationContainer));