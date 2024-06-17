import { fetchNodes } from "./api.js";
import Breadcrumb from "./components/Breadcrumb.js";
import Nodes from "./components/Nodes.js";
import ImageViewer from "./components/ImageViewer.js";

export default class App {
  constructor($app) {
    this.state = {
      nodes: [],
      breadcrumb: [{ id: "root", name: "root" }],
      selectedImage: null,
      isLoading: false,
    };

    this.init = async () => {
      try {
        this.setState({ ...this.state, isLoading: true });
        const loadingElement = document.createElement("div");
        loadingElement.className = "Loading";
        loadingElement.textContent = "Loading...";
        $app.appendChild(loadingElement);

        const rootNodes = await fetchNodes();
        this.setState({ ...this.state, nodes: rootNodes });
      } catch (error) {
        console.error(error);
        const nodesContainer = document.querySelector(".Nodes");
        nodesContainer.innerHTML = `<div class="Error">오류</div>`;
      } finally {
        this.setState({ ...this.state, isLoading: false });
        const loadingElement = document.querySelector(".Loading");
        if (loadingElement) {
          loadingElement.remove();
        }
      }
    };

    this.setState = (nextState) => {
      this.state = nextState;
      breadcrumbComponent.setState(this.state.breadcrumb);
      nodesComponent.setState(this.state.nodes);
      imageViewerComponent.setState(this.state.selectedImage);
    };

    this.handleBreadcrumbClick = async (clickedNodeId) => {
      if (this.state.isLoading) return; // 로딩 중에는 클릭 방지

      const clickedNodeIndex = this.state.breadcrumb.findIndex(
        (node) => node.id === clickedNodeId
      );
      if (clickedNodeIndex >= 0) {
        const newBreadcrumb = this.state.breadcrumb.slice(
          0,
          clickedNodeIndex + 1
        );
        this.setState({
          ...this.state,
          breadcrumb: newBreadcrumb,
          isLoading: true,
        });
        try {
          const newNodes = await fetchNodes(clickedNodeId);
          this.setState({
            ...this.state,
            nodes: newNodes,
            isLoading: false,
          });
        } catch (error) {
          console.error(error);
        }
      }
    };

    this.handleNodeClick = async (node) => {
      if (this.state.isLoading) return;

      if (node.type === "DIRECTORY") {
        try {
          this.setState({ ...this.state, isLoading: true });
          const childNodes = await fetchNodes(node.id);
          this.setState({
            ...this.state,
            nodes: childNodes,
            breadcrumb: [...this.state.breadcrumb, node],
            isLoading: false,
          });
        } catch (error) {
          console.error(error);
        }
      } else if (node.type === "FILE") {
        this.setState({ ...this.state, selectedImage: node });
      }
    };

    this.handleImageClose = () => {
      this.setState({ ...this.state, selectedImage: null });
    };

    const breadcrumbComponent = new Breadcrumb({
      $app,
      initialState: this.state.breadcrumb,
      onClick: this.handleBreadcrumbClick,
    });

    const nodesComponent = new Nodes({
      $app,
      initialState: this.state.nodes,
      onClick: this.handleNodeClick,
    });

    const imageViewerComponent = new ImageViewer({
      $app,
      initialState: this.state.selectedImage,
      onClose: this.handleImageClose,
    });

    this.init();
  }
}
