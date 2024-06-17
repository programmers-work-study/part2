// 왜 안되지
// import { IMAGE_BASE_URL } from "../api.js";
const IMAGE_BASE_URL =
  "https://fe-dev-matching-2021-03-serverlessdeploymentbuck-1ooef0cg8h3vq.s3.ap-northeast-2.amazonaws.com/public";

export default function ImageViewer({ $app, initialState, onClose }) {
  this.state = initialState;
  this.$target = document.createElement("div");
  this.$target.className = "Modal ImageViewer";
  $app.appendChild(this.$target);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    if (this.state) {
      this.$target.innerHTML = `
        <div class="content">
          <img src="${IMAGE_BASE_URL}${this.state.filePath}" alt="${this.state.name}" />
        </div>
      `;
      this.$target.style.display = "block";
    } else {
      this.$target.style.display = "none";
    }
  };

  this.$target.addEventListener("click", (event) => {
    if (event.target === this.$target) {
      onClose();
    }
  });

  this.render();
}
