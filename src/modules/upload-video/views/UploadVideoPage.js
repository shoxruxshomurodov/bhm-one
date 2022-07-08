import React, { Component } from "react";
import FormVideo from "../components/Form/VideoForm";
import FormImage from "../components/Form/ImageForm";
import FormMarquee from "../components/Form/MarqueeForm";
import VideoHistory from "../components/History/VideoHistory";
import ImageHistory from "../components/History/ImageHistory";
import MarqueeHistory from "../components/History/MarqueeHistory";
import Sweetalert from "../../../components/SweetAlert/SavedSucces";
import axios from "axios";
import { get, isEqual } from "lodash";
class UploadVideoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      marquee: "",
      type: null,
      isFetched: false,
      video_history: [],
      marquee_history: [],
      image_history: [],
      inProcess: false
    };
  }

  componentDidMount() {
    this.getHistoryVideo();
    this.getHistoryMarquee();
    this.getHistoryImage();
  }

  uploadVideo = (video) => {
    this.setState({ inProcess: "video" });
    const data = new FormData();
    if (video) {
      data.append(`files`, get(video, "file"));
    }
    axios({
      method: "post",
      url: "http://172.28.6.124:99/v1/streamtv/file/upload",
      headers: {
        Authorization: "Bearer 611cb9c99bc2e"
      },
      data: data
    }).then((_response) => {
      this.setState({ isFetched: true, inProcess: false });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    });
  };

  uploadImage = (image) => {
    this.setState({ inProcess: "image" });
    const data = new FormData();
    if (image) {
      data.append(`files`, get(image, "file"));
    }
    axios({
      method: "post",
      url: "http://172.28.6.124:99/v1/streamtv/file/image-upload",
      data: data
    }).then((_response) => {
      this.setState({ isFetched: true, inProcess: false });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    });
  };

  selectType = (type) => {
    this.setState({ type });
  };
  uploadMarquee = () => {
    const { marquee, type } = this.state;
    this.setState({ inProcess: "marquee" });
    axios({
      method: "post",
      url: "http://172.28.6.124:99/v1/streamtv/marquee/create",
      headers: {
        "Content-Type": "application/json"
      },
      data: JSON.stringify({
        content: marquee,
        marquee_type: type
      })
    }).then((_response) => {
      this.setState({ isFetched: true, marquee: "", inProcess: false });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    });
  };
  getHistoryVideo = () => {
    axios({
      method: "get",
      url: "http://172.28.6.124:99/v1/streamtv/file",
      headers: {
        Authorization: "Bearer 611cb9c99bc2e"
      }
    }).then((response) => {
      const { data } = response;

      this.setState({ video_history: get(data, "data") });
    });
  };
  deleteImage = (id) => {
    axios({
      method: "get",
      url: "http://172.28.6.124:99/v1/streamtv/file/delete-image",
      headers: {
        Authorization: "Bearer 61441f6b4c33b"
      },
      params: {
        id: id
      }
    }).then((_response) => {
      this.setState({ isFetched: true });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    });
  };
  getHistoryImage = () => {
    axios({
      method: "get",
      url: "http://172.28.6.124:99/v1/streamtv/file/last-image",
      headers: {
        Authorization: "Bearer 611cb9c99bc2e"
      }
    })
      .then((response) => {
        const { data } = response;
        this.setState({ image_history: data });
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  getHistoryMarquee = () => {
    axios({
      method: "get",
      url: "http://172.28.6.124:99/v1/streamtv/marquee",
      headers: {
        Authorization: "Bearer 611cb9c99bc2e"
      }
    })
      .then((response) => {
        const { data } = response;
        this.setState({ marquee_history: get(data, "data") });
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  writeMarque = (e) => {
    this.setState({ marquee: e.target.value });
  };
  render() {
    const {
      marquee,
      isFetched,
      video_history,
      marquee_history,
      image_history,
      inProcess
    } = this.state;
    return (
      <>
        <div className="row">
          <div className="col-md-4 d-flex flex-column justify-content-center">
            <FormVideo inProcess={inProcess} uploadVideo={this.uploadVideo} />
          </div>
          <div className="col-md-8">
            <VideoHistory history={video_history} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 d-flex flex-column justify-content-center">
            <FormImage inProcess={inProcess} uploadImage={this.uploadImage} />
          </div>
          <div className="col-md-8">
            {!isEqual(image_history, "File not found") ? (
              <ImageHistory
                deleteImage={this.deleteImage}
                history={image_history}
              />
            ) : (
              <p className="h-100 text-danger d-flex justify-content-center align-items-center">
                Юкланган расмлар мавжуд емас!
              </p>
            )}
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-md-4 d-flex flex-column justify-content-center">
            <FormMarquee
              marquee={marquee}
              writeMarque={this.writeMarque}
              uploadMarquee={this.uploadMarquee}
              selectType={this.selectType}
              inProcess={inProcess}
            />
          </div>
          <div className="col-md-8">
            <MarqueeHistory history={marquee_history} />
          </div>
        </div>
        {isFetched && <Sweetalert />}
      </>
    );
  }
}

export default UploadVideoPage;
