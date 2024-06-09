export default class BreadCrumb {
  constructor($target, path) {
    this.path = path;
    this.$BraedTarget = $target;

    this.$BraedCrumbContainer = document.createElement('nav');
    this.$BraedCrumbContainer.className = 'Breadcrumb';

    this.$BreadRoot = document.createElement('div');
    this.$BreadRoot.innerText = path;

    this.$BraedCrumbContainer.appendChild(this.$BreadRoot);
    $target.appendChild(this.$BraedCrumbContainer);

    this.setPath(this.path);
  }

  setPath(path) {
  }
}