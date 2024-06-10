import {API} from "../constants/api.js";
import Breadcrumb from "./Breadcrumb.js";
import Nodes from "./Nodes.js";
import Component from "./core/Component.js";
import ImageViewer from "./ImageViewer.js";
import Loading from "./Loading.js";

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
          try {
            this.setState({...this.state, isLoading: true});
            const data = await fetch(API.GET_ROOT).then((res) => {
              if (!res.ok) throw Error("통신 에러 ");
              return res.json();
            });
            this.setState({...this.state, path: [], nodes: data});
          } catch (error) {
            alert("통신에 실패했습니다. 다시 시도해주세요");
          } finally {
            this.setState({...this.state, isLoading: false});
          }
          return;
        }
        const prevNode = nextPath[nextPath.length - 1];
        try {
          this.setState({...this.state, isLoading: true});
          const data = await fetch(API.GET_ID(prevNode.id)).then((res) => {
            if (!res.ok) throw Error("통신 에러 ");
            return res.json();
          });
          this.setState({...this.state, path: nextPath, nodes: data});
        } catch (error) {
          alert("통신에 실패했습니다. 다시 시도해주세요");
        } finally {
          this.setState({...this.state, isLoading: false});
        }
        return;
      }
      if (node && node.dataset.type === "DIRECTORY") {
        const id = node.id;
        try {
          this.setState({...this.state, isLoading: true});
          const data = await fetch(API.GET_ID(id)).then((res) => {
            if (!res.ok) throw Error("통신 중 문제가 생겼습니다. ");
            return res.json();
          });
          this.setState({...this.state, path: [...this.state.path, {name: node.dataset.name, id: id}], nodes: data});
        } catch (e) {
          alert("통신에 실패했습니다. 잠시 후 다시 시도해주세요");
        } finally {
          this.setState({...this.state, isLoading: false});
        }
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
          try {
            this.setState({...this.state, isLoading: true});
            const data = await fetch(API.GET_ROOT).then((res) => {
              if (!res.ok) throw Error("통신 에러 ");
              return res.json();
            });
            this.setState({...this.state, path: [], nodes: data});
          } catch (error) {
            alert("통신에 실패했습니다. 다시 시도해주세요");
          } finally {
            this.setState({...this.state, isLoading: false});
          }
          return;
        }
        try {
          this.setState({...this.state, isLoading: true});
          const data = await fetch(API.GET_ID(id)).then((res) => {
            if (!res.ok) throw Error("통신 에러 ");
            return res.json();
          });
          const targetIndex = this.state.path.find((p) => p.id === id);
          const nextPath = [this.state.path].slice(0, targetIndex);
          this.setState({...this.state, path: nextPath, nodes: data});
        } catch (e) {
          alert("통신 중 문제 다시 시도 ");
        } finally {
          this.setState({...this.state, isLoading: false});
        }

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
    try {
      this.setState({...this.state, isLoading: true});
      const data = await fetch(API.GET_ROOT).then((res) => {
        if (!res.ok) throw Error("통신 장애 ");
        return res.json();
      });
      this.setState({...this.state, nodes: data});
    } catch (e) {
      alert("에러 발생 다시 시동해주세요");
    } finally {
      this.setState({...this.state, isLoading: false});
    }
  }
}
