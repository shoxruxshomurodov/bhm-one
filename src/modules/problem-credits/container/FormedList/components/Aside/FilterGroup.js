import React from "react";
import Select from "../../../../../../components/Select/Select";
import Button from "../../../../../../components/Common/Button";
import WithUser from "../../../../../../services/auth/rbac/WithUser";
import config from "../../../../../../config";
import Utils from "../../../../../../services/helpers/Utils";
const FilterGroup = (props) => {
  const {
    regions,
    filials,
    sendToApi,
    filterByRegion,
    filterByFilial,
    region_id,
    filial_id
  } = props;
  return (
    <div className="row">
      <WithUser>
        {({ userCan }) => {
          return (
            <>
              {Utils.userCanStyle(userCan, [config.ROLES.COLLECTOR_ADMIN]) && (
                <>
                  {filterByRegion && (
                    <div className={`col-md-12`}>
                      <Select
                        title="Регион:"
                        placeholder="Выберите регион"
                        options={regions}
                        filterBy={filterByRegion}
                        index={region_id}
                      />
                    </div>
                  )}
                  {filterByFilial && (
                    <div className={`col-md-12 mt-2`}>
                      <Select
                        title="Филлиал:"
                        placeholder="Выберите филлиал"
                        options={filials}
                        filterBy={filterByFilial}
                        index={filial_id}
                      />
                    </div>
                  )}
                </>
              )}
            </>
          );
        }}
      </WithUser>

      <div
        className="col-md-12"
        style={{ display: "flex", alignItems: "flex-end" }}
      >
        <Button
          text="Поиск"
          className="btn-primary w-100 mt-3"
          sendToApi={sendToApi}
        />
      </div>
    </div>
  );
};

export default FilterGroup;
