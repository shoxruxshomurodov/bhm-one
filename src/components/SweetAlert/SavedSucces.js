import React from 'react';
import Swal from 'sweetalert2';
const SavedSucces = () => {
	setTimeout(() => {
		Swal.fire({
			position: 'center',
			icon: 'success',
			backdrop: 'rgba(0,0,0,0.9)',
			background: 'none',
			title: 'Успешно загружено',
			showConfirmButton: false,
			timer: 1500,
			customClass: {
				title: 'title-color',
			},
		});
	}, 700);
	return <div></div>;
};

export default SavedSucces;
