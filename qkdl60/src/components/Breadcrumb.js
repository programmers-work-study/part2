import Component from "./core/Component.js";
/*

  {name: string, id:string}

*/
export default class Breadcrumb extends Component {
  template() {
    if (!this.props.path) return;
    return `
    
    <div class="breadcrumb-item" >root</div>
    ${this.props.path.map((dir) => `<div class="breadcrumb-item" id="${dir.id}">${dir.name}</div>`).join("")}
    
    `;
  }

  setup() {
    this.$target.addEventListener("click", this.props.onClick);
  }
}
