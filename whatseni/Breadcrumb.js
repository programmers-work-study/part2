export default class BreadCrumb {
  constructor({ $target, pathDepth }) {
    this.$BraedCrumbContainer = document.createElement('nav');
    this.$BraedCrumbContainer.className = 'Breadcrumb';

    $target.appendChild(this.$BraedCrumbContainer);

    this.setPath(pathDepth);
  }

  setPath(pathDepth) {
    const appendEl = pathDepth.map((path) => {
      return `
        <div>${path}</div>
      `;
    }).join("");
    this.$BraedCrumbContainer.innerHTML = appendEl;
  }
}