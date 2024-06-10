import Component from "./core/Component.js";

export default class Loading extends Component {
  template() {
    if (!this.props) return "";
    return `
    <div class="Modal">
      <div class="loading--image">
        <img src="assets/nyan-cat.gif"/>
      </div>
    </div>`;
  }
}
