import React from 'react';

const Footer = () => {
	return (
		<table style={{ color: '#969696', paddingTop: '10px', width: '960px' }} id="additional_info">
			<tbody>
				<tr>
					<td>
						Пользователь кредитного отчёта:
						<span id="report_user">
							<span>АКЦИЯДОРЛИК ТИЖОРАТ ХАЛК БАНКИ</span>
						</span>
					</td>
				</tr>
				<tr>
					<td>
						Сотрудник Пользователя, направивший запрос:
						<span id="report_user_name">
							<span>оффлайн</span>
						</span>
					</td>
				</tr>
				<tr>
					<td>
						Кредитная заявка:
						<span id="credit_request">
							<span>№ 2375858 от 29 января 2020</span>
						</span>
					</td>
				</tr>
				<tr>
					<td>
						Запрос Пользователя на получение кредитного отчета:
						<span id="report_request">
							<span>№ 0062020135297264 от 14 мая 2020</span>
						</span>
					</td>
				</tr>
				<tr>
					<td>
						Внимание: Предоставление и использование кредитной информации регулируется Законом
						<br />
						Республики Узбекистан Об обмене кредитной информацией № 301 от 04.10.2011 года.
					</td>
				</tr>
			</tbody>
		</table>
	);
};

export default Footer;
