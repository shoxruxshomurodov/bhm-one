import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import React, { Component } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import { connect } from 'react-redux';
import moment from 'moment';
import { get } from 'lodash';
import actions from '../../../actions';
import { DatePicker } from 'antd';
import Loader from '../../../../../components/Loader/Loader';
import Hat from '../../../../../components/Hat/Hat';
const localizer = momentLocalizer(moment);

class CalendarPage extends Component {
	state = {
		period: new Date(),
	};

	componentDidMount() {
		const { getEventsHandler } = this.props;
		const { period } = this.state;
		getEventsHandler(period);
	}
	datePickerHandler = (period) => {
		const { getEventsHandler } = this.props;
		this.setState({ period });
		getEventsHandler(period);
	};
	render() {
		let { events = [], isFetched } = this.props;
		return (
			<>
				<Hat
					name="Кредит портфелининг юкланиш мониторинги"
					desc="АБС дастуридан юкланаётган кредит портфели маълумотлари сони"
				/>
				<div className="page-content" style={{ height: '100%' }}>
					<div className="padding" style={{ height: '100%' }}>
						<DatePicker
							style={{ margin: '10px' }}
							defaultValue={moment(new Date())}
							allowClear={false}
							onChange={(data) => {
								this.datePickerHandler(new Date(data));
							}}
							picker="month"
						/>
						{isFetched ? (
							<BigCalendar
								defaultDate={new Date()}
								defaultView="month"
								events={events}
								style={{ margin: '10px' }}
								views={['month', 'week', 'day']}
								messages={{
									month: 'Месяц',
									day: 'День',
									week: 'Неделя',
									today: 'Сегодня',
									previous: 'Пред.',
									next: 'След.',
								}}
								step={60}
								showMultiDayTimes
								localizer={localizer}
								date={this.state.period}
								onNavigate={(date) => {
									this.setState({ period: date });
								}}
								eventPropGetter={(event, start, end, isSelected) => {
									// console.log(event.controller, 'event.controller');
									console.log(event, 'event');
									let newStyle = {
										backgroundColor: '#03a9fc',
										borderRadius: '0px',
										padding: '0px',
										textAlign: 'center',
										marginTop: '20px',
									};

									if (event.is_controller) {
										newStyle.backgroundColor = '#fcba03';
										newStyle.borderRadius = '0px';
										newStyle.marginTop = '0px';
									}
									// if (event.isWeekend) {
									// 	// newStyle.backgroundColor = '#fc2803';
									// 	// // newStyle.height = '100px';
									// 	// newStyle.borderRadius = '0px';
									// 	// newStyle.marginTop = '0px';
									// }
									return {
										className: 'weekend',
										style: newStyle,
									};
								}}
							/>
						) : (
							<Loader />
						)}
					</div>
				</div>
			</>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		events: get(state, 'problem_credits.events', []),
		isFetched: get(state, 'problem_credits.isFetched', []),
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		getEventsHandler: (period) =>
			dispatch({ type: actions.GET_COLLECTOR_MIGRATE_CALENDAR.REQUEST, payload: { period } }),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(CalendarPage);
