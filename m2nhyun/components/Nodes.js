export default function Nodes({ $app, initialState, onClick }) {
  this.state = initialState;
  this.$target = document.createElement("div");
  this.$target.className = "Nodes";
  $app.appendChild(this.$target);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const prevNode = this.state[0]?.parent;

    this.$target.innerHTML =
      (prevNode
        ? `
          <div class="Node" data-node-id="${prevNode.id}">
            <img src="./assets/prev.png" alt="이전 폴더" />
          </div>
        `
        : "") +
      this.state
        .map(
          (node) => `
          <div class="Node" data-node-id="${node.id}">
            <img src="./assets/${node.type.toLowerCase()}.png" alt="${
            node.type
          }" />
            <div>${node.name}</div>
          </div>
        `
        )
        .join("");
  };

  this.$target.addEventListener("click", (event) => {
    const $node = event.target.closest(".Node");
    if ($node) {
      const { nodeId } = $node.dataset;
      if (nodeId) {
        const clickedNode = this.state.find((node) => node.id === nodeId);
        if (clickedNode) {
          onClick(clickedNode);
        }
      }
    }
  });

  this.render();
}
