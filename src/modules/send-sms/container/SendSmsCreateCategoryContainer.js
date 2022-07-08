import { Col, Drawer, Row, Typography } from "antd";
import { get } from "lodash";
import React, { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import CategoryScheme from "../../../schema/CategoryScheme";
import { request } from "../../../services/api";
import CreateCategoryForm from "../component/CreateCategoryForm";
import ApiService from "../../../services/api/Actions";
import Normalizer from "../../../services/normalizr";
import ChangeCategoryForm from "../component/ChangeCategoryForm";
import { withTranslation } from "react-i18next";

const SendSmsCreateCategoryContainer = ({
  getCategoryList,
  category,
  entities,
  t,
}) => {
  const { Text } = Typography;
  const [data, setData] = useState({});
  const [visible, setVisible] = useState(false);
  const [isEditDrawerVisible, setIsEditDrawerVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  const openChangeCategory = () => {
    setIsEditDrawerVisible(true);
  };
  const closeChangeCategory = () => {
    setIsEditDrawerVisible(false);
  };

  useEffect(() => {
    getCategoryList();
  }, []);

  category = Normalizer.Denormalize(
    category,
    {
      result: [CategoryScheme],
    },
    entities
  );

  const categories = get(category, "result", []);

  const submitFormChangeCategory = ({ category_id, category_name }) => {
    Swal.fire({
      title: t("Ishonchingiz komilmi?"),
      text: t("Kategoriyani tahrirlaysizmi?"),
      icon: "question",
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonText: t("Davom ettirish"),
      cancelButtonText: t("To'xtatish"),
      confirmButtonColor: "#31c971",
      cancelButtonColor: "#f4c414",
    }).then((result) => {
      result.dismiss && closeChangeCategory();
      result.isConfirmed &&
        request
          .put(`sms/sms/update-category`, {
            id: category_id,
            name: category_name,
          })
          .then((_success) => {
            Swal.fire({
              title: t("Muvafaqqiyatli tahrirlandi"),
              text: t("Kategoriya tahrirlandi"),
              icon: "success",
              confirmButtonText: t("Ortga"),
              confirmButtonColor: "#31c971",
            }).then((result) => {
              if (result.isConfirmed) {
                closeChangeCategory();
                window.location.reload();
              }
            });
          })
          .catch((error) => {
            Swal.fire({
              title: t("Server bilan muammo"),
              text: error,
              icon: "warning",
              confirmButtonText: t("Chiqish"),
              confirmButtonColor: "#f4c414",
            });
          });
    });
  };

  const submitForm = ({ category_id, category_name }) => {
    if (category_name === "") {
      Swal.fire({
        title: t("Xatolik"),
        text: t("Iltimos, to'ldiring"),
        icon: "error",
        showCancelButton: true,
        confirmButtonText: t("To'ldirish"),
        confirmButtonColor: "#31c971",
        cancelButtonText: t("Chiqish"),
        cancelButtonColor: "#f4c414",
      }).then((result) => {
        result.dismiss && onClose();
      });
    } else {
      Swal.fire({
        title: t("Yangi Kategoriya Yaratish"),
        text: t('Rostdan ham yangi "kategoriya" yaratishni xohlaysizmi ?'),
        icon: "question",
        showCancelButton: true,
        confirmButtonText: t("Ha"),
        confirmButtonColor: "#31c971",
        cancelButtonText: t("Yo'q"),
        cancelButtonColor: "#f4c414",
        reverseButtons: true,
      }).then((result) => {
        if (result.dismiss) {
          onClose();
        }
        if (result.isConfirmed && category_name !== "")
          request
            .post(`sms/sms/create-category`, {
              id: category_id,
              name: category_name,
            })
            .then((_success) => {
              Swal.fire({
                title: t("Muvafaqqiyatli yaratildi"),
                text: t("Kategoriya yaratildi"),
                icon: "success",
                confirmButtonText: t("Ortga"),
              }).then((result) => {
                if (result.isConfirmed) {
                  onClose();
                  getCategoryList();
                }
              });
            })
            .catch((error) => {
              Swal.fire({
                title: t("Server bilan muammo"),
                text: error,
                icon: "warning",
                confirmButtonText: t("Chiqish"),
                confirmButtonColor: "#f4c414",
              });
            });
      });
    }
  };
  return (
    <>
      <div className="row mt-2">
        <div className="col-md-6">
          {categories.map(({ name, id }) => (
            <Col key={id} className="card  px-4 py-2">
              <Row justify="middle" align="space-between">
                <Col span={22}>
                  <Text
                    style={{
                      fontSize: "22px",
                    }}
                  >
                    {name ? name : id}
                  </Text>
                </Col>
                <Col span={2}>
                  <Row align="space-between">
                    <Col>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => {
                          openChangeCategory();
                          setData({ name, id });
                        }}
                      >
                        <AiFillEdit size={16} />
                      </button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          ))}
        </div>
        <div className="col-md-6">
          <div className="row">
            <div className="col  d-flex justify-content-end">
              <button
                className="btn btn-primary"
                type="button"
                onClick={showDrawer}
              >
                {t("Create Category")}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Drawer
        title={t("Edit Category")}
        width={400}
        closable={true}
        onClose={() => {
          closeChangeCategory();
          setData({});
        }}
        visible={isEditDrawerVisible}
        placement="right"
        style={{ marginTop: "62px" }}
      >
        {isEditDrawerVisible && (
          <ChangeCategoryForm
            data={data}
            submitFormChangeCategory={submitFormChangeCategory}
          />
        )}
      </Drawer>
      <Drawer
        title={t("Create a new Category")}
        width={400}
        closable={true}
        onClose={onClose}
        visible={visible}
        placement="right"
        style={{ marginTop: "62px" }}
      >
        <CreateCategoryForm submitForm={submitForm} />
      </Drawer>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    category: get(state, "normalize.data.category-list", {}),
    entities: get(state, "normalize.entities", {}),
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getCategoryList: () => {
      const storeName = "category-list";
      const entityName = "categoryScheme";
      const scheme = [CategoryScheme];
      dispatch({
        type: ApiService.GET_ALL.REQUEST,
        payload: {
          url: "/sms/sms/categories",
          scheme,
          storeName,
          entityName,
        },
      });
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation("bhm_one")(SendSmsCreateCategoryContainer));
