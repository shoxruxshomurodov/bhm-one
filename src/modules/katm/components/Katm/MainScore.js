import React from "react";
import ScoreIndicator from "./ScoreIndicator/ScoreIndicator";
const MainScore = (score) => {
  const {
    score_point,
    score_class,
    score_level,
    score_date,
    score_status,
    score_version,
  } = score;
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
          СКОРИНГОВЫЙ БАЛЛ ЗАЁМЩИКА
        </td>
      </tr>
      <tr>
        <td colSpan={3}></td>
        <td
          style={{ width: "311px", textAlign: "center" }}
          colSpan={2}
          rowSpan={5}
        >
          <ScoreIndicator score_point={score_point} />
        </td>
        <td style={{ width: "262px" }} colSpan={2} rowSpan={5}>
          <div
            style={{
              border: "1px solid #2f56e6",
              borderRadius: "32px",
              width: "130px",
              margin: "auto",
              padding: "10px",
            }}
          >
            <div
              style={{ textAlign: "center", fontSize: "35px" }}
              id="score_level_code"
            >
              <span>{score_class}</span>
            </div>
            <div
              style={{ textAlign: "center", fontSize: "15px" }}
              id="score_level_desc"
            >
              <span>{score_status}</span>
            </div>
          </div>
        </td>
      </tr>
      <tr>
        <td style={{ color: "#969696", width: "202px" }} colSpan={2}>
          Скоринговый балл:
        </td>
        <td style={{ width: "196px" }} id="score_point">
          <span>{score_point}</span>
        </td>
      </tr>
      <tr>
        <td style={{ color: "#969696", width: "202px" }} colSpan={2}>
          Класс оценки:
        </td>
        <td style={{ width: "196px" }} id="score_level_info">
          <span>
            {score_class}, {score_level}
          </span>
        </td>
      </tr>
      <tr>
        <td style={{ color: "#969696", width: "202px" }} colSpan={2}>
          Время формирования:
        </td>
        <td style={{ width: "196px" }} id="score_date">
          <span>{score_date}</span>
        </td>
      </tr>
      <tr>
        <td style={{ color: "#969696", width: "202px" }} colSpan={2}>
          Версия скоринга:
        </td>
        <td style={{ width: "196px" }} id="score_version">
          <span>{score_version}</span>
        </td>
      </tr>
    </React.Fragment>
  );
};

export default MainScore;
