import React, {Component} from 'react';
import actions from "../../katm/actions";
import {get, isEmpty,isNil} from "lodash";
import {withTranslation} from "react-i18next";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import Title from "../../../components/Title/Title";
import BaseTable from "../../../components/BaseTable";
import Pagination from "../../../components/Pagination/Pagination";
import Loader from "../../../components/Loader";
import Region from "../../../schema/Region";
import ApiActions from "../../../services/api/Actions";
import Filial from "../../../schema/Filial";
import Normalizer from "../../../services/normalizr";
import BaseSelect from "../../../components/BaseSelect";
import BaseButton from "../../../components/BaseButton";
import moment from "moment";
import {DatePicker} from "antd";


class MonitoringContainer extends Component {

    state = {
            currentPage:1,
            region_code: null,
            filial_code: null,
            status:null,
        begin:null,
        end:null,
        nps:null
        }
    componentDidMount() {
        const {getMonitoring,getRegions} = this.props;
        getRegions();
        getMonitoring({});
    }

    pagination = (page = 1) => {
        const {getMonitoring} = this.props;
        this.setState({currentPage:page})
        getMonitoring({
            params: {
                page
            }
        });
    }

    filterByRegion = (region_code) => {
        const {getFilials} = this.props;
        this.setState({region_code});
        getFilials({region_code});
    }

    filterByFilial = (filial_code) => {
        this.setState({filial_code});
    }
    filterByStatus = (status) => {
        this.setState({status});
    }
    filterByNps = (nps) => {
        const {getMonitoring} = this.props;
        getMonitoring({
            params: {
                nps
            }
        });
    }
    datePickerHandler = (name,date) => {
        return this.setState({[name]:date});
    };
    btnDepartmentList = () => {
        const { getDepartment } = this.props;
        const { period } = this.state;
        getDepartment({ period });
    };

    getFilteredMonitoring = () => {
            const {getMonitoring} = this.props;
            const {filial_code,status,begin,end,nps} = this.state
        getMonitoring({
            params: {
                mfo:filial_code,
                status,
                begin,
                end,
                nps
            }
        });
    }
    render() {
        let {entities,regions, filials,monitoring, _meta, isFetched,t,history,id} = this.props;
        const {currentPage,filial_code,status} = this.state;
        regions = Normalizer.Denormalize(regions, [Region], entities);
        filials = Normalizer.Denormalize(filials, [Filial], entities);
        const meta = {currentPage,totalCount:get(_meta,"totalElements"),perPage:get(_meta,"pageable.pageSize")}
       const statuses = [
            { value: 'COMPLETED', label: 'COMPLETED' },
           { value: 'CORRECT_INFO', label: 'CORRECT_INFO' },
           { value: 'INCORRECT_INFO', label: 'INCORRECT_INFO' },
           { value: 'CLAIM_NOT_REGISTERED', label: 'CLAIM_NOT_REGISTERED' },
           { value: 'CLAIM_REGISTERED', label: 'CLAIM_REGISTERED' },
           { value: 'PENDING', label: 'PENDING' },
           { value: 'TOKEN_NOT_FOUND', label: 'TOKEN_NOT_FOUND' },
           { value: 'TOKEN_NOT_REGISTERED', label: 'TOKEN_NOT_REGISTERED' },
           { value: 'TOKEN_REGISTERED', label: 'TOKEN_REGISTERED' },
        ];
        return (
            <div className={"page-content padding"}>
                <div className="row">
                    <div className="col-md-12">
                        <Title>{t("Monitoring")}</Title>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-2"><BaseSelect label={"Регион:"} options={regions}
                                                          filterBy={this.filterByRegion}/></div>
                    <div className="col-md-2">
                        <BaseSelect placeholder={"Выберите филиал"} label={"Филиал:"} options={filials}
                                    filterBy={this.filterByFilial}/>
                    </div>
                    <div className="col-md-2">
                        <BaseSelect placeholder={"Выберите статус"} label={"Статус:"} options={statuses}
                                    filterBy={this.filterByStatus}/>
                    </div>
                    <div className="col-md-2">
                        <label>nps:</label>
                        <input className="form-control"  onChange={(e) => this.filterByNps(e.target.value)} type="number"
                               placeholder="nps"/>
                    </div>
                    <div className="col-md-2 d-flex align-items-center justify-content-between">
                        <DatePicker
                            style={{ marginTop: '20px', height: '38px',marginRight:'10px' }}
                            defaultValue={moment(new Date(), "DD.MM.YYYY hh:mm:ss")}
                            allowClear={false}
                            onChange={(_data, period) => {
                                this.datePickerHandler("begin",moment(period, "YYYY-MM-DD hh:mm:ss").valueOf());
                            }}

                            picker={"day"}
                        />
                        <DatePicker
                            style={{ marginTop: '20px', height: '38px' }}
                            defaultValue={moment(new Date(), "DD.MM.YYYY hh:mm:ss")}
                            allowClear={false}
                            onChange={(_data, period) => {
                                this.datePickerHandler("end",moment(period, "YYYY-MM-DD hh:mm:ss").valueOf());
                            }}
                            picker={"day"}
                        />
                    </div>

                    <div className="col-md-2 text-center">
                        <BaseButton className={"btn-info"}
                                    style={{marginRight: '15px', marginTop: '22px', height: '35px'}}
                                    disabled={(!isNil(filial_code) || !isNil(status)) ? false : true}
                                    handleBtn={this.getFilteredMonitoring}>Поиск</BaseButton>
                    </div>

                </div>
                <div className="row">
                    <div className="col-md-12">
                        {
                            isFetched
                                ?
                                <>
                                    {
                                        !isEmpty(monitoring) ? <>
                                            <BaseTable head={['ID','Филиал Cоде','Документ Номер', 'ИНПС', 'ФИО','Date',"Статус" ]}
                                                       className={"mt-3"}>
                                                {
                                                    monitoring && monitoring.map((requests, index,createdAt) => <tr
                                                        key={index}
                                                        style={{verticalAlign: 'middle'}} onDoubleClick={() => history.push(`/katm/monitoring/view/${get(requests,"id")}`)}>
                                                        <td>{get(requests,'id')}</td>
                                                        <td>{get(requests,"mfo")}</td>
                                                        <td>{get(requests,"passportSerial")}{get(requests,"passportNumber")}</td>
                                                        <td>{get(requests,"nps")}</td>
                                                        <td>{get(requests,"rwd.name_latin")} {get(requests,"rwd.surname_latin")} {get(requests,"rwd.patronym_latin")}</td>
                                                        <td>{moment(get(requests, 'createdAt')).format('DD.MM.YYYY')}</td>
                                                        <td>{get(requests,"status")}</td>
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
        );
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
        getMonitoring: (params) => {
            dispatch({type: actions.GET_MONITORING.REQUEST, payload: params});
        },
    };
};

const mapStateToProps = (state) => {
    return {
        regions: get(state, 'normalize.data.region.result', []),
        filials: get(state, 'normalize.data.filial.result', []),
        monitoring: get(state, "katm.monitoring", []),
        isFetched: get(state, "katm.isFetched", false),
        _meta: get(state, "katm._meta", {}),
        entities: get(state, 'normalize.entities', []),
    };
};
export default withTranslation("bhm_one")(connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(MonitoringContainer)));
