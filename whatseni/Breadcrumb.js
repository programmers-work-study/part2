export default class BreadCrumb {
  constructor({ $target, state, onClick }) {
    this.$BraedCrumbContainer = document.createElement('nav');
    this.$BraedCrumbContainer.className = 'Breadcrumb';

    this.state = state;
    this.onClick = onClick;
    $target.appendChild(this.$BraedCrumbContainer);

    this.render();
  }

  setState(nextData) {
    this.state = nextData;
    this.render();
  }

  render() {
    const rootEl = document.createElement('div');
    rootEl.textContext = 'root';
    rootEl.addEventListener('click', () => this.onClick(null));
    this.$BraedCrumbContainer.appendChild();

    this.state.pathDepth.forEach((node, idx) => {
      const el = document.createElement('div');
      el.innerText = node.name;
      el.addEventListener('click', () => this.onClick(idx));
      this.$BraedCrumbContainer.appendChild(el);
    })
  }
}