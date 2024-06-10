import Component from "./core/Component.js";
import {IMAGE_PATH} from "../constants/api.js";
export default class ImageViewer extends Component {
  template() {
    if (!this.props) return "";
    return `
    <div class="Modal">
    <div>
    <img src="${IMAGE_PATH(this.props)}" alt="고양이 사진"/>
    </div>
    </div>
    `;
  }
}
