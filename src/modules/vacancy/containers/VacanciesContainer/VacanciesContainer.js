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
import ApiService from "../../services/ApiService";
import Vacancy from "../../../../schema/Vacancy";
import Utils from "../../../../services/helpers/Utils";
import config from "../../../../config";


class VacanciesContainer extends Component {
    state = {
        region_code: null,
        filial_code: null,
        tableHeaderData: ['№', 'ID', 'Филиал код', 'Код отдела', 'Название отдела', 'ID поста', 'Количество', 'Период', 'Название поста', 'Подать заявку'],
        loading: false
    };

    componentDidMount() {
        const {
            getRegions,
            getFilialsTrigger,
            getAllVacanciesByFilial,
            getCurrentFilials,
            userCan,
            getAllVacanciesByRegion
        } = this.props;
        getRegions();
        getFilialsTrigger();
        getAllVacanciesByFilial({filial_code:null});
        if(Utils.userCanStyle(
            userCan,
            [config.ROLES.VACANCY_FILIAL_MANAGER]
        )){
            getCurrentFilials();
            getAllVacanciesByRegion({page: 1});
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

    getAllVacancies = () => {
        const {getAllVacanciesByFilial} = this.props;
        const {filial_code} = this.state;
        if (filial_code) {
            getAllVacanciesByFilial({filial_code});
        } else {
            toast.warn("Please select filial");
        }
    }

    pagination = (page = 1) => {
        const {getAllVacanciesByFilial, userCan, getAllVacanciesByRegion} = this.props;
        const {
            filial_code
        } = this.state;

        if (Utils.userCanStyle(
            userCan,
            [config.ROLES.VACANCY_FILIAL_MANAGER]
        )) {
            if (filial_code) {
                getAllVacanciesByFilial({
                    filial_code,
                    page
                });
            } else {
                getAllVacanciesByRegion({page});
            }
        } else {
            getAllVacanciesByFilial({
                filial_code,
                page
            });
        }
    };

    synchronizeAllVacancies = () => {
        const {filial_code} = this.state;
        if (filial_code) {
            this.setState({loading: true});
            ApiService.synchronizeAllVacancy(filial_code).then((response) => {
                this.setState({loading: false});
                toast.success("Data successfully synchronized");
                this.getAllVacancies();
            }).catch((error) => {
                console.log(error)
                toast.error("Error:" + error?.response?.data);
            })
        } else {
            toast.warn("Please select filial");
        }
    }

    render() {
        let {
            entities, regions, filials, vacancies, isFetched, history, meta, userCan
        } = this.props;
        const {tableHeaderData, loading} = this.state;
        regions = Normalizer.Denormalize(regions, [Region], entities);
        filials = Normalizer.Denormalize(filials, [Filial], entities);
        vacancies = Normalizer.Denormalize(vacancies, [Vacancy], entities);
        return (
            <BaseOverlayLoader isActive={loading} text={"Asynchronizing data from iabs..."}>
                <div className={"page-content padding"}>
                    <Title>Барча бўш иш ўринлари</Title>
                    <div className="row">
                        <div className="col-md-12">
                            <ToastContainer/>
                        </div>
                    </div>
                    <div className="row">
                        {Utils.userCanStyle(
                            userCan,
                            [config.ROLES.VACANCY_HR_MANAGER,config.ROLES.VACANCY_DEPARTMENT_MANAGER]
                        ) && <div className="col-md-2"><BaseSelect label={"Регион:"} options={regions}
                                                                   filterBy={this.filterByRegion}/></div>}

                        <div className="col-md-2">
                            <BaseSelect placeholder={"Выберите филиал"} label={"Филиал:"} options={filials}
                                        filterBy={this.filterByFilial}/>
                        </div>
                        <div className="col-md-2 text-center">
                            <BaseButton className={"btn-info"}
                                        style={{marginRight: '15px', marginTop: '22px', height: '35px'}}
                                        handleBtn={this.getAllVacancies}>Поиск</BaseButton>
                            {Utils.userCanStyle(
                                userCan,
                                [config.ROLES.VACANCY_HR_MANAGER,config.ROLES.VACANCY_FILIAL_MANAGER]
                            ) && <BaseButton className={"btn-info"}
                                        handleBtn={this.synchronizeAllVacancies}>Обновить</BaseButton>}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            {
                                isFetched
                                    ?
                                    <>
                                        {
                                            !isEmpty(vacancies) ? <>
                                                <BaseTable head={tableHeaderData} className={"mt-3"}>
                                                    {
                                                        vacancies && vacancies.map((item, index) => <tr
                                                            key={item.id}
                                                            style={{verticalAlign: 'middle'}}>
                                                            <td>{index + 1}</td>
                                                            <td>{item.id}</td>
                                                            <td>{item.filial_code}</td>
                                                            <td>{item.dep_code}</td>
                                                            <td>{item.dep_name}</td>
                                                            <td>{item.post_id}</td>
                                                            <td>{item.amount}</td>
                                                            <td>{item.period}</td>
                                                            <td>{item.post_name}</td>
                                                            {Utils.userCanStyle(
                                                                userCan,
                                                                [config.ROLES.VACANCY_HR_MANAGER]
                                                            ) && <td><BaseButton className={"btn-success"}
                                                                            handleBtn={() => history.push(`/vacancy/apply-candidate-info/${item.id}`)}
                                                                            style={{marginTop: 0}}>Перейти </BaseButton>
                                                            </td>}
                                                        </tr>)
                                                    }
                                                </BaseTable>
                                                <Pagination meta={meta} onChange={this.pagination}/>
                                            </> : <p className="search-data">Маълумот
                                                йўқ</p>
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
        vacancies: get(state, 'normalize.data.vacancy-list.result.data', []),
        meta: get(state, 'normalize.data.vacancy-list.result._meta', {}),
        isFetched: get(state, 'normalize.data.vacancy-list.isFetched', true),
        user: get(state, 'auth.user', {})
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

        getAllVacanciesByFilial: ({filial_code: code, page = 1}) => {
            const storeName = 'vacancy-list';
            const entityName = 'vacancy';
            const scheme = {data: [Vacancy]};
            dispatch({
                type: ApiActions.GET_ALL.REQUEST,
                payload: {
                    url: '/candidates/candidates/filial-vacancies',
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
        getAllVacanciesByRegion: ({page = 1}) => {
            const storeName = 'vacancy-list';
            const entityName = 'vacancy';
            const scheme = {data: [Vacancy]};
            dispatch({
                type: ApiActions.GET_ALL.REQUEST,
                payload: {
                    url: '/candidates/candidates/region-vacancies',
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
        getVacanciesTrigger: () => {
            const storeName = 'vacancy-list';
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
        },
        getCurrentFilials: () => {
            const storeName = 'filial';
            const entityName = 'filial';
            const scheme = [Filial];
            dispatch({
                type: ApiActions.GET_ALL.REQUEST,
                payload: {
                    url: '/candidates/candidates/current-filials',
                    scheme,
                    storeName,
                    entityName,
                },
            });
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(VacanciesContainer));