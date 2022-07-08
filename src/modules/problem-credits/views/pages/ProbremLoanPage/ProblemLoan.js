import React from 'react';
import { Link } from 'react-router-dom';
const ProblemLoan = (props) => {
	const { title, description, color, main_sum, percent_sum, type } = props; //main_sum_percent, percent_sum_percent,
	return (
		<div className="alert py-4" style={{ backgroundColor: `${color}` }}>
			<div className="col-md-12 d-flex">
				<div className="col-md-4">
					<div>
						<div>
							<h5 className="alert-heading">{title}</h5>
							<p>{description}</p>
						</div>
					</div>
					<div>
						<Link to={`/view-problem-credit/users-list/${type}`} className="btn btn-white mx-1">
							Батафсил
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width={16}
								height={16}
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth={2}
								strokeLinecap="round"
								strokeLinejoin="round"
								className="feather feather-arrow-right"
							>
								<line x1={5} y1={12} x2={19} y2={12} />
								<polyline points="12 5 19 12 12 19" />
							</svg>
						</Link>
					</div>
				</div>
				<div className="col-md-8 d-flex align-items-center">
					<div
						className="card flex"
						data-sr-id={11}
						style={{
							visibility: 'visible',
							transform: 'none',
							opacity: 1,
							transition: 'none 0s ease 0s',
						}}
					>
						<div className="card-body">
							<div className="row row-sm">
								<div className="col-sm-6">
									<div className="row row-sm">
										<div className="col-8 text-center">
											<div className="text-dark  text-md">{main_sum} сўм</div>
											<small className="text-dark">Муддатида сўндирилмаган кредит</small>
										</div>
										{/* <div className="col-6 text-center">
											<div className="text-dark text-md ">{main_sum_percent} %</div>
											<small className="text-dark">Улуши</small>
										</div> */}
									</div>
								</div>
								<div className="col-sm-6">
									<div className="row row-sm">
										<div className="col-8 text-center">
											<div className="text-dark  text-md">{percent_sum} сўм</div>
											<small className="text-dark">Муддатида сўндирилмаган фоиз</small>
										</div>
										{/* <div className="col-6 text-center">
											<div className="text-dark  text-md">{percent_sum_percent} %</div>
											<small className="text-dark">Улуши</small>
										</div> */}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProblemLoan;
