import React, {Component} from 'react';
import {connect} from "react-redux";
import {get, isEmpty} from "lodash";
import {withRouter} from "react-router-dom";
import {toast, ToastContainer} from 'react-toastify';
import BaseSelect from "../../../../components/BaseSelect";
import Title from "../../../../components/Title/Title";
import BaseButton from "../../../../components/BaseButton";
import Region from "../../../../schema/Region";
import ApiActions from "../../../../services/api/Actions";
import Normalizer from "../../../../services/normalizr";
import Filial from "../../../../schema/Filial";
import BaseTable from "../../../../components/BaseTable";
import Loader from "../../../../components/Loader";
import Pagination from "../../../../components/Pagination/Pagination";
import BaseOverlayLoader from "../../../../components/BaseOverlayLoader";
import Candidate from "../../../../schema/Candidate";
import ApiService from "../../services/ApiService";
import Utils from "../../../../services/helpers/Utils";
import config from "../../../../config";
import moment from "moment";

class VacanciesContainer extends Component {
    state = {
        region_code: null,
        filial_code: null,
        tableHeaderData: ['№', 'ID', 'ID вакансии', 'Полное имя', 'ПИНФЛ', 'ТЕЛЕФОН', 'Тип обучения', 'ТИП', 'Создано', 'Обновлено', 'Статус', 'Кўриш'],
        loading: false,
        page: 1
    };

    componentDidMount() {
        const {
            getRegions,
            getFilialsTrigger,
            getAllCandidatesByFilial,
            getAllCandidatesByRegion,
            getAllCandidatesByDepartment,
            userCan
        } = this.props;
        getRegions();
        getFilialsTrigger();
        if (Utils.userCanStyle(
            userCan,
            [config.ROLES.VACANCY_DEPARTMENT_MANAGER]
        )) {
            getAllCandidatesByDepartment({page: 1});
        } else if (Utils.userCanStyle(
            userCan,
            [config.ROLES.VACANCY_FILIAL_MANAGER]
        )) {
            getAllCandidatesByRegion({page: 1});
        } else {
            getAllCandidatesByFilial({filial_code: null});
        }
    }

    filterByRegion = (region_code) => {
        const {getFilials} = this.props;
        this.setState({region_code});
        getFilials({region_code});
    }

    filterByFilial = (filial_code) => {
        this.setState({filial_code});
    }

    getAllCandidates = () => {
        const {getAllCandidatesByFilial, getAllCandidatesByRegion} = this.props;
        const {filial_code, page} = this.state;
        const {userCan} = this.props;
        if (filial_code) {
            if (Utils.userCanStyle(
                userCan,
                [config.ROLES.VACANCY_FILIAL_MANAGER]
            )) {
                getAllCandidatesByRegion({page: 1});
            } else {
                getAllCandidatesByFilial({filial_code, page});
            }
        } else {
            toast.warn("Please select filial");
        }
    }

    downloadExcel = () => {
        const {filial_code} = this.state;
        if (filial_code) {
            this.setState({loading: true});
            ApiService.downloadCandidateExcel(filial_code).then((response) => {
                if (response && response.data) {
                    this.setState({loading: false});
                    window.location.href = response.data;
                }
            }).catch((error) => {
                this.setState({loading: false});
                toast.error("Error" + error?.response?.data);
            })
        } else {
            toast.warn("Please select filial");
        }
    }

    pagination = (page = 1) => {
        const {getAllCandidatesByFilial} = this.props;
        const {
            filial_code
        } = this.state;

        getAllCandidatesByFilial({
            filial_code,
            page
        });
    };


