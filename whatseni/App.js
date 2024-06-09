import BreadCrumb from "./Breadcrumb";
import ImageView from "./ImageView";
import Loading from "./Loading";
import Nodes from "./Nodes";
import { API } from "./api";

export default class App {
  constructor($target) {
    this.$mainTarget = $target;
    this.currentPath = 'root';
    this.fileList = [];

    this.breadCrumb = new BreadCrumb({ $target, path: currentPath });
    this.nodes = new Nodes({ $target, fileList: this.fileList });
    this.imageView = new ImageView({ $target });
    this.loading = new Loading({ $target });
  }

  onRootList() {
    this.showLoading();
    API.fetchRootList().then((res) => {
      this.fileList = res;
      this.hideLoading();
    })
  }

  onPathList(path) {
    API.fetchFolderList(path)
  }

  onFileImage(path) {
    API.fetchFileImage(path)
  }

  showLoading() {
    this.loading.show();
  }

  hideLoading() {
    this.loading.hide();
  }

}