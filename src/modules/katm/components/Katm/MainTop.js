import React from "react";

const MainTop = (client) => {
  const {
    name,
    phone_num,
    address,
    inn,
    birth_date,
    gender,
    pinfl,
    document_serial,
  } = client;
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
          ИДЕНТИФИКАЦИЯ ЗАЁМЩИКА
        </td>
      </tr>
      <tr>
        <td
          style={{ color: "#969696", width: "398px" }}
          colSpan={3}
          id="client_info_1_text"
        >
          Наименование заёмщика:
        </td>
        <td style={{ width: "573px" }} colSpan={4} id="client_info_1">
          <span>{name}</span>
        </td>
      </tr>
      <tr>
        <td
          style={{ color: "#969696", width: "398px" }}
          colSpan={3}
          id="client_info_2_text"
        >
            Дата рождения:
        </td>
        <td style={{ width: "573px" }} colSpan={4} id="client_info_2">
          <span>{birth_date}</span>
        </td>
      </tr>
      <tr>
        <td
          style={{ color: "#969696", width: "398px" }}
          colSpan={3}
          id="client_info_3_text"
        >
            Пол:
        </td>
        <td style={{ width: "573px" }} colSpan={4} id="client_info_3">
          <span>{gender}</span>
        </td>
      </tr>
        <tr>
            <td
                style={{ color: "#969696", width: "398px" }}
                colSpan={3}
                id="client_info_6_text"
            >
                Адрес:
            </td>
            <td style={{ width: "573px" }} colSpan={4} id="client_info_6">
                <span>{address}</span>
            </td>
        </tr>
        <tr>
              <td
                  style={{ color: "#969696", width: "398px" }}
                  colSpan={3}
                  id="client_info_7_text"
              >
                  ПИНФЛ:
              </td>
              <td style={{ width: "573px" }} colSpan={4} id="client_info_7">
                  <span>{pinfl}</span>
              </td>
          </tr>
        <tr>
          <td
              style={{ color: "#969696", width: "398px" }}
              colSpan={3}
              id="client_info_4_text"
          >
              ИНН:
          </td>
          <td style={{ width: "573px" }} colSpan={4} id="client_info_4">
              <span>{inn}</span>
          </td>
        </tr>
        <tr>
              <td
                  style={{ color: "#969696", width: "398px" }}
                  colSpan={3}
                  id="client_info_7_text"
              >
                  Телефонный номер:
              </td>
              <td style={{ width: "573px" }} colSpan={4} id="client_info_7">
                  <span>{phone_num}</span>
              </td>
          </tr>
        <tr>
              <td
                  style={{ color: "#969696", width: "398px" }}
                  colSpan={3}
                  id="client_info_7_text"
              >
                  Данные документа:
              </td>
              <td style={{ width: "573px" }} colSpan={4} id="client_info_7">
                  <span>{document_serial}</span>
              </td>
          </tr>



    </React.Fragment>
  );
};

export default MainTop;
