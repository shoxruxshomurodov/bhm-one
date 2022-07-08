import React from 'react';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router';
import storage from '../../services/storage';
const ExitHome = (props) => {
	const { history, calcelGoodByeHome } = props;
	Swal.fire({
		title: 'Чиқишга ишончингиз комилми?',
		icon: 'warning',
		backdrop: 'rgba(0,0,0,0.9)',
		background: 'none',
		showCancelButton: true,
		confirmButtonColor: '#448bff',
		cancelButtonColor: '#fff',
		confirmButtonText: 'Ҳа албатта',
		cancelButtonText: 'Ортга қайтиш',
		customClass: {
			title: 'title-color',
			content: 'text-color',
			icon: 'icon-color',
		},
	}).then((result) => {
		if (result.isConfirmed) {
			calcelGoodByeHome();
			history.push('/auth/logout');
			storage.remove('token');
		} else {
			calcelGoodByeHome();
		}
	});
	return <div></div>;
};

export default withRouter(ExitHome);
