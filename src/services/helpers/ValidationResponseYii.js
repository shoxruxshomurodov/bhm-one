class ValidationResponseYii {
	static setErrors = (e, setFieldError) => {
		const data = e.response.data;
		data.map((item) => {
			console.log(item, item.field, item.message);
			setFieldError(item.field, item.message);
		});
	};
}

export default ValidationResponseYii;
