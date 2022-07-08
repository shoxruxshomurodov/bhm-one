import React from "react";
import Tabs from "../../../../components/Tab";
import ProgressFilialPage from "./ProgressFilialsPage";
import ProgressRegionsPage from "./ProgressRegionsPage";
import { withTranslation } from "react-i18next";
function NplProgressPage(props) {



    const { t } = props;
    return (
        <>
            <Tabs
                titles={[t("Regions"), t("Filials")]}
                defaultActiveKey={1}
                components={[<ProgressRegionsPage />, <ProgressFilialPage />]}
            />
        </>
    );
}

export default withTranslation("bhm_one")(NplProgressPage);
