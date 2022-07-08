import React from "react";
import Moment from "moment";
import { isNaN, get, isEqual, isNull } from "lodash";
import ReactTooltip from "react-tooltip";
const calculateSeconds = (time) => {
  return (
    Moment(time, "HH:mm:ss").hours() * 3600 +
    Moment(time, "HH:mm:ss").minutes() * 60 +
    Moment(time, "HH:mm:ss").seconds()
  );
};
const calculateWidth = (start, end) => {
  let calsWidth = (calculateSeconds(end) - calculateSeconds(start)) / 864;
  return calsWidth;
};
const calculatePositionLeft = (time) => {
  const position_left = calculateSeconds(time) / 864;
  return position_left;
};
const calcworkTimeForTable = (start, end) => {
  let calcInHour = Math.abs(Moment(start, "HH:mm").hours());
  let calcInMinute = Math.abs(Moment(start, "HH:mm").minutes());
  let calcOutHour = Math.abs(Moment(end, "HH:mm").hours());
  let calcOutMinute = Math.abs(Moment(end, "HH:mm").minutes());
  let calsHour = calcOutHour - calcInHour;
  let calsMinute = Math.abs(calcInMinute - calcOutMinute);
  if (isNaN(calcOutHour)) {
    return "-:-";
  }
  return `${calsHour} : ${calsMinute}`;
};

const calcworkTimeForChart = (itemDate, getMonthlyWorkHours) => {
  for (const [key, value] of Object.entries(getMonthlyWorkHours)) {
    if (itemDate === key) return value;
  }
};

const processNoTimeWork = (OUT, IN) => {
  return (
    <>
      <span
        className="process-hide-dont-exit"
        style={{
          left: `${calculatePositionLeft(get(OUT, "out.time"))}%`,
          width: `${calculateWidth(get(OUT, "out.time"), get(IN, "in.time"))}%`
        }}
      ></span>
    </>
  );
};

const giveColorTableHead = (key, value) => {
  switch (value) {
    case "H":
      return <td className="table-day holiday-day">{key}</td>;
    case "V":
      return <td className="table-day weekend-day">{key}</td>;
    case "E":
      return <td className="table-day subbotnik-day">{key}</td>;
    case "O":
      return <td className="table-day workvacation-day">{key}</td>;
    case "U":
      return <td className="table-day scientistvacation-day">{key}</td>;
    case "I":
      return <td className="table-day warriorvacation-day">{key}</td>;
    case "B":
      return <td className="table-day hospital-day">{key}</td>;
    case "D":
      return <td className="table-day maternity-day">{key}</td>;
    case "K":
      return <td className="table-day businesstrips-day">{key}</td>;
    case "S":
      return <td className="table-day withoutcontent-day">{key}</td>;
    case "C":
      return <td className="table-day withcontent-day">{key}</td>;
    case "P":
      return <td className="table-day  other-day">{key}</td>;
    case "N":
      return <td className="table-day vacation-day">{key}</td>;
    default:
      return <td className="table-day ">{key}</td>;
  }
};

const giveColorTableBody = (
  value,
  openReasonModaLEmployee,
  index,
  item,
  status,
  comment,
  i,
  old_hours,
  open,
  color
) => {
  switch (value) {
    case "H":
      return <td className="table-day holiday-day">H</td>;
    case "V":
      return <td className="table-day weekend-day">V</td>;
    case "E":
      return <td className="table-day subbotnik-day">E</td>;
    case "O":
      return <td className="table-day workvacation-day">O</td>;
    case "U":
      return <td className="table-day scientistvacation-day">U</td>;
    case "I":
      return (
        <td className="table-day mode-text-dark warriorvacation-day">I</td>
      );
    case "B":
      return <td className="table-day hospital-day">B</td>;
    case "D":
      return <td className="table-day maternity-day">D</td>;
    case "K":
      return <td className="table-day  businesstrips-day">K</td>;
    case "S":
      return <td className="table-day withoutcontent-day">S</td>;
    case "C":
      return <td className="table-day withcontent-day">C</td>;
    case "P":
      return <td className="table-day other-day">P</td>;
    case "N":
      return <td className="table-day vacation-day">N</td>;
    default:
      return (
        <>
          {!isNull(comment) ? (
            <td
              onClick={() =>
                open &&
                openReasonModaLEmployee(
                  index + 1,
                  value,
                  item.employee.full_name,
                  item.employee.tab_num
                )
              }
              className="table-day"
              data-tip={true}
              data-for={"table_tooltip_" + i + "_" + index}
            >
              {/* {isEqual(status, 1) && (
                <span
                  style={{ borderTop: `18px solid ${color}` }}
                  // className={isEqual(status, 1) && "sticker"}
                  className="sticker"
                />
              )} */}
							 <span
                  style={{ borderTop: `18px solid ${color}` }}
                  // className={isEqual(status, 1) && "sticker"}
                  className="sticker"
                />
              {value}
            </td>
          ) : (
            <td
              onClick={() =>
                open &&
                openReasonModaLEmployee(
                  index + 1,
                  value,
                  item.employee.full_name,
                  item.employee.tab_num
                )
              }
              className="table-day mode-text-dark "
            >
              {/* {isEqual(status, 1) && (
                <span className={isEqual(status, 1) && "sticker"} />
              )} */}
							<span className='sticker' />
              {value}
            </td>
          )}
          {!isNull(comment) && (
            <ReactTooltip id={"table_tooltip_" + i + "_" + index} place="top">
              <b>причина :</b> <span className="react_tooltip">{comment}</span>
              <br />
              <b>старые часы : </b> <span>{old_hours}</span>
            </ReactTooltip>
          )}
        </>
      );
  }
};
export {
  calculateWidth,
  calculatePositionLeft,
  calcworkTimeForTable,
  calcworkTimeForChart,
  processNoTimeWork,
  giveColorTableHead,
  giveColorTableBody
};
