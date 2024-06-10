export default class Nodes {
  constructor({ $target, fileList, onClick }) {
    this.$NodesTarget = $target;
    this.data = fileList;
    this.onClick = onClick;

    this.$NodesContainer = document.createElement('div');
    this.$NodesContainer.className = 'Nodes';

    $target.appendChild(this.$NodesContainer);
  }

  setState(nextData) {
    this.data = nextData;
    this.setNodes();
  }

  setNodes() {
    const DIR = "DIRECTORY";
    const FILE = "FILE";
    if (this.data) {
      const appendEl = this.data.map((item, idx) => {
        return `
          <div class="Node" data-id=${item.id}>
            <img src=${item.type === DIR ? "./assets/directory.png" : "./assets/file.png"}
            <div>${item.name}</div>
          </div>
        `;
      }).join('');

      this.$NodesContainer.innerHTML = appendEl;
      this.$NodesContainer.querySelectorAll(".Node").forEach(($item, index) => {
        $item.addEventListener("click", (e) => {
          e.stopPropagation();
          const id = e.currentTarget.dataset.id;
          this.onClick(id);
        });
      });
    }
  }
}