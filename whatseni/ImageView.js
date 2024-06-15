export default class ImageView {
  constructor({ $target, onClose }) {
    this.$ImageView = document.createElement('div');
    this.$ImageView.className = 'ImageViewer';
    this.$ImageView.className = 'Modal';
    this.$ImageView.addEventListener('click', (event) => {
      if (event.target === this.$ImageView) onClose();
    });

    this.onClose = onClose;
    this.state = { selectedFile: null };

    $target.appendChild(this.$ImageView);
    window.addEventListener('keyup', (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    });
    this.render();
  }

  setState(nextData) {
    this.state = nextData;
    this.render();
  }

  render() {
    this.$ImageView.innerHTML = this.state.selectedFile ? `
      <div class="content">
        <img src="https://fe-dev-matching-2021-03-serverlessdeploymentbuck-1ooef0cg8h3vq.s3.ap-northeast-2.amazonaws.com/public${this.state.selectedFile}"/>
      </div>
    ` : '';
    this.$ImageView.style.display = this.state.selectedFile ? 'block' : 'none';
  }
}