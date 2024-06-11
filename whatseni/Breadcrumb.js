export default class BreadCrumb {
  constructor({ $target, pathDepth }) {
    this.$BraedCrumbContainer = document.createElement('nav');
    this.$BraedCrumbContainer.className = 'Breadcrumb';

    this.pathDepth = pathDepth;
    $target.appendChild(this.$BraedCrumbContainer);
  }

  setState(nextData) {
    this.pathDepth = nextData;
    this.setPath();
  }

  setPath() {
    const appendEl = this.pathDepth.map((path) => {
      return `
          <div>${path}</div>
        `;
    }).join("");
    this.$BraedCrumbContainer.innerHTML = `<div>root</div>${appendEl}`;
  }
}