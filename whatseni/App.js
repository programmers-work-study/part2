import BreadCrumb from "./Breadcrumb.js";
import ImageView from "./ImageView.js";
import Loading from "./Loading.js";
import Nodes from "./Nodes.js";
import { API } from "./api.js";

export default class App {
  constructor($target) {
    this.$mainTarget = $target;
    this.state = {
      pathDepth: [],
      isRoot: true,
      fileList: [],
      selectedFile: null
    }
    // this.pathDepth = [];
    // this.fileList = [];
    // this.isRoot = true;

    this.breadCrumb = new BreadCrumb({ $target, state: this.state });
    this.nodes = new Nodes({
      $target, state: this.state, onClick: this.onNodeClick.bind(this)
    });
    this.imageView = new ImageView({ $target });
    this.loading = new Loading({ $target });

    this.onRootList();
  }


  setState(nextData) {
    this.state = nextData;
    this.nodes.setState(nextData);
    this.breadCrumb.setState(nextData);
  }

  async onRootList() {
    this.showLoading();
    const result = await API.fetchRootList();
    if (result) this.setState({
      pathDepth: [],
      isRoot: true,
      fileList: result
    });
    this.hideLoading();
  }

  async onFolderList(nodeId, folderName) {
    const result = await API.fetchFolderList(nodeId);
    const nextPathDepth = this.state.pathDepth.concat(folderName);
    this.setState({
      pathDepth: nextPathDepth,
      isRoot: false,
      fileList: result,
    });
  }

  onNodeClick(node) {
    if (node.type === 'DIRECTORY') {
      this.onFolderList(node.id, node.name);
    } else if (node.type === 'FILE') {
      this.setState({
        selectedFile: node.filePath
      })
    }
  }

  onBreadCrumbClick(idx) {

  }

  showLoading() {
    this.loading.show();
  }

  hideLoading() {
    this.loading.hide();
  }

}