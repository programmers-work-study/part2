import Component from "./core/Component.js";
import {IMAGE_PATH} from "../constants/api.js";
export default class ImageViewer extends Component {
  setup() {
    this.$target.addEventListener("click", this.props.onClick);
  }
  template() {
    if (!this.props.selected) return "";
    return `
    <div class="Modal">
    <div>
    <img src="${IMAGE_PATH(this.props.selected)}" alt="고양이 사진"/>
    </div>
    </div>
    `;
  }
}
