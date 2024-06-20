import Component from "./core/Component.js";
export default class Nodes extends Component {
  template() {
    return (
      (this.props.isRoot
        ? ""
        : `<div class="Node prev">
    <img src="assets/prev.png"/>
    </div>`) + this.props.nodes.map((node) => nodeTemplate(node.type, node.name, node.id)).join("")
    );
  }
  setup() {
    this.$target.addEventListener("click", this.props.onClick);
  }
}

const nodeTemplate = (type, name, id) => `
<div class="Node" id="${id}" data-type="${type}" data-name="${name}">
  <img src="assets/${type === "FILE" ? "file" : "directory"}.png"/>
  <div>${name}</div>
</div>`;
