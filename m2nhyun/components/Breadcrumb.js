export default function Breadcrumb({ $app, initialState }) {
  this.state = initialState;
  this.$target = document.createElement("nav");
  this.$target.className = "Breadcrumb";
  $app.appendChild(this.$target);
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    this.$target.innerHTML = this.state
      .map(
        (node, index) => `
          <div data-index="${index}">${node.name}</div>
        `
      )
      .join("");
  };

  this.$target.addEventListener("click", (event) => {
    const $navItem = event.target.closest("div");
    if ($navItem) {
      const index = parseInt($navItem.dataset.index);
      onClick(index);
    }
  });

  this.render();
}
