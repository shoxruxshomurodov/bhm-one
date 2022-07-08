import { get } from "lodash";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import CategoryScheme from "../../../schema/CategoryScheme";
import { request } from "../../../services/api";
import ApiService from "../../../services/api/Actions";
import Normalizer from "../../../services/normalizr";
import SendSmsForm from "../component/SendSmsForm";
import ExcelPhoto from "../../../assets/images/correct-excel.png";
import { withTranslation } from "react-i18next";
const SendSmsContainer = ({ getCategoryList, category, entities, t }) => {
  const submitForm = ({ category_id, files, content }) => {
    const formData = new FormData();
    formData.append("files", files);
    Swal.fire({
      title: t("Ishonchingiz komilmi?"),
      text: t("Agar rozi bo'lsangiz sms hammaga jo'natiladi"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: t("SMS Jo'natish"),
      cancelButtonText: t("Bekor Qilish"),
      reverseButtons: true,
      cancelButtonColor: "#f4c414",
      confirmButtonColor: "#31c971",
    }).then((result) => {
      if (result.isConfirmed) {
        request
          .post(`sms/sms/create-excel`, formData, {
            params: {
              category_id,
              content,
            },
          })
          .then((_success) => {
            Swal.fire({
              title: t("Jo'natildi!"),
              text: t("Barcha SMS Jo'natildi"),
              icon: "success",
              confirmButtonText: t("Ortga"),
              confirmButtonColor: "#31c971",
            });
          })
          .catch((error) => {
            Swal.fire({
              title: error,
              text: t("Server bilan muammo"),
              icon: "warning",
              confirmButtonText: t("Chiqish"),
              confirmButtonColor: "#f4c414",
            });
          });
      }
    });
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
  return (
    <>
      <div className="row">
        <div className="col-md-6">
          <SendSmsForm
            categories={get(category, "result", [])}
            submitForm={submitForm}
          />
        </div>
        <div className="col-md-6">
          <div className="card p-4 ">
            <img src={ExcelPhoto} height="190" />
          </div>
        </div>
      </div>
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
)(withTranslation("bhm_one")(SendSmsContainer));
