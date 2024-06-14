import {API} from "../constants/api.js";
import Breadcrumb from "./Breadcrumb.js";
import Nodes from "./Nodes.js";
import Component from "./core/Component.js";
import ImageViewer from "./ImageViewer.js";
import Loading from "./Loading.js";
import {fetchData} from "../utility/fetchData.js";
//TODO api 요청 try,catch  추상화 필요
//TODO 이미 요청한 데이터에 대히서는 캐싱 적용
export default class App extends Component {
  initState() {
    return {path: [], nodes: [], selected: null, isLoading: false};
  }

  mounted() {
    const $breadcrumb = document.querySelector(".Breadcrumb");
    const $nodes = document.querySelector(".Nodes");
    const $imageViewer = document.querySelector(".ImageViewer");
    const $loading = document.querySelector(".loading");
    this.loading = new Loading({$target: $loading, props: this.state.isLoading});
    this.breadcrumb = new Breadcrumb({$target: $breadcrumb, props: this.state.path});
    this.nodes = new Nodes({$target: $nodes, props: {nodes: this.state.nodes, isRoot: this.state.path.length === 0}});
    this.imageViewer = new ImageViewer({$target: $imageViewer, props: this.state.selected});
  }

  template() {
    return `
    <div class="breadcrumb" ></div>
    <div class="Nodes"></div>
    <div class="ImageViewer"></div>
    <div class="loading"></div>
    `;
  }

  async setup() {
    this.$target.addEventListener("click", async (event) => {
      const node = event.target.closest(".Node");
      const breadcrumbItem = event.target.closest(".breadcrumb-item");
      if (node && node.classList.contains("prev")) {
        const nextPath = [...this.state.path];
        nextPath.pop();
        if (nextPath.length === 0) {
          fetchData({
            url: API.GET_ROOT,
            setLoading: (state) => {
              this.setState({...this.state, isLoading: state});
            },
            setData: (data) => {
              this.setState({...this.state, path: [], nodes: data});
            },
          });
          return;
        }
        const prevNode = nextPath[nextPath.length - 1];
        fetchData({
          url: API.GET_ID(prevNode.id),
          setLoading: (state) => {
            this.setState({...this.state, isLoading: state});
          },
          setData: (data) => {
            this.setState({...this.state, path: nextPath, nodes: data});
          },
        });
        return;
      }
      if (node && node.dataset.type === "DIRECTORY") {
        const id = node.id;
        fetchData({
          url: API.GET_ID(id),
          setLoading: (state) => {
            this.setState({...this.state, isLoading: state});
          },
          setData: (data) => {
            this.setState({...this.state, path: [...this.state.path, {name: node.dataset.name, id: id}], nodes: data});
          },
        });
        return;
      }
      if (node && node.dataset.type === "FILE") {
        const id = node.id;
        const filePath = this.state.nodes.filter((node) => node.id === id)[0].filePath;
        this.setState({...this.state, selected: filePath});
        return;
      }

      if (breadcrumbItem) {
        const id = breadcrumbItem.getAttribute("id");
        if (!id) {
          fetchData({
            url: API.GET_ROOT,
            setLoading: (state) => {
              this.setState({...this.state, isLoading: state});
            },
            setData: (data) => {
              this.setState({...this.state, path: [], nodes: data});
            },
          });
          return;
        }
        fetchData({
          url: API.GET_ID(prevNode.id),
          setLoading: (state) => {
            this.setState({...this.state, isLoading: state});
          },
          setData: (data) => {
            const targetIndex = this.state.path.find((p) => p.id === id);
            const nextPath = [this.state.path].slice(0, targetIndex);
            this.setState({...this.state, path: nextPath, nodes: data});
          },
        });
        return;
      }
      if (event.target.classList.contains("Modal") && this.state.selected) {
        this.setState({...this.state, selected: null});
      }
    });
    document.addEventListener("keyup", (event) => {
      if (event.key === "Escape" && this.state.selected) {
        this.setState({...this.state, selected: null});
      }
    });
    fetchData({
      url: API.GET_ROOT,
      setLoading: (state) => {
        this.setState({...this.state, isLoading: state});
      },
      setData: (data) => {
        this.setState({...this.state, path: [], nodes: data});
      },
    });
    return;
  }
}
