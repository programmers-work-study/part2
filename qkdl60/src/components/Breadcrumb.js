import Component from "./core/Component.js";
/*

  {name: string, id:string}

*/
export default class Breadcrumb extends Component {
  template() {
    if (!this.props) return;
    return `
    
    <div class="breadcrumb-item" >root</div>
    ${this.props.map((dir) => `<div class="breadcrumb-item" id="${dir.id}">${dir.name}</div>`).join("")}
    
    `;
  }
}
