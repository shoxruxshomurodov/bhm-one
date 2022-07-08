import React from 'react';
import { Tabs } from 'antd';
import { AiOutlineAreaChart, AiFillCalendar } from 'react-icons/ai';
import { FiUsers } from 'react-icons/fi';
import { Component } from 'react';
const { TabPane } = Tabs;
class Tab extends Component {
	render() {
		const { left, center, right ,findTabIndex} = this.props;
		return (
			<Tabs className="tab-color mode-text-dark" defaultActiveKey="2" onChange={findTabIndex}>
				<TabPane tab={<AiFillCalendar />} key="1">
					{left}
				</TabPane>
				<TabPane tab={<AiOutlineAreaChart size={22} />} key="2">
					{center}
				</TabPane>
				{right && (
					<TabPane tab={<FiUsers size={20} />} key="3">
						{right}
					</TabPane>
				)}
			</Tabs>
		);
	}
}

export default Tab;
