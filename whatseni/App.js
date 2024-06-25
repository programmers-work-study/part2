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

    this.cache = {};

    this.breadCrumb = new BreadCrumb({ $target, state: this.state, onClick: this.onBreadCrumbClick.bind(this) });
    this.nodes = new Nodes({
      $target, state: this.state, onClick: this.onNodeClick.bind(this)
    });
    this.imageView = new ImageView({ $target, onClose: this.onCloseImage.bind(this) });
    this.loading = new Loading({ $target });

    this.onRootList();
  }


  setState(nextData) {
    this.state = { ...this.state, ...nextData };
    this.breadCrumb.setState(this.state);
    this.nodes.setState(this.state);
    this.imageView.setState(this.state);
  }

  async onRootList() {
    this.showLoading();
    if (this.cache['root']) {
      this.setState({
        pathDepth: [],
        isRoot: true,
        fileList: this.cache['root']
      })
    } else {
      const result = await API.fetchRootList();
      this.cache['root'] = result;
      this.setState({
        pathDepth: [],
        isRoot: true,
        fileList: result
      });
    }

    this.hideLoading();
  }

  async onFolderList(nodeId, folderName) {
    this.showLoading();
    if (this.cache[nodeId]) {
      const nextPath = this.state.pathDepth.concat({ id: nodeId, name: folderName });
      this.setState({
        pathDepth: nextPath,
        isRoot: false,
        fileList: this.cache[nodeId],
      })
    } else {
      const result = await API.fetchFolderList(nodeId);
      this.cache[nodeId] = result;
      const nextPathDepth = this.state.pathDepth.concat({ id: nodeId, name: folderName });
      this.setState({
        pathDepth: nextPathDepth,
        isRoot: false,
        fileList: result,
      });
    }

    this.hideLoading();
  }

  async onNodeClick(node) {
    if (node.type === 'DIRECTORY') {
      this.onFolderList(node.id, node.name);
    } else if (node.type === 'FILE') {
      this.setState({
        selectedFile: node.filePath
      })
    } else {
      const newPathDepth = [...this.state.pathDepth];
      newPathDepth.pop();

      if (newPathDepth.length === 0) {
        await this.onRootList();
      } else {
        const lastNode = newPathDepth[newPathDepth.length - 1];
        await this.onFolderList(lastNode.id, lastNode.name);
        this.setState({
          pathDepth: newPathDepth,
          isRoot: newPathDepth.length === 0
        });
      }
    }
  }

  onBreadCrumbClick(idx) {
    if (idx === null) this.onRootList();
    else {
      const nextPath = this.state.pathDepth.slice(0, idx + 1);
      this.onFolderList(nextPath[nextPath.length - 1].id, nextPath[nextPath.length - 1].name)
    }
  }

  onCloseImage() {
    this.setState({ selectedFile: null });
  }

  showLoading() {
    this.loading.show();
  }

  hideLoading() {
    this.loading.hide();
  }

}