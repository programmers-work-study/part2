import BreadCrumb from "./Breadcrumb.js";
import ImageView from "./ImageView.js";
import Loading from "./Loading.js";
import Nodes from "./Nodes.js";
import { API } from "./api.js";

export default class App {
  constructor($target) {
    this.$mainTarget = $target;
    this.currentPath = 'root';
    this.fileList = [];

    this.breadCrumb = new BreadCrumb({ $target, path: this.currentPath });
    this.nodes = new Nodes({ $target, fileList: this.fileList });
    this.imageView = new ImageView({ $target });
    this.loading = new Loading({ $target });

    this.onRootList();
  }

  onRootList() {
    // this.showLoading();
    API.fetchRootList().then((res) => {
      this.fileList = res;
      this.nodes.setState(res);
      // this.hideLoading();
    })
  }

  onPathList(folderID) {
    API.fetchFolderList(folderID)
  }

  onFileImage(filePath) {
    API.fetchFileImage(filePath)
  }

  showLoading() {
    this.loading.show();
  }

  hideLoading() {
    this.loading.hide();
  }

}