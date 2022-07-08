import React from "react";
import {
  AiOutlineQuestionCircle,
  AiOutlineMinus,
  AiFillCalendar
} from "react-icons/ai";
import { Badge } from "antd";
import {
  calculatePositionLeft,
  calculateWidth,
  processNoTimeWork
} from "../../../../utils";
import { last, head, isNil, get, isEqual, isEmpty } from "lodash";
import Loader from "../../../../components/Loader";
const Chart = (props) => {
  let { isFetched, drawChart, onlyUser = true } = props;
  return (
    <>
      {!isFetched && <Loader />}
        {drawChart.map((drawing, index) => {
          return (
              <div className="row process-distance">
                <div className="col-lg-3">
                  {onlyUser ? (
                    <div className="process-date">
                      <span>
                        <AiFillCalendar style={{ marginBottom: "5px" }} />{" "}
                        {get(drawing, "data.[0].in.date")}
                      </span>
                      <span>
                        <Badge
                          count={get(drawing, "data.[0].in.week_day")}
                          style={{
                            backgroundColor: "#1ab394",
                            marginBottom: "5px",
                            marginLeft: "30px",
                            borderColor: "#1ab394"
                          }}
                        />
                      </span>
                    </div>
                  ) : (
                    <div className="process-name">
                      <span className="mr-1">{index + 1}.</span>
                      {/* <AiOutlineUser style={{ marginBottom: "2px" }} /> */}
                      <span>{get(drawing, "employee.full_name", "")}</span>
                    </div>
                  )}
                </div>
                <div className="col-lg-9">
                  <div className="process" key={index}>
                    {isEqual(get(drawing, "hours")?.length, 0) && (
                      <AiOutlineMinus size={18} className="process-question" />
                    )}
                    {isEqual(get(drawing, "hours"), 0) && (
                      <AiOutlineQuestionCircle
                        size={18}
                        className="process-question"
                      />
                    )}
                    {!isNil(get(last(drawing.data), "in")) ? (
                      <>
                        <div
                          className="process__bg"
                          style={{
                            left: `${calculatePositionLeft(
                              get(head(drawing.data), "in.time")
                            )}%`,
                            width: `${calculateWidth(
                              get(
                                head(drawing.data),
                                "in.time",
                                get(head(drawing.data), "out.time")
                              ),
                              get(
                                last(drawing.data),
                                "out.time",
                                get(last(drawing.data), "in.time")
                              )
                            )}%`
                          }}
                        ></div>
                        {!isEqual(get(drawing, "hours"), 0) && (
                          <span className="process-in-work mode-text-dark">
                            {get(drawing, "hours")}
                          </span>
                        )}
                      </>
                    ) : (
                      <div
                        className="process__bg"
                        style={{
                          left: `${calculatePositionLeft(
                            get(head(drawing.data), "in.time")
                          )}%`,
                          width: `${calculateWidth(
                            get(
                              head(drawing.data),
                              "in.time",
                              get(head(drawing.data), "out.time")
                            ),
                            get(
                              last(drawing.data),
                              "out.time",
                              get(last(drawing.data), "in.time")
                            )
                          )}%`
                        }}
                      ></div>
                    )}
                    {drawing.data &&
                      drawing.data.map((i, index) => {
                        return (
                          <>
                            {get(i, "in.time") && (
                              <>
                                <span
                                  className="process-entry intime"
                                  style={{
                                    left: `${calculatePositionLeft(
                                      get(i, "in.time")
                                    )}%`
                                  }}
                                >
                                  {get(i, "in.view_time")}
                                </span>
                                <span
                                  className="process-hot-line"
                                  style={{
                                    left: `${calculatePositionLeft(
                                      get(i, "in.time")
                                    )}%`
                                  }}
                                ></span>
                              </>
                            )}
                            {get(i, "out.time") && (
                              <>
                                <span
                                  className="process-exit outtime"
                                  style={{
                                    left: `${calculatePositionLeft(
                                      get(i, "out.time")
                                    )}%`
                                  }}
                                >
                                  {get(i, "out.view_time")}
                                </span>
                                <span
                                  className="process-hot-line"
                                  style={{
                                    left: `${calculatePositionLeft(
                                      get(i, "out.time")
                                    )}%`
                                  }}
                                ></span>
                                {processNoTimeWork(
                                  drawing.data[index],
                                  drawing.data[index + 1]
                                )}
                              </>
                            )}
                          </>
                        );
                      })}
                    <span className="process-entry-text">9:00</span>
                    <span className="process-exit-text">18:00</span>
                  </div>
                </div>
              </div>
          );
        })}
      {isEmpty(drawChart) && (
        <p className="search-data">Маълумот йўқ</p>
      )}
    </>
  );
};

export default Chart;
