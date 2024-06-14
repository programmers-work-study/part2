export default class Nodes {
  constructor({ $target, state, onClick }) {
    this.$NodesTarget = $target;
    this.state = state;
    this.onClick = onClick;

    this.$NodesContainer = document.createElement('div');
    this.$NodesContainer.className = 'Nodes';

    $target.appendChild(this.$NodesContainer);
    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    const DIR = "DIRECTORY";
    const FILE = "FILE";
    if (!this.state.isRoot) {
      const prevNode = document.createElement('div');
      prevNode.className = 'Node';
      prevNode.innerHTML = '<img src="./assets/prev.png" />';
      prevNode.addEventListener('click', () => {

      })
      this.$NodesContainer.appendChild(prevNode);
    }
    this.state.fileList.forEach((node) => {
      const nodeEl = document.createElement('div');
      nodeEl.className = 'Node';
      nodeEl.innerHTML = `
        <img src=${item.type === DIR ? "./assets/directory.png" : "./assets/file.png"}/>
        <div>${item.name}</div>
      `;
      nodeEl.addEventListener('click', () => this.onClick(node));
      this.$NodesContainer.appendChild(nodeEl);
    })
  }
}