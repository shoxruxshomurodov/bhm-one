import React from "react";
import {has, get, isEqual} from "lodash";
import {withTranslation} from "react-i18next";

class Utils {
    static isEqualsArrsAttr = (arr1, arr2, attrs) => {
        let eqsCount = 0;

        // eslint-disable-next-line array-callback-return
        attrs.map((attr) => {
            if (isEqual(get(arr1, attr), get(arr2, attr))) {
                eqsCount++;
            }
        });

        return eqsCount === attrs.length;
    };

    static hideNumber = (
        string,
        replaceTo = "*",
        elemsHide = 7,
        sliceFromback = 2
    ) => {
        var result = string.match(
            /^(\(?\+?\d{1,2}\)? ?\(?\d{1,3}\)? ?\d+\-? ?\d+\-? ?\d+)$/
        );
        if (result !== null) {
            // тут мы выдергиваем n элементов после среза x
            const regex = new RegExp(
                `((\\(?\\ ?\\-?\\d\\ ?\\-?\\)?){${elemsHide}})((\\ ?\\-?\\d\\ ?\\-?){${sliceFromback}}$)`,
                "gm"
            );

            let m;
            while ((m = regex.exec(string)) !== null) {
                if (m.index === regex.lastIndex) {
                    regex.lastIndex++;
                }

                const forRex = m[1];
                const str = m[1].replace(/(\d)/gm, replaceTo);
                const lasts = m[3];
                const full = string;
                const noBack = full.slice(0, -lasts.length).slice(0, -forRex.length);
                let out = noBack + "" + str + "" + lasts;
                out =
                    "+" +
                    full[0] +
                    full[1] +
                    full[2] +
                    " " +
                    full[3] +
                    full[4] +
                    " *** ** " +
                    lasts;
                return out;
            }
            return string;
        } else {
            return string;
        }
    };

    static hasAccess = ({roles = [], can = "", cant = "", exceptCant = ""}) => {
        let getAccessRoles = can.toString() === "*";
        let cantAccessRoles = cant.toString() === "*";
        let exceptCantAccessRoles = exceptCant.toString() === "*";
        const itemsRole = can
            .toString()
            .replace(" ", "")
            .trim()
            .split(",");
        const itemsRoleCant = cant
            .toString()
            .replace(" ", "")
            .trim()
            .split(",");
        const itemsRoleExceptCant = exceptCant
            .toString()
            .replace(" ", "")
            .trim()
            .split(",");

        if (Array.isArray(itemsRole)) {
            itemsRole.map((value) => {
                if (getAccessRoles === false && has(roles, value) === true) {
                    getAccessRoles = true;
                }
            });
        }
        if (Array.isArray(itemsRoleCant)) {
            itemsRoleCant.map((value) => {
                if (cantAccessRoles === false && has(roles, value) === true) {
                    cantAccessRoles = true;
                }
            });
        }
        if (Array.isArray(itemsRoleExceptCant)) {
            itemsRoleExceptCant.map((value) => {
                if (exceptCantAccessRoles === false && has(roles, value) === true) {
                    exceptCantAccessRoles = true;
                }
            });
        }
        return getAccessRoles;
    };
    static userCanStyle = (userCan, can, cant = "", exceptCant = "") => {
        return userCan(can, cant, exceptCant);
    };

    static getMonthName = (month) => {
        switch (month) {
            case '01':
                return 'YANVAR';
            case '02':
                return 'FEVRAL';
            case '03':
                return 'MART';
            case '04':
                return 'APRIL';
            case '05':
                return 'MAY';
            case '06':
                return 'IYUN';
            case '07':
                return 'IYUL';
            case '08':
                return 'AVGUST';
            case '09':
                return 'SENTYABR';
            case '10':
                return 'OKTYABR';
            case '11':
                return 'NOYABR';
            case '12':
                return 'DEKABR';
            default:
                return '';
        }
    };
    static removeDayStart = (day) => {
        if (day[0] && day[0] == '0') {
            return day.substring(1);
        }
        return day;
    };

    static identifyType = (type, typeOf) => {
        if (isEqual(type, "J") && isEqual(typeOf, 11)) {
            return {
                type: 'Я',
                color: "gd-primary"
            }
        } else if (isEqual(type, "J") && !isEqual(typeOf, 11)) {
            return {
                type: 'Ю',
                color: "gd-warning"
            }
        } else if (isEqual(type, "P")) {
            return {
                type: 'Ж',
                color: "gd-info"
            }
        }
    };

    static identifyStatus = (status) => {
        switch (status) {
            case 1:
                return "Дастлабки талаб қилинадиган хужжатлар";
            case 0:
                return "Кредит чиқарилиши учун зарур хужжатлар"
        }
    }
    static identifyLoanStatus = (code, title) => {
        switch (code) {
            case 0:
                return <span className={"badge badge-success text-uppercase"}>{title}</span>;
            case 3:
                return <span className={"badge badge-info text-uppercase"}>{title}</span>;
            case 5:
                return <span className={"badge badge-danger text-uppercase"}>{title}</span>;
            case 7:
                return <span className={"badge badge-success text-uppercase"}>{title}</span>;
            case 2:
                return <span className={"badge badge-danger text-uppercase"}>{title}</span>
        }
    }
    static findLoanStatus = (title) => {
        switch (title) {
            case "new":
                return <span className={"w-56 avatar circle gd-success text-uppercase"}>{(title)}</span>;
            case "completed":
                return <span className={"w-56 avatar circle gd-info text-uppercase"}>{(title)}</span>;
            case "refused":
                return <span className={"w-56 avatar circle gd-danger text-uppercase"}>{(title)}</span>;
            case "confirmed":
                return <span className={"w-56 avatar circle gd-success text-uppercase"}>{(title)}</span>;
            case "expired":
                return <span className={"w-56 avatar circle gd-danger text-uppercase"}>{(title)}</span>
        }
    }
    static findStatus = (title) => {
        switch (title) {
            case "new":
                return "gd-warning";
            case "completed":
                return "gd-info";
            case "refused":
                return "gd-danger";
            case "confirmed":
                return "gd-success";
            case "expired":
                return "gd-danger"
        }
    }
}

export default Utils;
