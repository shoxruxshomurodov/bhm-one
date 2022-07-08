import React from "react";
import Select from "../../../../../../components/Select/Select";
import Button from "../../../../../../components/Common/Button";
import Input from "../../../../../../components/Input/Input";
import { DatePicker } from "antd";
import WithUser from "../../../../../../services/auth/rbac/WithUser";
import config from "../../../../../../config";
import Utils from "../../../../../../services/helpers/Utils";
import moment from "moment";
const FilterGroup = (props) => {
  const {
    regions = [],
    filials = [],
    sendToApi = () => {},
    filterByRegion,
    filterByFilial,
    filterByLoanId,
    filterByPeriod,
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
                  <div className={`col-md-12`}>
                    <Select
                      title="Регион:"
                      placeholder="Выберите регион"
                      options={regions}
                      filterBy={filterByRegion}
                      index={region_id}
                    />
                  </div>
                  <div className={`col-md-12 mt-2`}>
                    <Select
                      title="Филлиал:"
                      placeholder="Выберите филлиал"
                      options={filials}
                      filterBy={filterByFilial}
                      index={filial_id}
                    />
                  </div>
                </>
              )}
            </>
          );
        }}
      </WithUser>
      <div className={`col-md-12 mt-2`}>
        <small>
          <b>Период</b>
        </small>
        <DatePicker
          className="w-100"
          defaultValue={moment(new Date(), "YYYY-MM-DD")}
          format={"YYYY-MM-DD"}
          allowClear={false}
          onChange={(_data, period) => {
            filterByPeriod(period);
          }}
          picker={"day"}
        />
      </div>
      <div className="col-md-12 mt-2">
        <Input title="Лоан ид:" filterBy={filterByLoanId} />
      </div>
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
