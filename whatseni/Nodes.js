export default class Nodes {
  constructor({ $target, fileList }) {
    this.$NodesTarget = $target;
    this.data = fileList;

    this.$NodesContainer = document.createElement('div');
    this.$NodesContainer.className = 'Nodes';

    // this.$Node = document.createElement('div');

    // this.$PrevNode = document.createElement('img');
    // this.$PrevNode.src = "./assets/prev.png";

    // this.$Node.appendChild(this.$PrevNode);
    // this.$NodesContainer.appendChild(this.$Node);

    $target.appendChild(this.$NodesContainer);
  }

  setState(nextData) {
    this.data = nextData;
    this.setNodes();
  }
  setNodes() {
    const DIR = "DIRECTORY";
    const FILE = "FILE";
    this.data.map((item, idx) => {
      const el = `
        <div class="Node" date-id=${item.id}>
          <img src=${item.type === DIR ? "./assets/directory.png" : "./assets/file.png"}
          <div>${item.name}</div>
        </div>
      `;
      document.querySelector('.Nodes').appendChild(el);
    })
  }
}