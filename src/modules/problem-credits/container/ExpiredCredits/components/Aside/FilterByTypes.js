import React from 'react';
import classNames from 'classnames';
export default (props) => {
	const { isActive, type, filterBy = () => {} } = props;
	return (
		<ul className="ml-3 left_side_filter_types">
			<li
				className={classNames('mb-1', {
					active_type: isActive === 0 || type === 'all',
				})}
				onClick={(e) => filterBy(e, 0)}
			>
				<span className="mx-2">
					<b className="badge badge-circle sm" style={{ color: '#f7ffa3' }} />{' '}
				</span>
				<span className="nav-text" data-type="all">
				Жами
				</span>
			</li>
			<li
				className={classNames('mb-1', {
					active_type: isActive === 1 || type === 1,
				})}
				onClick={(e) => filterBy(e, 1)}
			>
				<span className="mx-2">
					<b className="badge badge-circle sm" style={{ color: '#cddc39' }} />{' '}
				</span>
				<span className="nav-text" data-type={1}>
					1-30 кунгача
				</span>{' '}
			</li>
			<li
				className={classNames('mb-1', {
					active_type: isActive === 2 || type === 2,
				})}
				onClick={(e) => filterBy(e, 2)}
			>
				<span className="mx-2">
					<b className="badge badge-circle sm" style={{ color: '#ffc107' }} />{' '}
				</span>
				<span className="nav-text" data-type="2">
					31-60 кунгача
				</span>
			</li>
			<li
				className={classNames('mb-1', {
					active_type: isActive === 3 || type === 3,
				})}
				onClick={(e) => filterBy(e, 3)}
			>
				<span className="mx-2">
					<b className="badge badge-circle sm" style={{ color: '#ff9800' }} />{' '}
				</span>
				<span className="nav-text" data-type={3}>
					61-90 кунгача
				</span>
			</li>
			<li
				className={classNames('mb-1', {
					active_type: isActive === 4 || type === 4,
				})}
				onClick={(e) => filterBy(e, 4)}
			>
				<span className="mx-2">
					<b className="badge badge-circle sm" style={{ color: '#ff5722' }} />{' '}
				</span>
				<span className="nav-text" data-type={4}>
					91-180 кунгача
				</span>
			</li>
			<li
				className={classNames('mb-1', {
					active_type: isActive === 5 || type === 5,
				})}
				onClick={(e) => filterBy(e, 5)}
			>
				<span className="mx-2">
					<b className="badge badge-circle sm" style={{ color: ' #795548' }} />{' '}
				</span>
				<span className="nav-text" data-type={5}>
					180 кундан ортик
				</span>
			</li>
		</ul>
	);
};
