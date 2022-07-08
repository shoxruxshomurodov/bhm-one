import React from "react";
import Hat from "../../../../components/Hat/Hat";
import TabNav from "../Tabs/TabNav";
import { withTranslation } from "react-i18next";

const TabsLayoutSms = ({ children, t }) => {
  return (
    <div>
      <Hat name={t("Send SMS")} />
      <div className="page-content">
        <div className="padding">
          <TabNav />
          <div className="pt-3">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default withTranslation("bhm_one")(TabsLayoutSms);