    render() {
        let {entities, regions, filials, candidates, isFetched, history, meta, userCan} = this.props;
        const {tableHeaderData, loading, filial_code} = this.state;
        let regions_list = Normalizer.Denormalize(regions, [Region], entities);
        let filials_list = Normalizer.Denormalize(filials, [Filial], entities);
        candidates = Normalizer.Denormalize(candidates, [Candidate], entities);
        return (
            <BaseOverlayLoader isActive={loading} text={"Asynchronizing data from iabs..."}>
                <div className={"page-content padding"}>
                    <Title>Барча номзодлар</Title>
                    <div className="row">
                        <div className="col-md-12">
                            <ToastContainer/>
                        </div>
                    </div>
                    <div className="row">
                        {Utils.userCanStyle(
                            userCan,
                            [config.ROLES.VACANCY_HR_MANAGER]
                        ) &&
                        <div className="col-md-2">
                            <BaseSelect label={"Регион:"} options={regions_list} filterBy={this.filterByRegion}/>
                        </div>}
                        {Utils.userCanStyle(
                            userCan,
                            [config.ROLES.VACANCY_HR_MANAGER, config.ROLES.VACANCY_FILIAL_MANAGER]
                        ) && <div className="col-md-2">
                            <BaseSelect placeholder={"Выберите филиал"} label={"Филиал:"} options={filials_list}
                                        filterBy={this.filterByFilial}/>
                        </div>}
                        {Utils.userCanStyle(
                            userCan,
                            [config.ROLES.VACANCY_HR_MANAGER, config.ROLES.VACANCY_FILIAL_MANAGER]
                        ) &&
                        <div className="col-md-2 text-center">
                            <BaseButton className={"btn-info"}
                                        style={{marginRight: '15px', marginTop: '22px', height: '35px'}}
                                        handleBtn={this.getAllCandidates}>Поиск</BaseButton>
                            {Utils.userCanStyle(
                                userCan,
                                [config.ROLES.VACANCY_HR_MANAGER, config.ROLES.VACANCY_FILIAL_MANAGER]
                            ) &&
                            <BaseButton className={"btn-info"}
                                        style={{marginRight: '15px', marginTop: '22px', height: '35px'}}
                                        handleBtn={this.downloadExcel}>
                                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24"
                                     fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"
                                     strokeLinejoin="round" className="feather feather-download mx-2">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                    <polyline points="7 10 12 15 17 10"/>
                                    <line x1={12} y1={15} x2={12} y2={3}/>
                                </svg>
                            </BaseButton>}
                        </div>
                        }
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            {
                                isFetched ? <>
                                        {!isEmpty(candidates) ?
                                            <>
                                                <BaseTable head={tableHeaderData} className={"mt-3"}>
                                                    {
                                                        candidates.map((item, index) => <tr key={item.id}
                                                                                            style={{verticalAlign: 'middle'}}>
                                                            <td>{index + 1}</td>
                                                            <td>{item.id}</td>
                                                            <td>{item.vacancy_id}</td>
                                                            <td>{item.full_name}</td>
                                                            <td>{item.inps}</td>
                                                            <td>{item.phone}</td>
                                                            <td>{item.study_type}</td>
                                                            <td>{item.type}</td>
                                                            <td>{moment.unix(item.created_at).format('DD.MM.YYYY')}</td>
                                                            <td>{moment.unix(item.updated_at).format('DD.MM.YYYY')}</td>
                                                            <td>{item.status}</td>
                                                            <td><BaseButton className={"btn-success"}
                                                                            handleBtn={() => history.push(`/vacancy/candidate/${item.id}`)}
                                                                            style={{marginTop: 0}}>Кўриш</BaseButton></td>
                                                        </tr>)
                                                    }
                                                </BaseTable>
                                                <Pagination meta={meta} onChange={this.pagination}/></> : <p
                                                className="search-data">Маълумот йўқ</p>

                                        }
                                    </>
                                    : <Loader/>
                            }
                        </div>
                    </div>
                </div>
            </BaseOverlayLoader>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        entities: get(state, 'normalize.entities', []),
        regions: get(state, 'normalize.data.region.result', []),
        filials: get(state, 'normalize.data.filial.result', []),
        candidates: get(state, 'normalize.data.candidate-list.result.data', []),
        meta: get(state, 'normalize.data.candidate-list.result._meta', {}),
        isFetched: get(state, 'normalize.data.candidate-list.isFetched', false),
        user: get(state, 'auth.user', null)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getRegions: () => {
            const storeName = 'region';
            const entityName = 'region';
            const scheme = [Region];
            dispatch({
                type: ApiActions.GET_ALL.REQUEST,
                payload: {
                    url: '/collector/state/regions',
                    scheme,
                    storeName,
                    entityName,
                },
            });
        },
        getFilials: ({region_code}) => {
            const storeName = 'filial';
            const entityName = 'filial';
            const scheme = [Filial];
            dispatch({
                type: ApiActions.GET_ALL.REQUEST,
                payload: {
                    url: '/collector/state/banks',
                    includes: ['created_by'].join(" "),
                    config: {
                        params: {
                            region_code,
                        },
                    },
                    scheme,
                    storeName,
                    entityName,
                },
            });
        },
        getAllCandidatesByFilial: ({filial_code: code, page}) => {
            const storeName = 'candidate-list';
            const entityName = 'candidate';
            const scheme = {data: [Candidate]};
            dispatch({
                type: ApiActions.GET_ALL.REQUEST,
                payload: {
                    url: '/candidates/candidates/all-candidates',
                    config: {
                        params: {
                            code,
                            page
                        },
                    },
                    scheme,
                    storeName,
                    entityName,
                },
            });
        },
        getAllCandidatesByDepartment: ({filial_code: code, page}) => {
            const storeName = 'candidate-list';
            const entityName = 'candidate';
            const scheme = {data: [Candidate]};
            dispatch({
                type: ApiActions.GET_ALL.REQUEST,
                payload: {
                    url: '/candidates/department-candidate/index',
                    config: {
                        params: {
                            page
                        },
                    },
                    scheme,
                    storeName,
                    entityName,
                },
            });
        },
        getAllCandidatesByRegion: ({filial_code: code, page}) => {
            const storeName = 'candidate-list';
            const entityName = 'candidate';
            const scheme = {data: [Candidate]};
            dispatch({
                type: ApiActions.GET_ALL.REQUEST,
                payload: {
                    url: '/candidates/candidates/region-candidates',
                    config: {
                        params: {
                            page
                        },
                    },
                    scheme,
                    storeName,
                    entityName,
                },
            });
        },
        getCandidatesTrigger: () => {
            const storeName = 'candidate-list';
            dispatch({
                type: ApiActions.GET_ALL.TRIGGER,
                payload: {
                    storeName,
                },
            });
        },
        getFilialsTrigger: () => {
            const storeName = 'filial';
            dispatch({
                type: ApiActions.GET_ALL.TRIGGER,
                payload: {
                    storeName,
                },
            });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(VacanciesContainer));