import {
  Col,
  notification,
  Select,
  Table,
  PageHeader,
  Input,
  Button,
  Row,
} from "antd";
import { get, head, isNil, isEqual } from "lodash";
import {
  CloudDownloadOutlined,
  CloudUploadOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ApiActions from "../../../../services/api/Actions";
import File from "../../../../schema/File";
import Normalizer from "../../../../services/normalizr";
import { withTranslation } from "react-i18next";
import SkeletonLoader from "../../../../components/SkeletonLoader/SkeletonLoader";
import Moment from "react-moment";
import { useRef } from "react";
import Dropzone from "react-dropzone";
import { request } from "../../../../services/api";
import { RefreshCw } from "react-feather";
import { FcRefresh } from "react-icons/all";
import Column from "antd/lib/table/Column";

const Files = ({ id, loadTask, t, isReadOnly }) => {
  const openRef = useRef();
  const { Option } = Select;
  const dispatch = useDispatch();
  const [fileList, setFileList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [docTypeId, setDocTypeId] = useState(null);
  const [checkDocTypeId, setCheckDocTypeId] = useState(false);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [perPage, setPerPage] = useState(1);

  const entities = useSelector((state) => get(state, "normalize.entities", {}));
  const isFetchedFilesTypes = useSelector((state) =>
    get(state, "normalize.data.state-file-types.isFetched")
  );
  let resultStateFileTypes = useSelector((state) =>
    get(state, "normalize.data.state-file-types.result", [])
  );
  resultStateFileTypes = Normalizer.Denormalize(
    resultStateFileTypes,
    [File],
    entities
  );

  const files = resultStateFileTypes?.map((result) => result);
  console.log(files, "FIlees");
  const file = files?.map((item) => item.files);
  const firstStep = file[0];

  console.log(firstStep, "firstStep");

  const paginationCurrent = useSelector((state) =>
    get(state, "normalize.data.state-file-types.result._meta.currentPage")
  );
  const paginationPageSize = useSelector((state) =>
    get(state, "normalize.data.state-file-types.result._meta.perPage")
  );
  const paginationTotal = useSelector((state) =>
    get(state, "normalize.data.state-file-types.result._meta.totalCount")
  );

  const getFileTypes = (params) => {
    dispatch({
      type: ApiActions.GET_ALL.TRIGGER,
      payload: {
        storeName: "state-file-types",
        entityName: "file",
      },
    });
    dispatch({
      type: ApiActions.GET_ALL.REQUEST,
      payload: {
        url: `/monitoring/process-task/task-uploaded-files-group/${id}`,
        config: {
          params: {
            include: "file.src,canUpload,type",
            sort: "-created_at",
          },
        },
        scheme: [File],
        perPage: "100",
        storeName: "state-file-types",
        entityName: "file",
      },
    });
  };

  const refreshTask = (...params) => {
    setIsLoading(true);
    dispatch({
      type: ApiActions.GET_ALL.TRIGGER,
      payload: {
        storeName: "state-file-types",
        entityName: "file",
      },
    });
    dispatch({
      type: ApiActions.OPERATION_UPDATE.REQUEST,
      payload: {
        url: `/monitoring/process-task/reload-files/${id}`,
        config: {
          params: {
            id,
          },
        },
        cb: {
          success: (nData, data) => {
            notification["success"]({
              message: "Успешно",
              description: "Создано",
              placement: "topRight",
            });
            setIsLoading(false);
            getFileTypes();
          },
          fail: (e) => {
            const data = get(e, "response.data", []);
            data.map((item) => {
              notification["error"]({
                message: "Ошибка",
                description: item.message,
                placement: "topRight",
              });
            });
            setIsLoading(false);
            getFileTypes();
          },
        },
        scheme: { data: [File] },
        storeName: "state-file-types",
        entityName: "file",
      },
    });
  };
  const uploadFile = (acceptedFiles, type_id) => {
    setIsLoading(true);
    const formData = new FormData();
    const [file] = acceptedFiles;
    formData.append("files", file);
    formData.append("type_id", type_id);
    request
      .post(`/monitoring/process-task/new-upload-files/${id}`, formData, {})
      .then((success) => {
        isFetchedFilesTypes &&
          notification["success"]({
            message: "Успешно",
            description: "Данные успешно синхронизированы",
            placement: "topRight",
          });
        getFileTypes();
        setIsLoading(false);
      })
      .catch((e) => {
        const error = get(e, "response.data[0].message");
        isFetchedFilesTypes &&
          notification["error"]({
            message: "Ошибка",
            description: error,
            placement: "topRight",
          });
        setIsLoading(false);
      });
  };
  const onSearch = (search) => {
    getFileTypes({ search });
  };
  const onSearchbyGroup = (group) => {
    getFileTypes({ group });
  };

  //   const getStep = (step) => {
  //     switch (step) {
  //       case 1:
  //         return t("Первый");
  //         break;
  //       case 2:
  //         return t("Второй");
  //         break;
  //       case 3:
  //         return t("Третий");
  //         break;
  //       default:
  //         return t("Первый");
  //         break;
  //     }
  //   };
  useEffect(() => {
    getFileTypes();
  }, []);

  const columns = [
    {
      title: t("№"),
      dataIndex: "id",
      key: "id",
      render: (data, row, index) => {
        return index + 1;
      },
    },
    {
      title: t("Title"),
      width: 600,
      render: (data, row, index) => {
        return <>{get(data, "type.name")}</>;
      },
    },
    {
      title: t("Загрузить"),
      align: "center",
      render: (props, data) => {
        const type_id = get(data, "type_id");
        const canUpload = get(data, "canUpload");
        return (
          <>
            <Dropzone
              onDrop={(acceptedFiles) => uploadFile(acceptedFiles, type_id)}
              accept="application/pdf"
            >
              {({ getRootProps, open, getInputProps }) => {
                return (
                  <div {...getRootProps}>
                    <input {...getInputProps()} />
                    <button
                      className="btn btn-sm btn-primary"
                      type="button"
                      onClick={open}
                      disabled={isReadOnly || (!isReadOnly && !canUpload)}
                    >
                      <CloudUploadOutlined
                        style={{
                          marginRight: "5px",
                        }}
                      />
                      {t("Загрузить")}
                    </button>
                  </div>
                );
              }}
            </Dropzone>
          </>
        );
      },
    },
    {
      title: t("Download"),
      align: "center",
      dataIndex: "file",
      key: "file",
      render: (item) => {
        return (
          <>
            <a download href={get(item, "src")} target="_blank">
              <button
                disabled={isNil(item)}
                className={`btn btn-sm ${
                  isNil(item) ? "btn-success" : "btn-success"
                } `}
              >
                <CloudDownloadOutlined
                  style={{
                    marginRight: "5px",
                  }}
                />
                {t("Скачать")}
              </button>
            </a>
          </>
        );
      },
    },
    {
      title: t("Size"),
      dataIndex: "file",
      key: "file",
      align: "center",
      render: (item) => {
        return (
          <p className="text-bold mb-0">
            {!isNil(item)
              ? Number(get(item, "size") / 1024).toFixed(2) + "KB"
              : ""}
          </p>
        );
      },
    },
    {
      title: t("Created at"),
      dataIndex: "file",
      key: "file",
      render: (item) => {
        return (
          <p className={"mb-0"}>
            {!isNil(item) ? (
              <Moment format="DD-MM-YYYY">
                {get(item, "created_at") * 1000}
              </Moment>
            ) : (
              ""
            )}
          </p>
        );
      },
    },
  ];
  return (
    <PageHeader
      title="Файлы"
      extra={
        <button
          className="btn btn-primary"
          onClick={refreshTask}
          disabled={isLoading}
        >
          <ReloadOutlined className="text-white pr-1" />
          Обновить файлы
        </button>
      }
    >
      <Row>
        <Input.Search
          placeholder="Search"
          allowClear
          onChange={(e) => {
            let word = get(e, "target.value").trim();
            onSearch(word);
          }}
          style={{
            marginBottom: "10px",
          }}
        />
      </Row>
      {!isLoading && isFetchedFilesTypes ? (
        <Col span="24">
          {files.map((result) => {
            return (
              <>
                <h1
                  className="text-center"
                  style={{
                    fontSize: "25px",
                  }}
                >
                  {get(result, "group")} -
                  <span className="ml-1">{t("Этап")}</span>
                </h1>
                <Table
                  rowKey={"id"}
                  rowClassName={(record, index) =>
                    get(record, "canUpload") ? "" : "uploadTable"
                  }
                  size="small"
                  columns={columns}
                  dataSource={get(result, "files")}
                  pagination={false}
                />
              </>
            );
          })}
        </Col>
      ) : (
        <SkeletonLoader />
      )}
    </PageHeader>
  );
};

export default withTranslation("bhm_one")(React.memo(Files));
