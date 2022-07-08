import React from 'react';
import { Tabs } from 'antd';
import classNames from 'classnames';
const { TabPane } = Tabs;

export default (props) => {
	const {
		titles = ['Бириктирилмаган кредитлар', 'Бириктирилган кредитлар', 'Ходимлар рўйхати'],
		defaultActiveKey = 1,
		components = [],
		findTabIndex = () => {},
		tab_index,
		classNames
	} = props;
	return (
		<Tabs defaultActiveKey={defaultActiveKey} activeKey={tab_index} className={classNames} onChange={findTabIndex}>
			{titles &&
				titles.map((title, index) => {
					return (
						<TabPane tab={title} key={index + 1}>
							{components[index]}
						</TabPane>
					);
				})}
		</Tabs>
	);
};
