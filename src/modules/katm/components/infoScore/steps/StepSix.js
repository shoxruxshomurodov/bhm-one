import React from "react";
import { withTranslation } from "react-i18next";
import StepSixOne from "./StepSixOne";
import get from "lodash/get";
const StepSix = (props) => {
  const { data } = props;
  const contracts = get(data, "contracts.contract");

  
  return (
    <div>
      <div className="katm-step-row">
        <div className="katm-step-row__num">6.</div>
        <div className="katm-step-row__name">ДОГОВОРА</div>
      </div>
      {contracts &&
        contracts.map((contract, index) => {
          return <StepSixOne contract={contract} index={index + 1} />;
        })}
    </div>
  );
};

export default withTranslation("bhm_one")(StepSix);
