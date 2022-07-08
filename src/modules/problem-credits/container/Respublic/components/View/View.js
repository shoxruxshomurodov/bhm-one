import React from "react";
import { get } from "lodash";
import Tab from "./Tab";
import Header from "./Header";

const View = (props) => {
  const { loanState } = props;
  return (
    <div className="d-flex flex fixed-content">
      <div className="d-flex flex" id="content-body">
        <div className="d-flex flex-column flex">
          <div className="p-3">
            <div className="toolbar">
              <button
                onClick={() => window.history.back()}
                className="btn btn-sm btn-white"
              >
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
                  className="feather feather-arrow-left"
                >
                  <line x1={19} y1={12} x2={5} y2={12} />
                  <polyline points="12 19 5 12 12 5" />
                </svg>{" "}
              </button>
              <span className="ml-auto">
                Маълумотлар
                <button className="btn btn-sm no-shadow bg-primary-lt mx-1">
                  {get(loanState, "period")}
                </button>
                сана ҳолатига
              </span>
            </div>
          </div>
          <div className="scroll-y mx-3 mb-3 card">
            <Header {...props} />
            <div
              className="row no-gutters"
              style={{ maxHeight: "700px", minHeight: "650px" }}
            >
              <div className="col-md-6 card mb-0">
                <Tab {...props} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;
