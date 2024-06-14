export default class BreadCrumb {
  constructor({ $target, state }) {
    this.$BraedCrumbContainer = document.createElement('nav');
    this.$BraedCrumbContainer.className = 'Breadcrumb';

    this.state = state;
    $target.appendChild(this.$BraedCrumbContainer);

    this.render();
  }

  setState(nextData) {
    this.state = nextData;
    this.render();
  }

  render() {
    const appendEl = this.state.pathDepth.map((path) => {
      return `
          <div>${path}</div>
        `;
    }).join("");
    this.$BraedCrumbContainer.innerHTML = `<div>root</div>${appendEl}`;
  }
}