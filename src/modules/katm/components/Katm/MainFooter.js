import React from "react";

const MainFooter = () => {
  return (
    <tr>
      <td style={{ width: "960px", paddingTop: "10px" }} colSpan={7}>
        Примечание:
        <br />
        - Скоринговый балл имеет рекомендательный характер и не может быть
        основанием для выдачи или отказа кредитов;
        <br />
        - Скоринговый балл не охватывает кредитную информацию об обязательствах,
        исполненную (закрытую) более 5 лет назад;
        <br />
        - Оценка скоринг бала производится в диапазоне 0-500. Диапазон разделен
        на 5 классов А, В, С, D, E и каждый класс разделён на 3 уровня;
        <br />
        - Расчёт скоринг бала состоит из идентификационных данных и кредитной
        истории заёмщика полученных от кредитных организаций;
        <br />- Среднемесячный платёж включает в себя расчет исходя из остатков
        основного долга и прогнозного платежа по процентам (аннуитетный); <br />
        - Кредиты в иностранной валюте расчитываются в сумовом эквиваленте по
        курсу ЦБ Руз на дату формирования скоринга. <br />- При изменениях
        расчётов меняется версия скоринга.
      </td>
    </tr>
  );
};

export default MainFooter;