import React, {useState} from 'react';
import {get, isEqual} from "lodash";
import classNames from "classnames";
import {useHistory} from "react-router";

function ItemBody(props) {
    const [isActive, setIsActive] = useState(false);
    const {data} = props;
    const history = useHistory();
    return (
        <tbody>
        {data && data.map(result => {
            return (
                <tr
                    key={get(result, "id")}
                    className={classNames("v-middle cursor-pointer text-hover", {
                        active: isEqual(get(result, "id"), isActive)
                    })}
                    onClick={() => setIsActive(get(result, "id"))}
                    onDoubleClick={() => history.push(`/credit-monitoring/documents/update/${get(result, "id")}`)}
                >
                    <td className={"text-muted"}>{get(result, "id")}</td>
                    <td
                    >
                        <a className="item-title text-color">{get(result, "title")}</a>
                        {get(result, "children") && get(result, "children")?.map(children => {
                            return (
                                <div className="item-except text-muted text-sm h-1x">{get(children, "title")}</div>
                            )
                        })}
                    </td>
                    <td className={"text-muted"}>{isEqual(get(result, "status"), 0) ? "Дастлабки талаб қилинадиган хужжатлар" : "Кредит чиқариш учун зарур хужжатлар"}</td>
                </tr>
            )
        })}
        </tbody>
    );
}

export default ItemBody;