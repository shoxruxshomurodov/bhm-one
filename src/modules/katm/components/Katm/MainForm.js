import React from "react";

const MainForm = ({ tables, average_monthly_payment }) => {
  return (
    <React.Fragment>
      <tr>
        <td
          style={{
            textAlign: "center",
            backgroundColor: "#bdd6ee",
            padding: "5px 0px",
            border: "1px solid #02497f",
            width: "971px",
          }}
          colSpan={7}
        >
          ДОПОЛНИТЕЛЬНАЯ ИНФОРМАЦИЯ
        </td>
      </tr>
      <tr style={{ color: "#969696", fontWeight: "bold" }}>
        <td style={{ border: "1px solid #02497f", width: "23px" }} rowSpan={2}>
          №
        </td>
        <td
          style={{
            border: "1px solid #02497f",
            textAlign: "center",
            width: "375px",
          }}
          colSpan={2}
          rowSpan={2}
        >
          НАИМЕНОВАНИЕ
        </td>
        <td
          style={{
            border: "1px solid #02497f",
            textAlign: "center",
            width: "311px",
          }}
          colSpan={2}
        >
          ОТКРЫТЫЕ
        </td>
        <td
          style={{
            border: "1px solid #02497f",
            textAlign: "center",
            width: "262px",
          }}
          colSpan={2}
        >
          ЗАКРЫТЫЕ
        </td>
      </tr>
      <tr style={{ fontWeight: "bold", color: "#969696" }}>
        <td
          style={{
            border: "1px solid #02497f",
            textAlign: "center",
            width: "177px",
          }}
        >
          КОЛИЧЕСТВО
        </td>
        <td
          style={{
            border: "1px solid #02497f",
            textAlign: "center",
            width: "134px",
          }}
        >
          СУММА
        </td>
        <td
          style={{
            border: "1px solid #02497f",
            textAlign: "center",
            width: "157px",
          }}
        >
          КОЛИЧЕСТВО
        </td>
        <td
          style={{
            border: "1px solid #02497f",
            textAlign: "center",
            width: "105px",
          }}
        >
          СУММА
        </td>
      </tr>
      {tables.map(({ id, name, open, close }) => {
        return (
          <tr>
            <td style={{ border: "1px solid #02497f", width: "23px" }}>{id}</td>
            <td
              style={{ border: "1px solid #02497f", width: "375px" }}
              colSpan={2}
            >
              {name}
            </td>
            <td
              style={{
                border: "1px solid #02497f",
                textAlign: "center",
                width: "177px",
              }}
              id="curr_all_count"
            >
              <span>{open.count}</span>
            </td>
            <td
              style={{
                border: "1px solid #02497f",
                textAlign: "center",
                width: "134px",
              }}
              id="curr_all_amount"
            >
              <span>{open.sum}</span>
            </td>
            <td
              style={{
                border: "1px solid #02497f",
                textAlign: "center",
                width: "157px",
              }}
              id="paid_all_count"
            >
              <span>{close.count}</span>
            </td>
            <td
              style={{
                border: "1px solid #02497f",
                textAlign: "center",
                width: "105px",
              }}
              id="paid_all_amount"
            >
              <span>{close.sum}</span>
            </td>
          </tr>
        );
      })}
      <tr>
        <td style={{ border: "1px solid #02497f", width: "23px" }}>12</td>
        <td style={{ border: "1px solid #02497f", width: "375px" }} colSpan={2}>
          Оповещение
        </td>
        <td
          style={{
            border: "1px solid #02497f",
            textAlign: "left",
            width: "177px",
          }}
          colSpan={4}
        >
          <span id="average_monthly_payment">
            <span>- Среднемесячный платёж: {average_monthly_payment} сум.</span>
          </span>
        </td>
      </tr>
    </React.Fragment>
  );
};

export default MainForm;
