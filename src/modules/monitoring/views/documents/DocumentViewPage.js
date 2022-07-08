import React, {useEffect, useState} from 'react';
import Document from "../../../../schema/Document";
import DocumentScheme from "../../../../schema/Document";
import ApiActions from "../../../../services/api/Actions";
import {useDispatch, useSelector} from "react-redux";
import {Link, useParams} from "react-router-dom";
import {get, isEmpty, isEqual} from "lodash";
import Normalizer from "../../../../services/normalizr";
import PageHeader from "../../../../components/PageHeader";
import Loader from "../../../../components/Loader";
import {Modal,notification} from 'antd';
import Select from 'react-select'

function DocumentViewPage(props) {
  const [isFetched, setIsFetched] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [documents, setDocuments] = useState([]);
  const {id} = useParams();
  const entities = useSelector(state => get(state, 'normalize.entities', {}));
  let document = useSelector(state => get(state, 'normalize.data.monitoring-document-one.result', {}));
  let isFetchedData = useSelector(state => get(state, 'normalize.data.monitoring-document-one.isFetched', false));
  document = Normalizer.Denormalize(document, DocumentScheme, entities);
  const dispatch = useDispatch();
  let options = document && get(document, "children")?.map(document => {
    return {
      value: get(document, "id"),
      label: get(document, "title")
    }
  })
  options = options && [{value: get(document, "id"), label: get(document, "title")}, ...options]
  const getMonitoringDocument = () => {
    const storeName = 'monitoring-document-one';
    const entityName = 'document';
    const scheme = {Document};
    dispatch({
      type: ApiActions.GET_ONE.TRIGGER,
      payload: {
        storeName,
      },
    });
    dispatch({
      type: ApiActions.GET_ONE.REQUEST,
      payload: {
        url: `monitoring/document/${id}`,
        config: {
          params: {
            "filter[parent_id]": 0,
            "filter[is_deleted]":0,
            include: "children",
          }
        },
        scheme,
        storeName,
        entityName,
      },
    });
  }

  useEffect(() => {
    getMonitoringDocument();
  }, [])
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    const children = [];
     documents && documents.map(d => {
      if (!isEqual(get(d, "value"), get(document, "id"))) {
        return children.push(get(d, "value"))
      }
    });
    const self = documents && documents.map(d => isEqual(get(d, "value"), get(document, "id")))
    deleted({children, self: self[0]});
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const filterBy = (value) => {
    setDocuments(value)
  }
  if (!isFetchedData) {
    return <Loader/>
  }
  if (isFetched) {
    return <Loader/>
  }
  return (
    <div>
      <div className={"d-flex align-items-center justify-content-between pr-3"}>
        <PageHeader name={"Monitoring"} desc={"Monitoring view"}/>
        <div>
          <Link to={`/credit-monitoring/documents/update/${id}`} className="btn w-xs mr-1 btn-warning">Update</Link>
          {/*<button className="btn w-xs  btn-danger" onClick={showModal}>Delete</button>*/}
        </div>
      </div>
      <div className={"padding"}>
        <h1 className={"text-md"}>Hujjat : {get(document, "title")}</h1>
        {!isEmpty(get(document, "children")) && get(document, "children")?.map(ch => {
          return (
            <p className={"text-sm mb-1"}>Ilova : {get(ch, "title")}</p>
          )
        })}
      </div>
      <Modal title="Hujjat yoki ilova o'chirish" bodyStyle={{height: "500px"}} okText={"O'chirish"}
             cancelText={"Bekor qilish"} visible={isModalVisible} onOk={handleOk}
             onCancel={handleCancel}>
        {!isEmpty(options) ? <Select onChange={value => filterBy(value)} options={options} isMulti/> :
          <Loader/>}
      </Modal>
    </div>
  );
}

export default DocumentViewPage;
