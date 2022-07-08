import React, { Component } from 'react';
import Header from './Header';
import Main from './Main.js';
import Footer from './Footer';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import {get} from "lodash/object";
import BaseTable from "../../../../components/BaseTable";
import {withRouter} from "react-router";
import moment from "moment";

class Wrapper extends Component {
	render() {
		const {rwd,monitoringById,monitoring,history} = this.props;
		return (
			<div className={"row"}>
				<div className={"col-lg-8"}>
					<div
						id="ckoring_k"
						style={{
							margin: 'auto',
							width: '960px',
							lineHeight: 'normal',
							backgroundColor: '#fff',
							padding: '10px',
						}}
					>
						<>
							<Header {...this.props} />
							<Main {...this.props} />
							<Footer {...this.props} />
						</>
					</div>
				</div>

				<div className={"col-lg-4"}>
					<div className={"card animate slideInRight"}>
						<div className={"card-body shadow-md"}>
							<div className={"row"}>
								<div className={"col-lg-5"}>
									<strong>{"Birth country"}: </strong>
									<span>{get(rwd, 'birth_country')}</span>
								</div>

								<div className={"col-lg-5"}>
									<strong>{"Birth date"}: </strong>
									<span>{get(rwd, 'birth_date')}</span>
								</div>

								<div className={"col-lg-5"}>
									<strong>{"Birth place"}: </strong>
									<span>{get(rwd, 'birth_place')}</span>
								</div>

								<div className={"col-lg-5"}>
									<strong>{"Date begin document"}: </strong>
									<span>{get(rwd, 'date_begin_document')}</span>
								</div>

								<div className={"col-lg-5"}>
									<strong>{"Date end document"}: </strong>
									<span>{get(rwd, 'date_end_document')}</span>
								</div>

								<div className={"col-lg-5"}>
									<strong>{"Document"}: </strong>
									<span>{get(rwd, 'document')}</span>
								</div>

								<hr style={{width: '80%'}}/>

								<div className={"col-lg-10"}>
									<strong>{"Doc give place"}: </strong>
									<span>{get(rwd, 'doc_give_place')}</span>
								</div>
								<div className={"col-lg-10"}>
									<strong>{"Status"}: </strong>
									<button className={"btn btn-success"} disabled={"none"}>{get(monitoringById,'status')}</button>
								</div>

								<div className={"col-lg-5"}></div>
								<hr style={{width: '80%'}}/>

								<div className={"col-lg-5"}>
									<strong>{"First name"}: </strong>
									<span>{get(rwd, 'name_latin')}</span>
								</div>

								<div className={"col-lg-5"}>
									<strong>{"Last name"}: </strong>
									<span>{get(rwd, 'surname_latin')}</span>
								</div>

								<div className={"col-lg-5"}>
									<strong>{"Middle name"}: </strong>
									<span>{get(rwd, 'patronym_latin')}</span>
								</div>
							</div>
						</div>
					</div>

					<BaseTable head={['ID','Филиал Cоде','Документ Номер', 'ИНПС', 'ФИО','Date',"Статус" ]}
							   className={"mt-3 animate slideInRight"}>
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
				</div>
			</div>

		);
	}
}

export default withTranslation('bhm_one')(connect(null, null)(withRouter(Wrapper)));
