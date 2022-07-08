import React from "react";
import { isEmpty, isNil, isEqual } from "lodash";
import classNames from "classnames";
import Select from "react-select";

const options = [
  { value: "2", label: "Юқорида турувчи текст" },
  { value: "1", label: "Aйланиб турувчи текст" }
];

const Form = ({
                writeMarque,
                uploadMarquee,
                marquee,
                selectType,
                inProcess
              }) => {
  return (
      <div className="card">
        <div className="card-header upload_marquee_list">
          <strong>Текст Юклаш</strong>
          <Select
              className={classNames(
                  "form-control-sm  mode-text-light marquee_select"
              )}
              onChange={(value) => {
                if (isNil(value)) {
                  selectType("");
                } else selectType(value.value);
              }}
              options={options}
              isClearable="true"
          />
        </div>

        <div className="card-body">
          <>
            <div className="form-group">
              <input
                  type="text"
                  className="form-control"
                  placeholder="Текст"
                  onChange={writeMarque}
                  value={marquee}
              />{" "}
            </div>

            <button
                type="submit"
                className="btn btn-primary"
                onClick={uploadMarquee}
                disabled={isEmpty(marquee)}
            >
              Юклаш
              {isEqual(inProcess, "marquee") && (
                  <div class="spinner-border spinner-border-sm text-light ml-2"></div>
              )}
            </button>
          </>
        </div>
      </div>
  );
};

export default Form;
