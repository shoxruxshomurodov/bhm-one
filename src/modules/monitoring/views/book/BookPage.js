import React, { useEffect, useState } from "react";
import FilterAside from "../../../../components/FilterAside";
import TemplateTable from "../../../../components/TemplateTable";
import Toolbar from "../../../../components/Toolbar";
import Pagination from "../../../../components/Pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import ApiActions from "../../../../services/api/Actions";
import BookScheme from "../../../../schema/Book";
import { get, isEmpty, isEqual } from "lodash";
import Normalizer from "../../../../services/normalizr";
import Loader from "../../../../components/Loader";
import { useHistory } from "react-router-dom";
import classNames from "classnames";
import RegionScheme from "../../../../schema/Regions";
import { withTranslation } from "react-i18next";

function BookPage(props) {
  const { t } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  const [active, setActive] = useState("");
  const [region, setRegion] = useState("");
  const data = useSelector((state) =>
    get(state, "normalize.data.credit-monitoring-books.result", [])
  );
  const isFetchedData = useSelector((state) =>
    get(state, "normalize.data.credit-monitoring-books.isFetched", true)
  );
  const meta = useSelector((state) =>
    get(state, "normalize.data.credit-monitoring-books.result._meta", [])
  );
  const entities = useSelector((state) => get(state, "normalize.entities", []));
  let regions = useSelector((state) =>
    get(state, "normalize.data.regions.result", [])
  );
  regions = get(
    Normalizer.Denormalize(regions, { data: [RegionScheme] }, entities),
    "data",
    []
  );
  const books = get(
    Normalizer.Denormalize(data, { data: [BookScheme] }, entities),
    "data",
    []
  );
  const getAllRegions = () => {
    const storeName = "regions";
    const entityName = "region";
    const scheme = { data: [RegionScheme] };
    dispatch({
      type: ApiActions.GET_ALL.TRIGGER,
      payload: {
        storeName,
      },
    });
    dispatch({
      type: ApiActions.GET_ALL.REQUEST,
      payload: {
        url: "/monitoring/regions",
        config: {},
        scheme,
        storeName,
        entityName,
      },
    });
  };
  const getAllBooks = (params = {}) => {
    const storeName = "credit-monitoring-books";
    const entityName = "book";
    const scheme = { data: [BookScheme] };
    dispatch({
      type: ApiActions.GET_ALL.TRIGGER,
      payload: {
        storeName,
      },
    });
    dispatch({
      type: ApiActions.GET_ALL.REQUEST,
      payload: {
        url: "/monitoring/branches",
        config: {
          params: {
            include: "regionCounts,filialCounts",
            "filter[region_id]": 3,
            ...params,
          },
        },
        scheme,
        storeName,
        entityName,
      },
    });
  };
  const pagination = (page = 1) => {
    getAllBooks({ page, "filter[region_id]": region });
  };
  const onSearch = (search) => {
    getAllBooks({ search, "filter[region_id]": region });
  };
  useEffect(() => {
    getAllBooks();
    getAllRegions();
  }, []);
  return (
    <div className={"d-flex flex fixed-content mt-2"}>
      <FilterAside title={t("Books")}>
        <div className="scrollable hover">
          <div className="sidenav p-2">
            <nav className="nav-active-text-primary" data-nav>
              <ul className="nav">
                <li>
                  <a href="app.user.html#all" data-pjax-state>
                    <span className="nav-text">All</span>
                    <span className="nav-badge">
                      <b className="badge badge-sm badge-pill gd-danger">15</b>
                    </span>
                  </a>
                </li>
                <li>
                  <a href="app.user.html#company" data-pjax-state>
                    <span className="nav-text">Company</span>{" "}
                    <span className="nav-badge">
                      <b className="badge badge-sm badge-pill gd-info">3</b>
                    </span>
                  </a>
                </li>
                <li>
                  <a href="app.user.html#personal" data-pjax-state>
                    <span className="nav-text">Personal</span>
                  </a>
                </li>
                <li>
                  <a href="app.user.html#team" data-pjax-state>
                    <span className="nav-text">Team</span>
                  </a>
                </li>
                <li className="nav-header hidden-folded mt-2">
                  <span className="d-block pt-1 text-sm text-muted">Tags</span>
                </li>
                <li>
                  <a href="app.user.html#client" data-pjax-state>
                    <span className="mx-2">
                      <b className="badge badge-circle sm text-primary" />{" "}
                    </span>
                    <span className="nav-text">Clients</span>
                  </a>
                </li>
                <li>
                  <a href="app.user.html#supplier" data-pjax-state>
                    <span className="mx-2">
                      <b className="badge badge-circle sm text-info" />{" "}
                    </span>
                    <span className="nav-text">Suppliers</span>
                  </a>
                </li>
                <li>
                  <a href="app.user.html#competitor" data-pjax-state>
                    <span className="mx-2">
                      <b className="badge badge-circle sm text-success" />{" "}
                    </span>
                    <span className="nav-text">Competitors</span>
                  </a>
                </li>
                <li>
                  <a href="app.user.html#corp" data-pjax-state>
                    <span className="mx-2">
                      <b className="badge badge-circle sm text-warning" />{" "}
                    </span>
                    <span className="nav-text">Corps</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </FilterAside>

      <div className={"d-flex flex"} id={"content-body"}>
        <div className={"d-flex flex-column flex"} id={"user-list"}>
          <Toolbar classname={"mx-2"}>
            <>
              <select
                style={{ width: "200px" }}
                onChange={(e) => {
                  setRegion(get(e, "target.value"));
                  getAllBooks({ "filter[region_id]": get(e, "target.value") });
                }}
                className="form-control"
              >
                {regions &&
                  regions.map((region) => {
                    return (
                      <option value={get(region, "code")}>
                        {get(region, "name")}
                      </option>
                    );
                  })}
              </select>
              <form className="flex">
                <div className="input-group">
                  <input
                    type="text"
                    onChange={(e) => onSearch(get(e, "target.value"))}
                    className="form-control form-control-theme form-control-sm search"
                    placeholder={t("Search")}
                    required
                  />{" "}
                  <span className="input-group-append">
                    <button
                      className="btn btn-white no-border btn-sm"
                      type="button"
                    >
                      <span className="d-flex text-muted">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={16}
                          height={16}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-search"
                        >
                          <circle cx={11} cy={11} r={8} />
                          <line x1={21} y1={21} x2="16.65" y2="16.65" />
                        </svg>
                      </span>
                    </button>
                  </span>
                </div>
              </form>
            </>
          </Toolbar>
          {isFetchedData ? (
            <TemplateTable
              head={[
                t("ID"),
                t("Филиал"),
                t("Всего книжных полок"),
                t("Заполненные книжные полки"),
                t("Необходимые книжные полки"),
              ]}
            >
              {books &&
                books.map((book) => {
                  return (
                    <tr
                      key={get(book, "id")}
                      className={classNames(
                        "v-middle cursor-pointer text-hover",
                        {
                          active: isEqual(get(book, "id"), active),
                        }
                      )}
                      onClick={() => setActive(get(book, "id"))}
                      onDoubleClick={() =>
                        history.push(
                          `/credit-monitoring/book/view/${get(book, "id")}`
                        )
                      }
                    >
                      <td className={"text-muted"}>{get(book, "id")}</td>
                      <td className={"text-muted "}>
                        {get(book, "code")}-{get(book, "name")}
                      </td>
                      <td className={"text-muted "}>
                        <div>
                          <span className={"d-block"}>
                            {t("Filial")} : {get(book, "filialCounts.total")}
                          </span>
                          <span>
                            {t("Region")} : {get(book, "regionCounts.total")}
                          </span>
                        </div>
                      </td>
                      <td className={"text-muted"}>
                        <div>
                          <span className={"d-block"}>
                            {t("Filial")} : {get(book, "filialCounts.filled")}
                          </span>
                          <span>
                            {t("Region")} : {get(book, "regionCounts.filled")}
                          </span>
                        </div>
                      </td>
                      <td className={"text-muted"}>
                        <div>
                          <span className={"d-block"}>
                            {t("Filial")} : {get(book, "filialCounts.required")}
                          </span>
                          <span>
                            {t("Region")} : {get(book, "regionCounts.required")}
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </TemplateTable>
          ) : (
            <Loader />
          )}
          {!isEmpty(books) && isFetchedData && (
            <div className={"px-3 py-3 mt-auto"}>
              <Pagination meta={meta} onChange={pagination} />
            </div>
          )}
          {isEmpty(books) && isFetchedData && (
            <div className="no-result card mx-3 mt-5">
              <div className="p-4 text-center">{t("No Results")}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default withTranslation("bhm_one")(BookPage);
