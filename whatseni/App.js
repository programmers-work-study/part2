import BreadCrumb from "./Breadcrumb.js";
import ImageView from "./ImageView.js";
import Loading from "./Loading.js";
import Nodes from "./Nodes.js";
import { API } from "./api.js";

export default class App {
  constructor($target) {
    this.$mainTarget = $target;
    this.pathDepth = ['root'];
    this.fileList = [];
    this.isRoot = false;

    this.breadCrumb = new BreadCrumb({ $target, pathDepth: this.pathDepth });
    this.nodes = new Nodes({ $target, fileList: this.fileList, onClick: this.onPathList });
    this.imageView = new ImageView({ $target });
    this.loading = new Loading({ $target });

    this.onRootList();
  }


  setState(nextData) {
    this.fileList = nextData;
    this.nodes.setState(nextData);
  }

  async onRootList() {
    this.showLoading();
    const result = await API.fetchRootList();
    if (result) this.setState(result);
    this.hideLoading();
  }

  async onPathList(folderID) {
    // this.showLoading();
    const result = await API.fetchFolderList(folderID);
    if (result) this.setState(result);
    // this.hideLoading();
  }

  async onFileImage(filePath) {
    this.showLoading();
    const result = await API.fetchFileImage(filePath)
    if (result) this.setState(result);
    this.hideLoading();
  }

  showLoading() {
    this.loading.show();
  }

  hideLoading() {
    this.loading.hide();
  }

}