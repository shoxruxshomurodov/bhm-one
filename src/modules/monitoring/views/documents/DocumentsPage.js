import React from 'react';
import ListView from "../../../../containers/ListView/ListView";
import DocumentScheme from "../../../../schema/Document";
import {withTranslation} from "react-i18next";
import Toolbar from "./components/Toolbar";
import Pagination from "../../../../components/Pagination/Pagination";
import FilterAside from "./components/FilterAside";
import ItemHead from "./components/Table/ItemHead";
import ItemBody from "./components/Table/ItemBody";
import {useParams} from "react-router";

function DocumentsPage() {
    const {encoded} = useParams();
    return (
        <ListView
            storeName="credit-monitoring-documents"
            entityName="document"
            scheme={{data: [DocumentScheme]}}
            CustomPagination={Pagination}
            CustomToolbar={Toolbar}
            CustomAsideFilter={FilterAside}
            ComponentHead={ItemHead}
            ComponentBody={ItemBody}
            encoded={encoded}
            params={{
                include: "children",
                "filter[is_deleted]": 0,
            }}
            url={"/monitoring/document"}
            customUrl={"credit-monitoring/documents"}
        />
    );
}

export default withTranslation("bhm_one")(DocumentsPage);
